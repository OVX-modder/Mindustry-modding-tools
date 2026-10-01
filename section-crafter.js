document.getElementById('main').insertAdjacentHTML('beforeend', `
<div id="section-crafter" class="section">
  <h2>Add Crafter</h2>
  <div class="preview-panel">
    <div class="preview-title">Live Preview</div>
    <div class="preview-row">
      <div class="preview-box">
        <div class="preview-label">Block</div>
        <canvas id="crafterSpriteCanvas" width="130" height="130" style="width:100%;max-width:130px;height:130px;display:block;margin:0 auto;border-radius:6px;background:rgba(0,0,0,0.3);image-rendering:pixelated;border:1px solid rgba(255,255,255,0.08);"></canvas>
      </div>
      <div class="preview-box">
        <div class="preview-label">Recipe</div>
        <div id="crafterInfoPreview" style="text-align:center;padding-top:14px;font-size:12px;color:rgba(214,216,221,0.7);line-height:1.8;"></div>
      </div>
    </div>
    <div class="preview-effects" id="crafterEffectsPreview"></div>
  </div>
  <h3>Basic Info</h3>
  <label>Internal Name</label>
  <input type="text" id="crafterName" placeholder="my-crafter">
  <label>Display Name</label>
  <input type="text" id="crafterDisplayName" placeholder="My Crafter">
  <label>Description</label>
  <textarea id="crafterDescription" placeholder="A custom crafter..."></textarea>
  <h3>Visuals</h3>
  <label>Color</label>
  <input type="text" id="crafterColor" value="5a7a9aff">
  <label>Size (tiles)</label>
  <input type="number" id="crafterSize" value="2" min="1" max="16">
  <h3>Stats</h3>
  <label>Health</label>
  <input type="number" id="crafterHealth" value="160">
  <label>Armor</label>
  <input type="number" id="crafterArmor" value="0">
  <label>Category</label>
  <input type="text" id="crafterCategory" value="crafting">
  <h3>Crafting</h3>
  <label>Craft Time (ticks, 60 = 1 second)</label>
  <input type="number" id="crafterCraftTime" value="60">
  <label>Output Item 1</label>
  <input type="text" id="crafterOutputItem1" value="silicon" placeholder="e.g. silicon, metaglass">
  <label>Output Amount 1</label>
  <input type="number" id="crafterOutputAmount1" value="1">
  <label>Output Item 2 (optional)</label>
  <input type="text" id="crafterOutputItem2" placeholder="e.g. graphite">
  <div id="crafterOutput2Fields" style="display:none">
    <label>Output Amount 2</label>
    <input type="number" id="crafterOutputAmount2" value="1">
  </div>
  <label>Output Liquid (optional)</label>
  <input type="text" id="crafterOutputLiquid" placeholder="e.g. oil, slag">
  <label>Output Liquid Amount</label>
  <input type="number" id="crafterOutputLiquidAmount" value="0" step="0.1">
  <h3>Consumes</h3>
  <label>Consumes Items</label>
  <input type="text" id="crafterConsumesItems" placeholder="e.g. sand/1, coal/1">
  <label>Consumes Liquids</label>
  <input type="text" id="crafterConsumesLiquids" placeholder="e.g. water/0.1">
  <label>Consumes Power (per second)</label>
  <input type="number" id="crafterConsumesPower" value="0" step="0.1">
  <h3>Build Requirements</h3>
  <label>Requirements</label>
  <input type="text" id="crafterRequirements" value="copper/30,lead/20">

  <h3>Rendering & Effects</h3>
  <label>Drawer</label>
  <select id="crafterDrawer">
    <option value="DrawCrafter">Crafter (spinning gear)</option>
    <option value="DrawDefault">Default (basic block)</option>
    <option value="DrawRegion">Region (plain texture)</option>
    <option value="DrawGlowRegion">Glow Region (emissive)</option>
    <option value="DrawMulti">Multi (layered)</option>
    <option value="DrawCrucible">Crucible (heat glow)</option>
    <option value="DrawSmelter">Smelter (fire animation)</option>
  </select>
  <label>Glow Color (8 hex, optional)</label>
  <input type="text" id="crafterGlowColor" placeholder="e.g. ff8800ff">
  <label>Active Effect</label>
  <input type="text" id="crafterActiveEffect" placeholder="e.g. smeltsmoke, craftSmoke, none">
  <label>Ambient Sound</label>
  <input type="text" id="crafterAmbientSound" placeholder="e.g. loopSmelter, machine">
  <label>Ambient Volume (0-1)</label>
  <input type="number" id="crafterAmbientVolume" value="0.5" step="0.1">

  <h3>Visibility</h3>
  <label>Shown in build menu?</label>
  <select id="crafterBuildable">
    <option value="true" selected>Yes (true)</option>
    <option value="false">No (false)</option>
  </select>
  <label>Always unlocked?</label>
  <select id="crafterAlwaysUnlocked">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <label>Hidden from UI?</label>
  <select id="crafterHidden">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <div id="crafterResearchBlock">
    <h3>Research</h3>
    <label>Parent Block</label>
    <input type="text" id="crafterResearchParent" placeholder="e.g. graphite-press">
    <label>Research Requirements</label>
    <input type="text" id="crafterResearchRequirements" placeholder="e.g. copper/5000, lead/3000">
  </div>
  <h3>Sprite</h3>
  <label>Sprite</label>
  <select id="crafterSpriteChoice">
    <option value="random">Generate one for me</option>
    <option value="upload">Upload my own</option>
  </select>
  <input type="file" id="crafterSpriteFile" accept="image/png" style="display:none">
</div>
`);

(function() {
  function updateResearchVisibility() {
    var always = document.getElementById("crafterAlwaysUnlocked").value;
    var block = document.getElementById("crafterResearchBlock");
    if (always === "true") {
      block.style.display = "none";
      document.getElementById("crafterResearchParent").value = "";
      document.getElementById("crafterResearchRequirements").value = "";
    } else block.style.display = "block";
  }
  function parseColor(hex) {
    if (!hex || hex.length < 6) return { r: 90, g: 120, b: 150 };
    return { r: parseInt(hex.substr(0,2),16)||90, g: parseInt(hex.substr(2,2),16)||120, b: parseInt(hex.substr(4,2),16)||150 };
  }
  function getGlow() { return document.getElementById("crafterGlowColor").value.trim(); }
  function drawCrafterTexture(ctx, x, y, w, h, color, time) {
    var c = parseColor(color);
    var cx = x + w / 2, cy = y + h / 2;
    var t = time || 0;
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
      var gp = 0.4 + (Math.sin(t * 0.003) + 1) * 0.3;
      ctx.strokeStyle = 'rgba(' + gc.r + ',' + gc.g + ',' + gc.b + ',' + gp + ')';
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1;
    ctx.strokeRect(x + 3, y + 3, w - 6, h - 6);
    var innerR = w * 0.30;
    ctx.fillStyle = 'rgba(30,30,40,0.7)';
    ctx.beginPath(); ctx.arc(cx, cy, innerR, 0, Math.PI * 2); ctx.fill();
    var heatPulse = (Math.sin(t * 0.004) + 1) / 2;
    var heatGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, innerR);
    heatGrad.addColorStop(0, 'rgba(255,200,80,' + (0.7 + heatPulse * 0.3) + ')');
    heatGrad.addColorStop(0.5, 'rgba(255,120,40,' + (0.3 + heatPulse * 0.2) + ')');
    heatGrad.addColorStop(1, 'rgba(255,80,20,0)');
    ctx.fillStyle = heatGrad;
    ctx.beginPath(); ctx.arc(cx, cy, innerR, 0, Math.PI * 2); ctx.fill();
    var rotation = t * 0.0009;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(rotation);
    var teeth = 8, ringR = innerR + w * 0.08, toothL = w * 0.05;
    ctx.fillStyle = 'rgba(180,180,190,0.9)';
    for (var i = 0; i < teeth; i++) {
      var a = (i / teeth) * Math.PI * 2;
      ctx.save(); ctx.rotate(a);
      ctx.fillRect(-toothL / 2, -ringR - toothL, toothL, toothL);
      ctx.restore();
    }
    ctx.strokeStyle = 'rgba(200,200,210,0.85)';
    ctx.lineWidth = Math.max(2, w / 30);
    ctx.beginPath(); ctx.arc(0, 0, ringR, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
    var spark = (t % 1.0) / 1.0;
    if (spark < 0.3) {
      var sparkAmt = 1 - spark / 0.3;
      ctx.fillStyle = 'rgba(255,240,180,' + sparkAmt + ')';
      ctx.beginPath(); ctx.arc(cx, cy, w * 0.06 * sparkAmt, 0, Math.PI * 2); ctx.fill();
    }
  }
  function drawCrafterSprite(time) {
    var canvas = document.getElementById("crafterSpriteCanvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    var size = parseInt(document.getElementById("crafterSize").value) || 1;
    if (size < 1) size = 1; if (size > 16) size = 16;
    var targetSize = size * 32;
    var choice = document.getElementById("crafterSpriteChoice").value;
    if (choice === "upload") {
      var file = document.getElementById("crafterSpriteFile").files[0];
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
      drawCrafterTexture(offCtx2, 0, 0, targetSize, targetSize, document.getElementById("crafterColor").value, time);
      ctx.imageSmoothingEnabled = false; ctx.drawImage(off2, 0, 0, W, H);
    }
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "10px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(targetSize + "×" + targetSize + " px", W / 2, H - 6);
  }
  function drawCrafterInfo() {
    var info = document.getElementById("crafterInfoPreview");
    if (!info) return;
    var craftTime = parseFloat(document.getElementById("crafterCraftTime").value) || 1;
    var out1 = document.getElementById("crafterOutputItem1").value.trim();
    var out1Amt = parseInt(document.getElementById("crafterOutputAmount1").value) || 1;
    var out2 = document.getElementById("crafterOutputItem2").value.trim();
    var inItems = document.getElementById("crafterConsumesItems").value.trim();
    var perSec = (60 / craftTime).toFixed(2);
    var html = "⏱️ " + craftTime + " ticks<br>⚙️ " + perSec + " crafts/sec<br>";
    if (out1) html += "→ " + out1 + " x" + out1Amt + "<br>";
    if (out2) html += "→ " + out2 + "<br>";
    if (inItems) html += "<span style='font-size:10px;color:rgba(214,216,221,0.5)'>in: " + inItems + "</span>";
    info.innerHTML = html;
  }
  function drawCrafterEffects() {
    var container = document.getElementById("crafterEffectsPreview");
    if (!container) return;
    var html = "";
    var health = parseInt(document.getElementById("crafterHealth").value) || 0;
    var armor = parseInt(document.getElementById("crafterArmor").value) || 0;
    var size = parseInt(document.getElementById("crafterSize").value) || 1;
    var power = parseFloat(document.getElementById("crafterConsumesPower").value) || 0;
    var inItems = document.getElementById("crafterConsumesItems").value.trim();
    var inLiquids = document.getElementById("crafterConsumesLiquids").value.trim();
    var outLiquid = document.getElementById("crafterOutputLiquid").value.trim();
    var drawer = document.getElementById("crafterDrawer").value;
    var glow = getGlow();
    var sound = document.getElementById("crafterAmbientSound").value.trim();
    var effect = document.getElementById("crafterActiveEffect").value.trim();
    html += '<span class="badge">❤️ ' + health + ' HP</span>';
    if (armor > 0) html += '<span class="badge">🛡️ ' + armor + '</span>';
    html += '<span class="badge">📐 ' + size + 'x' + size + '</span>';
    if (inItems) html += '<span class="badge">📥 items</span>';
    if (inLiquids) html += '<span class="badge">💧 in</span>';
    if (outLiquid) html += '<span class="badge badge-shield">💧 out</span>';
    if (power > 0) html += '<span class="badge badge-glow">⚡ ' + power + '/s</span>';
    if (drawer && drawer !== "DrawCrafter") html += '<span class="badge">🎨 ' + drawer.replace("Draw","") + '</span>';
    if (glow) html += '<span class="badge badge-glow">✨ glow</span>';
    if (sound) html += '<span class="badge">🔊 ' + sound + '</span>';
    if (effect) html += '<span class="badge">💫 ' + effect + '</span>';
    container.innerHTML = html;
  }
  function updateCrafterPreview(time) { drawCrafterSprite(time); drawCrafterInfo(); drawCrafterEffects(); }
  document.getElementById("crafterAlwaysUnlocked").addEventListener("change", function() { updateResearchVisibility(); updateCrafterPreview(); });
  document.getElementById("crafterDrawer").addEventListener("change", updateCrafterPreview);
  ["crafterColor","crafterSize","crafterHealth","crafterArmor","crafterCraftTime","crafterOutputAmount1","crafterConsumesPower","crafterGlowColor","crafterActiveEffect","crafterAmbientSound","crafterAmbientVolume"].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("input", updateCrafterPreview);
  });
  ["crafterOutputItem1","crafterOutputItem2","crafterOutputLiquid","crafterConsumesItems","crafterConsumesLiquids"].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("input", updateCrafterPreview);
  });
  document.getElementById("crafterOutputItem2").addEventListener("input", function() {
    document.getElementById("crafterOutput2Fields").style.display = (this.value.trim()) ? "block" : "none";
  });
  var choice = document.getElementById("crafterSpriteChoice");
  if (choice) choice.addEventListener("change", updateCrafterPreview);
  var file = document.getElementById("crafterSpriteFile");
  if (file) file.addEventListener("change", updateCrafterPreview);
  function animate(time) {
    var sec = document.getElementById("section-crafter");
    if (sec && sec.classList.contains("active")) updateCrafterPreview(time);
    requestAnimationFrame(animate);
  }
  updateResearchVisibility(); updateCrafterPreview();
  requestAnimationFrame(animate);
})();