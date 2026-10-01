document.getElementById('main').insertAdjacentHTML('beforeend', `
<div id="section-turret" class="section">
  <h2>Add Turret</h2>
  <label>Turret Type</label>
  <select id="turretKind">
    <option value="item">Item Turret</option>
    <option value="power">Power Turret</option>
    <option value="laser">Laser Turret</option>
  </select>
  <div class="preview-panel">
    <div class="preview-title">Live Preview</div>
    <div class="preview-row">
      <div class="preview-box">
        <div class="preview-label">Turret</div>
        <canvas id="turretSpriteCanvas" width="130" height="130" style="width:100%;max-width:130px;height:130px;display:block;margin:0 auto;border-radius:6px;background:rgba(0,0,0,0.3);image-rendering:pixelated;border:1px solid rgba(255,255,255,0.08);"></canvas>
      </div>
      <div class="preview-box">
        <div class="preview-label">Stats</div>
        <div id="turretInfoPreview" style="text-align:center;padding-top:14px;font-size:12px;color:rgba(214,216,221,0.7);line-height:1.8;"></div>
      </div>
    </div>
    <div class="preview-effects" id="turretEffectsPreview"></div>
  </div>
  <h3>Basic Info</h3>
  <label>Internal Name</label>
  <input type="text" id="turretName" placeholder="my-turret">
  <label>Display Name</label>
  <input type="text" id="turretDisplayName" placeholder="My Turret">
  <label>Description</label>
  <textarea id="turretDescription" placeholder="A custom turret..."></textarea>
  <h3>Visuals</h3>
  <label>Color</label>
  <input type="text" id="turretColor" value="888888ff">
  <label>Size (tiles)</label>
  <input type="number" id="turretSize" value="2" min="1" max="16">
  <h3>Stats</h3>
  <label>Health</label>
  <input type="number" id="turretHealth" value="500">
  <label>Armor</label>
  <input type="number" id="turretArmor" value="1">
  <h3>Targeting</h3>
  <label>Range (tiles)</label>
  <input type="number" id="turretRange" value="15" step="0.5">
  <label>Reload (ticks)</label>
  <input type="number" id="turretReload" value="30">
  <label>Shoot Cone</label>
  <input type="number" id="turretShootCone" value="8" step="1">
  <label>Inaccuracy</label>
  <input type="number" id="turretInaccuracy" value="0" step="0.1">
  <label>Target Air?</label>
  <select id="turretTargetAir">
    <option value="true" selected>Yes (true)</option>
    <option value="false">No (false)</option>
  </select>
  <label>Target Ground?</label>
  <select id="turretTargetGround">
    <option value="true" selected>Yes (true)</option>
    <option value="false">No (false)</option>
  </select>
  <label>Target Blocks?</label>
  <select id="turretTargetBlocks">
    <option value="true" selected>Yes (true)</option>
    <option value="false">No (false)</option>
  </select>
  <h3>Build Requirements</h3>
  <label>Requirements</label>
  <input type="text" id="turretRequirements" value="copper/30,lead/20">

  <h3>Rendering & Effects</h3>
  <label>Drawer</label>
  <select id="turretDrawer">
    <option value="DrawTurret">Turret (rotating head)</option>
    <option value="DrawDefault">Default (basic block)</option>
    <option value="DrawRegion">Region (plain texture)</option>
    <option value="DrawGlowRegion">Glow Region (emissive)</option>
    <option value="DrawMulti">Multi (layered)</option>
  </select>
  <label>Glow Color (8 hex, optional)</label>
  <input type="text" id="turretGlowColor" placeholder="e.g. ff8800ff">
  <label>Active Effect</label>
  <input type="text" id="turretActiveEffect" placeholder="e.g. shootBig, hitLaser, none">
  <label>Ambient Sound</label>
  <input type="text" id="turretAmbientSound" placeholder="e.g. loopHum, machine">
  <label>Ambient Volume (0-1)</label>
  <input type="number" id="turretAmbientVolume" value="0.5" step="0.1">

  <h3>Visibility</h3>
  <label>Shown in build menu?</label>
  <select id="turretBuildable">
    <option value="true" selected>Yes (true)</option>
    <option value="false">No (false)</option>
  </select>
  <label>Always unlocked?</label>
  <select id="turretAlwaysUnlocked">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <label>Hidden from UI?</label>
  <select id="turretHidden">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <div id="turretResearchBlock">
    <h3>Research</h3>
    <label>Parent Block</label>
    <input type="text" id="turretResearchParent" placeholder="e.g. duo, hail">
    <label>Research Requirements</label>
    <input type="text" id="turretResearchRequirements" placeholder="e.g. lead/5000, silicon/2500">
  </div>
  <div id="turretConsumesBlock">
    <h3>Consumes</h3>
    <div id="turretPowerConsume">
      <label>Consumes Power</label>
      <input type="number" id="turretConsumesPower" value="0" step="0.1">
    </div>
    <div id="turretLiquidConsume" style="display:none">
      <label>Consumes Liquid</label>
      <input type="text" id="turretConsumesLiquid" placeholder="e.g. water/0.1, cryofluid/0.2">
    </div>
  </div>
  <h3>Bullet Properties</h3>
  <div id="turretAmmoBlock">
    <label>Ammo Item 1</label>
    <input type="text" id="turretAmmoItem1" value="copper" placeholder="copper">
    <label>Bullet Speed</label>
    <input type="number" id="turretAmmoSpeed1" value="4" step="0.1">
    <label>Bullet Lifetime</label>
    <input type="number" id="turretAmmoLifetime1" value="40">
    <label>Bullet Damage</label>
    <input type="number" id="turretAmmoDamage1" value="15">
    <label>Ammo Multiplier</label>
    <input type="number" id="turretAmmoMultiplier1" value="2" step="1">
    <label>Ammo Item 2 (optional)</label>
    <input type="text" id="turretAmmoItem2" placeholder="e.g. graphite, titanium">
    <div id="turretAmmo2Fields" style="display:none">
      <label>Bullet Speed 2</label>
      <input type="number" id="turretAmmoSpeed2" value="3.5" step="0.1">
      <label>Bullet Lifetime 2</label>
      <input type="number" id="turretAmmoLifetime2" value="50">
      <label>Bullet Damage 2</label>
      <input type="number" id="turretAmmoDamage2" value="25">
      <label>Ammo Multiplier 2</label>
      <input type="number" id="turretAmmoMultiplier2" value="3" step="1">
    </div>
  </div>
  <div id="turretShootTypeBlock" style="display:none">
    <label>Bullet Speed</label>
    <input type="number" id="turretShootSpeed" value="6" step="0.1">
    <label>Bullet Lifetime</label>
    <input type="number" id="turretShootLifetime" value="30">
    <label>Bullet Damage</label>
    <input type="number" id="turretShootDamage" value="50">
    <label>Splash Damage</label>
    <input type="number" id="turretShootSplashDamage" value="0">
    <label>Splash Radius</label>
    <input type="number" id="turretShootSplashRadius" value="0">
    <div id="turretLaserProps" style="display:none">
      <label>Shoot Duration (ticks)</label>
      <input type="number" id="turretShootDuration" value="100">
      <label>Firing Move Fract</label>
      <input type="number" id="turretFiringMoveFract" value="0.25" step="0.05">
    </div>
  </div>
  <h3>Sprite</h3>
  <label>Sprite</label>
  <select id="turretSpriteChoice">
    <option value="random">Generate one for me</option>
    <option value="upload">Upload my own</option>
  </select>
  <input type="file" id="turretSpriteFile" accept="image/png" style="display:none">
</div>
`);

(function() {
  function updateTurretFields() {
    var kind = document.getElementById("turretKind").value;
    document.getElementById("turretAmmoBlock").style.display = (kind === "item") ? "block" : "none";
    document.getElementById("turretShootTypeBlock").style.display = (kind === "item") ? "none" : "block";
    document.getElementById("turretLaserProps").style.display = (kind === "laser") ? "block" : "none";
    document.getElementById("turretLiquidConsume").style.display = (kind === "laser") ? "block" : "none";
    document.getElementById("turretPowerConsume").style.display = (kind === "item") ? "none" : "block";
  }
  function updateResearchVisibility() {
    var always = document.getElementById("turretAlwaysUnlocked").value;
    var block = document.getElementById("turretResearchBlock");
    if (always === "true") {
      block.style.display = "none";
      document.getElementById("turretResearchParent").value = "";
      document.getElementById("turretResearchRequirements").value = "";
    } else block.style.display = "block";
  }
  function parseColor(hex) {
    if (!hex || hex.length < 6) return { r: 128, g: 128, b: 128 };
    return { r: parseInt(hex.substr(0,2),16)||128, g: parseInt(hex.substr(2,2),16)||128, b: parseInt(hex.substr(4,2),16)||128 };
  }
  function getGlow() { return document.getElementById("turretGlowColor").value.trim(); }
  function drawTurretTexture(ctx, x, y, w, h, color, kind, time) {
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
    var aim = time ? Math.sin(time * 0.0012) * 0.7 : 0;
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath(); ctx.arc(cx, cy, w * 0.32, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = Math.max(1, w / 30); ctx.stroke();
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(aim);
    var bw = w * 0.14, bl = w * 0.42;
    ctx.fillStyle = 'rgba(30,30,40,0.95)';
    ctx.fillRect(-bw / 2, -h * 0.42, bw, bl);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1;
    ctx.strokeRect(-bw / 2, -h * 0.42, bw, bl);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(-bw / 2, -h * 0.42, bw, w * 0.06);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath(); ctx.arc(0, 0, w * 0.08, 0, Math.PI * 2); ctx.fill();
    if (kind === "item") {
      ctx.fillStyle = 'rgba(255,200,80,0.85)';
      ctx.beginPath(); ctx.arc(0, 0, w * 0.1, 0, Math.PI * 2); ctx.fill();
      var pulse2 = (time ? (Math.sin(time * 0.005) + 1) / 2 : 0);
      ctx.strokeStyle = 'rgba(255,200,80,' + (0.6 * (1 - pulse2)) + ')';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, w * 0.1 + w * 0.15 * pulse2, 0, Math.PI * 2);
      ctx.stroke();
    } else if (kind === "power") {
      ctx.fillStyle = 'rgba(120,180,255,0.9)';
      ctx.beginPath();
      ctx.moveTo(-w * 0.06, -w * 0.08);
      ctx.lineTo(w * 0.06, -w * 0.02);
      ctx.lineTo(-w * 0.02, 0);
      ctx.lineTo(w * 0.04, w * 0.08);
      ctx.lineTo(-w * 0.06, w * 0.02);
      ctx.lineTo(0, 0);
      ctx.closePath(); ctx.fill();
    } else if (kind === "laser") {
      var lp = 0.7 + (time ? Math.sin(time * 0.008) * 0.3 : 0);
      ctx.fillStyle = 'rgba(255,80,140,' + lp + ')';
      ctx.beginPath(); ctx.arc(0, 0, w * 0.1, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(255,150,200,0.6)';
      ctx.lineWidth = Math.max(1, w / 40); ctx.stroke();
    }
    ctx.restore();
  }
  function drawTurretSprite(time) {
    var canvas = document.getElementById("turretSpriteCanvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    var size = parseInt(document.getElementById("turretSize").value) || 1;
    if (size < 1) size = 1; if (size > 16) size = 16;
    var targetSize = size * 32;
    var choice = document.getElementById("turretSpriteChoice").value;
    var kind = document.getElementById("turretKind").value;
    if (choice === "upload") {
      var file = document.getElementById("turretSpriteFile").files[0];
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
      drawTurretTexture(offCtx2, 0, 0, targetSize, targetSize, document.getElementById("turretColor").value, kind, time);
      ctx.imageSmoothingEnabled = false; ctx.drawImage(off2, 0, 0, W, H);
    }
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "10px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(targetSize + "×" + targetSize + " px", W / 2, H - 6);
  }
  function drawTurretInfo() {
    var info = document.getElementById("turretInfoPreview");
    if (!info) return;
    var kind = document.getElementById("turretKind").value;
    var range = parseFloat(document.getElementById("turretRange").value) || 0;
    var reload = parseFloat(document.getElementById("turretReload").value) || 1;
    var dps = 0;
    if (kind === "item") {
      var dmg = parseFloat(document.getElementById("turretAmmoDamage1").value) || 0;
      var mult = parseFloat(document.getElementById("turretAmmoMultiplier1").value) || 1;
      dps = (dmg * mult * 60) / reload;
    } else {
      dps = ((parseFloat(document.getElementById("turretShootDamage").value) || 0) * 60) / reload;
    }
    info.innerHTML = "📏 Range: <b>" + range + "</b><br>🔄 Reload: <b>" + reload + "</b><br>💥 DPS: <b>" + dps.toFixed(1) + "</b>";
  }
  function drawTurretEffects() {
    var container = document.getElementById("turretEffectsPreview");
    if (!container) return;
    var html = "";
    var health = parseInt(document.getElementById("turretHealth").value) || 0;
    var armor = parseInt(document.getElementById("turretArmor").value) || 0;
    var size = parseInt(document.getElementById("turretSize").value) || 1;
    var air = document.getElementById("turretTargetAir").value;
    var ground = document.getElementById("turretTargetGround").value;
    var blocks = document.getElementById("turretTargetBlocks").value;
    var drawer = document.getElementById("turretDrawer").value;
    var glow = getGlow();
    var sound = document.getElementById("turretAmbientSound").value.trim();
    var effect = document.getElementById("turretActiveEffect").value.trim();
    html += '<span class="badge">❤️ ' + health + ' HP</span>';
    if (armor > 0) html += '<span class="badge">🛡️ ' + armor + '</span>';
    html += '<span class="badge">📐 ' + size + 'x' + size + '</span>';
    if (air === "true") html += '<span class="badge">✈️ Air</span>';
    if (ground === "true") html += '<span class="badge">🚶 Ground</span>';
    if (blocks === "true") html += '<span class="badge">🏗️</span>';
    if (drawer && drawer !== "DrawTurret") html += '<span class="badge">🎨 ' + drawer.replace("Draw","") + '</span>';
    if (glow) html += '<span class="badge badge-glow">✨ glow</span>';
    if (sound) html += '<span class="badge">🔊 ' + sound + '</span>';
    if (effect) html += '<span class="badge">💫 ' + effect + '</span>';
    container.innerHTML = html;
  }
  function updateTurretPreview(time) { drawTurretSprite(time); drawTurretInfo(); drawTurretEffects(); }
  document.getElementById("turretKind").addEventListener("change", function() { updateTurretFields(); updateTurretPreview(); });
  document.getElementById("turretAlwaysUnlocked").addEventListener("change", function() { updateResearchVisibility(); updateTurretPreview(); });
  document.getElementById("turretDrawer").addEventListener("change", updateTurretPreview);
  ["turretColor","turretSize","turretHealth","turretArmor","turretRange","turretReload","turretShootCone","turretInaccuracy","turretAmmoDamage1","turretAmmoMultiplier1","turretShootDamage","turretTargetAir","turretTargetGround","turretTargetBlocks","turretGlowColor","turretActiveEffect","turretAmbientSound","turretAmbientVolume"].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("input", updateTurretPreview);
  });
  document.getElementById("turretAmmoItem2").addEventListener("input", function() {
    document.getElementById("turretAmmo2Fields").style.display = (this.value.trim()) ? "block" : "none";
  });
  var choice = document.getElementById("turretSpriteChoice");
  if (choice) choice.addEventListener("change", updateTurretPreview);
  var file = document.getElementById("turretSpriteFile");
  if (file) file.addEventListener("change", updateTurretPreview);
  function animate(time) {
    var sec = document.getElementById("section-turret");
    if (sec && sec.classList.contains("active")) updateTurretPreview(time);
    requestAnimationFrame(animate);
  }
  updateTurretFields(); updateResearchVisibility(); updateTurretPreview();
  requestAnimationFrame(animate);
})();