/* Ali: Raindance sales page. Edit CONFIG to add payment links and update the counts.
   Empty links show "Coming soon" instead of going nowhere. The launch date lives in release.js. */

const CONFIG = {
  // Founding Patron places already paid for (0–20).
  placesTaken: 0,

  // Raindance Bundles already paid for (0–50). At 50 the bundle button says SOLD OUT.
  bundlesSold: 0,

  // Payment links (Selar).
  pay: {
    ebook: "https://selar.com/17eds99040",
    paperback: "https://selar.com/6h2j9p9it7",
    hardcover: "https://selar.com/jq4h2u9ol8",
    bundle: "https://selar.com/4gx01k5jn7",
    patron: "https://selar.com/65527h5444"
  }
};

(function () {
  RD.track("ViewContent", { content_name: "Ali: Raindance" });

  // ----- Payment buttons -----
  const bundleSoldOut = (CONFIG.bundlesSold | 0) >= 50;
  document.querySelectorAll("[data-pay]").forEach(function (el) {
    const key = el.dataset.pay;
    if (key === "bundle" && bundleSoldOut) {
      el.textContent = "SOLD OUT";
      el.removeAttribute("data-after");
      el.classList.add("is-disabled");
      el.setAttribute("aria-disabled", "true");
      el.addEventListener("click", function (e) { e.preventDefault(); });
      return;
    }
    if (RD.wire(el, CONFIG.pay[key])) {
      el.addEventListener("click", function () {
        RD.track("InitiateCheckout", { content_name: el.dataset.name });
      });
    }
  });

  // ----- Founding Patron seats -----
  const taken = Math.max(0, Math.min(20, CONFIG.placesTaken | 0));
  let seats = "";
  for (let i = 0; i < 20; i++) seats += '<span class="s-seat' + (i < taken ? " is-taken" : "") + '"></span>';
  const seatBox = document.querySelector(".s-seats");
  seatBox.innerHTML = seats;
  // \u2060 (word joiner) keeps "F01–F20" from breaking across lines.
  const placesLine = taken === 0 ? "TWENTY PLACES · F01\u2060–\u2060F20" : (20 - taken) + " OF 20 PLACES LEFT";
  document.querySelector(".s-places").textContent = placesLine;
  seatBox.setAttribute("aria-label", taken + " of 20 Founding Patron places taken");

  // ----- Cast spotlight (phone) -----
  const CAST = [
    ["Okoro", "The Last Idealist", "Ali's grandfather, a journalist who still believes the truth can move a country."],
    ["Abubakar", "The General", "Retired general, Senate President, presidential candidate. His daughter calls his fortune blood money."],
    ["Farida", "The Defiant Daughter", "The Senate President's daughter, taken in the Rainmaker's latest act."],
    ["Daniel", "The Protégé", "Fifteen, sweet-toothed and fiercely loyal. The Rainmaker saved him, and Daniel would do anything for him."]
  ];
  const stageImgs = document.querySelectorAll(".s-spot-stage img");
  const thumbs = document.querySelectorAll(".s-thumb");
  const spotName = document.querySelector(".s-spot-name");
  const spotRole = document.querySelector(".s-spot-role");
  const spotLine = document.querySelector(".s-spot-line");
  thumbs.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      thumbs.forEach(function (b, j) {
        b.classList.toggle("is-on", i === j);
        b.setAttribute("aria-pressed", String(i === j));
      });
      stageImgs.forEach(function (img, j) { img.classList.toggle("is-on", i === j); });
      spotName.textContent = CAST[i][0];
      spotRole.textContent = CAST[i][1];
      spotLine.textContent = CAST[i][2];
    });
  });
})();
