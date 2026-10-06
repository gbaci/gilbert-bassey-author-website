/* Ali: Raindance free-copy page (the Raindance Reader Rewards).
   Edit LINKS when the assets exist. Empty links show "Coming soon" instead of going nowhere. */

const LINKS = {
  assets: "",     // TODO: cover / poster / trailer download pack
  goodreads: "",  // TODO: Goodreads book page (StoryGraph link can go in the asset pack)
  posters: "",    // TODO: poster pack for videos
  maskGuide: ""   // TODO: Rainmaker mask guide
};

const MAX_FILE_MB = 8; // Netlify Forms accepts up to 8 MB per submission.

(function () {
  const form = document.querySelector(".f-form");
  const claim = document.getElementById("claim");
  const missionSelect = document.getElementById("f-mission");

  // ----- Links -----
  document.querySelectorAll("[data-link]").forEach(function (a) { RD.wire(a, LINKS[a.dataset.link]); });

  // ----- Smooth scroll to the form (hero button, "send proof", sticky bar) -----
  function toForm(e) {
    if (e) e.preventDefault();
    claim.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(function () { document.getElementById("f-name").focus({ preventScroll: true }); }, 500);
  }
  document.querySelectorAll("[data-to-form]").forEach(function (a) { a.addEventListener("click", toForm); });

  // ----- Missions: one open at a time; opening one sets the form's Mission field -----
  const missions = Array.from(document.querySelectorAll(".f-mission"));
  function setMission(m, open) {
    m.classList.toggle("is-open", open);
    m.querySelector(".f-m-q").setAttribute("aria-expanded", String(open));
    m.querySelector(".f-m-a").hidden = !open;
  }
  missions.forEach(function (m) {
    m.querySelector(".f-m-q").addEventListener("click", function () {
      const wasOpen = m.classList.contains("is-open");
      missions.forEach(function (other) { setMission(other, false); });
      if (!wasOpen) {
        setMission(m, true);
        missionSelect.value = m.dataset.mission;
      }
    });
  });

  // ----- Referral: ?ref=CODE (or the older ?r=CODE) fills "Referred by" and is remembered -----
  const refInput = document.getElementById("f-ref");
  let ref = "";
  try {
    const q = new URLSearchParams(location.search);
    ref = q.get("ref") || q.get("r") || "";
    if (ref) localStorage.setItem("raindance_ref", ref);
    else ref = localStorage.getItem("raindance_ref") || "";
  } catch (e) { /* storage unavailable: use the URL only */ }
  if (ref) refInput.value = ref.slice(0, 60);

  // ----- Proof: file or link -----
  const fileInput = document.getElementById("f-file");
  const linkInput = document.getElementById("f-link");
  const fileName = document.getElementById("f-file-name");
  const proofField = form.querySelector('[data-field="proof"]');
  const proofError = document.getElementById("f-proof-error");

  fileInput.addEventListener("change", function () {
    const f = fileInput.files[0];
    fileName.textContent = f ? f.name : "";
    proofField.classList.remove("invalid");
  });
  linkInput.addEventListener("input", function () { proofField.classList.remove("invalid"); });

  // ----- Validation -----
  function mark(name, bad) {
    form.querySelector('[data-field="' + name + '"]').classList.toggle("invalid", bad);
    return bad;
  }
  form.querySelectorAll("#f-name, #f-email").forEach(function (input) {
    input.addEventListener("input", function () { input.closest(".f-field").classList.remove("invalid"); });
  });

  function validate() {
    let firstBad = null;
    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    if (mark("name", name.length < 2)) firstBad = firstBad || form.elements["name"];
    if (mark("email", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) firstBad = firstBad || form.elements["email"];

    const file = fileInput.files[0];
    const link = linkInput.value.trim();
    let problem = "";
    if (!file && !link) problem = "Please upload a screenshot or paste a link.";
    else if (file && !/^image\//.test(file.type)) problem = "Please upload an image, or paste a link.";
    else if (file && file.size > MAX_FILE_MB * 1024 * 1024) problem = "That file is too large. Please upload a screenshot under " + MAX_FILE_MB + " MB, or paste a link.";
    else if (!file && !/\S+\.\S+/.test(link)) problem = "That doesn't look like a link. Please check it, or upload a screenshot.";
    if (problem) {
      proofError.textContent = problem;
      mark("proof", true);
      firstBad = firstBad || linkInput;
    }

    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  // ----- Submit: Netlify Forms, then the thank-you state in place -----
  const status = document.getElementById("f-status");
  const submitBtn = form.querySelector(".f-submit");
  const main = document.getElementById("f-main");
  const thanks = document.getElementById("thanks");

  function showThanks() {
    main.hidden = true;
    thanks.hidden = false;
    window.scrollTo(0, 0);
    thanks.focus({ preventScroll: true });
    try { history.replaceState(null, "", "#thanks"); } catch (err) {}
  }
  // QA: /raindance/free?preview=thanks shows the thank-you screen without sending a claim.
  if (/[?&]preview=thanks\b/.test(location.search)) showThanks();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "";
    if (!validate()) return;

    submitBtn.disabled = true;
    const label = submitBtn.textContent;
    submitBtn.textContent = "SENDING…";

    fetch("/", { method: "POST", body: new FormData(form) })
      .then(function (res) {
        if (!res.ok) throw new Error("Status " + res.status);
        RD.track("Lead", { content_name: "Raindance free ebook", mission: missionSelect.value });
        showThanks();
      })
      .catch(function () {
        status.innerHTML = "Something went wrong and your claim wasn't sent. Please try again, or email your proof to <a href=\"mailto:gilbert@gilbertbassey.com\">gilbert@gilbertbassey.com</a>.";
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = label;
      });
  });

  // "Do another mission": back to the page with name, email and referral kept.
  document.getElementById("f-again").addEventListener("click", function () {
    fileInput.value = "";
    linkInput.value = "";
    fileName.textContent = "";
    missions.forEach(function (m) { setMission(m, false); });
    thanks.hidden = true;
    main.hidden = false;
    try { history.replaceState(null, "", location.pathname + location.search); } catch (err) {}
    document.getElementById("missions").scrollIntoView({ block: "start" });
  });

  // ----- Sticky claim bar (phone): shows once the hero button is gone, hides when the form is in view -----
  const sticky = document.querySelector(".f-sticky");
  const heroBtn = document.querySelector(".f-hero-btn");
  if ("IntersectionObserver" in window) {
    let heroGone = false, formNear = false;
    function update() {
      const show = heroGone && !formNear;
      sticky.classList.toggle("is-on", show);
      sticky.setAttribute("aria-hidden", String(!show));
      sticky.querySelector("a").tabIndex = show ? 0 : -1;
    }
    new IntersectionObserver(function (entries) {
      heroGone = !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0;
      update();
    }).observe(heroBtn);
    new IntersectionObserver(function (entries) {
      // "Near" once the top of the form section is within the viewport, or above it.
      formNear = entries[0].isIntersecting || entries[0].boundingClientRect.top < 0;
      update();
    }, { rootMargin: "0px 0px -80px 0px" }).observe(claim);
  }
})();
