/* Ali: Raindance free-copy page behaviour.
   Edit LINKS when the assets exist. Empty links show "Coming soon" instead of going nowhere. */

const LINKS = {
  preorder: "",   // TODO: Selar preorder URL. Until set, "Buy the book" links go to /ali-raindance.
  assets: "",     // TODO: cover / poster / trailer download pack
  goodreads: "",  // TODO: Goodreads book page (StoryGraph link can go in the asset pack)
  posters: "",    // TODO: poster pack for videos
  maskGuide: ""   // TODO: Rainmaker mask guide
};

const MAX_FILE_MB = 8; // Netlify Forms accepts up to 8 MB per submission.

(function () {
  // ----- Links -----
  document.querySelectorAll("[data-link]").forEach(function (a) {
    const url = LINKS[a.dataset.link];
    if (url) {
      a.href = url;
      if (/^https?:/.test(url)) { a.target = "_blank"; a.rel = "noopener"; }
    } else if (a.classList.contains("task-action")) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const original = a.textContent;
        a.textContent = "Coming soon";
        setTimeout(function () { a.textContent = original; }, 1600);
      });
    }
  });

  // ----- Task cards <-> Task field -----
  const cards = Array.from(document.querySelectorAll(".task"));
  const taskSelect = document.getElementById("f-task");

  function choose(card, focus) {
    cards.forEach(function (c) {
      const on = c === card;
      c.classList.toggle("is-chosen", on);
      c.setAttribute("aria-checked", on ? "true" : "false");
      c.tabIndex = on ? 0 : -1;
    });
    taskSelect.value = card.dataset.task;
    if (focus) card.focus();
  }

  cards.forEach(function (card, i) {
    card.addEventListener("click", function (e) {
      if (e.target.closest(".task-action")) return;
      choose(card);
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); choose(card); }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); choose(cards[(i + 1) % cards.length], true); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); choose(cards[(i - 1 + cards.length) % cards.length], true); }
    });
  });

  taskSelect.addEventListener("change", function () {
    const card = cards.find(function (c) { return c.dataset.task === taskSelect.value; });
    if (card) choose(card);
  });

  // ----- Referral code: ?r=CODE prefills "Referred by" and is remembered -----
  const refInput = document.getElementById("f-ref");
  let ref = "";
  try {
    ref = new URLSearchParams(location.search).get("r") || "";
    if (ref) localStorage.setItem("raindance_ref", ref);
    else ref = localStorage.getItem("raindance_ref") || "";
  } catch (e) { /* storage unavailable: use the URL only */ }
  if (ref && !refInput.value) refInput.value = ref.slice(0, 60);

  // ----- Proof: file or link -----
  const fileInput = document.getElementById("f-file");
  const linkInput = document.getElementById("f-link");
  const fileName = document.getElementById("file-name");
  const proofBox = document.getElementById("proof");
  const proofError = document.getElementById("proof-error");

  fileInput.addEventListener("change", function () {
    const f = fileInput.files[0];
    fileName.textContent = f ? f.name : "";
    clearProofError();
  });
  linkInput.addEventListener("input", clearProofError);

  function clearProofError() {
    proofBox.classList.remove("invalid");
    proofError.classList.remove("show");
  }
  function proofProblem(msg) {
    proofError.textContent = msg;
    proofBox.classList.add("invalid");
    proofError.classList.add("show");
  }

  // ----- Validation -----
  const form = document.querySelector(".claim-form");
  const status = document.getElementById("form-status");
  const success = document.getElementById("form-success");
  const submitBtn = form.querySelector(".btn-submit");

  function setInvalid(name, bad) {
    const field = form.querySelector('[data-field="' + name + '"]');
    if (field) field.classList.toggle("invalid", bad);
    return bad;
  }

  form.querySelectorAll("input").forEach(function (input) {
    input.addEventListener("input", function () {
      const field = input.closest(".field");
      if (field) field.classList.remove("invalid");
    });
  });

  function validate() {
    let firstBad = null;
    const el = form.elements;
    const name = el["name"].value.trim();
    const email = el["email"].value.trim();
    const wa = el["whatsapp"].value.replace(/[^\d+]/g, "");

    if (setInvalid("name", name.length < 2)) firstBad = firstBad || el["name"];
    if (setInvalid("email", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) firstBad = firstBad || el["email"];
    if (setInvalid("whatsapp", wa.replace("+", "").length < 7)) firstBad = firstBad || el["whatsapp"];

    const file = fileInput.files[0];
    const link = linkInput.value.trim();
    if (!file && !link) {
      proofProblem("Please upload a screenshot or paste a link.");
      firstBad = firstBad || linkInput;
    } else if (file && file.size > MAX_FILE_MB * 1024 * 1024) {
      proofProblem("That file is too large. Please upload a screenshot under " + MAX_FILE_MB + " MB, or paste a link.");
      firstBad = firstBad || linkInput;
    } else if (!file && !/\S+\.\S+/.test(link)) {
      proofProblem("That doesn’t look like a link. Please check it, or upload a screenshot.");
      firstBad = firstBad || linkInput;
    }

    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "";
    if (!validate()) return;

    submitBtn.disabled = true;
    const label = submitBtn.textContent;
    submitBtn.textContent = "Sending…";

    fetch("/", { method: "POST", body: new FormData(form) })
      .then(function (res) {
        if (!res.ok) throw new Error("Status " + res.status);
        form.hidden = true;
        success.hidden = false;
        success.focus();
        try { localStorage.removeItem("raindance_ref"); } catch (err) {}
        if (window.fbq) fbq("track", "Lead", { content_name: "Raindance free copy" });
        if (window.ttq) ttq.track("SubmitForm");
        if (window.gtag) gtag("event", "generate_lead", { form_name: "raindance-claim", task: taskSelect.value });
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = label;
        status.innerHTML = "Something went wrong and your claim wasn’t sent. Please try again, or email your proof to <a href=\"mailto:gilbert@gilbertbassey.com\">gilbert@gilbertbassey.com</a>.";
      });
  });
})();
