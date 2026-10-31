// Paystack sends the buyer back here after paying (…/rd-paystack-return?reference=…).
// We ask Paystack directly whether the payment went through, record the order, and send the
// buyer to the order-complete page. The webhook records it too, in case they close the tab.

import { verifyTransaction, recordOrder } from "../lib/raindance-shop.mjs";

const go = (location) => ({ statusCode: 302, headers: { Location: location }, body: "" });

export const handler = async (event) => {
  const reference = (event.queryStringParameters || {}).reference || (event.queryStringParameters || {}).trxref;
  if (!reference) return go("/raindance/order-complete?status=failed");

  const tx = await verifyTransaction(reference);
  const item = tx ? await recordOrder(tx) : null;
  if (!item) return go("/raindance/order-complete?status=failed&ref=" + encodeURIComponent(reference));

  const value = tx.amount / 100;
  return go(`/raindance/order-complete?item=${encodeURIComponent(item)}&value=${value}&ref=${encodeURIComponent(reference)}`);
};
