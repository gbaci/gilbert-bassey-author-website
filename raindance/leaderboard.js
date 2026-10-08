/* Ali: Raindance leaderboard. Reads the "Leaderboard" tab of the Raindance claims sheet
   through its Apps Script web app (handle, points and level only; no names or emails). */

// The web app URL from showNetlifyUrl() in the sheet's script, WITHOUT "?key=…".
// Empty shows "The leaderboard opens soon".
const DATA_URL = "https://script.google.com/macros/s/AKfycbw51aAw_fP8pJG2wLuSSNsBo0b-IViw06_9n8SoMCkTMzBGyBtBXuO3IVfb9AtmNTbp/exec";

const SHOW = 100; // rows shown before someone searches

// Physical-reward levels show as "locked in": reaching one secures it; more points can upgrade it.
const LOCKED = { "Signed paperback": 1, "Signed hardcover": 1, "Fan Bundle": 1, "Fan Bundle + Patron race": 1 };

(function () {
  const list = document.getElementById("lb-list");
  const msg = document.getElementById("lb-msg");
  const more = document.getElementById("lb-more");
  const me = document.getElementById("lb-me");
  const find = document.getElementById("lb-find");

  let players = [];
  let mine = "";
  try { mine = localStorage.getItem("raindance_handle") || ""; } catch (e) {}

  function say(text) { msg.textContent = text; msg.hidden = !text; }

  function row(p) {
    const li = document.createElement("li");
    li.className = "lb-row" + (p.rank <= 3 ? " is-top" : "") + (p.handle === mine ? " is-me" : "");
    const rank = document.createElement("span");
    rank.className = "lb-rank";
    rank.textContent = p.rank;
    const name = document.createElement("span");
    name.className = "lb-name";
    const handle = document.createElement("span");
    handle.className = "lb-handle";
    handle.textContent = "@" + p.handle;
    const level = document.createElement("span");
    level.className = "lb-level";
    level.textContent = LOCKED[p.level] ? p.level + " · locked in" : p.level;
    name.append(handle, level);
    const pts = document.createElement("span");
    pts.className = "lb-pts";
    const unit = document.createElement("span");
    unit.textContent = "PTS";
    pts.append(String(p.points), unit);
    li.append(rank, name, pts);
    return li;
  }

  function render() {
    const q = find.value.trim().toLowerCase().replace(/^@+/, "");
    const hits = q ? players.filter(function (p) { return p.handle.indexOf(q) !== -1; }) : players;
    const shown = q ? hits : hits.slice(0, SHOW);
    list.replaceChildren.apply(list, shown.map(row));

    if (!players.length) say("No approved claims yet. Claim yours and be the first on the board.");
    else if (!hits.length) say("No handle matches “" + q + "”. Claims show here once they're approved, within two days.");
    else say("");

    more.hidden = q || hits.length <= SHOW;
    more.textContent = (hits.length - SHOW) + " more readers. Search to find a handle.";
  }

  function showMe() {
    const p = mine && players.find(function (x) { return x.handle === mine; });
    if (!p) return;
    me.innerHTML = "<span></span><strong></strong>";
    me.firstChild.textContent = "@" + p.handle + " · " + p.level;
    me.lastChild.textContent = "#" + p.rank + " · " + p.points + " PTS";
    me.hidden = false;
  }

  find.addEventListener("input", render);

  if (!DATA_URL) { say("The leaderboard opens soon."); return; }

  fetch(DATA_URL)
    .then(function (res) { if (!res.ok) throw new Error(res.status); return res.json(); })
    .then(function (data) {
      players = (data.players || []).map(function (p) {
        return { rank: p.rank, handle: String(p.handle), points: Number(p.points) || 0, level: String(p.level || "") };
      });
      showMe();
      render();
    })
    .catch(function () { say("The leaderboard couldn't load. Please refresh the page in a minute."); });
})();
