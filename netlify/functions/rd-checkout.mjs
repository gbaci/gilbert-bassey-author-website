// Starts an Ali: Raindance payment. The checkout page (/raindance/checkout) posts the buyer's
// details here as JSON; we work out the price ourselves, start a Paystack transaction with the
// order in its metadata, and answer with the URL of Paystack's payment page.

import { PRODUCTS, TEE_SIZES, available, initializeTransaction } from "../lib/raindance-shop.mjs";

const reply = (status, body) => ({ statusCode: status, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
const clean = (v, max = 300) => String(v || "").trim().slice(0, max);

export const handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { error: "Use POST" });

  let f;
  try { f = JSON.parse(event.body || "{}"); } catch { return reply(400, { error: "Bad request" }); }
  if (f.company) return reply(400, { error: "Bad request" });  // honeypot: only bots fill it

  const item = clean(f.item, 20);
  const product = PRODUCTS[item];
  if (!product || !available(item)) return reply(400, { error: "This edition isn't available." });

  const email = clean(f.email, 200).toLowerCase();
  const meta = {
    item,
    qty: Math.max(1, Math.min(parseInt(f.qty, 10) || 1, product.maxQty)),
    name: clean(f.name, 120),
    email,
    phone: clean(f.phone, 40),
    address: product.physical ? clean(f.address, 500) : "",
    city: product.physical ? clean(f.city, 80) : "",
    state: product.physical ? clean(f.state, 80) : "",
    tee_size: product.teeSize ? clean(f.tee_size, 5) : "",
  };

  const missing = [];
  if (meta.name.length < 2) missing.push("your name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) missing.push("a valid email");
  if (meta.phone.length < 7) missing.push("your phone number");
  if (product.physical && (meta.address.length < 5 || !meta.city || !meta.state)) missing.push("your delivery address");
  if (product.teeSize && !TEE_SIZES.includes(meta.tee_size)) missing.push("a T-shirt size");
  if (missing.length) return reply(400, { error: "Please add " + missing.join(", ") + "." });

  const site = process.env.URL || "https://gilbertbassey.com";
  const url = await initializeTransaction({
    email,
    amountNaira: product.price * meta.qty,
    callbackUrl: `${site}/.netlify/functions/rd-paystack-return`,
    metadata: meta,
  });
  if (!url) return reply(502, { error: "We couldn't start the payment. Please try again in a minute." });
  return reply(200, { url });
};
