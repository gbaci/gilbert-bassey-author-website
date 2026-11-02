/* Ali: Raindance "get your link" box (free, share, and leaderboard pages).
   A personal link is just the address below plus the reader's handle, so no lookup is needed.
   On the share page, the captions pick up the reader's link once it's known. */

(function () {
  const LINK_BASE = "gilbertbassey.com/raindance/free?ref=";
  const CAPTION_LINK = /gilbertbassey\.com\/raindance(?![\/\w])/g;

  // Same tidy-up as normHandle in free.js and normHandle_ in the sheet's script.
  function normHandle(v) {
    return String(v || "").trim().toLowerCase().replace(/^@+/, "").replace(/[^a-z0-9._]/g, "").slice(0, 30);
  }

  function personalise(handle) {
    const link = LINK_BASE + handle;
    document.querySelectorAll(".k-cap").forEach(function (cap) {
      const text = cap.querySelector(".k-cap-text");
      const btn = cap.querySelector(".k-copy");
      if (!text.dataset.original) { text.dataset.original = text.innerHTML; btn.dataset.original = btn.dataset.copy; }
      text.innerHTML = text.dataset.original.replace(CAPTION_LINK, link);
      btn.dataset.copy = btn.dataset.original.replace(CAPTION_LINK, link);
    });
  }

  function copy(text, done) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () {});
      return;
    }
    const t = document.createElement("textarea");
    t.value = text;
    t.setAttribute("readonly", "");
    t.style.position = "fixed";
    t.style.opacity = "0";
    document.body.appendChild(t);
    t.select();
    try { document.execCommand("copy"); done(); } catch (e) {}
    t.remove();
  }

  document.querySelectorAll("[data-get-link]").forEach(function (box) {
    const form = box.querySelector("form");
    const input = box.querySelector("input");
    const error = box.querySelector(".rd-link-error");
    const out = box.querySelector(".rd-link-out");
    const url = box.querySelector(".rd-link-url");
    const copyBtn = box.querySelector(".rd-link-copy");

    function show(handle) {
      input.value = handle;
      url.textContent = LINK_BASE + handle;
      out.hidden = false;
      error.hidden = true;
      personalise(handle);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const handle = normHandle(input.value);
      if (handle.length < 2) {
        error.hidden = false;
        out.hidden = true;
        input.focus();
        return;
      }
      try { localStorage.setItem("raindance_handle", handle); } catch (err) {}
      show(handle);
    });

    copyBtn.addEventListener("click", function () {
      copy("https://" + url.textContent, function () {
        copyBtn.textContent = "COPIED";
        setTimeout(function () { copyBtn.textContent = "COPY LINK"; }, 1600);
      });
    });

    let saved = "";
    try { saved = normHandle(localStorage.getItem("raindance_handle")); } catch (err) {}
    if (saved.length >= 2) show(saved);
  });
})();
