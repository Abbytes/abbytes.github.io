(function () {
  if (location.pathname.indexOf("/live") === 0) return;

  var CHANNEL = "spartaadamo";
  var NAV_HTML =
    '<a href="/live/" class="ab-live-nav whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium transition sm:px-4 sm:text-sm text-white/75 hover:bg-white/10 hover:text-white" style="touch-action:manipulation">Live</a>';
  var HERO_HTML =
    '<a href="/live/" class="ab-live-pill inline-flex min-h-11 items-center gap-2 rounded-full border border-studio-accent/60 bg-studio-accent/15 px-5 py-2 text-sm font-semibold text-studio-accent" style="touch-action:manipulation">Live</a>';

  function ensureNav() {
    if (document.querySelector("a.ab-live-nav, a[href='/live/']")) return;
    var nav = document.querySelector("header nav");
    if (!nav) return;
    var sparta = Array.prototype.find.call(nav.querySelectorAll("a"), function (a) {
      return /sparta/i.test(a.textContent || "");
    });
    var node = document.createElement("div");
    node.innerHTML = NAV_HTML;
    var link = node.firstChild;
    if (sparta && sparta.nextSibling) nav.insertBefore(link, sparta.nextSibling);
    else nav.insertBefore(link, nav.lastChild);
  }

  function ensureHero() {
    var row = document.querySelector(".hero-fade-up-delay");
    if (!row) return;
    if (row.querySelector("a[href='/live/']")) return;
    var wrap = document.createElement("div");
    wrap.innerHTML = HERO_HTML;
    row.insertBefore(wrap.firstChild, row.firstChild);
  }

  function markLive(on) {
    document.querySelectorAll("a[href='/live/']").forEach(function (a) {
      if (a.querySelector(".ab-live-dot")) {
        if (!on) a.querySelector(".ab-live-dot").remove();
      } else if (on) {
        var dot = document.createElement("span");
        dot.className = "ab-live-dot";
        dot.setAttribute("aria-hidden", "true");
        a.insertBefore(dot, a.firstChild);
      }
      if (a.classList.contains("ab-live-pill") || a.classList.contains("ab-live-nav") || /live/i.test(a.textContent)) {
        if (on) {
          a.style.borderColor = "rgba(255,59,48,.7)";
          a.style.background = "rgba(255,59,48,.18)";
          a.style.color = "#fff";
        }
      }
    });
  }

  function css() {
    if (document.getElementById("ab-live-style")) return;
    var s = document.createElement("style");
    s.id = "ab-live-style";
    s.textContent =
      ".ab-live-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#ff3b30;margin-right:6px;vertical-align:middle;animation:abLivePulse 1.4s ease-in-out infinite}" +
      "@keyframes abLivePulse{50%{opacity:.45;transform:scale(.75)}}";
    document.head.appendChild(s);
  }

  async function poll() {
    try {
      var uptime = await fetch("https://decapi.me/twitch/uptime/" + CHANNEL, { cache: "no-store" }).then(function (r) { return r.text(); });
      markLive(uptime && !/offline/i.test(uptime));
    } catch (e) {}
  }

  function mount() {
    css();
    ensureNav();
    ensureHero();
  }

  mount();
  document.addEventListener("DOMContentLoaded", mount);
  setTimeout(mount, 400);
  setTimeout(mount, 1400);
  poll();
  setInterval(poll, 45000);
})();
