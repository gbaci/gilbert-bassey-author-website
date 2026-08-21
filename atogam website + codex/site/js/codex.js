(function () {
  // Restore saved theme before first paint (also called inline in <head>)
  var html = document.documentElement;
  var saved = localStorage.getItem('codex-theme');
  if (saved) html.setAttribute('data-theme', saved);

  // Theme toggle
  var btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', function () {
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('codex-theme', next);
    });
  }

  // Spoiler gates
  document.querySelectorAll('.spoiler-gate').forEach(function (gate) {
    var closed    = gate.querySelector('.spoiler-closed');
    var opened    = gate.querySelector('.spoiler-open');
    var revealBtn = gate.querySelector('.reveal-btn');
    var hideBtn   = gate.querySelector('.hide-btn');

    if (revealBtn) {
      revealBtn.addEventListener('click', function () {
        closed.hidden = true;
        opened.hidden = false;
      });
    }

    if (hideBtn) {
      hideBtn.addEventListener('click', function () {
        closed.hidden  = false;
        opened.hidden  = true;
      });
    }
  });
})();
