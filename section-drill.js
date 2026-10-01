document.getElementById('main').insertAdjacentHTML('beforeend', `
<div id="section-drill" class="section">
  <h2>Add Drill</h2>
  <div class="preview-panel">
    <div class="preview-title">Live Preview</div>
    <div class="preview-row">
      <div class="preview-box">
        <div class="preview-label">Block</div>
        <canvas id="drillSpriteCanvas" width="130" height="130" style="width:100%;max-width:130px;height:130px;display:block;margin:0 auto;border-radius:6px;background:rgba(0,0,0,0.3);image-rendering:pixelated;border:1px solid rgba(255,255,255,0.08);"></canvas>
      </div>
      <div class="preview-box">
        <div class="preview-label">Info</div>
        <div id="drillInfoPreview" style="text-align:center;padding-top:20px;font-size:12px;color:rgba(214,216,221,0.7);line-height:1.8;"></div>
      </div>
    </div>
    <div class="preview-effects" id="drillEffectsPreview"></div>
  </div>
  <h3>Basic Info</h3>
  <label>Internal Name</label>
  <input type="text" id="drillName" placeholder="my-drill">
  <label>Display Name</label>
  <input type="text" id="drillDisplayName" placeholder="My Drill">
  <label>Description</label>
  <textarea id="drillDescription" placeholder="A custom drill..."></textarea>
  <h3>Visuals</h3>
  <label>Color</label>
  <input type="text" id="drillColor" value="8a6f4aff">
  <label>Size (tiles)</label>
  <input type="number" id="drillSize" value="2" min="1" max="16">
  <h3>Stats</h3>
  <label>Health</label>
  <input type="number" id="drillHealth" value="160">
  <label>Armor</label>
  <input type="number" id="drillArmor" value="0">
  <h3>Mining</h3>
  <label>Tier</label>
  <input type="number" id="drillTier" value="2" min="1" max="10">
  <label>Drill Time (ticks)</label>
  <input type="number" id="drillTime" value="300">
  <label>Hardness Multiplier</label>
  <input type="number" id="drillHardnessMultiplier" value="1" step="0.1">
  <label>Liquid Boost Intensity</label>
  <input type="number" id="drillLiquidBoostIntensity" value="2" step="0.1">
  <h3>Build Requirements</h3>
  <label>Requirements</label>
  <input type="text" id="drillRequirements" value="copper/20">
  <h3>Consumes</h3>
  <label>Consumes Power</label>
  <input type="number" id="drillConsumesPower" value="0" step="0.1">
  <label>Consumes Liquid (optional)</label>
  <input type="text" id="drillConsumesLiquid" placeholder="e.g. water/0.1">

  <h3>Rendering & Effects</h3>
  <label>Drawer</label>
  <select id="drillDrawer">
    <option value="DrawDrill">Drill (spinning bit)</option>
    <option value="DrawDefault">Default (basic block)</option>
    <option value="DrawRegion">Region (plain texture)</option>
    <option value="DrawGlowRegion">Glow Region (emissive)</option>
    <option value="DrawMulti">Multi (layered)</option>
    <option value="DrawPump">Pump (liquid intake)</option>
  </select>
  <label>Glow Color (8 hex, optional)</label>
  <input type="text" id="drillGlowColor" placeholder="e.g. ff8800ff">
  <label>Active Effect</label>
  <input type="text" id="drillActiveEffect" placeholder="e.g. drillSteam, mine, none">
  <label>Ambient Sound</label>
  <input type="text" id="drillAmbientSound" placeholder="e.g. loopDrill, machine">
  <label>Ambient Volume (0-1)</label>
  <input type="number" id="drillAmbientVolume" value="0.5" step="0.1">

  <h3>Visibility</h3>
  <label>Shown in build menu?</label>
  <select id="drillBuildable">
    <option value="true" selected>Yes (true)</option>
    <option value="false">No (false)</option>
  </select>
  <label>Always unlocked?</label>
  <select id="drillAlwaysUnlocked">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <label>Hidden from UI?</label>
  <select id="drillHidden">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <div id="drillResearchBlock">
    <h3>Research</h3>
    <label>Parent Block</label>
    <input type="text" id="drillResearchParent" placeholder="e.g. mechanical-drill">
    <label>Research Requirements</label>
    <input type="text" id="drillResearchRequirements" placeholder="e.g. copper/5000, lead/2000">
  </div>
  <h3>Sprite</h3>
  <label>Sprite</label>
  <select id="drillSpriteChoice">
    <option value="random">Generate one for me</option>
    <option value="upload">Upload my own</option>
  </select>
  <input type="file" id="drillSpriteFile" accept="image/png" style="display:none">
</div>
`);

(function() {
  function updateResearchVisibility() {
    var always = document.getElementById("drillAlwaysUnlocked").value;
    var block = document.getElementById("drillResearchBlock");
    if (always === "true") {
      block.style.display = "none";
      document.getElementById("drillResearchParent").value = "";
      document.getElementById("drillResearchRequirements").value = "";
    } else block.style.display = "block";
  }
  function parseColor(hex) {
    if (!hex || hex.length < 6) return { r: 128, g: 128, b: 128 };
    return { r: parseInt(hex.substr(0,2),16)||128, g: parseInt(hex.substr(2,2),16)||128, b: parseInt(hex.substr(4,2),16)||128 };
  }
  function getGlow() { return document.getElementById("drillGlowColor").value.trim(); }
  function drawDrillTexture(ctx, x, y, w, h, color, time) {
    var c = parseColor(color);
    var cx = x + w / 2, cy = y + h / 2;
    ctx.fillStyle = 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')';
    ctx.fillRect(x, y, w, h);
    var grad = ctx.createLinearGradient(x, y, x + w, y + h);
    grad.addColorStop(0, 'rgba(255,255,255,0.2)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.05)');
    grad.addColorStop(1, 'rgba(0,0,0,0.3)');
    ctx.fillStyle = grad; ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = Math.max(2, w / 14);
    ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
    var glow = getGlow();
    if (glow) {
      var gc = parseColor(glow);
      var pulse = 0.4 + (Math.sin((time || 0) * 0.003) + 1) * 0.3;
      ctx.strokeStyle = 'rgba(' + gc.r + ',' + gc.g + ',' + gc.b + ',' + pulse + ')';
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);
    }
    ctx.strokeStyle = 'rgba(0,0,0,0.4)'; ctx.lineWidth = Math.max(2, w / 18);
    ctx.beginPath(); ctx.arc(cx, cy, w * 0.42, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = 'rgba(60,60,70,0.6)';
    ctx.beginPath(); ctx.arc(cx, cy, w * 0.34, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = Math.max(1, w / 40);
    ctx.beginPath(); ctx.arc(cx, cy, w * 0.34, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = 'rgba(40,40,50,0.7)';
    ctx.beginPath(); ctx.arc(cx, cy, w * 0.22, 0, Math.PI * 2); ctx.fill();
    var rotation = time ? (time * 0.004) : 0;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(rotation);
    ctx.fillStyle = 'rgba(220,220,220,0.85)';
    var bitR = w * 0.12, spikes = 6;
    ctx.beginPath();
    for (var i = 0; i < spikes * 2; i++) {
      var angle = (i / (spikes * 2)) * Math.PI * 2;
      var rr = (i % 2 === 0) ? bitR : bitR * 0.5;
      var px = Math.cos(angle) * rr, py = Math.sin(angle) * rr;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = Math.max(1, w / 60); ctx.stroke();
    ctx.restore();
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.beginPath(); ctx.arc(cx, cy, w * 0.04, 0, Math.PI * 2); ctx.fill();
  }
  function drawDrillSprite(time) {
    var canvas = document.getElementById("drillSpriteCanvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    var size = parseInt(document.getElementById("drillSize").value) || 1;
    if (size < 1) size = 1; if (size > 16) size = 16;
    var targetSize = size * 32;
    var choice = document.getElementById("drillSpriteChoice").value;
    if (choice === "upload") {
      var file = document.getElementById("drillSpriteFile").files[0];
      if (file) {
        var url = URL.createObjectURL(file);
        var img = new Image();
        img.onload = function() {
          var off = document.createElement("canvas");
          off.width = targetSize; off.height = targetSize;
          var offCtx = off.getContext("2d"); offCtx.imageSmoothingEnabled = false;
          offCtx.drawImage(img, 0, 0, targetSize, targetSize);
          ctx.imageSmoothingEnabled = false; ctx.drawImage(off, 0, 0, W, H);
          URL.revokeObjectURL(url);
        };
        img.src = url;
      } else {
        ctx.fillStyle = "rgba(214,216,221,0.4)"; ctx.font = "12px sans-serif"; ctx.textAlign = "center";
        ctx.fillText("No file", W / 2, H / 2 + 4);
      }
    } else {
      var off2 = document.createElement("canvas");
      off2.width = targetSize; off2.height = targetSize;
      var offCtx2 = off2.getContext("2d");
      drawDrillTexture(offCtx2, 0, 0, targetSize, targetSize, document.getElementById("drillColor").value, time);
      ctx.imageSmoothingEnabled = false; ctx.drawImage(off2, 0, 0, W, H);
    }
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "10px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(targetSize + "×" + targetSize + " px", W / 2, H - 6);
  }
  function drawDrillInfo() {
    var info = document.getElementById("drillInfoPreview");
    if (!info) return;
    var tier = parseInt(document.getElementById("drillTier").value) || 0;
    var time = parseFloat(document.getElementById("drillTime").value) || 1;
    var oresPerSec = (60 / time).toFixed(2);
    info.innerHTML = "⛏️ Tier: <b>" + tier + "</b><br>⏱️ " + time + " ticks/ore<br>📦 <b>" + oresPerSec + "</b> ore/sec";
  }
  function drawDrillEffects() {
    var container = document.getElementById("drillEffectsPreview");
    if (!container) return;
    var html = "";
    var health = parseInt(document.getElementById("drillHealth").value) || 0;
    var size = parseInt(document.getElementById("drillSize").value) || 1;
    var tier = parseInt(document.getElementById("drillTier").value) || 0;
    var power = parseFloat(document.getElementById("drillConsumesPower").value) || 0;
    var liquid = document.getElementById("drillConsumesLiquid").value.trim();
    var drawer = document.getElementById("drillDrawer").value;
    var glow = getGlow();
    var sound = document.getElementById("drillAmbientSound").value.trim();
    var effect = document.getElementById("drillActiveEffect").value.trim();
    html += '<span class="badge">❤️ ' + health + ' HP</span>';
    html += '<span class="badge">📐 ' + size + 'x' + size + '</span>';
    html += '<span class="badge">⛏️ T' + tier + '</span>';
    if (power > 0) html += '<span class="badge">⚡ ' + power + '/s</span>';
    if (liquid) html += '<span class="badge badge-shield">💧</span>';
    if (drawer && drawer !== "DrawDrill") html += '<span class="badge">🎨 ' + drawer.replace("Draw","") + '</span>';
    if (glow) html += '<span class="badge badge-glow">✨ glow</span>';
    if (sound) html += '<span class="badge">🔊 ' + sound + '</span>';
    if (effect) html += '<span class="badge">💫 ' + effect + '</span>';
    container.innerHTML = html;
  }
  function updateDrillPreview(time) { drawDrillSprite(time); drawDrillInfo(); drawDrillEffects(); }
  document.getElementById("drillAlwaysUnlocked").addEventListener("change", function() { updateResearchVisibility(); updateDrillPreview(); });
  document.getElementById("drillDrawer").addEventListener("change", updateDrillPreview);
  ["drillColor","drillSize","drillHealth","drillArmor","drillTier","drillTime","drillConsumesPower","drillConsumesLiquid","drillGlowColor","drillActiveEffect","drillAmbientSound","drillAmbientVolume"].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("input", updateDrillPreview);
  });
  var choice = document.getElementById("drillSpriteChoice");
  if (choice) choice.addEventListener("change", updateDrillPreview);
  var file = document.getElementById("drillSpriteFile");
  if (file) file.addEventListener("change", updateDrillPreview);
  function animate(time) {
    var sec = document.getElementById("section-drill");
    if (sec && sec.classList.contains("active")) updateDrillPreview(time);
    requestAnimationFrame(animate);
  }
  updateResearchVisibility(); updateDrillPreview();
  requestAnimationFrame(animate);
})();