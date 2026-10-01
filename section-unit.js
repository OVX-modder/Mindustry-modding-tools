document.getElementById('main').insertAdjacentHTML('beforeend', `
<div id="section-unit" class="section">
  <h2>Add Unit</h2>
  <label>Unit Type</label>
  <select id="unitKind">
    <option value="mech">Mech (walker)</option>
    <option value="flying">Flying</option>
    <option value="naval">Naval (boat)</option>
    <option value="tank">Tank</option>
    <option value="legs">Legs (spider)</option>
    <option value="payload">Payload</option>
  </select>
  <div class="preview-panel">
    <div class="preview-title">Live Preview</div>
    <div class="preview-row">
      <div class="preview-box">
        <div class="preview-label">Unit</div>
        <canvas id="unitSpriteCanvas" width="130" height="130" style="width:100%;max-width:130px;height:130px;display:block;margin:0 auto;border-radius:6px;background:rgba(0,0,0,0.3);image-rendering:pixelated;border:1px solid rgba(255,255,255,0.08);"></canvas>
      </div>
      <div class="preview-box">
        <div class="preview-label">Stats</div>
        <div id="unitInfoPreview" style="text-align:center;padding-top:14px;font-size:12px;color:rgba(214,216,221,0.7);line-height:1.8;"></div>
      </div>
    </div>
    <div class="preview-effects" id="unitEffectsPreview"></div>
  </div>
  <h3>Basic Info</h3>
  <label>Internal Name</label>
  <input type="text" id="unitName" placeholder="my-unit">
  <label>Display Name</label>
  <input type="text" id="unitDisplayName" placeholder="My Unit">
  <label>Description</label>
  <textarea id="unitDescription" placeholder="A custom unit..."></textarea>
  <h3>Visuals</h3>
  <label>Color</label>
  <input type="text" id="unitColor" value="6b8ecbff">
  <h3>Stats</h3>
  <label>Health</label>
  <input type="number" id="unitHealth" value="200">
  <label>Armor</label>
  <input type="number" id="unitArmor" value="0">
  <label>Speed</label>
  <input type="number" id="unitSpeed" value="0.6" step="0.1">
  <label>Rotate Speed</label>
  <input type="number" id="unitRotateSpeed" value="3" step="0.1">
  <label>Hit Size (pixels)</label>
  <input type="number" id="unitHitSize" value="8">
  <h3>Combat</h3>
  <label>Range (tiles)</label>
  <input type="number" id="unitRange" value="0" step="0.5">
  <label>Target Air?</label>
  <select id="unitTargetAir">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <label>Target Ground?</label>
  <select id="unitTargetGround">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <h3>Mining &amp; Building</h3>
  <label>Mine Tier</label>
  <input type="number" id="unitMineTier" value="1">
  <label>Mine Speed</label>
  <input type="number" id="unitMineSpeed" value="1.5" step="0.1">
  <label>Item Capacity</label>
  <input type="number" id="unitItemCapacity" value="30">
  <label>Build Speed</label>
  <input type="number" id="unitBuildSpeed" value="0.5" step="0.1">
  <h3>Build Requirements</h3>
  <label>Requirements</label>
  <input type="text" id="unitRequirements" value="copper/50,lead/30">
  <h3>Visibility</h3>
  <label>Shown in build menu?</label>
  <select id="unitBuildable">
    <option value="true" selected>Yes (true)</option>
    <option value="false">No (false)</option>
  </select>
  <label>Always unlocked?</label>
  <select id="unitAlwaysUnlocked">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <label>Hidden from UI?</label>
  <select id="unitHidden">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <div id="unitResearchBlock">
    <h3>Research</h3>
    <label>Parent Block</label>
    <input type="text" id="unitResearchParent" placeholder="">
    <label>Research Requirements</label>
    <input type="text" id="unitResearchRequirements" placeholder="">
  </div>
  <h3>Sprite</h3>
  <label>Sprite</label>
  <select id="unitSpriteChoice">
    <option value="random">Generate one for me</option>
    <option value="upload">Upload my own</option>
  </select>
  <input type="file" id="unitSpriteFile" accept="image/png" style="display:none">
</div>
`);

(function() {
  function updateResearchVisibility() {
    var always = document.getElementById("unitAlwaysUnlocked").value;
    var block = document.getElementById("unitResearchBlock");
    if (always === "true") {
      block.style.display = "none";
      document.getElementById("unitResearchParent").value = "";
      document.getElementById("unitResearchRequirements").value = "";
    } else block.style.display = "block";
  }
  function parseColor(hex) {
    if (!hex || hex.length < 6) return { r: 100, g: 140, b: 200 };
    return { r: parseInt(hex.substr(0,2),16)||100, g: parseInt(hex.substr(2,2),16)||140, b: parseInt(hex.substr(4,2),16)||200 };
  }
  function drawUnit(ctx, x, y, w, h, color, kind, time) {
    var c = parseColor(color);
    var cx = x + w / 2, cy = y + h / 2;
    var t = time || 0;
    var col = 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')';
    var dark = 'rgb(' + Math.max(0,c.r-40) + ',' + Math.max(0,c.g-40) + ',' + Math.max(0,c.b-40) + ')';
    var light = 'rgba(255,255,255,0.35)';

    if (kind === "mech" || kind === "legs") {
      var legPhase = Math.sin(t * 0.006);
      var legY = cy + h * 0.20, legH = h * 0.22;
      ctx.strokeStyle = dark; ctx.lineWidth = Math.max(2, w / 14); ctx.lineCap = 'round';
      var legCount = (kind === "legs") ? 3 : 1;
      for (var side = -1; side <= 1; side += 2) {
        for (var li = 0; li < legCount; li++) {
          var lx = cx + side * w * (0.14 + li * 0.08);
          var swing = legPhase * (1 - li * 0.15) * side;
          var footX = lx + swing * w * 0.10;
          var footY = legY + legH;
          ctx.beginPath(); ctx.moveTo(lx, legY); ctx.lineTo(footX, footY); ctx.stroke();
        }
      }
      var bodyW = w * 0.52, bodyH = h * 0.32;
      var bob = Math.sin(t * 0.006) * h * 0.01;
      var bx = cx - bodyW / 2, by = cy - bodyH / 2 + bob;
      ctx.fillStyle = col; ctx.fillRect(bx, by, bodyW, bodyH);
      ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = Math.max(2, w / 20);
      ctx.strokeRect(bx, by, bodyW, bodyH);
      ctx.fillStyle = light; ctx.fillRect(bx + 2, by + 2, bodyW - 4, 2);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.beginPath(); ctx.arc(cx, cy + bob, w * 0.06, 0, Math.PI * 2); ctx.fill();

    } else if (kind === "flying") {
      var bobF = Math.sin(t * 0.005) * h * 0.04;
      var fy = cy + bobF;
      var flick = 1 + Math.sin(t * 0.02) * 0.25;
      var flameH = h * 0.12 * flick;
      ctx.fillStyle = 'rgba(255,180,60,0.85)';
      ctx.beginPath();
      ctx.moveTo(cx - w * 0.06, fy + h * 0.14);
      ctx.lineTo(cx, fy + h * 0.14 + flameH);
      ctx.lineTo(cx + w * 0.06, fy + h * 0.14);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.moveTo(cx, fy - h * 0.18);
      ctx.lineTo(cx + w * 0.18, fy);
      ctx.lineTo(cx, fy + h * 0.16);
      ctx.lineTo(cx - w * 0.18, fy);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = Math.max(2, w / 20); ctx.stroke();
      ctx.fillStyle = dark;
      ctx.fillRect(cx - w * 0.34, fy - 2, w * 0.18, 4);
      ctx.fillRect(cx + w * 0.16, fy - 2, w * 0.18, 4);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.beginPath(); ctx.arc(cx, fy - h * 0.04, w * 0.05, 0, Math.PI * 2); ctx.fill();

    } else if (kind === "naval") {
      var rock = Math.sin(t * 0.004) * 0.05;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(rock);
      var wakePhase = (t * 0.003) % 1;
      ctx.strokeStyle = 'rgba(255,255,255,' + (0.3 * (1 - wakePhase)) + ')';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-w * 0.4 - wakePhase * w * 0.3, -h * 0.12);
      ctx.lineTo(-w * 0.4 - wakePhase * w * 0.3 - w * 0.1, -h * 0.18);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-w * 0.4 - wakePhase * w * 0.3, h * 0.12);
      ctx.lineTo(-w * 0.4 - wakePhase * w * 0.3 - w * 0.1, h * 0.18);
      ctx.stroke();
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.32, 0);
      ctx.lineTo(cx + w * 0.10, -h * 0.16);
      ctx.lineTo(cx - w * 0.30, -h * 0.14);
      ctx.lineTo(cx - w * 0.30, h * 0.14);
      ctx.lineTo(cx + w * 0.10, h * 0.16);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = Math.max(2, w / 20); ctx.stroke();
      ctx.fillStyle = light; ctx.fillRect(cx - w * 0.28, -h * 0.14 + 2, w * 0.55, 2);
      ctx.fillStyle = dark;
      ctx.beginPath(); ctx.arc(cx - w * 0.05, 0, h * 0.08, 0, Math.PI * 2); ctx.fill();
      ctx.restore();

    } else if (kind === "tank") {
      ctx.fillStyle = dark;
      ctx.fillRect(cx - w * 0.36, cy - h * 0.16, w * 0.72, h * 0.32);
      var treadOffset = (t * 0.02) % (w * 0.08);
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      for (var tx = 0; tx < w * 0.72; tx += w * 0.08) {
        ctx.fillRect(cx - w * 0.36 + ((tx + treadOffset) % (w * 0.72)), cy - h * 0.16, w * 0.03, h * 0.32);
      }
      var hullW = w * 0.60, hullH = h * 0.22;
      ctx.fillStyle = col; ctx.fillRect(cx - hullW / 2, cy - hullH / 2, hullW, hullH);
      ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = Math.max(2, w / 20);
      ctx.strokeRect(cx - hullW / 2, cy - hullH / 2, hullW, hullH);
      var aim = Math.sin(t * 0.0015) * 0.6;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(aim);
      ctx.fillStyle = dark; ctx.fillRect(-2, -h * 0.34, 4, h * 0.30);
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(0, 0, h * 0.10, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = 2; ctx.stroke();
      ctx.restore();

    } else if (kind === "payload") {
      var bobP = Math.sin(t * 0.004) * h * 0.02;
      var py = cy + bobP;
      ctx.fillStyle = col;
      ctx.fillRect(cx - w * 0.28, py - h * 0.20, w * 0.56, h * 0.40);
      ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = Math.max(2, w / 20);
      ctx.strokeRect(cx - w * 0.28, py - h * 0.20, w * 0.56, h * 0.40);
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillRect(cx - w * 0.18, py - h * 0.06, w * 0.36, h * 0.16);
      ctx.fillStyle = light;
      ctx.fillRect(cx - w * 0.26, py - h * 0.18, w * 0.52, 2);
    }
  }
  function drawUnitSprite(time) {
    var canvas = document.getElementById("unitSpriteCanvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    var choice = document.getElementById("unitSpriteChoice").value;
    var kind = document.getElementById("unitKind").value;
    if (choice === "upload") {
      var file = document.getElementById("unitSpriteFile").files[0];
      if (file) {
        var url = URL.createObjectURL(file);
        var img = new Image();
        img.onload = function() {
          var off = document.createElement("canvas");
          off.width = 32; off.height = 32;
          var offCtx = off.getContext("2d"); offCtx.imageSmoothingEnabled = false;
          offCtx.drawImage(img, 0, 0, 32, 32);
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
      off2.width = 48; off2.height = 48;
      var offCtx2 = off2.getContext("2d");
      drawUnit(offCtx2, 0, 0, 48, 48, document.getElementById("unitColor").value, kind, time);
      ctx.imageSmoothingEnabled = false; ctx.drawImage(off2, 0, 0, W, H);
    }
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "10px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("32×32 px", W / 2, H - 6);
  }
  function drawUnitInfo() {
    var info = document.getElementById("unitInfoPreview");
    if (!info) return;
    var health = parseInt(document.getElementById("unitHealth").value) || 0;
    var armor = parseInt(document.getElementById("unitArmor").value) || 0;
    var speed = parseFloat(document.getElementById("unitSpeed").value) || 0;
    var range = parseFloat(document.getElementById("unitRange").value) || 0;
    var html = "❤️ " + health + " HP<br>";
    if (armor > 0) html += "🛡️ " + armor + "<br>";
    html += "💨 " + speed + "<br>";
    if (range > 0) html += "📏 " + range + " range";
    else html += "😴 unarmed";
    info.innerHTML = html;
  }
  function drawUnitEffects() {
    var container = document.getElementById("unitEffectsPreview");
    if (!container) return;
    var html = "";
    var kind = document.getElementById("unitKind").value;
    var mineTier = parseInt(document.getElementById("unitMineTier").value) || 0;
    var itemCap = parseInt(document.getElementById("unitItemCapacity").value) || 0;
    var buildSpeed = parseFloat(document.getElementById("unitBuildSpeed").value) || 0;
    var air = document.getElementById("unitTargetAir").value;
    var ground = document.getElementById("unitTargetGround").value;
    html += '<span class="badge">' + kind + '</span>';
    if (mineTier > 0) html += '<span class="badge">⛏️ T' + mineTier + '</span>';
    if (itemCap > 0) html += '<span class="badge">📦 ' + itemCap + '</span>';
    if (buildSpeed > 0) html += '<span class="badge">🔨 ' + buildSpeed + '</span>';
    if (air === "true") html += '<span class="badge">✈️ Air</span>';
    if (ground === "true") html += '<span class="badge">🚶 Ground</span>';
    container.innerHTML = html;
  }
  function updateUnitPreview(time) { drawUnitSprite(time); drawUnitInfo(); drawUnitEffects(); }
  document.getElementById("unitAlwaysUnlocked").addEventListener("change", function() { updateResearchVisibility(); updateUnitPreview(); });
  ["unitColor","unitHealth","unitArmor","unitSpeed","unitRotateSpeed","unitHitSize","unitRange","unitTargetAir","unitTargetGround","unitMineTier","unitMineSpeed","unitItemCapacity","unitBuildSpeed"].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("input", updateUnitPreview);
  });
  document.getElementById("unitKind").addEventListener("change", updateUnitPreview);
  var choice = document.getElementById("unitSpriteChoice");
  if (choice) choice.addEventListener("change", updateUnitPreview);
  var file = document.getElementById("unitSpriteFile");
  if (file) file.addEventListener("change", updateUnitPreview);
  function animate(time) {
    var sec = document.getElementById("section-unit");
    if (sec && sec.classList.contains("active")) updateUnitPreview(time);
    requestAnimationFrame(animate);
  }
  updateResearchVisibility(); updateUnitPreview();
  requestAnimationFrame(animate);

  window.__unitExport = async function() {
    var unitName = document.getElementById("unitName").value;
    if (!unitName) return null;
    var unitDisplayName = document.getElementById("unitDisplayName").value;
    var unitDescription = document.getElementById("unitDescription").value;
    var unitKind = document.getElementById("unitKind").value;
    var unitHjson =
      'type: ' + unitKind + '\n' +
      'name: ' + unitName + '\n' +
      'color: ' + document.getElementById("unitColor").value + '\n' +
      'health: ' + document.getElementById("unitHealth").value + '\n' +
      'armor: ' + document.getElementById("unitArmor").value + '\n' +
      'speed: ' + document.getElementById("unitSpeed").value + '\n' +
      'rotateSpeed: ' + document.getElementById("unitRotateSpeed").value + '\n' +
      'hitSize: ' + document.getElementById("unitHitSize").value + '\n' +
      'range: ' + document.getElementById("unitRange").value + '\n' +
      'targetAir: ' + document.getElementById("unitTargetAir").value + '\n' +
      'targetGround: ' + document.getElementById("unitTargetGround").value + '\n' +
      'mineTier: ' + document.getElementById("unitMineTier").value + '\n' +
      'mineSpeed: ' + document.getElementById("unitMineSpeed").value + '\n' +
      'itemCapacity: ' + document.getElementById("unitItemCapacity").value + '\n' +
      'buildSpeed: ' + document.getElementById("unitBuildSpeed").value + '\n' +
      'buildable: ' + document.getElementById("unitBuildable").value + '\n' +
      'hidden: ' + document.getElementById("unitHidden").value + '\n' +
      'alwaysUnlocked: ' + document.getElementById("unitAlwaysUnlocked").value + '\n';
    var reqRaw = document.getElementById("unitRequirements").value.trim();
    if (reqRaw) {
      var reqParts = reqRaw.split(",").map(function(p) { return p.trim(); });
      unitHjson += 'requirements: [\n';
      for (var ri = 0; ri < reqParts.length; ri++) {
        var rp = reqParts[ri].split("/");
        if (rp.length === 2) unitHjson += '  ' + rp[0].trim() + '/' + rp[1].trim() + '\n';
      }
      unitHjson += ']\n';
    }
    var always = document.getElementById("unitAlwaysUnlocked").value;
    if (always !== "true") {
      var rp2 = document.getElementById("unitResearchParent").value.trim();
      var rr = document.getElementById("unitResearchRequirements").value.trim();
      if (rp2 || rr) {
        unitHjson += 'research: {\n';
        if (rp2) unitHjson += '  parent: ' + rp2 + '\n';
        if (rr) {
          var rItems = rr.split(",").map(function(p) { return p.trim(); });
          unitHjson += '  requirements: [\n';
          for (var ri2 = 0; ri2 < rItems.length; ri2++) {
            var rp3 = rItems[ri2].split("/");
            if (rp3.length === 2) unitHjson += '    ' + rp3[0].trim() + '/' + rp3[1].trim() + '\n';
          }
          unitHjson += '  ]\n';
        }
        unitHjson += '}\n';
      }
    }
    var files = [];
    var bundleLines = '';
    var readmeBody = '';
    files.push({ name: "content/units/" + unitName + ".hjson", data: encode(unitHjson) });
    bundleLines += 'unit.' + unitName + '.name = ' + (unitDisplayName || unitName) + '\n';
    if (unitDescription) bundleLines += 'unit.' + unitName + '.description = ' + unitDescription + '\n';
    if (document.getElementById("unitSpriteChoice").value === "upload") {
      var f = document.getElementById("unitSpriteFile").files[0];
      if (f) {
        var data = await readAndResizeImage(f, 32, 32);
        files.push({ name: "sprites/" + unitName + ".png", data: data });
      }
    } else {
      var generated = await new Promise(function(resolve) {
        var canvas = document.createElement('canvas');
        canvas.width = 32; canvas.height = 32;
        var ctx = canvas.getContext('2d');
        drawUnit(ctx, 0, 0, 32, 32, document.getElementById("unitColor").value, unitKind, 0);
        canvas.toBlob(function(blob) {
          blob.arrayBuffer().then(function(buf) { resolve(new Uint8Array(buf)); });
        }, 'image/png');
      });
      files.push({ name: "sprites/" + unitName + ".png", data: generated });
    }
    readmeBody += '- content/units/' + unitName + '.hjson\n- sprites/' + unitName + '.png (32x32)\n';
    return { files: files, bundleLines: bundleLines, readmeBody: readmeBody };
  };
})();