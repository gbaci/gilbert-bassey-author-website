// Ali: Raindance shop: the price list and the Paystack + recording logic shared by the
// three checkout functions (rd-checkout, rd-paystack-return, rd-paystack-webhook).
//
// Pattern from the Calabar Pot site: the Paystack secret key stays on the server, prices come
// from this file (never from the browser), every payment is verified with Paystack, the amount
// is checked against our price, and recording an order twice is harmless (the Deliveries sheet
// ignores a reference it already has; MailerLite only greets someone once per group).
//
// Netlify → Site configuration → Environment variables (never in this file):
//   PAYSTACK_SECRET_KEY   test key (sk_test_…) while testing, live key (sk_live_…) at launch
//   DELIVERIES_HOOK_URL   the Raindance Deliveries script (already set)
//   MAILERLITE_API_KEY    a MailerLite token for the site
// See wip/RAINDANCE-PAYSTACK-PLAN.md.

const PAYSTACK_API = "https://api.paystack.co";
const ML_API = "https://connect.mailerlite.com/api";

const ML_BUYERS = "200694714855327093";   // ali: raindance buyers (buyer thank-you, review emails)
const ML_PATRONS = "202839595744757187";  // ali: raindance founding patrons (patron thank-you + form)

// Prices in naira. `physical` products need a Nigerian delivery address; `maxQty` 1 means no quantity box.
export const PRODUCTS = {
  ebook: { name: "Ali: Raindance (Ebook)", price: 5000, physical: false, maxQty: 1, group: ML_BUYERS },
  paperback: { name: "Ali: Raindance (Paperback)", price: 10000, physical: true, maxQty: 10, group: ML_BUYERS },
  hardcover: { name: "Ali: Raindance (Hardcover)", price: 25000, physical: true, maxQty: 10, group: ML_BUYERS },
  bundle: { name: "The Raindance Bundle", price: 50000, physical: true, maxQty: 1, group: ML_BUYERS, teeSize: true },
  patron: { name: "Founding Patron (A Tale of Gods and Men)", price: 250000, physical: false, maxQty: 1, group: ML_PATRONS },
  // Hidden: only linked from the launch-team welcome email, and only until 31 December 2026 (Lagos time).
  launch: { name: "Ali: Raindance (Signed Paperback, Launch Team)", price: 6500, physical: true, maxQty: 10,
    group: ML_BUYERS, until: "2027-01-01T00:00:00+01:00" },
};

export const TEE_SIZES = ["S", "M", "L", "XL", "XXL"];

export function available(key) {
  const p = PRODUCTS[key];
  return !!p && (!p.until || Date.now() < Date.parse(p.until));
}

function secretKey() {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new Error("PAYSTACK_SECRET_KEY is not set");
  return key;
}

/** Start a Paystack payment; returns the URL of Paystack's payment page, or null. */
export async function initializeTransaction({ email, amountNaira, callbackUrl, metadata }) {
  const res = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
    method: "POST",
    headers: { Authorization: `Bearer ${secretKey()}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, amount: amountNaira * 100, currency: "NGN", callback_url: callbackUrl, metadata }),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.status) {
    console.error("Paystack initialize failed", res.status, body?.message);
    return null;
  }
  return body.data.authorization_url;
}

/** Ask Paystack directly what happened to a payment. */
export async function verifyTransaction(reference) {
  const res = await fetch(`${PAYSTACK_API}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secretKey()}` },
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.status) {
    console.error("Paystack verify failed", res.status, body?.message);
    return null;
  }
  return body.data;
}

/**
 * Record a paid order: a row in Raindance Deliveries → Sales, and the buyer added to the right
 * MailerLite group. Returns the product key when the payment is genuine and the amount matches.
 * Safe to call more than once for the same payment.
 */
export async function recordOrder(tx) {
  const m = (tx && tx.metadata) || {};
  const product = PRODUCTS[m.item];
  const qty = Math.max(1, Math.min(Number(m.qty) || 1, product ? product.maxQty : 1));
  if (!tx || tx.status !== "success" || tx.currency !== "NGN" || !product) return null;
  if (tx.amount !== product.price * qty * 100) {
    console.error("Paystack amount mismatch", { reference: tx.reference, item: m.item, qty, got: tx.amount });
    return null;
  }

  const email = String(tx.customer?.email || m.email || "").trim().toLowerCase();
  const data = {
    item: m.item, product: product.name, qty, amount: product.price * qty, name: m.name || "", email,
    phone: m.phone || "", address: m.address || "", city: m.city || "", state: m.state || "",
    tee_size: m.tee_size || "",
  };

  await Promise.all([
    forwardToSheet({ form_name: "raindance-sale", id: tx.reference, created_at: tx.paid_at || new Date().toISOString(), data }),
    addToMailerLite(email, data.name, m.item, product.group),
  ]);
  return m.item;
}

async function forwardToSheet(payload) {
  const url = process.env.DELIVERIES_HOOK_URL;
  if (!url) { console.error("DELIVERIES_HOOK_URL is not set; sale", payload.id, "not recorded in the sheet"); return; }
  try {
    const res = await fetch(url, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), redirect: "follow",
    });
    const reply = (await res.text()).trim();
    if (reply !== "ok") console.error(`sale ${payload.id}: sheet replied ${res.status} "${reply.slice(0, 200)}"`);
  } catch (err) {
    console.error(`sale ${payload.id}: ${err}`);
  }
}

async function addToMailerLite(email, name, item, group) {
  const key = process.env.MAILERLITE_API_KEY;
  if (!key) { console.error("MAILERLITE_API_KEY is not set;", email, "not added to MailerLite"); return; }
  try {
    const res = await fetch(`${ML_API}/subscribers`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, fields: { name, rd_format: item }, groups: [group] }),
    });
    if (!res.ok) console.error("MailerLite add failed", res.status, (await res.text()).slice(0, 200));
  } catch (err) {
    console.error("MailerLite add failed", err);
  }
}
