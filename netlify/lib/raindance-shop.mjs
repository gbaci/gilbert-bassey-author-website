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
const ML_EBOOK = "202850623440290905";    // ali: raindance ebook buyers (download email from 1 January)

// Prices in naira. `physical` products need a Nigerian delivery address; `maxQty` 1 means no quantity box.
export const PRODUCTS = {
  ebook: { name: "Ali: Raindance (Ebook)", price: 5000, physical: false, noPhone: true, extras: true, maxQty: 1, group: ML_BUYERS, extraGroup: ML_EBOOK },
  paperback: { name: "Ali: Raindance (Paperback)", price: 10000, physical: true, extras: true, maxQty: 10, group: ML_BUYERS },
  hardcover: { name: "Ali: Raindance (Hardcover)", price: 25000, physical: true, extras: true, maxQty: 10, group: ML_BUYERS },
  bundle: { name: "The ATOGAM Bundle", price: 50000, physical: true, maxQty: 1, group: ML_BUYERS, teeSize: true },
  patron: { name: "Founding Patron (A Tale of Gods and Men)", price: 250000, physical: false, maxQty: 1, group: ML_PATRONS },
  // Hidden: only linked from the launch-team welcome email, and only until 31 December 2026 (Lagos time).
  launch: { name: "Ali: Raindance (Signed Paperback, Launch Team)", price: 6500, physical: true, maxQty: 10,
    group: ML_BUYERS, until: "2027-01-01T00:00:00+01:00" },
};

export const TEE_SIZES = ["S", "M", "L", "XL", "XXL"];

// Extras from the order page. Only products marked `extras` can have them, and they all need delivery.
export const TEE_PRICE = 25000;
export const MAX_TEES = 10;
export const POSTER_PRICE = 5000;
export const CARDS_PRICE = 5000;
export const POSTERS = {
  rainmaker: "The Rainmaker",
  ali: "Ali",
  cover: "Ali and the Rainmaker",
  podium: "The Rainmaker at the podium",
};

/** Tees as "M:2,L:1" turned into [["M", 2], ["L", 1]]: real sizes only, whole numbers, and no more than MAX_TEES in all. */
function cleanTees(raw) {
  const asked = {};
  String(raw || "").split(",").forEach((part) => {
    const [size, n] = part.split(":");
    asked[size] = parseInt(n, 10);
  });
  let left = MAX_TEES;
  const tees = [];
  TEE_SIZES.forEach((size) => {
    const n = Math.min(asked[size] || 0, left);
    if (n > 0) { tees.push([size, n]); left -= n; }
  });
  return tees;
}

const teeCount = (x) => x.tees.reduce((sum, [, n]) => sum + n, 0);

/** Tees written out for a person: "L" for one, "M x2, L x1" for more. */
export function teeSummary(x) {
  if (teeCount(x) === 1) return x.tees[0][0];
  return x.tees.map(([size, n]) => `${size} x${n}`).join(", ");
}

/** The extras in an order, cleaned: only real tees and posters, posters once each, and only on products that allow them. */
export function cleanExtras(item, f) {
  if (!PRODUCTS[item]?.extras) return { tees: [], posters: [], cards: false };
  const asked = Array.isArray(f.posters) ? f.posters : String(f.posters || "").split(",");
  return {
    tees: cleanTees(f.tees),
    posters: Object.keys(POSTERS).filter((id) => asked.includes(id)),
    cards: f.cards === true || f.cards === "1",
  };
}

export const hasExtras = (x) => x.tees.length > 0 || x.posters.length > 0 || x.cards;

/** The whole order's price in naira. This is the only place a total is worked out. */
export function orderTotal(item, qty, x) {
  return PRODUCTS[item].price * qty + teeCount(x) * TEE_PRICE + x.posters.length * POSTER_PRICE + (x.cards ? CARDS_PRICE : 0);
}

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
  }).catch((err) => { console.error("Paystack verify failed", err); return null; });
  if (!res) return null;
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.status) {
    console.error("Paystack verify failed", res.status, body?.message);
    return null;
  }
  return body.data;
}

/**
 * Record a paid order: a row in Raindance Deliveries → Sales, and the buyer added to the right
 * MailerLite group. When the payment is genuine and the amount matches, returns the product key
 * and whether the sheet saved it (`saved` false means call again later); otherwise returns null.
 * Safe to call more than once for the same payment.
 */
export async function recordOrder(tx) {
  const m = (tx && tx.metadata) || {};
  const product = PRODUCTS[m.item];
  const qty = Math.max(1, Math.min(Number(m.qty) || 1, product ? product.maxQty : 1));
  if (!tx || tx.status !== "success" || tx.currency !== "NGN" || !product) return null;
  const extras = cleanExtras(m.item, m);
  const total = orderTotal(m.item, qty, extras);
  if (tx.amount !== total * 100) {
    console.error("Paystack amount mismatch", { reference: tx.reference, item: m.item, qty, got: tx.amount });
    return null;
  }

  const email = String(tx.customer?.email || m.email || "").trim().toLowerCase();
  const data = {
    item: m.item, product: (tx.domain === "test" ? "TEST: " : "") + orderLabel(product, extras), qty, amount: total, name: m.name || "", email,
    phone: m.phone || "", address: m.address || "", city: m.city || "", state: m.state || "",
    tee_size: teeSummary(extras) || m.tee_size || "",
  };

  const [saved] = await Promise.all([
    forwardToSheet({ form_name: "raindance-sale", id: tx.reference, created_at: tx.paid_at || new Date().toISOString(), data }),
    addToMailerLite(email, data.name, m.item, [product.group, product.extraGroup].filter(Boolean)),
  ]);
  return { item: m.item, saved };
}

// One line for the Sales sheet's Product column, so whoever packs the order sees everything in it.
function orderLabel(product, x) {
  const parts = [product.name];
  if (x.tees.length) parts.push(`${teeCount(x) === 1 ? "Rainmaker tee" : "Rainmaker tees"} (${teeSummary(x)})`);
  x.posters.forEach((id) => parts.push(`Poster: ${POSTERS[id]}`));
  if (x.cards) parts.push("Character cards and Sentinel front page");
  return parts.join(" + ");
}

async function forwardToSheet(payload) {
  const url = process.env.DELIVERIES_HOOK_URL;
  if (!url) { console.error("DELIVERIES_HOOK_URL is not set; sale", payload.id, "not recorded in the sheet"); return false; }
  try {
    const res = await fetch(url, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), redirect: "follow",
    });
    const reply = (await res.text()).trim();
    if (reply === "ok") return true;
    console.error(`sale ${payload.id}: sheet replied ${res.status} "${reply.slice(0, 200)}"`);
  } catch (err) {
    console.error(`sale ${payload.id}: ${err}`);
  }
  return false;
}

async function addToMailerLite(email, name, item, groups) {
  const key = process.env.MAILERLITE_API_KEY;
  if (!key) { console.error("MAILERLITE_API_KEY is not set;", email, "not added to MailerLite"); return; }
  try {
    const res = await fetch(`${ML_API}/subscribers`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, fields: { name, rd_format: item }, groups }),
    });
    if (!res.ok) console.error("MailerLite add failed", res.status, (await res.text()).slice(0, 200));
  } catch (err) {
    console.error("MailerLite add failed", err);
  }
}
