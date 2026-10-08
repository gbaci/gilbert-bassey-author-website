/* Ali: Raindance release pages: shared behaviour (launch phase, tracking, links, accordions).
   Loaded in <head> so the phase class is on <html> before the page paints. */

(function () {
  // "auto" switches at 1 January 2027, 00:00 WAT. Force with "before" or "after".
  // For QA, add ?phase=before or ?phase=after to any page URL.
  const PHASE = "auto";

  // Free-copy points stop counting on this date, written as it should read on the page
  // (e.g. "31 January 2027"). Empty hides every [data-needs-close] line.
  const POINTS_CLOSE = "31 January 2027";

  const LAUNCH = Date.parse("2027-01-01T00:00:00+01:00");
  const SIGNED_CLOSE = Date.parse("2026-12-31T23:59:00+01:00");

  let forced = "";
  try { forced = new URLSearchParams(location.search).get("phase") || ""; } catch (e) {}
  if (forced !== "before" && forced !== "after") forced = PHASE === "auto" ? "" : PHASE;

  const now = Date.now();
  const after = forced ? forced === "after" : now >= LAUNCH;
  // Signed preorders end at 11:59 pm WAT on 31 December. A forced "before" keeps them on.
  const signed = !after && (forced === "before" || now < SIGNED_CLOSE);

  const root = document.documentElement;
  root.classList.add(after ? "is-after" : "is-before");
  if (!signed) root.classList.add("is-unsigned");

  // Pixels: Meta standard events go through "track", everything else through "trackCustom".
  const META_STANDARD = { ViewContent: 1, InitiateCheckout: 1, Lead: 1 };
  function track(name, params) {
    params = Object.assign({ content_id: "ali-raindance" }, params);
    try {
      if (window.fbq) fbq(META_STANDARD[name] ? "track" : "trackCustom", name, params);
      if (window.ttq) ttq.track(name === "Lead" ? "SubmitForm" : name, params);
      if (window.gtag) gtag("event", name, params);
    } catch (e) { /* tracking must never break the page */ }
  }

  // Point a link at a URL, or make it say "Coming soon" when the URL isn't ready yet.
  function wire(el, url) {
    if (url) {
      el.href = url;
      if (/^https?:/.test(url)) { el.target = "_blank"; el.rel = "noopener"; }
      return true;
    }
    el.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (el.dataset.busy) return;
      el.dataset.busy = "1";
      const label = el.querySelector("[data-label]") || el;
      const original = label.textContent;
      label.textContent = "Coming soon";
      setTimeout(function () { label.textContent = original; delete el.dataset.busy; }, 1600);
    });
    return false;
  }

  // Accordions: one item open per group, the +/− sign swaps.
  function accordion(group) {
    const items = Array.from(group.querySelectorAll(".acc-item"));
    function set(item, open) {
      item.querySelector(".acc-q").setAttribute("aria-expanded", String(open));
      item.querySelector(".acc-a").hidden = !open;
      item.querySelector(".acc-sign").textContent = open ? "−" : "+";
    }
    items.forEach(function (item) {
      item.querySelector(".acc-q").addEventListener("click", function () {
        const wasOpen = !item.querySelector(".acc-a").hidden;
        items.forEach(function (other) { set(other, false); });
        if (!wasOpen) set(item, true);
      });
    });
  }

  // Phase copy: data-after / data-after-href swap after launch; data-unsigned swaps once signing ends.
  function applyPhase() {
    if (after) {
      document.querySelectorAll("[data-after]").forEach(function (el) { el.textContent = el.dataset.after; });
      document.querySelectorAll("[data-after-href]").forEach(function (el) { el.href = el.dataset.afterHref; });
    } else if (!signed) {
      document.querySelectorAll("[data-unsigned]").forEach(function (el) { el.textContent = el.dataset.unsigned; });
    }
    document.querySelectorAll("[data-points-close]").forEach(function (el) { el.textContent = POINTS_CLOSE; });
    document.querySelectorAll("[data-needs-close]").forEach(function (el) { el.hidden = !POINTS_CLOSE; });
    document.querySelectorAll("[data-accordion]").forEach(accordion);
  }

  window.RD = { after: after, signed: signed, track: track, wire: wire, pointsClose: POINTS_CLOSE };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", applyPhase);
  else applyPhase();
})();
