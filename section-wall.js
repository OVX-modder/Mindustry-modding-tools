document.getElementById('main').insertAdjacentHTML('beforeend', `
<div id="section-wall" class="section">
  <h2>Add Wall</h2>
  <div class="preview-panel">
    <div class="preview-title">Live Preview</div>
    <div class="preview-row">
      <div class="preview-box">
        <div class="preview-label">Footprint</div>
        <canvas id="wallSizeCanvas" width="140" height="140"></canvas>
      </div>
      <div class="preview-box">
        <div class="preview-label">Sprite</div>
        <canvas id="wallSpriteCanvas" width="130" height="130" style="width:100%;max-width:130px;height:130px;display:block;margin:0 auto;border-radius:6px;background:rgba(0,0,0,0.3);image-rendering:pixelated;border:1px solid rgba(255,255,255,0.08);"></canvas>
      </div>
    </div>
    <div class="preview-effects" id="wallEffectsPreview"></div>
  </div>

  <h3>Basic Info</h3>
  <label>Internal Name</label>
  <input type="text" id="wallName" placeholder="my-wall">
  <label>Display Name</label>
  <input type="text" id="wallDisplayName" placeholder="My Wall">
  <label>Description</label>
  <textarea id="wallDescription" placeholder="A strong defensive wall..."></textarea>
  <h3>Visuals</h3>
  <label>Color</label>
  <input type="text" id="wallColor" value="888888ff">
  <label>Size (tiles)</label>
  <input type="number" id="wallSize" value="1" min="1" max="16">
  <h3>Stats</h3>
  <label>Health</label>
  <input type="number" id="wallHealth" value="200">
  <label>Armor</label>
  <input type="number" id="wallArmor" value="0">
  <label>Category</label>
  <input type="text" id="wallCategory" value="defense">
  <h3>Build Requirements</h3>
  <label>Requirements</label>
  <input type="text" id="wallRequirements" value="copper/6">
  <h3>Special Abilities</h3>
  <label>Lightning Chance</label>
  <input type="number" id="wallLightningChance" value="0" step="0.01">
  <label>Lightning Damage</label>
  <input type="number" id="wallLightningDamage" value="0">
  <label>Lightning Color</label>
  <input type="text" id="wallLightningColor" value="a9d8ffff">
  <label>Shield Health</label>
  <input type="number" id="wallShieldHealth" value="0">

  <h3>Rendering & Effects</h3>
  <label>Drawer</label>
  <select id="wallDrawer">
    <option value="DrawDefault">Default (basic block)</option>
    <option value="DrawRegion">Region (plain texture)</option>
    <option value="DrawGlowRegion">Glow Region (emissive glow)</option>
    <option value="DrawMulti">Multi (layered drawers)</option>
    <option value="DrawTurret">Turret (rotating head)</option>
    <option value="DrawCrafter">Crafter (spinning gear)</option>
    <option value="DrawDrill">Drill (spinning bit)</option>
    <option value="DrawPump">Pump (liquid intake)</option>
    <option value="DrawBridge">Bridge (extending arm)</option>
  </select>
  <label>Glow Color (8 hex, optional)</label>
  <input type="text" id="wallGlowColor" placeholder="e.g. ff8800ff">
  <label>Active Effect</label>
  <input type="text" id="wallActiveEffect" placeholder="e.g. smeltsmoke, hitLaser, none">
  <label>Ambient Sound</label>
  <input type="text" id="wallAmbientSound" placeholder="e.g. loopHum, machine">
  <label>Ambient Volume (0-1)</label>
  <input type="number" id="wallAmbientVolume" value="0.5" step="0.1">
  <label>Invisible?</label>
  <select id="wallInvisible">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>

  <h3>Visibility</h3>
  <label>Shown in build menu?</label>
  <select id="wallBuildable">
    <option value="true" selected>Yes (true)</option>
    <option value="false">No (false)</option>
  </select>
  <label>Always unlocked?</label>
  <select id="wallAlwaysUnlocked">
    <option value="true" selected>Yes (true)</option>
    <option value="false">No (false)</option>
  </select>
  <label>Hidden from UI?</label>
  <select id="wallHidden">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <h3>Sprite</h3>
  <label>Sprite</label>
  <select id="wallSpriteChoice">
    <option value="random">Generate one for me</option>
    <option value="upload">Upload my own</option>
  </select>
  <input type="file" id="wallSpriteFile" accept="image/png" style="display:none">
</div>
`);

(function() {
  function parseColor(hex) {
    if (!hex || hex.length < 6) return { r: 128, g: 128, b: 128 };
    return { r: parseInt(hex.substr(0,2),16)||128, g: parseInt(hex.substr(2,2),16)||128, b: parseInt(hex.substr(4,2),16)||128 };
  }
  function drawWallTexture(ctx, x, y, w, h, color, time, glowColor) {
    var c = parseColor(color);
    ctx.fillStyle = 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')';
    ctx.fillRect(x, y, w, h);
    var grad = ctx.createLinearGradient(x, y, x + w, y + h);
    grad.addColorStop(0, 'rgba(255,255,255,0.2)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.05)');
    grad.addColorStop(1, 'rgba(0,0,0,0.3)');
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, w, h);
    if (time !== undefined) {
      var phase = (time * 0.0005) % 1;
      var sweepX = x + phase * (w + w * 0.6) - w * 0.3;
      var grad2 = ctx.createLinearGradient(sweepX - w * 0.25, y, sweepX + w * 0.25, y + h);
      grad2.addColorStop(0, 'rgba(255,255,255,0)');
      grad2.addColorStop(0.5, 'rgba(255,255,255,0.18)');
      grad2.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(x, y, w, h);
    }
    if (glowColor) {
      var gc = parseColor(glowColor);
      var pulse = 0.4 + (Math.sin((time || 0) * 0.003) + 1) * 0.3;
      ctx.strokeStyle = 'rgba(' + gc.r + ',' + gc.g + ',' + gc.b + ',' + pulse + ')';
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1;
    ctx.strokeRect(x + 3, y + 3, w - 6, h - 6);
    ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = Math.max(2, w / 14);
    ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
    var bolt = Math.max(2, w / 16);
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(x + 5, y + 5, bolt, bolt);
    ctx.fillRect(x + w - 5 - bolt, y + 5, bolt, bolt);
    ctx.fillRect(x + 5, y + h - 5 - bolt, bolt, bolt);
    ctx.fillRect(x + w - 5 - bolt, y + h - 5 - bolt, bolt, bolt);
  }
  function getGlow() { return document.getElementById("wallGlowColor").value.trim(); }
  function drawWallSize(time) {
    var canvas = document.getElementById("wallSizeCanvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    var size = parseInt(document.getElementById("wallSize").value) || 1;
    if (size < 1) size = 1; if (size > 16) size = 16;
    var gridCells = Math.max(size, 5); if (gridCells > 8) gridCells = 8;
    var cell = W / gridCells;
    ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 1;
    for (var g = 0; g <= gridCells; g++) {
      ctx.beginPath(); ctx.moveTo(g * cell, 0); ctx.lineTo(g * cell, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, g * cell); ctx.lineTo(W, g * cell); ctx.stroke();
    }
    var drawnSize = Math.min(size, gridCells);
    var offset = (gridCells - drawnSize) / 2;
    drawWallTexture(ctx, offset*cell, offset*cell, drawnSize*cell, drawnSize*cell, document.getElementById("wallColor").value, time, getGlow());
    ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(size + "x" + size, W / 2, H - 8);
  }
  function drawWallSprite(time) {
    var canvas = document.getElementById("wallSpriteCanvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    var choice = document.getElementById("wallSpriteChoice").value;
    var wallSize = parseInt(document.getElementById("wallSize").value) || 1;
    if (wallSize < 1) wallSize = 1; if (wallSize > 16) wallSize = 16;
    var targetSize = wallSize * 32;
    var invisible = document.getElementById("wallInvisible").value === "true";
    if (invisible) {
      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.setLineDash([6, 6]);
      ctx.strokeRect(4, 4, W - 8, H - 8);
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(214,216,221,0.4)"; ctx.font = "12px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("(invisible)", W / 2, H / 2 + 4);
      return;
    }
    if (choice === "upload") {
      var file = document.getElementById("wallSpriteFile").files[0];
      if (file) {
        var url = URL.createObjectURL(file);
        var img = new Image();
        img.onload = function() {
          var off = document.createElement("canvas");
          off.width = targetSize; off.height = targetSize;
          var offCtx = off.getContext("2d"); offCtx.imageSmoothingEnabled = false;
          offCtx.drawImage(img, 0, 0, targetSize, targetSize);
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(off, 0, 0, W, H);
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
      drawWallTexture(offCtx2, 0, 0, targetSize, targetSize, document.getElementById("wallColor").value, time, getGlow());
      ctx.imageSmoothingEnabled = false; ctx.drawImage(off2, 0, 0, W, H);
    }
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "10px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(targetSize + "×" + targetSize + " px", W / 2, H - 6);
  }
  function drawWallEffects() {
    var container = document.getElementById("wallEffectsPreview");
    if (!container) return;
    var html = "";
    var health = parseInt(document.getElementById("wallHealth").value) || 0;
    var armor = parseInt(document.getElementById("wallArmor").value) || 0;
    var size = parseInt(document.getElementById("wallSize").value) || 1;
    var shield = parseInt(document.getElementById("wallShieldHealth").value) || 0;
    var drawer = document.getElementById("wallDrawer").value;
    var glow = getGlow();
    var sound = document.getElementById("wallAmbientSound").value.trim();
    var effect = document.getElementById("wallActiveEffect").value.trim();

    html += '<span class="badge">❤️ ' + health + ' HP</span>';
    if (armor > 0) html += '<span class="badge">🛡️ ' + armor + '</span>';
    html += '<span class="badge">📐 ' + size + 'x' + size + '</span>';
    if (shield > 0) html += '<span class="badge badge-shield">🔵 ' + shield + '</span>';
    if (drawer && drawer !== "DrawDefault") html += '<span class="badge">🎨 ' + drawer.replace("Draw","") + '</span>';
    if (glow) html += '<span class="badge badge-glow">✨ glow</span>';
    if (sound) html += '<span class="badge">🔊 ' + sound + '</span>';
    if (effect) html += '<span class="badge">💫 ' + effect + '</span>';
    if (document.getElementById("wallInvisible").value === "true") html += '<span class="badge">👻 invisible</span>';
    container.innerHTML = html;
  }
  function updateWallPreview(time) { drawWallSize(time); drawWallSprite(time); drawWallEffects(); }
  ["wallColor","wallSize","wallHealth","wallArmor","wallLightningChance","wallLightningDamage","wallShieldHealth","wallGlowColor","wallActiveEffect","wallAmbientSound","wallAmbientVolume"].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("input", updateWallPreview);
  });
  ["wallDrawer","wallInvisible","wallSpriteChoice"].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("change", updateWallPreview);
  });
  var file = document.getElementById("wallSpriteFile");
  if (file) file.addEventListener("change", updateWallPreview);
  function animate(time) {
    var sec = document.getElementById("section-wall");
    if (sec && sec.classList.contains("active")) updateWallPreview(time);
    requestAnimationFrame(animate);
  }
  updateWallPreview();
  requestAnimationFrame(animate);
})();