// ===== HELP TEXT =====
(function() {
  var labels = document.querySelectorAll("label[data-help]");
  for (var i = 0; i < labels.length; i++) {
    (function(label) {
      var tip = document.createElement("div");
      tip.className = "help-tip";
      tip.textContent = label.getAttribute("data-help");
      label.parentNode.insertBefore(tip, label.nextSibling);
    })(labels[i]);
  }
})();

// ===== UI =====
function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("open");
}
function showSection(id) {
  var sections = document.querySelectorAll(".section");
  for (var i = 0; i < sections.length; i++) sections[i].classList.remove("active");
  document.getElementById("section-" + id).classList.add("active");
  var links = document.querySelectorAll("#sidebar a");
  for (var i = 0; i < links.length; i++) links[i].classList.remove("active");
  document.getElementById("nav-" + id).classList.add("active");
  toggleMenu();
  window.scrollTo(0, 0);
}

// ===== BLOCK EXTRAS (drawer, glow, effect, sound, invisible) =====
function blockExtras(prefix, hjson) {
  var drawer = document.getElementById(prefix + "Drawer");
  if (drawer && drawer.value && drawer.value !== "DrawDefault") {
    hjson += 'drawer: ' + drawer.value + '\n';
  }
  var glow = document.getElementById(prefix + "GlowColor");
  if (glow && glow.value.trim()) {
    hjson += 'glowColor: ' + glow.value.trim() + '\n';
  }
  var effect = document.getElementById(prefix + "ActiveEffect");
  if (effect && effect.value.trim()) {
    hjson += 'effect: ' + effect.value.trim() + '\n';
  }
  var sound = document.getElementById(prefix + "AmbientSound");
  if (sound && sound.value.trim()) {
    hjson += 'ambientSound: ' + sound.value.trim() + '\n';
    var vol = document.getElementById(prefix + "AmbientVolume");
    if (vol) hjson += 'ambientSoundVolume: ' + vol.value + '\n';
  }
  var invisible = document.getElementById(prefix + "Invisible");
  if (invisible && invisible.value === "true") {
    hjson += 'invisible: true\n';
  }
  return hjson;
}

// ===== ZIP =====
var crcTable = [];
for (var n = 0; n < 256; n++) {
  var c = n;
  for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  crcTable[n] = c;
}
function makeZip(files) {
  var localHeaders = [], centralHeaders = [], fileDataArray = [], offset = 0;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var dataBytes = file.data;
    var filenameBytes = new TextEncoder().encode(file.name);
    var size = dataBytes.length;
    var crc = 0 ^ (-1);
    for (var j = 0; j < dataBytes.length; j++) crc = (crc >>> 8) ^ crcTable[(crc ^ dataBytes[j]) & 0xFF];
    crc = (crc ^ (-1)) >>> 0;
    var lh = new ArrayBuffer(30 + filenameBytes.length);
    var lhv = new DataView(lh), lha = new Uint8Array(lh);
    lhv.setUint32(0, 0x04034b50, true); lhv.setUint16(4, 20, true);
    lhv.setUint32(14, crc, true); lhv.setUint32(18, size, true); lhv.setUint32(22, size, true);
    lhv.setUint16(26, filenameBytes.length, true); lha.set(filenameBytes, 30);
    localHeaders.push(lh); fileDataArray.push(dataBytes);
    var ch = new ArrayBuffer(46 + filenameBytes.length);
    var chv = new DataView(ch), cha = new Uint8Array(ch);
    chv.setUint32(0, 0x02014b50, true); chv.setUint16(4, 20, true); chv.setUint16(6, 20, true);
    chv.setUint32(16, crc, true); chv.setUint32(20, size, true); chv.setUint32(24, size, true);
    chv.setUint16(28, filenameBytes.length, true); chv.setUint32(42, offset, true);
    cha.set(filenameBytes, 46);
    centralHeaders.push(ch);
    offset += lh.byteLength + size;
  }
  var eocd = new ArrayBuffer(22);
  var eo = new DataView(eocd);
  var cds = 0;
  for (var i = 0; i < centralHeaders.length; i++) cds += centralHeaders[i].byteLength;
  eo.setUint32(0, 0x06054b50, true); eo.setUint16(8, files.length, true);
  eo.setUint16(10, files.length, true); eo.setUint32(12, cds, true);
  eo.setUint32(16, offset, true);
  var total = offset + cds + eocd.byteLength;
  var result = new Uint8Array(total), pos = 0;
  for (var i = 0; i < localHeaders.length; i++) {
    result.set(new Uint8Array(localHeaders[i]), pos); pos += localHeaders[i].byteLength;
    result.set(fileDataArray[i], pos); pos += fileDataArray[i].length;
  }
  for (var i = 0; i < centralHeaders.length; i++) {
    result.set(new Uint8Array(centralHeaders[i]), pos); pos += centralHeaders[i].byteLength;
  }
  result.set(new Uint8Array(eocd), pos);
  return new Blob([result], { type: "application/zip" });
}
function encode(str) { return new TextEncoder().encode(str); }

// ===== SPRITE GENERATORS (static for export) =====
function generateSprite(color) {
  return new Promise(function(resolve) {
    var c = document.createElement('canvas'); c.width = 32; c.height = 32;
    var ctx = c.getContext('2d');
    var r = parseInt(color.substr(0,2),16)||255, g = parseInt(color.substr(2,2),16)||0, b = parseInt(color.substr(4,2),16)||0;
    var a = (parseInt(color.substr(6,2),16)||255)/255;
    ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    ctx.fillRect(0,0,32,32);
    ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = 3; ctx.strokeRect(1.5,1.5,29,29);
    c.toBlob(function(blob) { blob.arrayBuffer().then(function(buf) { resolve(new Uint8Array(buf)); }); }, 'image/png');
  });
}
function generateWallSprite(color) {
  return new Promise(function(resolve) {
    var s = 32; var c = document.createElement('canvas'); c.width = s; c.height = s;
    var ctx = c.getContext('2d');
    var r = parseInt(color.substr(0,2),16)||128, g = parseInt(color.substr(2,2),16)||128, b = parseInt(color.substr(4,2),16)||128;
    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'; ctx.fillRect(0,0,s,s);
    var grad = ctx.createLinearGradient(0,0,s,s);
    grad.addColorStop(0,'rgba(255,255,255,0.18)');
    grad.addColorStop(0.5,'rgba(255,255,255,0.04)');
    grad.addColorStop(1,'rgba(0,0,0,0.25)');
    ctx.fillStyle = grad; ctx.fillRect(0,0,s,s);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1; ctx.strokeRect(2,2,s-4,s-4);
    ctx.strokeStyle = 'rgba(0,0,0,0.55)'; ctx.lineWidth = 2; ctx.strokeRect(1,1,s-2,s-2);
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(4,4,2,2); ctx.fillRect(s-6,4,2,2); ctx.fillRect(4,s-6,2,2); ctx.fillRect(s-6,s-6,2,2);
    c.toBlob(function(blob) { blob.arrayBuffer().then(function(buf) { resolve(new Uint8Array(buf)); }); }, 'image/png');
  });
}
function generatePowerSprite(color, size, kind) {
  return new Promise(function(resolve) {
    var ts = size * 32;
    var c = document.createElement('canvas'); c.width = ts; c.height = ts;
    var ctx = c.getContext('2d');
    var r = parseInt(color.substr(0,2),16)||128, g = parseInt(color.substr(2,2),16)||128, b = parseInt(color.substr(4,2),16)||128;
    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'; ctx.fillRect(0,0,ts,ts);
    var grad = ctx.createLinearGradient(0,0,ts,ts);
    grad.addColorStop(0,'rgba(255,255,255,0.2)');
    grad.addColorStop(0.5,'rgba(255,255,255,0.05)');
    grad.addColorStop(1,'rgba(0,0,0,0.3)');
    ctx.fillStyle = grad; ctx.fillRect(0,0,ts,ts);
    ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = Math.max(2, ts/14); ctx.strokeRect(1,1,ts-2,ts-2);
    ctx.save(); ctx.translate(ts/2, ts/2);
    if (kind === "solar") {
      ctx.fillStyle = 'rgba(255,230,120,0.9)';
      ctx.beginPath(); ctx.arc(0,0,ts*0.18,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle = 'rgba(255,230,120,0.7)'; ctx.lineWidth = Math.max(1, ts/40);
      for (var a = 0; a < 8; a++) {
        var ang = a * Math.PI/4;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang)*ts*0.24, Math.sin(ang)*ts*0.24);
        ctx.lineTo(Math.cos(ang)*ts*0.32, Math.sin(ang)*ts*0.32); ctx.stroke();
      }
    } else if (kind === "thermal" || kind === "consume") {
      ctx.fillStyle = 'rgba(255,120,40,0.9)';
      ctx.beginPath();
      ctx.moveTo(0,-ts*0.2); ctx.quadraticCurveTo(ts*0.2,0,0,ts*0.2);
      ctx.quadraticCurveTo(-ts*0.2,0,0,-ts*0.2); ctx.fill();
    } else if (kind === "node") {
      ctx.fillStyle = 'rgba(255,230,120,0.95)';
      ctx.beginPath();
      ctx.moveTo(-ts*0.05,-ts*0.2); ctx.lineTo(ts*0.08,-ts*0.02);
      ctx.lineTo(-ts*0.02,-ts*0.02); ctx.lineTo(ts*0.05,ts*0.2);
      ctx.lineTo(-ts*0.08,0); ctx.lineTo(ts*0.02,0); ctx.closePath(); ctx.fill();
    } else if (kind === "battery") {
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fillRect(-ts*0.15,-ts*0.2,ts*0.3,ts*0.4);
      ctx.fillStyle = 'rgba(120,255,120,0.9)';
      ctx.fillRect(-ts*0.12,-ts*0.12,ts*0.24,ts*0.16);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fillRect(-ts*0.05,-ts*0.24,ts*0.1,ts*0.05);
    }
    ctx.restore();
    c.toBlob(function(blob) { blob.arrayBuffer().then(function(buf) { resolve(new Uint8Array(buf)); }); }, 'image/png');
  });
}
function generateTurretSprite(color, size, kind) {
  return new Promise(function(resolve) {
    var ts = size * 32;
    var c = document.createElement('canvas'); c.width = ts; c.height = ts;
    var ctx = c.getContext('2d');
    var r = parseInt(color.substr(0,2),16)||128, g = parseInt(color.substr(2,2),16)||128, b = parseInt(color.substr(4,2),16)||128;
    var cx = ts/2, cy = ts/2;
    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'; ctx.fillRect(0,0,ts,ts);
    var grad = ctx.createLinearGradient(0,0,ts,ts);
    grad.addColorStop(0,'rgba(255,255,255,0.2)');
    grad.addColorStop(0.5,'rgba(255,255,255,0.05)');
    grad.addColorStop(1,'rgba(0,0,0,0.3)');
    ctx.fillStyle = grad; ctx.fillRect(0,0,ts,ts);
    ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = Math.max(2, ts/14); ctx.strokeRect(1,1,ts-2,ts-2);
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath(); ctx.arc(cx,cy,ts*0.32,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = Math.max(1, ts/30); ctx.stroke();
    var bw = ts*0.14, bl = ts*0.42;
    ctx.fillStyle = 'rgba(30,30,40,0.95)'; ctx.fillRect(cx-bw/2, ts*0.08, bw, bl);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1; ctx.strokeRect(cx-bw/2, ts*0.08, bw, bl);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath(); ctx.arc(cx,cy,ts*0.08,0,Math.PI*2); ctx.fill();
    ctx.save(); ctx.translate(cx,cy);
    if (kind === "item") {
      ctx.fillStyle = 'rgba(255,200,80,0.8)';
      ctx.beginPath(); ctx.arc(0,0,ts*0.1,0,Math.PI*2); ctx.fill();
    } else if (kind === "power") {
      ctx.fillStyle = 'rgba(120,180,255,0.9)';
      ctx.beginPath();
      ctx.moveTo(-ts*0.06,-ts*0.08); ctx.lineTo(ts*0.06,-ts*0.02);
      ctx.lineTo(-ts*0.02,0); ctx.lineTo(ts*0.04,ts*0.08);
      ctx.lineTo(-ts*0.06,ts*0.02); ctx.lineTo(0,0); ctx.closePath(); ctx.fill();
    } else if (kind === "laser") {
      ctx.fillStyle = 'rgba(255,80,140,0.9)';
      ctx.beginPath(); ctx.arc(0,0,ts*0.1,0,Math.PI*2); ctx.fill();
    }
    ctx.restore();
    c.toBlob(function(blob) { blob.arrayBuffer().then(function(buf) { resolve(new Uint8Array(buf)); }); }, 'image/png');
  });
}
function generateDrillSprite(color, size) {
  return new Promise(function(resolve) {
    var ts = size * 32;
    var c = document.createElement('canvas'); c.width = ts; c.height = ts;
    var ctx = c.getContext('2d');
    var r = parseInt(color.substr(0,2),16)||128, g = parseInt(color.substr(2,2),16)||128, b = parseInt(color.substr(4,2),16)||128;
    var cx = ts/2, cy = ts/2;
    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'; ctx.fillRect(0,0,ts,ts);
    var grad = ctx.createLinearGradient(0,0,ts,ts);
    grad.addColorStop(0,'rgba(255,255,255,0.2)');
    grad.addColorStop(0.5,'rgba(255,255,255,0.05)');
    grad.addColorStop(1,'rgba(0,0,0,0.3)');
    ctx.fillStyle = grad; ctx.fillRect(0,0,ts,ts);
    ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = Math.max(2, ts/14); ctx.strokeRect(1,1,ts-2,ts-2);
    ctx.strokeStyle = 'rgba(0,0,0,0.4)'; ctx.lineWidth = Math.max(2, ts/18);
    ctx.beginPath(); ctx.arc(cx,cy,ts*0.42,0,Math.PI*2); ctx.stroke();
    ctx.fillStyle = 'rgba(60,60,70,0.6)';
    ctx.beginPath(); ctx.arc(cx,cy,ts*0.34,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(40,40,50,0.7)';
    ctx.beginPath(); ctx.arc(cx,cy,ts*0.22,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(220,220,220,0.85)';
    var bitR = ts*0.12, spikes = 6;
    ctx.beginPath();
    for (var i = 0; i < spikes*2; i++) {
      var angle = (i/(spikes*2))*Math.PI*2 - Math.PI/2;
      var rr = (i%2===0)?bitR:bitR*0.5;
      var px = cx+Math.cos(angle)*rr, py = cy+Math.sin(angle)*rr;
      if (i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
    }
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.beginPath(); ctx.arc(cx,cy,ts*0.04,0,Math.PI*2); ctx.fill();
    c.toBlob(function(blob) { blob.arrayBuffer().then(function(buf) { resolve(new Uint8Array(buf)); }); }, 'image/png');
  });
}
function generateCrafterSprite(color, size) {
  return new Promise(function(resolve) {
    var ts = size * 32;
    var c = document.createElement('canvas'); c.width = ts; c.height = ts;
    var ctx = c.getContext('2d');
    var r = parseInt(color.substr(0,2),16)||90, g = parseInt(color.substr(2,2),16)||120, b = parseInt(color.substr(4,2),16)||150;
    var cx = ts/2, cy = ts/2;
    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'; ctx.fillRect(0,0,ts,ts);
    var grad = ctx.createLinearGradient(0,0,ts,ts);
    grad.addColorStop(0,'rgba(255,255,255,0.2)');
    grad.addColorStop(0.5,'rgba(255,255,255,0.05)');
    grad.addColorStop(1,'rgba(0,0,0,0.3)');
    ctx.fillStyle = grad; ctx.fillRect(0,0,ts,ts);
    ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = Math.max(2, ts/14); ctx.strokeRect(1,1,ts-2,ts-2);
    var innerR = ts*0.30;
    ctx.fillStyle = 'rgba(30,30,40,0.7)';
    ctx.beginPath(); ctx.arc(cx,cy,innerR,0,Math.PI*2); ctx.fill();
    var heatGrad = ctx.createRadialGradient(cx,cy,0,cx,cy,innerR);
    heatGrad.addColorStop(0,'rgba(255,200,80,0.9)');
    heatGrad.addColorStop(0.5,'rgba(255,120,40,0.4)');
    heatGrad.addColorStop(1,'rgba(255,80,20,0)');
    ctx.fillStyle = heatGrad;
    ctx.beginPath(); ctx.arc(cx,cy,innerR,0,Math.PI*2); ctx.fill();
    var teeth = 8, ringR = innerR + ts*0.08, toothL = ts*0.05;
    ctx.fillStyle = 'rgba(180,180,190,0.9)';
    for (var i = 0; i < teeth; i++) {
      var a = (i/teeth)*Math.PI*2;
      ctx.save(); ctx.translate(cx,cy); ctx.rotate(a);
      ctx.fillRect(-toothL/2,-ringR-toothL,toothL,toothL);
      ctx.restore();
    }
    ctx.strokeStyle = 'rgba(200,200,210,0.85)'; ctx.lineWidth = Math.max(2, ts/30);
    ctx.beginPath(); ctx.arc(cx,cy,ringR,0,Math.PI*2); ctx.stroke();
    c.toBlob(function(blob) { blob.arrayBuffer().then(function(buf) { resolve(new Uint8Array(buf)); }); }, 'image/png');
  });
}

// ===== IMAGE RESIZE =====
function readAndResizeImage(file, w, h) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        var c = document.createElement('canvas'); c.width = w; c.height = h;
        var ctx = c.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, w, h);
        c.toBlob(function(blob) { blob.arrayBuffer().then(function(buf) { resolve(new Uint8Array(buf)); }); }, 'image/png');
      };
      img.onerror = function() { reject("Failed to load"); };
      img.src = e.target.result;
    };
    reader.onerror = function() { reject("Failed to read"); };
    reader.readAsDataURL(file);
  });
}

// ===== SPRITE UPLOAD TOGGLES =====
["item","liquid","wall","power","turret","drill","crafter","unit"].forEach(function(name) {
  var choice = document.getElementById(name + "SpriteChoice");
  var file = document.getElementById(name + "SpriteFile");
  if (choice && file) {
    choice.addEventListener("change", function() {
      file.style.display = (this.value === "upload") ? "block" : "none";
    });
  }
});

// ===== EXPORT =====
document.getElementById("exportBtn").addEventListener("click", async function() {
  var name = document.getElementById("modName").value;
  var displayName = document.getElementById("modDisplayName").value;
  var author = document.getElementById("modAuthor").value;
  var description = document.getElementById("modDescription").value;
  var version = document.getElementById("modVersion").value;

  var modHjson = 'name: ' + name + '\ndisplayName: ' + displayName + '\nauthor: ' + author + '\ndescription: ' + description + '\nversion: ' + version + '\nminGameVersion: 146\n';
  var files = [{ name: "mod.hjson", data: encode(modHjson) }];
  var readmeBody = '';
  var bundleLines = '';

  // ---- ITEM ----
  var itemName = document.getElementById("itemName").value;
  if (itemName) {
    var itemHjson = 'type: item\nname: ' + itemName + '\ncolor: ' + document.getElementById("itemColor").value + '\nhardness: ' + document.getElementById("itemHardness").value + '\ncost: ' + document.getElementById("itemCost").value + '\nflammability: ' + document.getElementById("itemFlammability").value + '\nexplosiveness: ' + document.getElementById("itemExplosiveness").value + '\nradioactivity: ' + document.getElementById("itemRadioactivity").value + '\ncharge: ' + document.getElementById("itemCharge").value + '\nbuildable: ' + document.getElementById("itemBuildable").value + '\nhidden: ' + document.getElementById("itemHidden").value + '\nalwaysUnlocked: ' + document.getElementById("itemAlwaysUnlocked").value + '\n';
    files.push({ name: "content/items/" + itemName + ".hjson", data: encode(itemHjson) });
    bundleLines += 'item.' + itemName + '.name = ' + (document.getElementById("itemDisplayName").value || itemName) + '\n';
    if (document.getElementById("itemDescription").value) bundleLines += 'item.' + itemName + '.description = ' + document.getElementById("itemDescription").value + '\n';
    if (document.getElementById("itemSpriteChoice").value === "upload") {
      var f = document.getElementById("itemSpriteFile").files[0];
      if (f) files.push({ name: "sprites/" + itemName + ".png", data: await readAndResizeImage(f, 32, 32) });
    } else {
      files.push({ name: "sprites/" + itemName + ".png", data: await generateSprite(document.getElementById("itemColor").value) });
    }
    readmeBody += '- content/items/' + itemName + '.hjson\n- sprites/' + itemName + '.png (32x32)\n';
  }

  // ---- LIQUID ----
  var liquidName = document.getElementById("liquidName").value;
  if (liquidName) {
    var liquidHjson = 'type: liquid\nname: ' + liquidName + '\ncolor: ' + document.getElementById("liquidColor").value + '\ngasColor: ' + document.getElementById("liquidGasColor").value + '\nbarColor: ' + document.getElementById("liquidBarColor").value + '\nlightColor: ' + document.getElementById("liquidLightColor").value + '\ngas: ' + document.getElementById("liquidGas").value + '\ntemperature: ' + document.getElementById("liquidTemperature").value + '\nheatCapacity: ' + document.getElementById("liquidHeatCapacity").value + '\nviscosity: ' + document.getElementById("liquidViscosity").value + '\nflammability: ' + document.getElementById("liquidFlammability").value + '\nexplosiveness: ' + document.getElementById("liquidExplosiveness").value + '\nboilPoint: ' + document.getElementById("liquidBoilPoint").value + '\ncoolant: ' + document.getElementById("liquidCoolant").value + '\nblockReactive: ' + document.getElementById("liquidBlockReactive").value + '\nmoveThroughBlocks: ' + document.getElementById("liquidMoveThroughBlocks").value + '\nincinerable: ' + document.getElementById("liquidIncinerable").value + '\ncapPuddles: ' + document.getElementById("liquidCapPuddles").value + '\nhidden: ' + document.getElementById("liquidHidden").value + '\n';
    var cso = document.getElementById("liquidCanStayOn").value.trim();
    if (cso) { var sl = cso.split(",").map(function(s) { return '"' + s.trim() + '"'; }); liquidHjson += 'canStayOn: [' + sl.join(", ") + ']\n'; }
    var eff = document.getElementById("liquidEffect").value.trim();
    if (eff) liquidHjson += 'effect: ' + eff + '\n';
    var pe = document.getElementById("liquidParticleEffect").value.trim();
    if (pe) { liquidHjson += 'particleEffect: ' + pe + '\n'; liquidHjson += 'particleSpacing: ' + document.getElementById("liquidParticleSpacing").value + '\n'; }
    files.push({ name: "content/liquids/" + liquidName + ".hjson", data: encode(liquidHjson) });
    bundleLines += 'liquid.' + liquidName + '.name = ' + (document.getElementById("liquidDisplayName").value || liquidName) + '\n';
    if (document.getElementById("liquidDescription").value) bundleLines += 'liquid.' + liquidName + '.description = ' + document.getElementById("liquidDescription").value + '\n';
    if (document.getElementById("liquidSpriteChoice").value === "upload") {
      var f2 = document.getElementById("liquidSpriteFile").files[0];
      if (f2) files.push({ name: "sprites/" + liquidName + ".png", data: await readAndResizeImage(f2, 32, 32) });
    } else {
      files.push({ name: "sprites/" + liquidName + ".png", data: await generateSprite(document.getElementById("liquidColor").value) });
    }
    readmeBody += '- content/liquids/' + liquidName + '.hjson\n- sprites/' + liquidName + '.png (32x32)\n';
  }

  // ---- WALL ----
  var wallName = document.getElementById("wallName").value;
  if (wallName) {
    var wallSize = Math.max(1, Math.min(16, parseInt(document.getElementById("wallSize").value) || 1));
    var wallHjson = 'type: wall\nname: ' + wallName + '\ncolor: ' + document.getElementById("wallColor").value + '\nsize: ' + wallSize + '\nhealth: ' + document.getElementById("wallHealth").value + '\narmor: ' + document.getElementById("wallArmor").value + '\ncategory: ' + document.getElementById("wallCategory").value + '\nbuildable: ' + document.getElementById("wallBuildable").value + '\nalwaysUnlocked: ' + document.getElementById("wallAlwaysUnlocked").value + '\nhidden: ' + document.getElementById("wallHidden").value + '\n';
    var wre = document.getElementById("wallRequirements").value.trim();
    if (wre) {
      var wrep = wre.split(",").map(function(p) { return p.trim(); });
      wallHjson += 'requirements: [\n';
      for (var wi = 0; wi < wrep.length; wi++) {
        var wp = wrep[wi].split("/");
        if (wp.length === 2) wallHjson += '  ' + wp[0].trim() + '/' + wp[1].trim() + '\n';
      }
      wallHjson += ']\n';
    }
    var lc = parseFloat(document.getElementById("wallLightningChance").value) || 0;
    if (lc > 0) wallHjson += 'lightningChance: ' + lc + '\nlightningDamage: ' + document.getElementById("wallLightningDamage").value + '\nlightningColor: ' + document.getElementById("wallLightningColor").value + '\n';
    var sh = parseInt(document.getElementById("wallShieldHealth").value) || 0;
    if (sh > 0) wallHjson += 'shieldHealth: ' + sh + '\n';
    wallHjson = blockExtras("wall", wallHjson);
    files.push({ name: "content/blocks/" + wallName + ".hjson", data: encode(wallHjson) });
    bundleLines += 'block.' + wallName + '.name = ' + (document.getElementById("wallDisplayName").value || wallName) + '\n';
    if (document.getElementById("wallDescription").value) bundleLines += 'block.' + wallName + '.description = ' + document.getElementById("wallDescription").value + '\n';
    var wspr = wallSize * 32;
    if (document.getElementById("wallSpriteChoice").value === "upload") {
      var f3 = document.getElementById("wallSpriteFile").files[0];
      if (f3) files.push({ name: "sprites/" + wallName + ".png", data: await readAndResizeImage(f3, wspr, wspr) });
    } else {
      var gen = await generateWallSprite(document.getElementById("wallColor").value);
      if (wspr !== 32) {
        var blb = new Blob([gen], { type: "image/png" });
        var fl = new File([blb], "wall.png", { type: "image/png" });
        gen = await readAndResizeImage(fl, wspr, wspr);
      }
      files.push({ name: "sprites/" + wallName + ".png", data: gen });
    }
    readmeBody += '- content/blocks/' + wallName + '.hjson\n- sprites/' + wallName + '.png (' + wspr + 'x' + wspr + ')\n';
  }

  // ---- POWER ----
  var powerName = document.getElementById("powerName").value;
  if (powerName) {
    var pKind = document.getElementById("powerKind").value;
    var pSize = Math.max(1, Math.min(16, parseInt(document.getElementById("powerSize").value) || 1));
    var pType = "SolarGenerator";
    if (pKind === "thermal") pType = "ThermalGenerator";
    else if (pKind === "consume") pType = "ConsumeGenerator";
    else if (pKind === "node") pType = "PowerNode";
    else if (pKind === "battery") pType = "Battery";
    var powerHjson = 'type: ' + pType + '\nname: ' + powerName + '\ncolor: ' + document.getElementById("powerColor").value + '\nsize: ' + pSize + '\nhealth: ' + document.getElementById("powerHealth").value + '\narmor: ' + document.getElementById("powerArmor").value + '\ncategory: power\nbuildable: ' + document.getElementById("powerBuildable").value + '\nhidden: ' + document.getElementById("powerHidden").value + '\nalwaysUnlocked: ' + document.getElementById("powerAlwaysUnlocked").value + '\n';
    var pre = document.getElementById("powerRequirements").value.trim();
    if (pre) {
      var prep = pre.split(",").map(function(p) { return p.trim(); });
      powerHjson += 'requirements: [\n';
      for (var pi = 0; pi < prep.length; pi++) {
        var pp = prep[pi].split("/");
        if (pp.length === 2) powerHjson += '  ' + pp[0].trim() + '/' + pp[1].trim() + '\n';
      }
      powerHjson += ']\n';
    }
    var pAlw = document.getElementById("powerAlwaysUnlocked").value;
    if (pAlw !== "true") {
      var prP = document.getElementById("powerResearchParent").value.trim();
      var prR = document.getElementById("powerResearchRequirements").value.trim();
      if (prP || prR) {
        powerHjson += 'research: {\n';
        if (prP) powerHjson += '  parent: ' + prP + '\n';
        if (prR) {
          var prQ = prR.split(",").map(function(p) { return p.trim(); });
          powerHjson += '  requirements: [\n';
          for (var pri = 0; pri < prQ.length; pri++) {
            var prp = prQ[pri].split("/");
            if (prp.length === 2) powerHjson += '    ' + prp[0].trim() + '/' + prp[1].trim() + '\n';
          }
          powerHjson += '  ]\n';
        }
        powerHjson += '}\n';
      }
    }
    if (pKind === "solar") {
      var pp1 = parseFloat(document.getElementById("powerProduction").value) || 0;
      powerHjson += 'powerProduction: ' + (pp1 / 60).toFixed(4) + '\n';
    } else if (pKind === "thermal") {
      var pp2 = parseFloat(document.getElementById("powerThermalProduction").value) || 0;
      powerHjson += 'powerProduction: ' + (pp2 / 60).toFixed(4) + '\n';
      powerHjson += 'minEfficiency: ' + (parseFloat(document.getElementById("powerMinEfficiency").value) || 0) + '\n';
      powerHjson += 'floating: true\n';
    } else if (pKind === "consume") {
      var pp3 = parseFloat(document.getElementById("powerConsumeProduction").value) || 0;
      powerHjson += 'powerProduction: ' + (pp3 / 60).toFixed(4) + '\n';
      powerHjson += 'itemDuration: ' + (parseInt(document.getElementById("powerItemDuration").value) || 120) + '\n';
      powerHjson += 'consumes: {\n  items: {\n    ' + document.getElementById("powerConsumeType").value + ': 1\n  }\n}\n';
    } else if (pKind === "node") {
      var lc2 = document.getElementById("powerLaserColor").value;
      powerHjson += 'laserRange: ' + (parseFloat(document.getElementById("powerLaserRange").value) || 6) + '\n';
      powerHjson += 'maxNodes: ' + (parseInt(document.getElementById("powerMaxNodes").value) || 10) + '\n';
      powerHjson += 'laserColor1: ' + lc2 + '\nlaserColor2: ' + lc2 + '\n';
    } else if (pKind === "battery") {
      powerHjson += 'powerCapacity: ' + (parseInt(document.getElementById("powerCapacity").value) || 4000) + '\n';
      powerHjson += 'emptyLightColor: ' + document.getElementById("powerEmptyColor").value + '\n';
      powerHjson += 'fullLightColor: ' + document.getElementById("powerFullColor").value + '\n';
    }
    powerHjson = blockExtras("power", powerHjson);
    files.push({ name: "content/blocks/" + powerName + ".hjson", data: encode(powerHjson) });
    bundleLines += 'block.' + powerName + '.name = ' + (document.getElementById("powerDisplayName").value || powerName) + '\n';
    if (document.getElementById("powerDescription").value) bundleLines += 'block.' + powerName + '.description = ' + document.getElementById("powerDescription").value + '\n';
    var pspr = pSize * 32;
    if (document.getElementById("powerSpriteChoice").value === "upload") {
      var pf = document.getElementById("powerSpriteFile").files[0];
      if (pf) files.push({ name: "sprites/" + powerName + ".png", data: await readAndResizeImage(pf, pspr, pspr) });
    } else {
      files.push({ name: "sprites/" + powerName + ".png", data: await generatePowerSprite(document.getElementById("powerColor").value, pSize, pKind) });
    }
    readmeBody += '- content/blocks/' + powerName + '.hjson\n- sprites/' + powerName + '.png (' + pspr + 'x' + pspr + ')\n';
  }

  // ---- TURRET ----
  var turretName = document.getElementById("turretName").value;
  if (turretName) {
    var tKind = document.getElementById("turretKind").value;
    var tSize = Math.max(1, Math.min(16, parseInt(document.getElementById("turretSize").value) || 1));
    var tType = "ItemTurret";
    if (tKind === "power") tType = "PowerTurret";
    else if (tKind === "laser") tType = "LaserTurret";
    var turretHjson = 'type: ' + tType + '\nname: ' + turretName + '\ncolor: ' + document.getElementById("turretColor").value + '\nsize: ' + tSize + '\nhealth: ' + document.getElementById("turretHealth").value + '\narmor: ' + document.getElementById("turretArmor").value + '\ncategory: turret\nrange: ' + document.getElementById("turretRange").value + '\nreload: ' + document.getElementById("turretReload").value + '\nshootCone: ' + document.getElementById("turretShootCone").value + '\ninaccuracy: ' + document.getElementById("turretInaccuracy").value + '\ntargetAir: ' + document.getElementById("turretTargetAir").value + '\ntargetGround: ' + document.getElementById("turretTargetGround").value + '\ntargetBlocks: ' + document.getElementById("turretTargetBlocks").value + '\nbuildable: ' + document.getElementById("turretBuildable").value + '\nhidden: ' + document.getElementById("turretHidden").value + '\nalwaysUnlocked: ' + document.getElementById("turretAlwaysUnlocked").value + '\n';
    var tre = document.getElementById("turretRequirements").value.trim();
    if (tre) {
      var trep = tre.split(",").map(function(p) { return p.trim(); });
      turretHjson += 'requirements: [\n';
      for (var ti = 0; ti < trep.length; ti++) {
        var tp = trep[ti].split("/");
        if (tp.length === 2) turretHjson += '  ' + tp[0].trim() + '/' + tp[1].trim() + '\n';
      }
      turretHjson += ']\n';
    }
    var tAlw = document.getElementById("turretAlwaysUnlocked").value;
    if (tAlw !== "true") {
      var trP = document.getElementById("turretResearchParent").value.trim();
      var trR = document.getElementById("turretResearchRequirements").value.trim();
      if (trP || trR) {
        turretHjson += 'research: {\n';
        if (trP) turretHjson += '  parent: ' + trP + '\n';
        if (trR) {
          var trQ = trR.split(",").map(function(p) { return p.trim(); });
          turretHjson += '  requirements: [\n';
          for (var tri = 0; tri < trQ.length; tri++) {
            var trp = trQ[tri].split("/");
            if (trp.length === 2) turretHjson += '    ' + trp[0].trim() + '/' + trp[1].trim() + '\n';
          }
          turretHjson += '  ]\n';
        }
        turretHjson += '}\n';
      }
    }
    if (tKind !== "item") {
      var tPw = parseFloat(document.getElementById("turretConsumesPower").value) || 0;
      var tLiq = document.getElementById("turretConsumesLiquid").value.trim();
      if (tPw > 0 || tLiq) {
        turretHjson += 'consumes: {\n';
        if (tPw > 0) turretHjson += '  power: ' + tPw + '\n';
        if (tLiq) {
          var tl = tLiq.split(",").map(function(p) { return p.trim(); });
          turretHjson += '  liquids: [\n';
          for (var tli = 0; tli < tl.length; tli++) {
            var tlp = tl[tli].split("/");
            if (tlp.length === 2) turretHjson += '    ' + tlp[0].trim() + '/' + tlp[1].trim() + '\n';
          }
          turretHjson += '  ]\n';
        }
        turretHjson += '}\n';
      }
    }
    if (tKind === "item") {
      var a1 = document.getElementById("turretAmmoItem1").value.trim();
      var a2 = document.getElementById("turretAmmoItem2").value.trim();
      if (a1) {
        turretHjson += 'ammoTypes: {\n';
        turretHjson += '  ' + a1 + ': {\n';
        turretHjson += '    speed: ' + document.getElementById("turretAmmoSpeed1").value + '\n';
        turretHjson += '    lifetime: ' + document.getElementById("turretAmmoLifetime1").value + '\n';
        turretHjson += '    damage: ' + document.getElementById("turretAmmoDamage1").value + '\n';
        turretHjson += '    ammoMultiplier: ' + document.getElementById("turretAmmoMultiplier1").value + '\n';
        turretHjson += '  }\n';
        if (a2) {
          turretHjson += '  ' + a2 + ': {\n';
          turretHjson += '    speed: ' + document.getElementById("turretAmmoSpeed2").value + '\n';
          turretHjson += '    lifetime: ' + document.getElementById("turretAmmoLifetime2").value + '\n';
          turretHjson += '    damage: ' + document.getElementById("turretAmmoDamage2").value + '\n';
          turretHjson += '    ammoMultiplier: ' + document.getElementById("turretAmmoMultiplier2").value + '\n';
          turretHjson += '  }\n';
        }
        turretHjson += '}\n';
      }
    } else {
      turretHjson += 'shootType: {\n';
      turretHjson += '  speed: ' + document.getElementById("turretShootSpeed").value + '\n';
      turretHjson += '  lifetime: ' + document.getElementById("turretShootLifetime").value + '\n';
      turretHjson += '  damage: ' + document.getElementById("turretShootDamage").value + '\n';
      var sd = parseFloat(document.getElementById("turretShootSplashDamage").value) || 0;
      if (sd > 0) {
        turretHjson += '  splashDamage: ' + sd + '\n';
        turretHjson += '  splashDamageRadius: ' + document.getElementById("turretShootSplashRadius").value + '\n';
      }
      if (tKind === "laser") turretHjson += '  pierce: true\n';
      turretHjson += '}\n';
      if (tKind === "laser") {
        turretHjson += 'shootDuration: ' + document.getElementById("turretShootDuration").value + '\n';
        turretHjson += 'firingMoveFract: ' + document.getElementById("turretFiringMoveFract").value + '\n';
      }
    }
    turretHjson = blockExtras("turret", turretHjson);
    files.push({ name: "content/blocks/" + turretName + ".hjson", data: encode(turretHjson) });
    bundleLines += 'block.' + turretName + '.name = ' + (document.getElementById("turretDisplayName").value || turretName) + '\n';
    if (document.getElementById("turretDescription").value) bundleLines += 'block.' + turretName + '.description = ' + document.getElementById("turretDescription").value + '\n';
    var tspr = tSize * 32;
    if (document.getElementById("turretSpriteChoice").value === "upload") {
      var tf = document.getElementById("turretSpriteFile").files[0];
      if (tf) files.push({ name: "sprites/" + turretName + ".png", data: await readAndResizeImage(tf, tspr, tspr) });
    } else {
      files.push({ name: "sprites/" + turretName + ".png", data: await generateTurretSprite(document.getElementById("turretColor").value, tSize, tKind) });
    }
    readmeBody += '- content/blocks/' + turretName + '.hjson\n- sprites/' + turretName + '.png (' + tspr + 'x' + tspr + ')\n';
  }

  // ---- DRILL ----
  var drillName = document.getElementById("drillName").value;
  if (drillName) {
    var dSize = Math.max(1, Math.min(16, parseInt(document.getElementById("drillSize").value) || 1));
    var drillHjson = 'type: Drill\nname: ' + drillName + '\ncolor: ' + document.getElementById("drillColor").value + '\nsize: ' + dSize + '\nhealth: ' + document.getElementById("drillHealth").value + '\narmor: ' + document.getElementById("drillArmor").value + '\ncategory: production\ntier: ' + document.getElementById("drillTier").value + '\ndrillTime: ' + document.getElementById("drillTime").value + '\nhardnessDrillMultiplier: ' + document.getElementById("drillHardnessMultiplier").value + '\nliquidBoostIntensity: ' + document.getElementById("drillLiquidBoostIntensity").value + '\nbuildable: ' + document.getElementById("drillBuildable").value + '\nhidden: ' + document.getElementById("drillHidden").value + '\nalwaysUnlocked: ' + document.getElementById("drillAlwaysUnlocked").value + '\n';
    var dre = document.getElementById("drillRequirements").value.trim();
    if (dre) {
      var drep = dre.split(",").map(function(p) { return p.trim(); });
      drillHjson += 'requirements: [\n';
      for (var di = 0; di < drep.length; di++) {
        var dp = drep[di].split("/");
        if (dp.length === 2) drillHjson += '  ' + dp[0].trim() + '/' + dp[1].trim() + '\n';
      }
      drillHjson += ']\n';
    }
    var dAlw = document.getElementById("drillAlwaysUnlocked").value;
    if (dAlw !== "true") {
      var drP = document.getElementById("drillResearchParent").value.trim();
      var drR = document.getElementById("drillResearchRequirements").value.trim();
      if (drP || drR) {
        drillHjson += 'research: {\n';
        if (drP) drillHjson += '  parent: ' + drP + '\n';
        if (drR) {
          var drQ = drR.split(",").map(function(p) { return p.trim(); });
          drillHjson += '  requirements: [\n';
          for (var dri = 0; dri < drQ.length; dri++) {
            var drp = drQ[dri].split("/");
            if (drp.length === 2) drillHjson += '    ' + drp[0].trim() + '/' + drp[1].trim() + '\n';
          }
          drillHjson += '  ]\n';
        }
        drillHjson += '}\n';
      }
    }
    var dPw = parseFloat(document.getElementById("drillConsumesPower").value) || 0;
    var dLiq = document.getElementById("drillConsumesLiquid").value.trim();
    if (dPw > 0 || dLiq) {
      drillHjson += 'consumes: {\n';
      if (dPw > 0) drillHjson += '  power: ' + dPw + '\n';
      if (dLiq) {
        var dl = dLiq.split(",").map(function(p) { return p.trim(); });
        drillHjson += '  liquids: [\n';
        for (var dli = 0; dli < dl.length; dli++) {
          var dlp = dl[dli].split("/");
          if (dlp.length === 2) drillHjson += '    ' + dlp[0].trim() + '/' + dlp[1].trim() + '\n';
        }
        drillHjson += '  ]\n';
      }
      drillHjson += '}\n';
    }
    drillHjson = blockExtras("drill", drillHjson);
    files.push({ name: "content/blocks/" + drillName + ".hjson", data: encode(drillHjson) });
    bundleLines += 'block.' + drillName + '.name = ' + (document.getElementById("drillDisplayName").value || drillName) + '\n';
    if (document.getElementById("drillDescription").value) bundleLines += 'block.' + drillName + '.description = ' + document.getElementById("drillDescription").value + '\n';
    var dspr = dSize * 32;
    if (document.getElementById("drillSpriteChoice").value === "upload") {
      var df = document.getElementById("drillSpriteFile").files[0];
      if (df) files.push({ name: "sprites/" + drillName + ".png", data: await readAndResizeImage(df, dspr, dspr) });
    } else {
      files.push({ name: "sprites/" + drillName + ".png", data: await generateDrillSprite(document.getElementById("drillColor").value, dSize) });
    }
    readmeBody += '- content/blocks/' + drillName + '.hjson\n- sprites/' + drillName + '.png (' + dspr + 'x' + dspr + ')\n';
  }

  // ---- CRAFTER ----
  var crafterName = document.getElementById("crafterName").value;
  if (crafterName) {
    var cSize = Math.max(1, Math.min(16, parseInt(document.getElementById("crafterSize").value) || 1));
    var crafterHjson = 'type: GenericCrafter\nname: ' + crafterName + '\ncolor: ' + document.getElementById("crafterColor").value + '\nsize: ' + cSize + '\nhealth: ' + document.getElementById("crafterHealth").value + '\narmor: ' + document.getElementById("crafterArmor").value + '\ncategory: ' + document.getElementById("crafterCategory").value + '\ncraftTime: ' + document.getElementById("crafterCraftTime").value + '\nbuildable: ' + document.getElementById("crafterBuildable").value + '\nhidden: ' + document.getElementById("crafterHidden").value + '\nalwaysUnlocked: ' + document.getElementById("crafterAlwaysUnlocked").value + '\n';
    var co1 = document.getElementById("crafterOutputItem1").value.trim();
    var ca1 = parseInt(document.getElementById("crafterOutputAmount1").value) || 1;
    var co2 = document.getElementById("crafterOutputItem2").value.trim();
    var ca2 = parseInt(document.getElementById("crafterOutputAmount2").value) || 1;
    if (co1 && !co2) {
      crafterHjson += 'outputItem: {\n  item: ' + co1 + '\n  amount: ' + ca1 + '\n}\n';
    } else if (co1 && co2) {
      crafterHjson += 'outputItems: [\n  {\n    item: ' + co1 + '\n    amount: ' + ca1 + '\n  }\n  {\n    item: ' + co2 + '\n    amount: ' + ca2 + '\n  }\n]\n';
    }
    var col = document.getElementById("crafterOutputLiquid").value.trim();
    var colA = parseFloat(document.getElementById("crafterOutputLiquidAmount").value) || 0;
    if (col && colA > 0) {
      crafterHjson += 'outputLiquid: {\n  liquid: ' + col + '\n  amount: ' + colA + '\n}\n';
    }
    var cre = document.getElementById("crafterRequirements").value.trim();
    if (cre) {
      var crep = cre.split(",").map(function(p) { return p.trim(); });
      crafterHjson += 'requirements: [\n';
      for (var ci = 0; ci < crep.length; ci++) {
        var cp = crep[ci].split("/");
        if (cp.length === 2) crafterHjson += '  ' + cp[0].trim() + '/' + cp[1].trim() + '\n';
      }
      crafterHjson += ']\n';
    }
    var cAlw = document.getElementById("crafterAlwaysUnlocked").value;
    if (cAlw !== "true") {
      var crP = document.getElementById("crafterResearchParent").value.trim();
      var crR = document.getElementById("crafterResearchRequirements").value.trim();
      if (crP || crR) {
        crafterHjson += 'research: {\n';
        if (crP) crafterHjson += '  parent: ' + crP + '\n';
        if (crR) {
          var crQ = crR.split(",").map(function(p) { return p.trim(); });
          crafterHjson += '  requirements: [\n';
          for (var cri = 0; cri < crQ.length; cri++) {
            var crp = crQ[cri].split("/");
            if (crp.length === 2) crafterHjson += '    ' + crp[0].trim() + '/' + crp[1].trim() + '\n';
          }
          crafterHjson += '  ]\n';
        }
        crafterHjson += '}\n';
      }
    }
    var cInItems = document.getElementById("crafterConsumesItems").value.trim();
    var cInLiquids = document.getElementById("crafterConsumesLiquids").value.trim();
    var cInPower = parseFloat(document.getElementById("crafterConsumesPower").value) || 0;
    if (cInItems || cInLiquids || cInPower > 0) {
      crafterHjson += 'consumes: {\n';
      if (cInPower > 0) crafterHjson += '  power: ' + cInPower + '\n';
      if (cInItems) {
        var ciList = cInItems.split(",").map(function(p) { return p.trim(); });
        crafterHjson += '  items: [\n';
        for (var cii = 0; cii < ciList.length; cii++) {
          var cip = ciList[cii].split("/");
          if (cip.length === 2) crafterHjson += '    ' + cip[0].trim() + '/' + cip[1].trim() + '\n';
        }
        crafterHjson += '  ]\n';
      }
      if (cInLiquids) {
        var clList = cInLiquids.split(",").map(function(p) { return p.trim(); });
        crafterHjson += '  liquids: [\n';
        for (var cli = 0; cli < clList.length; cli++) {
          var clp = clList[cli].split("/");
          if (clp.length === 2) crafterHjson += '    ' + clp[0].trim() + '/' + clp[1].trim() + '\n';
        }
        crafterHjson += '  ]\n';
      }
      crafterHjson += '}\n';
    }
    crafterHjson = blockExtras("crafter", crafterHjson);
    files.push({ name: "content/blocks/" + crafterName + ".hjson", data: encode(crafterHjson) });
    bundleLines += 'block.' + crafterName + '.name = ' + (document.getElementById("crafterDisplayName").value || crafterName) + '\n';
    if (document.getElementById("crafterDescription").value) bundleLines += 'block.' + crafterName + '.description = ' + document.getElementById("crafterDescription").value + '\n';
    var cspr = cSize * 32;
    if (document.getElementById("crafterSpriteChoice").value === "upload") {
      var cf = document.getElementById("crafterSpriteFile").files[0];
      if (cf) files.push({ name: "sprites/" + crafterName + ".png", data: await readAndResizeImage(cf, cspr, cspr) });
    } else {
      files.push({ name: "sprites/" + crafterName + ".png", data: await generateCrafterSprite(document.getElementById("crafterColor").value, cSize) });
    }
    readmeBody += '- content/blocks/' + crafterName + '.hjson\n- sprites/' + crafterName + '.png (' + cspr + 'x' + cspr + ')\n';
  }

  // ---- UNIT ----
  if (window.__unitExport) {
    var ures = await window.__unitExport();
    if (ures) {
      for (var ui = 0; ui < ures.files.length; ui++) files.push(ures.files[ui]);
      bundleLines += ures.bundleLines;
      readmeBody += ures.readmeBody;
    }
  }

  if (bundleLines) files.push({ name: "bundles/bundle.properties", data: encode(bundleLines) });

  var readme = 'Mindustry Mod: ' + (displayName || name) + '\n==========================================\n\nHOW TO INSTALL:\n1. Do NOT unzip this file.\n2. Open Mindustry.\n3. Go to Play -> Mods -> Import Mod.\n4. Select this .zip file.\n5. Enable it in the mod list.\n\nWHAT IS INSIDE THIS ZIP:\n- mod.hjson\n' + readmeBody + '\n';
  files.push({ name: "README.txt", data: encode(readme) });

  var blob = makeZip(files);
  var link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = (name || "my-mod") + ".zip";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});