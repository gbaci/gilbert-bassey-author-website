/* Ali: Raindance sample reader. #ali and #rainmaker pick the chapter; switching updates the hash. */

(function () {
  const chapters = document.querySelectorAll(".r-chapter");
  const tabs = document.querySelectorAll(".r-tab");

  function show(name, scroll) {
    chapters.forEach(function (c) { c.hidden = c.dataset.ch !== name; });
    tabs.forEach(function (t) {
      const on = t.dataset.show === name;
      t.classList.toggle("is-on", on);
      t.setAttribute("aria-pressed", String(on));
    });
    try { history.replaceState(null, "", "#" + name); } catch (e) {}
    if (scroll) window.scrollTo(0, 0);
  }

  document.querySelectorAll("[data-show]").forEach(function (el) {
    el.addEventListener("click", function () { show(el.dataset.show, true); });
  });

  show(/rainmaker|13/i.test(location.hash) ? "rainmaker" : "ali", false);

  // SampleRead: fires once per chapter when its ending comes into view.
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        RD.track("SampleRead", { content_name: "Ali: Raindance sample", chapter: entry.target.dataset.chapter });
      });
    });
    document.querySelectorAll(".r-end").forEach(function (el) { io.observe(el); });
  }
})();
