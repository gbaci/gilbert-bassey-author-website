/* Ali: Raindance main page behaviour. Edit CONFIG to switch phase, mark patron places taken,
   and add payment links. Empty payment links show "Coming soon" instead of going nowhere. */

const CONFIG = {
  // "auto" switches at 1 January 2027, 00:00 WAT. Force with "before" or "after".
  phase: "auto",

  // Founding Patron places already taken (0–10).
  placesTaken: 0,

  // TODO: payment links (Selar, Paystack, Flutterwave…).
  pay: {
    ebook: "",
    paperback: "",
    hardcover: "",
    collector: "",
    patron: ""
  },

  // TODO: refund and terms page.
  links: {
    refunds: ""
  }
};

(function () {
  const launch = new Date("2027-01-01T00:00:00+01:00").getTime();
  const after = CONFIG.phase === "after" || (CONFIG.phase === "auto" && Date.now() >= launch);

  // ----- Launch phase copy -----
  if (after) {
    document.querySelectorAll("[data-phase-text]").forEach(function (el) {
      el.textContent = el.dataset.after;
    });
    const headerCta = document.querySelector(".ld-header-cta");
    headerCta.textContent = headerCta.dataset.after;
    headerCta.href = "/raindance/free";
    document.querySelectorAll('[data-cta="primary"]').forEach(function (a) {
      a.textContent = "GET YOUR FREE COPY";
      a.href = "/raindance/free";
    });
    document.querySelectorAll('[data-cta="secondary"]').forEach(function (a) {
      a.textContent = "BUY THE BOOK";
      a.href = "#editions";
    });
  }

  // ----- Payment and other links -----
  function wire(el, url) {
    if (url) {
      el.href = url;
      if (/^https?:/.test(url)) { el.target = "_blank"; el.rel = "noopener"; }
      return;
    }
    el.addEventListener("click", function (e) {
      e.preventDefault();
      if (el.dataset.busy) return;
      el.dataset.busy = "1";
      const original = el.textContent;
      el.textContent = "Coming soon";
      setTimeout(function () { el.textContent = original; delete el.dataset.busy; }, 1600);
    });
  }
  document.querySelectorAll("[data-pay]").forEach(function (el) { wire(el, CONFIG.pay[el.dataset.pay]); });
  document.querySelectorAll("[data-link]").forEach(function (el) { wire(el, CONFIG.links[el.dataset.link]); });

  // ----- Founding Patron seats -----
  const taken = Math.max(0, Math.min(10, CONFIG.placesTaken | 0));
  const left = 10 - taken;
  let seatsHtml = "";
  for (let i = 0; i < 10; i++) {
    const num = "F" + String(i + 1).padStart(2, "0");
    seatsHtml += i < taken
      ? '<span class="ld-seat taken">' + num + "<small>Taken</small></span>"
      : '<span class="ld-seat">' + num + "</span>";
  }
  const placesLine = left === 10 ? "TEN PLACES · F01–F10" : left + " OF 10 PLACES LEFT";
  const desktopSeats = document.querySelector(".ld-seats-desktop .ld-seats");
  const desktopLine = document.querySelector(".ld-seats-desktop .ld-places");
  desktopSeats.innerHTML = seatsHtml;
  desktopLine.textContent = placesLine;
  document.querySelector(".ld-seats-mobile").innerHTML =
    '<div class="ld-seats" aria-label="Founding Patron places">' + seatsHtml + '</div><p class="ld-places label">' + placesLine + "</p>";

  // ----- Note: short / full -----
  const toggle = document.querySelector(".ld-note-toggle");
  const shortNote = document.getElementById("note-short");
  const fullNote = document.getElementById("note-full");
  toggle.addEventListener("click", function () {
    const open = fullNote.hidden;
    fullNote.hidden = !open;
    shortNote.hidden = open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "SHORTER NOTE ↑" : "READ THE FULL NOTE ↓";
    if (!open) document.getElementById("patrons").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // ----- Accordions: one open at a time -----
  document.querySelectorAll("[data-accordion]").forEach(function (acc) {
    const items = Array.from(acc.querySelectorAll(".ld-acc-item"));
    function set(item, open) {
      item.querySelector(".ld-acc-q").setAttribute("aria-expanded", String(open));
      item.querySelector(".ld-acc-a").hidden = !open;
      item.querySelector(".ld-sign-icon").textContent = open ? "−" : "+";
    }
    items.forEach(function (item) {
      item.querySelector(".ld-acc-q").addEventListener("click", function () {
        const wasOpen = !item.querySelector(".ld-acc-a").hidden;
        items.forEach(function (other) { set(other, false); });
        if (!wasOpen) set(item, true);
      });
    });
    if (acc.hasAttribute("data-first-open") && items[0]) set(items[0], true);
  });

  // ----- Header: solid on scroll, menu -----
  const header = document.querySelector(".ld-header");
  const menuBtn = document.querySelector(".ld-menu-btn");
  const menu = document.getElementById("ld-menu");
  function onScroll() { header.classList.toggle("is-solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  function closeMenu() {
    menu.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
    header.classList.remove("menu-open");
  }
  menuBtn.addEventListener("click", function () {
    const open = menu.hidden;
    menu.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
    header.classList.toggle("menu-open", open);
  });
  menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
})();
