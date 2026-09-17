(function () {
  if (location.pathname.indexOf("/live") === 0) return;
  function mount() {
    if (document.getElementById("ab-live-btn")) return;
    var a = document.createElement("a");
    a.id = "ab-live-btn";
    a.href = "/live/";
    a.textContent = "LIVE";
    a.setAttribute("style",
      "position:fixed;top:4.7rem;right:10px;z-index:9999;background:#ff8a1a;color:#140b00;font:700 12px/1 system-ui,-apple-system,sans-serif;letter-spacing:.16em;padding:10px 14px;border-radius:999px;text-decoration:none;box-shadow:0 8px 24px rgba(255,138,26,.35)"
    );
    document.body.appendChild(a);
  }
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
  setTimeout(mount, 400);
  setTimeout(mount, 1200);
})();
