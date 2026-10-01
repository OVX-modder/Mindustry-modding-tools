document.getElementById('main').insertAdjacentHTML('beforeend', `
<div id="section-power" class="section">
  <h2>Add Power Block</h2>
  <label>Power Block Type</label>
  <select id="powerKind">
    <option value="solar">Solar Generator</option>
    <option value="thermal">Thermal Generator</option>
    <option value="consume">Consume Generator</option>
    <option value="node">Power Node</option>
    <option value="battery">Battery</option>
  </select>
  <div class="preview-panel">
    <div class="preview-title">Live Preview</div>
    <div class="preview-row">
      <div class="preview-box">
        <div class="preview-label">Block</div>
        <canvas id="powerSpriteCanvas" width="130" height="130" style="width:100%;max-width:130px;height:130px;display:block;margin:0 auto;border-radius:6px;background:rgba(0,0,0,0.3);image-rendering:pixelated;border:1px solid rgba(255,255,255,0.08);"></canvas>
      </div>
      <div class="preview-box">
        <div class="preview-label">Info</div>
        <div id="powerInfoPreview" style="text-align:center;padding-top:20px;font-size:12px;color:rgba(214,216,221,0.7);line-height:1.8;"></div>
      </div>
    </div>
    <div class="preview-effects" id="powerEffectsPreview"></div>
  </div>
  <h3>Basic Info</h3>
  <label>Internal Name</label>
  <input type="text" id="powerName" placeholder="my-power-block">
  <label>Display Name</label>
  <input type="text" id="powerDisplayName" placeholder="My Power Block">
  <label>Description</label>
  <textarea id="powerDescription" placeholder="A power block..."></textarea>
  <h3>Visuals</h3>
  <label>Color</label>
  <input type="text" id="powerColor" value="4a90d9ff">
  <label>Size (tiles)</label>
  <input type="number" id="powerSize" value="1" min="1" max="16">
  <h3>Stats</h3>
  <label>Health</label>
  <input type="number" id="powerHealth" value="80">
  <label>Armor</label>
  <input type="number" id="powerArmor" value="0">
  <h3>Build Requirements</h3>
  <label>Requirements</label>
  <input type="text" id="powerRequirements" value="copper/10,lead/10">

  <h3>Rendering & Effects</h3>
  <label>Drawer</label>
  <select id="powerDrawer">
    <option value="DrawDefault">Default (basic block)</option>
    <option value="DrawRegion">Region (plain texture)</option>
    <option value="DrawGlowRegion">Glow Region (emissive glow)</option>
    <option value="DrawMulti">Multi (layered)</option>
    <option value="DrawPower">Power (uses power lines)</option>
    <option value="DrawPowerGraph">Power Graph</option>
    <option value="DrawBattery">Battery (shows charge bar)</option>
    <option value="DrawNode">Node (shows connections)</option>
  </select>
  <label>Glow Color (8 hex, optional)</label>
  <input type="text" id="powerGlowColor" placeholder="e.g. ff8800ff">
  <label>Active Effect</label>
  <input type="text" id="powerActiveEffect" placeholder="e.g. smeltsmoke, hitLaser, none">
  <label>Ambient Sound</label>
  <input type="text" id="powerAmbientSound" placeholder="e.g. loopHum, machine">
  <label>Ambient Volume (0-1)</label>
  <input type="number" id="powerAmbientVolume" value="0.5" step="0.1">

  <h3>Visibility</h3>
  <label>Shown in build menu?</label>
  <select id="powerBuildable">
    <option value="true" selected>Yes (true)</option>
    <option value="false">No (false)</option>
  </select>
  <label>Always unlocked?</label>
  <select id="powerAlwaysUnlocked">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <label>Hidden from UI?</label>
  <select id="powerHidden">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <div id="powerResearchBlock">
    <h3>Research</h3>
    <label>Parent Block</label>
    <input type="text" id="powerResearchParent" placeholder="e.g. duo, graphite-press">
    <label>Research Requirements</label>
    <input type="text" id="powerResearchRequirements" placeholder="e.g. lead/10000, coal/3000">
  </div>
  <div id="powerConsumesBlock">
    <h3>Consumes</h3>
    <label>Consumes Items</label>
    <input type="text" id="powerConsumesItems" placeholder="e.g. coal/1, sand/1">
    <label>Consumes Liquids</label>
    <input type="text" id="powerConsumesLiquids" placeholder="e.g. water/0.1">
    <label>Consumes Power</label>
    <input type="number" id="powerConsumesPower" value="0" step="0.1">
  </div>
  <h3>Power Properties</h3>
  <div id="powerProp-solar" class="power-prop">
    <label>Power Production (per second)</label>
    <input type="number" id="powerProduction" value="7.2" step="0.1">
  </div>
  <div id="powerProp-thermal" class="power-prop" style="display:none">
    <label>Power Production (per second)</label>
    <input type="number" id="powerThermalProduction" value="108" step="0.1">
    <label>Min Efficiency</label>
    <input type="number" id="powerMinEfficiency" value="0" step="0.1">
  </div>
  <div id="powerProp-consume" class="power-prop" style="display:none">
    <label>Power Production (per second)</label>
    <input type="number" id="powerConsumeProduction" value="60" step="0.1">
    <label>Item Duration (ticks)</label>
    <input type="number" id="powerItemDuration" value="120">
    <label>Consumes Type</label>
    <select id="powerConsumeType">
      <option value="flammable">Flammable items</option>
      <option value="explosive">Explosive items</option>
      <option value="radioactive">Radioactive items</option>
      <option value="charged">Charged items</option>
    </select>
  </div>
  <div id="powerProp-node" class="power-prop" style="display:none">
    <label>Laser Range (tiles)</label>
    <input type="number" id="powerLaserRange" value="6" step="0.5">
    <label>Max Connections</label>
    <input type="number" id="powerMaxNodes" value="10">
    <label>Laser Color</label>
    <input type="text" id="powerLaserColor" value="98ffa9ff">
  </div>
  <div id="powerProp-battery" class="power-prop" style="display:none">
    <label>Power Capacity</label>
    <input type="number" id="powerCapacity" value="4000">
    <label>Empty Light Color</label>
    <input type="text" id="powerEmptyColor" value="404040ff">
    <label>Full Light Color</label>
    <input type="text" id="powerFullColor" value="f8d174ff">
  </div>
  <h3>Sprite</h3>
  <label>Sprite</label>
  <select id="powerSpriteChoice">
    <option value="random">Generate one for me</option>
    <option value="upload">Upload my own</option>
  </select>
  <input type="file" id="powerSpriteFile" accept="image/png" style="display:none">
</div>
`);

(function() {
  function updatePowerFields() {
    var kind = document.getElementById("powerKind").value;
    ["solar","thermal","consume","node","battery"].forEach(function(k) {
      var el = document.getElementById("powerProp-" + k);
      if (el) el.style.display = (k === kind) ? "block" : "none";
    });
    var cb = document.getElementById("powerConsumesBlock");
    if (kind === "consume") cb.style.display = "block";
    else { cb.style.display = "none"; }
  }
  function updateResearchVisibility() {
    var always = document.getElementById("powerAlwaysUnlocked").value;
    var block = document.getElementById("powerResearchBlock");
    if (always === "true") {
      block.style.display = "none";
      document.getElementById("powerResearchParent").value = "";
      document.getElementById("powerResearchRequirements").value = "";
    } else block.style.display = "block";
  }
  function parseColor(hex) {
    if (!hex || hex.length < 6) return { r: 128, g: 128, b: 128 };
    return { r: parseInt(hex.substr(0,2),16)||128, g: parseInt(hex.substr(2,2),16)||128, b: parseInt(hex.substr(4,2),16)||128 };
  }
  function getGlow() { return document.getElementById("powerGlowColor").value.trim(); }
  function drawPowerTexture(ctx, x, y, w, h, color, kind, time) {
    var c = parseColor(color);
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
    ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1;
    ctx.strokeRect(x + 3, y + 3, w - 6, h - 6);
    ctx.save(); ctx.translate(x + w / 2, y + h / 2);
    var t = time || 0;
    if (kind === "solar") {
      var rot = t * 0.0008;
      ctx.fillStyle = 'rgba(255,230,120,0.95)';
      ctx.beginPath(); ctx.arc(0, 0, w * 0.18, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(255,230,120,0.7)'; ctx.lineWidth = Math.max(1, w / 40);
      for (var a = 0; a < 8; a++) {
        var ang = a * Math.PI / 4 + rot;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang) * w * 0.24, Math.sin(ang) * w * 0.24);
        ctx.lineTo(Math.cos(ang) * w * 0.32, Math.sin(ang) * w * 0.32);
        ctx.stroke();
      }
    } else if (kind === "thermal" || kind === "consume") {
      var flick = 1 + Math.sin(t * 0.015) * 0.12 + Math.sin(t * 0.031) * 0.06;
      ctx.save(); ctx.scale(flick, flick);
      ctx.fillStyle = 'rgba(255,120,40,0.95)';
      ctx.beginPath();
      ctx.moveTo(0, -w * 0.22);
      ctx.quadraticCurveTo(w * 0.2, 0, 0, w * 0.22);
      ctx.quadraticCurveTo(-w * 0.2, 0, 0, -w * 0.22);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,220,80,0.9)';
      ctx.beginPath();
      ctx.moveTo(0, -w * 0.12);
      ctx.quadraticCurveTo(w * 0.1, 0, 0, w * 0.12);
      ctx.quadraticCurveTo(-w * 0.1, 0, 0, -w * 0.12);
      ctx.fill();
      ctx.restore();
    } else if (kind === "node") {
      var pulse2 = 1 + Math.sin(t * 0.006) * 0.12;
      ctx.save(); ctx.scale(pulse2, pulse2);
      ctx.fillStyle = 'rgba(255,230,120,0.95)';
      ctx.beginPath();
      ctx.moveTo(-w * 0.05, -w * 0.22);
      ctx.lineTo(w * 0.08, -w * 0.02);
      ctx.lineTo(-w * 0.02, -w * 0.02);
      ctx.lineTo(w * 0.05, w * 0.22);
      ctx.lineTo(-w * 0.08, 0);
      ctx.lineTo(w * 0.02, 0);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    } else if (kind === "battery") {
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fillRect(-w * 0.15, -w * 0.2, w * 0.3, w * 0.4);
      var fillPct = ((Math.sin(t * 0.002) + 1) / 2);
      var barW = w * 0.24, barH = w * 0.32, barX = -w * 0.12, barY = -w * 0.16;
      ctx.fillStyle = 'rgba(40,40,50,0.6)';
      ctx.fillRect(barX, barY, barW, barH);
      ctx.fillStyle = 'rgba(120,255,120,0.95)';
      ctx.fillRect(barX, barY + barH * (1 - fillPct), barW, barH * fillPct);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fillRect(-w * 0.05, -w * 0.24, w * 0.1, w * 0.05);
    }
    ctx.restore();
  }
  function drawPowerSprite(time) {
    var canvas = document.getElementById("powerSpriteCanvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    var size = parseInt(document.getElementById("powerSize").value) || 1;
    if (size < 1) size = 1; if (size > 16) size = 16;
    var targetSize = size * 32;
    var choice = document.getElementById("powerSpriteChoice").value;
    var kind = document.getElementById("powerKind").value;
    if (choice === "upload") {
      var file = document.getElementById("powerSpriteFile").files[0];
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
      drawPowerTexture(offCtx2, 0, 0, targetSize, targetSize, document.getElementById("powerColor").value, kind, time);
      ctx.imageSmoothingEnabled = false; ctx.drawImage(off2, 0, 0, W, H);
    }
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "10px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(targetSize + "×" + targetSize + " px", W / 2, H - 6);
  }
  function drawPowerInfo() {
    var info = document.getElementById("powerInfoPreview");
    if (!info) return;
    var kind = document.getElementById("powerKind").value;
    var html = "";
    if (kind === "solar") html = "☀️ Solar<br><b>" + (parseFloat(document.getElementById("powerProduction").value) || 0) + "</b> / sec";
    else if (kind === "thermal") html = "🔥 Thermal<br><b>" + (parseFloat(document.getElementById("powerThermalProduction").value) || 0) + "</b> / sec";
    else if (kind === "consume") html = "⚡ Consume<br><b>" + (parseFloat(document.getElementById("powerConsumeProduction").value) || 0) + "</b> / sec";
    else if (kind === "node") html = "🔗 Node<br>Range: <b>" + (parseFloat(document.getElementById("powerLaserRange").value) || 0) + "</b><br>Links: <b>" + (parseInt(document.getElementById("powerMaxNodes").value) || 0) + "</b>";
    else if (kind === "battery") html = "🔋 Battery<br>Capacity: <b>" + (parseInt(document.getElementById("powerCapacity").value) || 0) + "</b>";
    info.innerHTML = html;
  }
  function drawPowerEffects() {
    var container = document.getElementById("powerEffectsPreview");
    if (!container) return;
    var html = "";
    var health = parseInt(document.getElementById("powerHealth").value) || 0;
    var armor = parseInt(document.getElementById("powerArmor").value) || 0;
    var size = parseInt(document.getElementById("powerSize").value) || 1;
    var always = document.getElementById("powerAlwaysUnlocked").value;
    var hidden = document.getElementById("powerHidden").value;
    var drawer = document.getElementById("powerDrawer").value;
    var glow = getGlow();
    var sound = document.getElementById("powerAmbientSound").value.trim();
    var effect = document.getElementById("powerActiveEffect").value.trim();
    html += '<span class="badge">❤️ ' + health + ' HP</span>';
    if (armor > 0) html += '<span class="badge">🛡️ ' + armor + '</span>';
    html += '<span class="badge">📐 ' + size + 'x' + size + '</span>';
    if (always === "true") html += '<span class="badge badge-shield">✅ Always</span>';
    if (hidden === "true") html += '<span class="badge">👁</span>';
    if (drawer && drawer !== "DrawDefault") html += '<span class="badge">🎨 ' + drawer.replace("Draw","") + '</span>';
    if (glow) html += '<span class="badge badge-glow">✨ glow</span>';
    if (sound) html += '<span class="badge">🔊 ' + sound + '</span>';
    if (effect) html += '<span class="badge">💫 ' + effect + '</span>';
    container.innerHTML = html;
  }
  function updatePowerPreview(time) { drawPowerSprite(time); drawPowerInfo(); drawPowerEffects(); }
  document.getElementById("powerKind").addEventListener("change", function() { updatePowerFields(); updatePowerPreview(); });
  document.getElementById("powerAlwaysUnlocked").addEventListener("change", function() { updateResearchVisibility(); updatePowerPreview(); });
  document.getElementById("powerHidden").addEventListener("change", updatePowerPreview);
  document.getElementById("powerDrawer").addEventListener("change", updatePowerPreview);
  ["powerColor","powerSize","powerHealth","powerArmor","powerProduction","powerThermalProduction","powerMinEfficiency","powerConsumeProduction","powerItemDuration","powerLaserRange","powerMaxNodes","powerLaserColor","powerCapacity","powerEmptyColor","powerFullColor","powerGlowColor","powerActiveEffect","powerAmbientSound","powerAmbientVolume"].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("input", updatePowerPreview);
  });
  var choice = document.getElementById("powerSpriteChoice");
  if (choice) choice.addEventListener("change", updatePowerPreview);
  var file = document.getElementById("powerSpriteFile");
  if (file) file.addEventListener("change", updatePowerPreview);
  function animate(time) {
    var sec = document.getElementById("section-power");
    if (sec && sec.classList.contains("active")) updatePowerPreview(time);
    requestAnimationFrame(animate);
  }
  updatePowerFields(); updateResearchVisibility(); updatePowerPreview();
  requestAnimationFrame(animate);
})();