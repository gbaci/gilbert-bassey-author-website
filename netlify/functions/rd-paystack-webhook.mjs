// Paystack calls this in the background whenever a payment succeeds, so an order is recorded
// even if the buyer closes the tab before coming back. Set it in the Paystack dashboard:
// Settings → API Keys & Webhooks → Webhook URL = https://gilbertbassey.com/.netlify/functions/rd-paystack-webhook
//
// Paystack signs every call (HMAC SHA-512 of the raw body with our secret key, in the
// x-paystack-signature header). Anything without a valid signature is ignored.

import { createHmac, timingSafeEqual } from "node:crypto";
import { recordOrder } from "../lib/raindance-shop.mjs";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Use POST" };

  const raw = event.isBase64Encoded ? Buffer.from(event.body || "", "base64").toString("utf8") : event.body || "";
  const signature = (event.headers || {})["x-paystack-signature"] || "";
  const secret = process.env.PAYSTACK_SECRET_KEY || "";
  const expected = createHmac("sha512", secret).update(raw).digest("hex");
  const valid = !!secret && signature.length === expected.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!valid) return { statusCode: 401, body: "Invalid signature" };

  const evt = JSON.parse(raw);
  if (evt.event === "charge.success") await recordOrder(evt.data);

  // Always answer 200 to a genuine Paystack call, or it keeps retrying.
  return { statusCode: 200, body: "OK" };
};
