// Paystack sends the buyer back here after paying (…/rd-paystack-return?reference=…).
// We ask Paystack directly whether the payment went through, record the order, and send the
// buyer to the order-complete page. The webhook records it too, in case they close the tab.

import { verifyTransaction, recordOrder, cleanExtras, hasExtras } from "../lib/raindance-shop.mjs";

const go = (location) => ({ statusCode: 302, headers: { Location: location }, body: "" });

export const handler = async (event) => {
  const reference = (event.queryStringParameters || {}).reference || (event.queryStringParameters || {}).trxref;
  if (!reference) return go("/raindance/order-complete?status=failed");

  const tx = await verifyTransaction(reference);
  // Paystack didn't answer, so we don't know yet. The buyer mustn't be told nothing was charged.
  if (!tx) return go("/raindance/order-complete?status=unconfirmed&ref=" + encodeURIComponent(reference));
  const order = await recordOrder(tx);
  if (!order) return go("/raindance/order-complete?status=failed&ref=" + encodeURIComponent(reference));
  const { item } = order;

  const value = tx.amount / 100;
  const extras = hasExtras(cleanExtras(item, tx.metadata)) ? "&extras=1" : "";
  return go(`/raindance/order-complete?item=${encodeURIComponent(item)}&value=${value}${extras}&ref=${encodeURIComponent(reference)}`);
};
