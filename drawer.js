// ===== DRAWER.JS =====
(function() {

  window.DRAWERS = [
    { value: "DrawDefault", label: "Default (basic block)" },
    { value: "DrawRegion", label: "Region (plain texture)" },
    { value: "DrawGlowRegion", label: "Glow Region (emissive glow)" },
    { value: "DrawMulti", label: "Multi (layered drawers)" },
    { value: "DrawTurret", label: "Turret (rotating head)" },
    { value: "DrawCrafter", label: "Crafter (spinning gear)" },
    { value: "DrawDrill", label: "Drill (spinning bit)" },
    { value: "DrawPump", label: "Pump (liquid intake)" },
    { value: "DrawBridge", label: "Bridge (extending arm)" },
    { value: "DrawPower", label: "Power (uses power lines)" },
    { value: "DrawPowerGraph", label: "Power Graph (grid overlay)" },
    { value: "DrawBattery", label: "Battery (shows charge bar)" },
    { value: "DrawNode", label: "Node (shows connections)" },
    { value: "DrawCrucible", label: "Crucible (heat glow)" },
    { value: "DrawSmelter", label: "Smelter (fire animation)" },
    { value: "DrawAcceptor", label: "Acceptor (item input port)" },
    { value: "DrawConveyor", label: "Conveyor (moving belt)" },
    { value: "DrawLiquid", label: "Liquid (pipe)" },
    { value: "DrawPayload", label: "Payload (payload carrier)" },
    { value: "DrawTeam", label: "Team (colored by team)" },
    { value: "DrawSideRegion", label: "Side Region" },
    { value: "DrawGlowSide", label: "Glow Side (side glow)" },
    { value: "DrawHeat", label: "Heat (heat overlay)" },
    { value: "DrawHeatInput", label: "Heat Input (input glow)" },
    { value: "DrawHeatOutput", label: "Heat Output (output glow)" },
    // ===== NEW =====
    { value: "DrawArcSmelter", label: "Arc Smelter (electric arcs)" },
    { value: "DrawHeatRegion", label: "Heat Region (heat texture)" },
    { value: "DrawPistons", label: "Pistons (pumping arms)" },
    { value: "DrawCultivator", label: "Cultivator (expanding rings)" },
    { value: "DrawShape", label: "Shape (rotating polygon)" },
    { value: "DrawWeave", label: "Weave (woven lines)" },
    { value: "DrawParticles", label: "Particles (floating dots)" },
    { value: "DrawSoftShadow", label: "Soft Shadow (drop shadow)" },
    { value: "DrawIcon", label: "Icon (centered icon)" },
    { value: "DrawCenter", label: "Center (centered texture)" },
    { value: "DrawCenterRegion", label: "Center Region (center region)" },
    { value: "DrawLiquidRegion", label: "Liquid Region (flow overlay)" },
    { value: "DrawLiquidTile", label: "Liquid Tile (tiled liquid)" },
    { value: "DrawBlurSpin", label: "Blur Spin (motion blur)" },
    { value: "DrawRail", label: "Rail (railgun barrel)" },
    { value: "DrawSpin", label: "Spin (spinning turret)" },
    { value: "DrawBase", label: "Base (turret base only)" },
    { value: "DrawGlow", label: "Glow (additive glow layer)" },
    { value: "DrawFade", label: "Fade (fading out)" },
    { value: "DrawSquares", label: "Squares (pixel squares)" },
    { value: "DrawCircles", label: "Circles (expanding rings)" },
    { value: "DrawScanner", label: "Scanner (scanning line)" },
    { value: "DrawPlasma", label: "Plasma (plasma ball)" },
    { value: "DrawStarfield", label: "Starfield (stars)" }
  ];

  window.EFFECTS = [
    { value: "", label: "(none)" },
    { value: "smeltsmoke", label: "smeltsmoke — smoke rising" },
    { value: "smoke", label: "smoke — generic smoke" },
    { value: "craftSmoke", label: "craftSmoke — crafting smoke" },
    { value: "smokeCloud", label: "smokeCloud — big smoke cloud" },
    { value: "fire", label: "fire — flame burst" },
    { value: "hitLaser", label: "hitLaser — laser impact flash" },
    { value: "shootBig", label: "shootBig — big muzzle flash" },
    { value: "shootSmall", label: "shootSmall — small muzzle flash" },
    { value: "sparkShoot", label: "sparkShoot — spark when firing" },
    { value: "mine", label: "mine — mining sparks" },
    { value: "drillSteam", label: "drillSteam — steam puffs" },
    { value: "steam", label: "steam — steam puff" },
    { value: "vapor", label: "vapor — vapor cloud" },
    { value: "blast", label: "blast — explosion ring" },
    { value: "plasticExplosion", label: "plasticExplosion — plastic boom" },
    { value: "spark", label: "spark — electric spark" },
    { value: "hitSpark", label: "hitSpark — bullet hit spark" },
    { value: "shieldBreak", label: "shieldBreak — shield shatter" },
    { value: "heal", label: "heal — healing glow" },
    { value: "drip", label: "drip — liquid drip" },
    { value: "bubble", label: "bubble — bubble burst" },
    { value: "crossExplosion", label: "crossExplosion — cross-shaped blast" },
    { value: "massiveExplosion", label: "massiveExplosion — huge explosion" },
    // ===== NEW =====
    { value: "regen", label: "regen — regenerating sparkles" },
    { value: "burning", label: "burning — fire ticks" },
    { value: "melting", label: "melting — slag drips" },
    { value: "freezing", label: "freezing — ice crystals" },
    { value: "wet", label: "wet — water splashes" },
    { value: "shocked", label: "shocked — electric arcs" },
    { value: "tarred", label: "tarred — tar splatters" },
    { value: "oiled", label: "oiled — oil slicks" },
    { value: "spored", label: "spored — spore bursts" },
    { value: "blasted", label: "blasted — blast marks" },
    { value: "corroded", label: "corroded — acid drips" },
    { value: "electrified", label: "electrified — lightning" },
    { value: "overdrive", label: "overdrive — speed boost" },
    { value: "slow", label: "slow — slowing wisps" },
    { value: "disarmed", label: "disarmed — weapon sparks" },
    { value: "invincible", label: "invincible — shield glow" },
    { value: "boss", label: "boss — dark aura" },
    { value: "unharmed", label: "unharmed — clear glow" }
  ];

  window.SOUNDS = [
    { value: "", label: "(none)" },
    { value: "loopHum", label: "loopHum — electrical hum" },
    { value: "machine", label: "machine — generic machine" },
    { value: "loopSmelter", label: "loopSmelter — smelter roar" },
    { value: "loopDrill", label: "loopDrill — drill rumble" },
    { value: "loopConveyor", label: "loopConveyor — conveyor whir" },
    { value: "loopPump", label: "loopPump — pump hum" },
    { value: "loopFire", label: "loopFire — fire crackle" },
    { value: "loopElectric", label: "loopElectric — electricity buzz" },
    { value: "loopWind", label: "loopWind — wind ambience" },
    { value: "loopBio", label: "loopBio — bio ambience" },
    { value: "loopCrusher", label: "loopCrusher — crusher grind" },
    { value: "loopNuclear", label: "loopNuclear — reactor hum" }
  ];

  // ===== CONVERT NATIVE SELECT → CUSTOM DROPDOWN =====
  function convertOneSelect(sel) {
    if (!sel || sel._customized) return;
    if (sel.parentNode && sel.parentNode.classList &&
        sel.parentNode.classList.contains("custom-select")) return;

    sel._customized = true;
    sel.style.display = "none";

    var wrap = document.createElement("div");
    wrap.className = "custom-select";

    var btn = document.createElement("div");
    btn.className = "custom-select-btn";

    var label = document.createElement("span");
    label.className = "custom-select-label";
    label.textContent = sel.options[sel.selectedIndex] ? sel.options[sel.selectedIndex].text : "";

    var arrow = document.createElement("span");
    arrow.className = "custom-select-arrow";
    arrow.textContent = "▾";

    btn.appendChild(label);
    btn.appendChild(arrow);

    var menu = document.createElement("div");
    menu.className = "custom-select-menu";

    function rebuild() {
      menu.innerHTML = "";
      for (var j = 0; j < sel.options.length; j++) {
        (function(opt) {
          var item = document.createElement("div");
          item.className = "custom-select-item";
          item.textContent = opt.text;
          if (opt.selected) item.classList.add("selected");
          item.addEventListener("click", function(e) {
            e.stopPropagation();
            sel.value = opt.value;
            label.textContent = opt.text;
            var items = menu.querySelectorAll(".custom-select-item");
            for (var k = 0; k < items.length; k++) items[k].classList.remove("selected");
            item.classList.add("selected");
            menu.classList.remove("open");
            btn.classList.remove("open");
            sel.dispatchEvent(new Event("change", { bubbles: true }));
          });
          menu.appendChild(item);
        })(sel.options[j]);
      }
    }
    rebuild();

    btn.addEventListener("click", function(e) {
      e.stopPropagation();
      if (sel.options[sel.selectedIndex]) label.textContent = sel.options[sel.selectedIndex].text;
      rebuild();
      var openMenus = document.querySelectorAll(".custom-select-menu.open");
      for (var k = 0; k < openMenus.length; k++) openMenus[k].classList.remove("open");
      var openBtns = document.querySelectorAll(".custom-select-btn.open");
      for (var k = 0; k < openBtns.length; k++) openBtns[k].classList.remove("open");
      menu.classList.toggle("open");
      btn.classList.toggle("open");
    });

    wrap.appendChild(btn);
    wrap.appendChild(menu);
    sel.parentNode.insertBefore(wrap, sel.nextSibling);
  }

  function convertAllSelects() {
    var selects = document.querySelectorAll("select:not([data-no-custom])");
    for (var i = 0; i < selects.length; i++) convertOneSelect(selects[i]);
  }

  document.addEventListener("click", function() {
    var openMenus = document.querySelectorAll(".custom-select-menu.open");
    for (var k = 0; k < openMenus.length; k++) openMenus[k].classList.remove("open");
    var openBtns = document.querySelectorAll(".custom-select-btn.open");
    for (var k = 0; k < openBtns.length; k++) openBtns[k].classList.remove("open");
  });

  function upgradeForms() {
    ["wall", "power", "turret", "drill", "crafter"].forEach(function(prefix) {
      var drw = document.getElementById(prefix + "Drawer");
      if (drw && drw.tagName === "SELECT" && !drw._fullPopulated) {
        drw._fullPopulated = true;
        drw.innerHTML = window.DRAWERS.map(function(d) {
          return '<option value="' + d.value + '">' + d.label + '</option>';
        }).join('');
        var wrap = drw.parentNode;
        if (wrap && wrap.classList && wrap.classList.contains("custom-select")) {
          var lbl = wrap.querySelector(".custom-select-label");
          if (lbl && drw.options[drw.selectedIndex]) lbl.textContent = drw.options[drw.selectedIndex].text;
        }
      }

      var eff = document.getElementById(prefix + "ActiveEffect");
      if (eff && eff.tagName === "INPUT" && !eff._upgraded) {
        var sel = document.createElement("select");
        sel.id = eff.id;
        sel._upgraded = true;
        sel.innerHTML = window.EFFECTS.map(function(e) {
          return '<option value="' + e.value + '">' + e.label + '</option>';
        }).join('');
        eff.parentNode.replaceChild(sel, eff);
      }

      var snd = document.getElementById(prefix + "AmbientSound");
      if (snd && snd.tagName === "INPUT" && !snd._upgraded) {
        var sel2 = document.createElement("select");
        sel2.id = snd.id;
        sel2._upgraded = true;
        sel2.innerHTML = window.SOUNDS.map(function(s) {
          return '<option value="' + s.value + '">' + s.label + '</option>';
        }).join('');
        snd.parentNode.replaceChild(sel2, snd);
      }
    });
  }

  // ===== EFFECT PREVIEW OVERLAY =====
  function addEffectOverlay(prefix) {
    var spriteCanvas = document.getElementById(prefix + "SpriteCanvas");
    if (!spriteCanvas || spriteCanvas._hasOverlay) return;
    spriteCanvas._hasOverlay = true;

    var parent = spriteCanvas.parentNode;
    if (getComputedStyle(parent).position === "static") parent.style.position = "relative";

    var overlay = document.createElement("canvas");
    overlay.width = spriteCanvas.width;
    overlay.height = spriteCanvas.height;
    overlay.style.position = "absolute";
    overlay.style.pointerEvents = "none";
    overlay.style.display = "none";
    overlay.style.imageRendering = "pixelated";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";

    parent.appendChild(overlay);

    function tick(time) {
      var sec = document.getElementById("section-" + prefix);
      if (sec && sec.classList.contains("active")) {
        var eff = document.getElementById(prefix + "ActiveEffect");
        var name = eff ? eff.value : "";
        if (name) {
          overlay.style.display = "block";
          drawParticleEffect(overlay.getContext("2d"), overlay.width, overlay.height, name, time || 0);
        } else {
          overlay.style.display = "none";
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ===== PARTICLE EFFECT RENDERING =====
  function drawParticleEffect(ctx, W, H, effect, time) {
    ctx.clearRect(0, 0, W, H);
    var t = time / 1000;

    if (effect === "smeltsmoke" || effect === "smoke" || effect === "craftSmoke" || effect === "smokeCloud") {
      var count = (effect === "smokeCloud") ? 7 : 4;
      for (var i = 0; i < count; i++) {
        var phase = ((t * 0.35 + i * 0.22) % 1);
        var x = W * 0.5 + Math.sin(t * 1.5 + i * 1.7) * W * 0.18;
        var y = H * 0.75 - phase * H * 0.7;
        var r = 3 + phase * 9;
        var alpha = (1 - phase) * 0.55;
        ctx.fillStyle = 'rgba(90,90,100,' + alpha + ')';
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
    }
    else if (effect === "fire" || effect === "burning") {
      for (var j = 0; j < 6; j++) {
        var ph = ((t * 0.9 + j * 0.18) % 1);
        var x2 = W * 0.5 + (Math.sin(t * 4 + j * 2) * W * 0.1);
        var y2 = H * 0.75 - ph * H * 0.55;
        var r2 = 3 + ph * 5;
        var a2 = (1 - ph) * 0.85;
        var grad = ctx.createRadialGradient(x2, y2, 0, x2, y2, r2);
        grad.addColorStop(0, 'rgba(255,240,160,' + a2 + ')');
        grad.addColorStop(0.5, 'rgba(255,140,40,' + a2 + ')');
        grad.addColorStop(1, 'rgba(255,40,20,0)');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(x2, y2, r2, 0, Math.PI * 2); ctx.fill();
      }
    }
    else if (effect === "spark" || effect === "hitSpark" || effect === "mine") {
      var n = (effect === "mine") ? 4 : 7;
      for (var k = 0; k < n; k++) {
        var ph2 = ((t * 1.8 + k * 0.28) % 1);
        var ang = (k / n) * Math.PI * 2 + t * 0.5;
        var dist = ph2 * W * 0.35;
        var x3 = W * 0.5 + Math.cos(ang) * dist;
        var y3 = H * 0.5 + Math.sin(ang) * dist;
        var a3 = 1 - ph2;
        ctx.fillStyle = 'rgba(255,240,120,' + a3 + ')';
        ctx.beginPath(); ctx.arc(x3, y3, 2 + (1 - ph2) * 2.5, 0, Math.PI * 2); ctx.fill();
      }
    }
    else if (effect === "hitLaser") {
      var flash = (Math.sin(t * 8) + 1) / 2;
      var lg = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.5);
      lg.addColorStop(0, 'rgba(180,255,180,' + (flash * 0.5) + ')');
      lg.addColorStop(1, 'rgba(100,255,100,0)');
      ctx.fillStyle = lg; ctx.fillRect(0, 0, W, H);
    }
    else if (effect === "shootBig" || effect === "shootSmall") {
      var big = (effect === "shootBig");
      var flash2 = (Math.sin(t * 9) + 1) / 2;
      var r3 = (big ? 20 : 11) * (0.55 + flash2 * 0.45);
      var grad2 = ctx.createRadialGradient(W * 0.5, H * 0.12, 0, W * 0.5, H * 0.12, r3);
      grad2.addColorStop(0, 'rgba(255,255,220,0.95)');
      grad2.addColorStop(0.4, 'rgba(255,200,80,0.6)');
      grad2.addColorStop(1, 'rgba(255,120,40,0)');
      ctx.fillStyle = grad2;
      ctx.beginPath(); ctx.arc(W * 0.5, H * 0.12, r3, 0, Math.PI * 2); ctx.fill();
    }
    else if (effect === "drillSteam" || effect === "steam" || effect === "vapor") {
      for (var m = 0; m < 5; m++) {
        var ph3 = ((t * 0.6 + m * 0.22) % 1);
        var x4 = W * 0.5 + Math.sin(t * 2.5 + m * 1.4) * W * 0.13;
        var y4 = H * 0.7 - ph3 * H * 0.6;
        var r4 = 3 + ph3 * 6;
        var a4 = (1 - ph3) * 0.55;
        ctx.fillStyle = 'rgba(230,235,245,' + a4 + ')';
        ctx.beginPath(); ctx.arc(x4, y4, r4, 0, Math.PI * 2); ctx.fill();
      }
    }
    else if (effect === "blast" || effect === "plasticExplosion" || effect === "massiveExplosion" || effect === "blasted") {
      var speed = (effect === "massiveExplosion") ? 0.55 : 0.9;
      var ph4 = (t * speed) % 1;
      var maxR = (effect === "massiveExplosion") ? W * 0.65 : W * 0.5;
      var r5 = ph4 * maxR;
      var a5 = 1 - ph4;
      ctx.strokeStyle = 'rgba(255,180,60,' + a5 + ')'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(W * 0.5, H * 0.5, r5, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,80,40,' + (a5 * 0.6) + ')'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(W * 0.5, H * 0.5, r5 * 0.7, 0, Math.PI * 2); ctx.stroke();
    }
    else if (effect === "crossExplosion") {
      var ph5 = (t * 0.9) % 1;
      var a6 = 1 - ph5;
      var len = ph5 * W * 0.45;
      ctx.strokeStyle = 'rgba(255,150,60,' + a6 + ')'; ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(W * 0.5 - len, H * 0.5); ctx.lineTo(W * 0.5 + len, H * 0.5);
      ctx.moveTo(W * 0.5, H * 0.5 - len); ctx.lineTo(W * 0.5, H * 0.5 + len);
      ctx.stroke();
    }
    else if (effect === "drip" || effect === "bubble" || effect === "melting" || effect === "corroded") {
      var color = (effect === "melting") ? '255,140,40' : (effect === "corroded") ? '180,255,80' : '120,190,255';
      for (var q = 0; q < 5; q++) {
        var ph6 = ((t * 0.7 + q * 0.2) % 1);
        var x5 = W * 0.2 + (q / 5) * W * 0.6;
        var y5 = (effect === "bubble") ? (H * 0.85 - ph6 * H * 0.55) : (ph6 * H * 0.9);
        var a7 = 1 - ph6;
        ctx.fillStyle = 'rgba(' + color + ',' + a7 + ')';
        ctx.beginPath(); ctx.arc(x5, y5, 3, 0, Math.PI * 2); ctx.fill();
      }
    }
    else if (effect === "heal" || effect === "regen") {
      var green = (effect === "regen") ? '150,255,200' : '140,255,160';
      for (var p = 0; p < 4; p++) {
        var ph7 = ((t * 0.5 + p * 0.25) % 1);
        var x6 = W * 0.5 + Math.sin(t * 1.8 + p * 1.6) * W * 0.22;
        var y6 = H * 0.75 - ph7 * H * 0.65;
        var a8 = 1 - ph7;
        ctx.fillStyle = 'rgba(' + green + ',' + a8 + ')';
        ctx.fillRect(x6 - 4, y6 - 1.5, 8, 3);
        ctx.fillRect(x6 - 1.5, y6 - 4, 3, 8);
      }
    }
    else if (effect === "shieldBreak" || effect === "invincible") {
      var col = (effect === "invincible") ? '180,220,255' : '130,210,255';
      for (var s = 0; s < 8; s++) {
        var ph8 = ((t * 0.85 + s * 0.12) % 1);
        var ang2 = (s / 8) * Math.PI * 2;
        var dist2 = ph8 * W * 0.45;
        var x7 = W * 0.5 + Math.cos(ang2) * dist2;
        var y7 = H * 0.5 + Math.sin(ang2) * dist2;
        var a9 = 1 - ph8;
        ctx.strokeStyle = 'rgba(' + col + ',' + a9 + ')'; ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x7 - 4, y7 - 4); ctx.lineTo(x7 + 4, y7 + 4);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x7 + 4, y7 - 4); ctx.lineTo(x7 - 4, y7 + 4);
        ctx.stroke();
      }
      if (effect === "invincible") {
        var ringPulse = 0.4 + Math.sin(t * 5) * 0.3;
        ctx.strokeStyle = 'rgba(180,220,255,' + ringPulse + ')';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(W * 0.5, H * 0.5, W * 0.42, 0, Math.PI * 2); ctx.stroke();
      }
    }
    else if (effect === "sparkShoot") {
      for (var u = 0; u < 4; u++) {
        var ph9 = ((t * 2.8 + u * 0.25) % 1);
        var ang3 = -Math.PI / 2 + (Math.sin(u * 3.7) * 0.5);
        var x8 = W * 0.5 + Math.cos(ang3) * ph9 * W * 0.4;
        var y8 = H * 0.12 + Math.sin(ang3) * ph9 * W * 0.4;
        var a10 = 1 - ph9;
        ctx.fillStyle = 'rgba(255,240,120,' + a10 + ')';
        ctx.beginPath(); ctx.arc(x8, y8, 2.5, 0, Math.PI * 2); ctx.fill();
      }
    }
    else if (effect === "shocked" || effect === "electrified") {
      var zaps = (effect === "electrified") ? 3 : 2;
      for (var z = 0; z < zaps; z++) {
        var seed = z * 100 + Math.floor(t * 20);
        var x1 = W * 0.2 + Math.random() * W * 0.6;
        var y1 = H * 0.2 + Math.random() * H * 0.6;
        var x2b = x1 + (Math.random() - 0.5) * 30;
        var y2b = y1 + (Math.random() - 0.5) * 30;
        ctx.strokeStyle = 'rgba(180,220,255,' + (0.6 + Math.random() * 0.4) + ')';
        ctx.lineWidth = 2;
        ctx.beginPath();
        var steps = 4;
        for (var st = 0; st <= steps; st++) {
          var ix = x1 + (x2b - x1) * (st / steps) + (Math.random() - 0.5) * 8;
          var iy = y1 + (y2b - y1) * (st / steps) + (Math.random() - 0.5) * 8;
          if (st === 0) ctx.moveTo(ix, iy); else ctx.lineTo(ix, iy);
        }
        ctx.stroke();
      }
    }
    else if (effect === "freezing") {
      for (var fr = 0; fr < 5; fr++) {
        var phF = ((t * 0.5 + fr * 0.2) % 1);
        var xF = W * 0.2 + (fr / 5) * W * 0.6;
        var yF = H * 0.3 + Math.sin(t * 1.5 + fr) * 20;
        var szF = 3 + (1 - phF) * 3;
        ctx.strokeStyle = 'rgba(180,220,255,' + (1 - phF) + ')';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(xF - szF, yF); ctx.lineTo(xF + szF, yF);
        ctx.moveTo(xF, yF - szF); ctx.lineTo(xF, yF + szF);
        ctx.moveTo(xF - szF * 0.7, yF - szF * 0.7); ctx.lineTo(xF + szF * 0.7, yF + szF * 0.7);
        ctx.moveTo(xF + szF * 0.7, yF - szF * 0.7); ctx.lineTo(xF - szF * 0.7, yF + szF * 0.7);
        ctx.stroke();
      }
    }
    else if (effect === "wet") {
      for (var w = 0; w < 4; w++) {
        var phW = ((t * 0.8 + w * 0.25) % 1);
        var xW = W * 0.5 + Math.sin(t * 2 + w * 1.7) * W * 0.2;
        var yW = H * 0.3 + phW * H * 0.4;
        ctx.fillStyle = 'rgba(120,190,255,' + (1 - phW) + ')';
        ctx.beginPath(); ctx.ellipse(xW, yW, 4, 2, 0, 0, Math.PI * 2); ctx.fill();
      }
    }
    else if (effect === "tarred" || effect === "oiled") {
      var tcol = (effect === "tarred") ? '40,30,30' : '60,50,20';
      for (var tq = 0; tq < 5; tq++) {
        var phT = ((t * 0.4 + tq * 0.2) % 1);
        var xT = W * 0.2 + (tq / 5) * W * 0.6 + Math.sin(t * 1.5 + tq) * 5;
        var yT = H * 0.3 + phT * H * 0.5;
        ctx.fillStyle = 'rgba(' + tcol + ',' + (1 - phT) * 0.9 + ')';
        ctx.beginPath(); ctx.ellipse(xT, yT, 5, 3, 0, 0, Math.PI * 2); ctx.fill();
      }
    }
    else if (effect === "spored") {
      for (var sp = 0; sp < 6; sp++) {
        var phS = ((t * 0.6 + sp * 0.16) % 1);
        var xS = W * 0.5 + Math.sin(t * 2 + sp * 1.4) * W * 0.25;
        var yS = H * 0.4 + Math.cos(t * 1.5 + sp) * H * 0.2;
        ctx.fillStyle = 'rgba(200,120,255,' + (1 - phS) + ')';
        ctx.beginPath(); ctx.arc(xS, yS, 3 + (1 - phS) * 4, 0, Math.PI * 2); ctx.fill();
      }
    }
    else if (effect === "overdrive") {
      for (var od = 0; od < 4; od++) {
        var phO = ((t * 1.2 + od * 0.25) % 1);
        var angO = (od / 4) * Math.PI * 2 + t * 2;
        var distO = phO * W * 0.4;
        var xO = W * 0.5 + Math.cos(angO) * distO;
        var yO = H * 0.5 + Math.sin(angO) * distO;
        ctx.fillStyle = 'rgba(255,220,80,' + (1 - phO) + ')';
        ctx.beginPath(); ctx.arc(xO, yO, 3, 0, Math.PI * 2); ctx.fill();
      }
    }
    else if (effect === "slow") {
      for (var sl = 0; sl < 4; sl++) {
        var phS2 = ((t * 0.35 + sl * 0.25) % 1);
        var xS2 = W * 0.5 + Math.sin(t * 1.2 + sl * 1.5) * W * 0.2;
        var yS2 = H * 0.7 - phS2 * H * 0.6;
        ctx.strokeStyle = 'rgba(150,180,220,' + (1 - phS2) + ')';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(xS2, yS2, 5 + phS2 * 8, 0, Math.PI * 2); ctx.stroke();
      }
    }
    else if (effect === "disarmed") {
      for (var da = 0; da < 3; da++) {
        var phD = ((t * 1.5 + da * 0.33) % 1);
        var xD = W * 0.3 + da * W * 0.2;
        var yD = H * 0.3 + Math.sin(t * 3 + da) * 5;
        ctx.strokeStyle = 'rgba(200,200,210,' + (1 - phD) + ')';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(xD - 5, yD - 5); ctx.lineTo(xD + 5, yD + 5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(xD + 5, yD - 5); ctx.lineTo(xD - 5, yD + 5); ctx.stroke();
      }
    }
    else if (effect === "boss") {
      var grd = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.55);
      var pulseB = 0.3 + Math.sin(t * 2) * 0.2;
      grd.addColorStop(0, 'rgba(120,20,40,' + pulseB + ')');
      grd.addColorStop(1, 'rgba(120,20,40,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
    }
    else if (effect === "unharmed") {
      var pulseU = 0.4 + Math.sin(t * 4) * 0.3;
      ctx.strokeStyle = 'rgba(200,240,255,' + pulseU + ')';
      ctx.lineWidth = 2;
      ctx.strokeRect(6, 6, W - 12, H - 12);
    }
    else {
      for (var g = 0; g < 6; g++) {
        var phA = ((t * 0.6 + g * 0.16) % 1);
        var xA = (g / 6) * W + Math.sin(t * 3 + g) * 4;
        var yA = phA * H;
        var aA = 1 - phA;
        ctx.fillStyle = 'rgba(255,255,255,' + (aA * 0.55) + ')';
        ctx.beginPath(); ctx.arc(xA, yA, 2, 0, Math.PI * 2); ctx.fill();
      }
    }
  }

  function apply() {
    upgradeForms();
    convertAllSelects();
    ["wall", "power", "turret", "drill", "crafter"].forEach(addEffectOverlay);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() { setTimeout(apply, 200); });
  } else {
    setTimeout(apply, 200);
  }

  setInterval(function() {
    upgradeForms();
    convertAllSelects();
  }, 1500);
})();