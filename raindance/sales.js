/* Ali: Raindance sales page. Edit CONFIG to add payment links and update the counts.
   Empty links show "Coming soon" instead of going nowhere. The launch date lives in release.js. */

const CONFIG = {
  // ATOGAM Bundles already paid for (0–50). At 50 the bundle button says SOLD OUT.
  bundlesSold: 0,

  // Payment links (our own checkout, paid through Paystack).
  pay: {
    ebook: "/raindance/checkout?item=ebook",
    paperback: "/raindance/checkout?item=paperback",
    hardcover: "/raindance/checkout?item=hardcover",
    bundle: "/raindance/checkout?item=bundle",
    patron: "/raindance/checkout?item=patron"
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

  // ----- Header: solid background once scrolled (phone header is sticky) -----
  const header = document.querySelector(".s-header");
  function solidHeader() { header.classList.toggle("is-solid", window.scrollY > 40); }
  window.addEventListener("scroll", solidHeader, { passive: true });
  solidHeader();

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

// Reader quotes carousel: swipe or use the arrows. It never moves on its own.
(function () {
  const track = document.getElementById("s-voice-track");
  if (!track) return;
  const cards = Array.from(track.children);
  const prev = document.getElementById("s-voice-prev");
  const next = document.getElementById("s-voice-next");
  const count = document.getElementById("s-voice-count");
  let current = 0;

  function show(i) {
    current = i;
    count.textContent = (i + 1) + " of " + cards.length;
    prev.disabled = i === 0;
    next.disabled = i === cards.length - 1;
  }
  function go(i) {
    const card = cards[i];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
    show(i);
  }
  prev.addEventListener("click", function () { go(current - 1); });
  next.addEventListener("click", function () { go(current + 1); });

  let timer;
  track.addEventListener("scroll", function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      const middle = track.getBoundingClientRect().left + track.clientWidth / 2;
      let best = 0, gap = Infinity;
      cards.forEach(function (c, i) {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - middle);
        if (d < gap) { gap = d; best = i; }
      });
      show(best);
    }, 90);
  });
  show(0);
})();
