// Netlify runs this automatically after every verified form submission on the site
// (a function named "submission-created" is an event trigger, not a public page).
// It forwards the entry to the Google Apps Script that keeps that form's sheet.
//
// Why not Netlify's "HTTP POST request" notification? Apps Script answers every POST with a
// redirect, which Netlify counts as a failure: it resends the entry and, after 6 tries,
// switches the notification off. fetch() follows the redirect properly.
//
// The two private script URLs (they contain keys) live in Netlify → Site configuration →
// Environment variables, never in this file. See wip/RAINDANCE-DELIVERIES.md.

const ROUTES = {
  "raindance-claim": "CLAIMS_HOOK_URL",           // Reader Rewards → "Raindance claims" sheet
  "raindance-arc": "DELIVERIES_HOOK_URL",         // review copies → "Raindance Deliveries" / ARC reviewers
  "raindance-beta-address": "DELIVERIES_HOOK_URL", // beta copies → "Raindance Deliveries" / Beta readers
};

export const handler = async (event) => {
  const payload = JSON.parse(event.body || "{}").payload || {};
  const envName = ROUTES[payload.form_name];
  if (!envName) return { statusCode: 200, body: "no route" };

  const url = process.env[envName];
  if (!url) {
    console.error(`${envName} is not set; ${payload.form_name} entry ${payload.id} not forwarded`);
    return { statusCode: 200, body: "not configured" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    const reply = (await res.text()).trim();
    if (reply !== "ok" && reply !== "ignored") {
      console.error(`${payload.form_name} entry ${payload.id}: script replied ${res.status} "${reply.slice(0, 200)}"`);
    }
  } catch (err) {
    console.error(`${payload.form_name} entry ${payload.id}: ${err}`);
  }
  return { statusCode: 200, body: "done" };
};
