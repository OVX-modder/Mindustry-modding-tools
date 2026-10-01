// ===== KEY-GATE.JS =====
// Requires a valid access key before the builder can be used.
// Edit the KEY lists below to add or remove keys.

(function() {

  // ============ ✏️ EDIT THESE LISTS ============
  var MEMBER_KEYS = [
    "OVX-2026"
  ];

  var FRIEND_KEYS = [
    "share-friends"
  ];

  // Your Discord invite link
  var DISCORD_URL = "https://discord.gg/5hNEdpUHCX";
  // ============================================

  // How long to remember the key:
  //   ""        = ask every reload
  //   "session" = remember per tab (default)
  //   "local"   = remember forever
  var SAVE_MODE = "session";

  var STORAGE_KEY = "mmb-access";

  function normalizeKey(k) {
    return (k || "").trim().toUpperCase().replace(/\s+/g, "");
  }

  function checkKey(k) {
    var norm = normalizeKey(k);
    if (!norm) return null;
    for (var i = 0; i < MEMBER_KEYS.length; i++) {
      if (normalizeKey(MEMBER_KEYS[i]) === norm) return "member";
    }
    for (var j = 0; j < FRIEND_KEYS.length; j++) {
      if (normalizeKey(FRIEND_KEYS[j]) === norm) return "friend";
    }
    return null;
  }

  function getSaved() {
    try {
      if (SAVE_MODE === "session") return sessionStorage.getItem(STORAGE_KEY);
      if (SAVE_MODE === "local") return localStorage.getItem(STORAGE_KEY);
    } catch (e) { return null; }
    return null;
  }
  function saveKey(k, type) {
    try {
      var val = type + "|" + k;
      if (SAVE_MODE === "session") sessionStorage.setItem(STORAGE_KEY, val);
      else if (SAVE_MODE === "local") localStorage.setItem(STORAGE_KEY, val);
    } catch (e) {}
  }
  function clearKey() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  function buildGate() {
    var gate = document.createElement("div");
    gate.id = "key-gate";
    gate.innerHTML =
      '<div class="key-gate-card">' +
        '<div class="key-gate-logo">🔐</div>' +
        '<h1 class="key-gate-title">Mindustry Mod Builder</h1>' +
        '<p class="key-gate-sub">Enter your access key to continue</p>' +
        '<input id="key-gate-input" class="key-gate-input" placeholder="MND-XXXX-XXXX-XXXX" autocomplete="off" autocapitalize="characters">' +
        '<button id="key-gate-btn" class="key-gate-btn">Unlock</button>' +
        '<div id="key-gate-error" class="key-gate-error"></div>' +
        '<div class="key-gate-note">Don\'t have a key? Join the Discord to get one.</div>' +
        '<a id="key-gate-discord" class="key-gate-discord" href="' + DISCORD_URL + '" target="_blank" rel="noopener noreferrer">' +
          '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="vertical-align:-3px;margin-right:6px;">' +
            '<path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z"/>' +
          '</svg>' +
          'Join our Discord' +
        '</a>' +
      '</div>';
    document.body.appendChild(gate);

    var input = gate.querySelector("#key-gate-input");
    var btn = gate.querySelector("#key-gate-btn");
    var err = gate.querySelector("#key-gate-error");

    function attempt() {
      var type = checkKey(input.value);
      if (type) {
        saveKey(normalizeKey(input.value), type);
        unlock(type);
      } else {
        err.textContent = "Invalid key. Check it and try again.";
        err.classList.add("show");
        input.focus();
        input.select();
      }
    }

    btn.addEventListener("click", attempt);
    input.addEventListener("keydown", function(e) {
      if (e.key === "Enter") attempt();
    });

    setTimeout(function() { input.focus(); }, 100);
  }

  function unlock(type) {
    var gate = document.getElementById("key-gate");
    if (gate) {
      gate.classList.add("closing");
      setTimeout(function() { gate.remove(); }, 300);
    }
    document.body.classList.remove("locked");
    addKeyBadge(type);
    window.__mmbUnlocked = true;
    window.__mmbKeyType = type;
  }

  function addKeyBadge(type) {
    var topbar = document.getElementById("topbar");
    if (!topbar) return;
    if (document.getElementById("key-badge")) return;
    var badge = document.createElement("div");
    badge.id = "key-badge";
    badge.className = "key-badge key-badge-" + type;
    badge.textContent = type === "member" ? "★ Member" : "◆ Friend";
    badge.title = "Tap to lock";
    badge.addEventListener("click", function() {
      if (confirm("Lock the builder? You'll need to re-enter your key.")) {
        clearKey();
        location.reload();
      }
    });
    topbar.appendChild(badge);
  }

  function init() {
    document.body.classList.add("locked");
    var saved = getSaved();
    if (saved) {
      var parts = saved.split("|");
      var type = parts[0];
      var k = parts[1];
      if (checkKey(k) === type) {
        unlock(type);
        return;
      } else {
        clearKey();
      }
    }
    buildGate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();