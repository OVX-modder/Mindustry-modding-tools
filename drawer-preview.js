// ===== DRAWER-PREVIEW.JS =====
(function() {

  var animators = {

    DrawDefault: function(ctx, W, H, t) {
      var grd = ctx.createLinearGradient(0, 0, W, H);
      grd.addColorStop(0, '#4a5568');
      grd.addColorStop(1, '#2d3748');
      ctx.fillStyle = grd; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a202c'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fillRect(18, 18, W - 36, 4);
    },

    DrawRegion: function(ctx, W, H, t) {
      ctx.fillStyle = '#4a90d9'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#2c5282'; ctx.lineWidth = 2; ctx.strokeRect(15, 15, W - 30, H - 30);
      var a = 0.5 + Math.sin(t * 3) * 0.5;
      ctx.fillStyle = 'rgba(255,255,255,' + (a * 0.1) + ')';
      ctx.fillRect(15, 15, W - 30, H - 30);
    },

    DrawGlowRegion: function(ctx, W, H, t) {
      var pulse = 0.5 + Math.sin(t * 3) * 0.5;
      ctx.fillStyle = '#4a90d9'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = 'rgba(110,182,255,' + pulse + ')'; ctx.lineWidth = 6;
      ctx.strokeRect(15, 15, W - 30, H - 30);
      var grd = ctx.createRadialGradient(W/2, H/2, W/4, W/2, H/2, W/2);
      grd.addColorStop(0, 'rgba(110,182,255,0)');
      grd.addColorStop(1, 'rgba(110,182,255,' + (pulse * 0.4) + ')');
      ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);
    },

    DrawMulti: function(ctx, W, H, t) {
      var slide = Math.sin(t * 2) * 5;
      ctx.fillStyle = '#2d3748'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.fillStyle = '#4a5568'; ctx.fillRect(15 + slide, 15, W - 30, H - 30);
      ctx.fillStyle = '#718096'; ctx.fillRect(15, 15 + slide, W - 30, H - 30);
      ctx.strokeStyle = '#1a202c'; ctx.lineWidth = 2;
      ctx.strokeRect(15, 15 + slide, W - 30, H - 30);
    },

    DrawTurret: function(ctx, W, H, t) {
      var cx = W / 2, cy = H / 2;
      ctx.fillStyle = '#2d3748'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a202c'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      ctx.fillStyle = '#1a202c';
      ctx.beginPath(); ctx.arc(cx, cy, W * 0.18, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, cy, W * 0.18, 0, Math.PI * 2); ctx.stroke();
      var ang = Math.sin(t * 1.5) * 0.6;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang);
      ctx.fillStyle = '#4a5568'; ctx.fillRect(-5, -W * 0.34, 10, W * 0.34);
      ctx.strokeStyle = '#1a202c'; ctx.lineWidth = 1;
      ctx.strokeRect(-5, -W * 0.34, 10, W * 0.34);
      if (Math.abs(ang) < 0.15 && (t * 2) % 1 < 0.15) {
        ctx.fillStyle = 'rgba(255,240,150,0.9)';
        ctx.beginPath(); ctx.arc(0, -W * 0.34, 8, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
      ctx.fillStyle = '#a0aec0';
      ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
    },

    DrawCrafter: function(ctx, W, H, t) {
      var cx = W / 2, cy = H / 2;
      ctx.fillStyle = '#3d4d5c'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a202c'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      var heat = 0.6 + Math.sin(t * 4) * 0.4;
      var hg = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.3);
      hg.addColorStop(0, 'rgba(255,200,80,' + heat + ')');
      hg.addColorStop(0.5, 'rgba(255,120,40,' + (heat * 0.5) + ')');
      hg.addColorStop(1, 'rgba(255,80,20,0)');
      ctx.fillStyle = hg;
      ctx.beginPath(); ctx.arc(cx, cy, W * 0.3, 0, Math.PI * 2); ctx.fill();
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 1.5);
      ctx.fillStyle = '#a0aec0';
      for (var i = 0; i < 8; i++) {
        var a = (i / 8) * Math.PI * 2;
        ctx.save(); ctx.rotate(a);
        ctx.fillRect(-3, -W * 0.24, 6, 6);
        ctx.restore();
      }
      ctx.strokeStyle = '#a0aec0'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(0, 0, W * 0.24, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
      var spark = (t * 1.5) % 1;
      if (spark < 0.3) {
        ctx.fillStyle = 'rgba(255,240,150,' + (1 - spark / 0.3) + ')';
        ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
      }
    },

    DrawDrill: function(ctx, W, H, t) {
      var cx = W / 2, cy = H / 2;
      ctx.fillStyle = '#5a4a3a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a202c'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#3a2d20'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(cx, cy, W * 0.32, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#2a1f15';
      ctx.beginPath(); ctx.arc(cx, cy, W * 0.26, 0, Math.PI * 2); ctx.fill();
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 5);
      ctx.fillStyle = '#d0d0d0';
      var bitR = W * 0.15;
      ctx.beginPath();
      for (var i = 0; i < 12; i++) {
        var a = (i / 12) * Math.PI * 2;
        var r = (i % 2 === 0) ? bitR : bitR * 0.5;
        var px = Math.cos(a) * r, py = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath(); ctx.fill();
      ctx.restore();
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
    },

    DrawPump: function(ctx, W, H, t) {
      ctx.fillStyle = '#2c4a5a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#0f1f2a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      ctx.fillStyle = 'rgba(80,180,220,0.5)';
      var waveY = H * 0.5 + Math.sin(t * 3) * 5;
      ctx.beginPath();
      ctx.moveTo(20, waveY);
      for (var x = 20; x <= W - 20; x += 5) {
        ctx.lineTo(x, waveY + Math.sin(t * 4 + x * 0.1) * 4);
      }
      ctx.lineTo(W - 20, H - 20); ctx.lineTo(20, H - 20); ctx.closePath(); ctx.fill();
      for (var i = 0; i < 3; i++) {
        var p = ((t * 0.8 + i * 0.33) % 1);
        var ax = W * 0.1 + p * W * 0.35;
        ctx.fillStyle = 'rgba(120,200,240,' + (1 - p) + ')';
        ctx.beginPath();
        ctx.moveTo(ax, H / 2); ctx.lineTo(ax + 12, H / 2 - 6); ctx.lineTo(ax + 12, H / 2 + 6);
        ctx.closePath(); ctx.fill();
      }
    },

    DrawBridge: function(ctx, W, H, t) {
      ctx.fillStyle = '#3a3a44'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a1a24'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      ctx.fillStyle = '#505060'; ctx.fillRect(20, H / 2 - 12, 30, 24);
      var extend = (Math.sin(t * 1.5) + 1) / 2;
      var armLen = 30 + extend * 55;
      ctx.fillStyle = '#707080'; ctx.fillRect(40, H / 2 - 8, armLen, 16);
      ctx.strokeStyle = '#2a2a34'; ctx.lineWidth = 2; ctx.strokeRect(40, H / 2 - 8, armLen, 16);
      ctx.fillStyle = '#9090a0'; ctx.fillRect(40 + armLen, H / 2 - 12, 15, 24);
    },

    DrawPower: function(ctx, W, H, t) {
      ctx.fillStyle = '#2a3a4a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#0f1a24'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      ctx.fillStyle = '#ffd84a';
      ctx.beginPath(); ctx.arc(W / 2, H / 2, 8, 0, Math.PI * 2); ctx.fill();
      var pulse = 0.4 + Math.sin(t * 3) * 0.6;
      ctx.strokeStyle = 'rgba(255,230,120,' + pulse + ')'; ctx.lineWidth = 3;
      for (var i = 0; i < 4; i++) {
        var a = (i / 4) * Math.PI * 2 + t * 0.5;
        ctx.beginPath();
        ctx.moveTo(W / 2 + Math.cos(a) * 10, H / 2 + Math.sin(a) * 10);
        ctx.lineTo(W / 2 + Math.cos(a) * 42, H / 2 + Math.sin(a) * 42);
        ctx.stroke();
      }
    },

    DrawPowerGraph: function(ctx, W, H, t) {
      ctx.fillStyle = '#1a2a3a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = 'rgba(150,180,220,0.15)'; ctx.lineWidth = 1;
      for (var i = 1; i < 4; i++) {
        ctx.beginPath(); ctx.moveTo(15 + i * (W - 30) / 4, 15); ctx.lineTo(15 + i * (W - 30) / 4, H - 15); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(15, 15 + i * (H - 30) / 4); ctx.lineTo(W - 15, 15 + i * (H - 30) / 4); ctx.stroke();
      }
      var pulse = 0.5 + Math.sin(t * 3) * 0.5;
      var pts = [[0.3, 0.4], [0.7, 0.3], [0.5, 0.7], [0.4, 0.5]];
      ctx.strokeStyle = 'rgba(255,220,100,' + pulse + ')'; ctx.lineWidth = 2;
      for (var k = 0; k < pts.length - 1; k++) {
        ctx.beginPath();
        ctx.moveTo(15 + pts[k][0] * (W - 30), 15 + pts[k][1] * (H - 30));
        ctx.lineTo(15 + pts[k + 1][0] * (W - 30), 15 + pts[k + 1][1] * (H - 30));
        ctx.stroke();
      }
      for (var j = 0; j < pts.length; j++) {
        ctx.fillStyle = '#ffd84a';
        ctx.beginPath();
        ctx.arc(15 + pts[j][0] * (W - 30), 15 + pts[j][1] * (H - 30), 5, 0, Math.PI * 2);
        ctx.fill();
      }
    },

    DrawBattery: function(ctx, W, H, t) {
      ctx.fillStyle = '#2a2f3a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a1f2a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      ctx.fillStyle = '#e0e0e0'; ctx.fillRect(40, 30, W - 80, H - 60);
      ctx.fillStyle = '#e0e0e0'; ctx.fillRect(W / 2 - 8, 22, 16, 10);
      var pct = (Math.sin(t * 2) + 1) / 2;
      var innerX = 48, innerY = 38, innerW = W - 96, innerH = H - 76;
      ctx.fillStyle = 'rgba(60,60,70,0.6)'; ctx.fillRect(innerX, innerY, innerW, innerH);
      ctx.fillStyle = 'rgba(120,255,120,0.95)';
      ctx.fillRect(innerX, innerY + innerH * (1 - pct), innerW, innerH * pct);
      ctx.strokeStyle = '#1a1f2a'; ctx.lineWidth = 2; ctx.strokeRect(innerX, innerY, innerW, innerH);
    },

    DrawNode: function(ctx, W, H, t) {
      ctx.fillStyle = '#1a1f2a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.fillStyle = '#ffd84a';
      ctx.beginPath(); ctx.arc(W / 2, H / 2, 10, 0, Math.PI * 2); ctx.fill();
      var satellites = [[0.2, 0.25], [0.8, 0.25], [0.2, 0.75], [0.8, 0.75]];
      var pulse = 0.5 + Math.sin(t * 4) * 0.5;
      for (var i = 0; i < satellites.length; i++) {
        var x = 15 + satellites[i][0] * (W - 30);
        var y = 15 + satellites[i][1] * (H - 30);
        ctx.strokeStyle = 'rgba(150,200,255,' + pulse + ')'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(W / 2, H / 2); ctx.lineTo(x, y); ctx.stroke();
        ctx.fillStyle = '#7bc4ff';
        ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();
      }
    },

    DrawCrucible: function(ctx, W, H, t) {
      ctx.fillStyle = '#3a2a20'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      var heat = 0.6 + Math.sin(t * 3) * 0.4;
      var grd = ctx.createLinearGradient(0, H * 0.6, 0, H - 15);
      grd.addColorStop(0, 'rgba(255,80,20,0)');
      grd.addColorStop(0.5, 'rgba(255,150,40,' + heat + ')');
      grd.addColorStop(1, 'rgba(255,220,80,' + heat + ')');
      ctx.fillStyle = grd; ctx.fillRect(18, H * 0.55, W - 36, H - 73);
      for (var i = 0; i < 3; i++) {
        var p = ((t * 0.7 + i * 0.33) % 1);
        var bx = W * 0.3 + i * W * 0.2 + Math.sin(t * 3 + i) * 4;
        var by = H * 0.85 - p * H * 0.3;
        ctx.fillStyle = 'rgba(255,240,150,' + (1 - p) + ')';
        ctx.beginPath(); ctx.arc(bx, by, 3 + p * 3, 0, Math.PI * 2); ctx.fill();
      }
    },

    DrawSmelter: function(ctx, W, H, t) {
      ctx.fillStyle = '#3a201a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a0f0f'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      for (var i = 0; i < 5; i++) {
        var p = ((t * 1.2 + i * 0.2) % 1);
        var fx = W * 0.25 + i * W * 0.125;
        var fy = H * 0.85 - p * H * 0.5;
        var size = 6 + p * 4;
        var alpha = 1 - p;
        var fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, size);
        fg.addColorStop(0, 'rgba(255,240,150,' + alpha + ')');
        fg.addColorStop(0.5, 'rgba(255,120,40,' + alpha + ')');
        fg.addColorStop(1, 'rgba(255,40,20,0)');
        ctx.fillStyle = fg;
        ctx.beginPath(); ctx.arc(fx, fy, size, 0, Math.PI * 2); ctx.fill();
      }
    },

    DrawAcceptor: function(ctx, W, H, t) {
      ctx.fillStyle = '#3a4a3a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a2a1a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      ctx.fillStyle = '#1a2a1a'; ctx.fillRect(W / 2 - 20, H / 2 - 12, 40, 24);
      var p = (t * 0.8) % 1;
      var slideIn = 15 + (1 - Math.min(1, p * 2)) * 60;
      ctx.fillStyle = '#ffd84a'; ctx.fillRect(slideIn, H / 2 - 6, 14, 12);
      ctx.strokeStyle = '#7a6010'; ctx.lineWidth = 1; ctx.strokeRect(slideIn, H / 2 - 6, 14, 12);
    },

    DrawConveyor: function(ctx, W, H, t) {
      ctx.fillStyle = '#3a3a3a'; ctx.fillRect(15, H / 2 - 18, W - 30, 36);
      ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 3; ctx.strokeRect(15, H / 2 - 18, W - 30, 36);
      var offset = (t * 40) % 20;
      ctx.strokeStyle = '#6a6a6a'; ctx.lineWidth = 2;
      for (var i = -1; i < 8; i++) {
        var x = 15 + i * 20 + offset;
        if (x > 15 && x < W - 15) {
          ctx.beginPath(); ctx.moveTo(x, H / 2 - 16); ctx.lineTo(x, H / 2 + 16); ctx.stroke();
        }
      }
      var itemX = 15 + ((t * 40) % (W - 40));
      ctx.fillStyle = '#ffd84a'; ctx.fillRect(itemX, H / 2 - 8, 14, 16);
    },

    DrawLiquid: function(ctx, W, H, t) {
      ctx.fillStyle = '#1a2a3a'; ctx.fillRect(15, H / 2 - 20, W - 30, 40);
      ctx.strokeStyle = '#0a1a2a'; ctx.lineWidth = 3; ctx.strokeRect(15, H / 2 - 20, W - 30, 40);
      ctx.fillStyle = 'rgba(80,180,220,0.6)'; ctx.fillRect(18, H / 2 - 15, W - 36, 30);
      for (var i = 0; i < 5; i++) {
        var p = ((t * 0.7 + i * 0.2) % 1);
        var fx = 18 + p * (W - 36);
        ctx.fillStyle = 'rgba(180,230,255,' + (1 - p) + ')';
        ctx.beginPath(); ctx.arc(fx, H / 2, 4, 0, Math.PI * 2); ctx.fill();
      }
    },

    DrawPayload: function(ctx, W, H, t) {
      var bob = Math.sin(t * 2) * 3;
      ctx.fillStyle = '#3a3a4a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a1a2a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      ctx.fillStyle = '#5a5a6a'; ctx.fillRect(W / 2 - 30, H / 2 - 22 + bob, 60, 44);
      ctx.strokeStyle = '#1a1a2a'; ctx.strokeRect(W / 2 - 30, H / 2 - 22 + bob, 60, 44);
      var pulse = 0.4 + Math.sin(t * 3) * 0.6;
      ctx.fillStyle = 'rgba(150,200,255,' + pulse + ')';
      ctx.fillRect(W / 2 - 20, H / 2 - 8 + bob, 40, 16);
    },

    DrawTeam: function(ctx, W, H, t) {
      var colors = ['#ff5544', '#4488ff', '#44ff88', '#ffcc44', '#cc44ff'];
      var idx = Math.floor(t * 2) % colors.length;
      var nextIdx = (idx + 1) % colors.length;
      var blend = (t * 2) % 1;
      function hexToRgb(hex) {
        return [parseInt(hex.substr(1, 2), 16), parseInt(hex.substr(3, 2), 16), parseInt(hex.substr(5, 2), 16)];
      }
      var a = hexToRgb(colors[idx]);
      var b = hexToRgb(colors[nextIdx]);
      var r = Math.round(a[0] + (b[0] - a[0]) * blend);
      var g = Math.round(a[1] + (b[1] - a[1]) * blend);
      var bl = Math.round(a[2] + (b[2] - a[2]) * blend);
      ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + bl + ')';
      ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = 'rgba(0,0,0,0.5)'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fillRect(18, 18, W - 36, 4);
    },

    DrawSideRegion: function(ctx, W, H, t) {
      ctx.fillStyle = '#3a4a5a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a2a3a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      ctx.fillStyle = '#7a9ac0'; ctx.fillRect(15, 15, 12, H - 30); ctx.fillRect(W - 27, 15, 12, H - 30);
      var pulse = 0.4 + Math.sin(t * 3) * 0.6;
      ctx.fillStyle = 'rgba(200,220,255,' + (pulse * 0.4) + ')';
      ctx.fillRect(15, 15, 12, H - 30); ctx.fillRect(W - 27, 15, 12, H - 30);
    },

    DrawGlowSide: function(ctx, W, H, t) {
      ctx.fillStyle = '#2a2a3a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#0a0a1a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      var pulse = 0.5 + Math.sin(t * 4) * 0.5;
      ctx.fillStyle = 'rgba(110,182,255,' + pulse + ')';
      ctx.fillRect(15, 15, 8, H - 30); ctx.fillRect(W - 23, 15, 8, H - 30);
      var grd = ctx.createLinearGradient(15, 0, 45, 0);
      grd.addColorStop(0, 'rgba(110,182,255,' + (pulse * 0.6) + ')');
      grd.addColorStop(1, 'rgba(110,182,255,0)');
      ctx.fillStyle = grd; ctx.fillRect(15, 15, 30, H - 30);
      var grd2 = ctx.createLinearGradient(W - 15, 0, W - 45, 0);
      grd2.addColorStop(0, 'rgba(110,182,255,' + (pulse * 0.6) + ')');
      grd2.addColorStop(1, 'rgba(110,182,255,0)');
      ctx.fillStyle = grd2; ctx.fillRect(W - 45, 15, 30, H - 30);
    },

    DrawHeat: function(ctx, W, H, t) {
      ctx.fillStyle = '#3a2a2a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a0f0f'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      for (var i = 0; i < 4; i++) {
        var p = ((t * 0.8 + i * 0.25) % 1);
        var wy = H * 0.9 - p * H * 0.7;
        ctx.strokeStyle = 'rgba(255,140,60,' + (1 - p) * 0.7 + ')'; ctx.lineWidth = 2;
        ctx.beginPath();
        for (var x = 20; x <= W - 20; x += 6) {
          var yy = wy + Math.sin(x * 0.15 + t * 3) * 4;
          if (x === 20) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
        }
        ctx.stroke();
      }
    },

    DrawHeatInput: function(ctx, W, H, t) {
      ctx.fillStyle = '#3a2a2a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a0f0f'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      var p = ((t * 1.2) % 1);
      var ay = H * 0.95 - p * H * 0.6;
      ctx.fillStyle = 'rgba(255,150,60,' + (1 - p * 0.5) + ')';
      ctx.beginPath();
      ctx.moveTo(W / 2, ay - 15); ctx.lineTo(W / 2 - 15, ay + 5);
      ctx.lineTo(W / 2 - 5, ay + 5); ctx.lineTo(W / 2 - 5, ay + 20);
      ctx.lineTo(W / 2 + 5, ay + 20); ctx.lineTo(W / 2 + 5, ay + 5);
      ctx.lineTo(W / 2 + 15, ay + 5); ctx.closePath(); ctx.fill();
    },

    DrawHeatOutput: function(ctx, W, H, t) {
      ctx.fillStyle = '#3a2a2a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a0f0f'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      var p = ((t * 1.2) % 1);
      var ay = H * 0.4 + p * H * 0.6;
      ctx.fillStyle = 'rgba(255,150,60,' + (1 - p * 0.5) + ')';
      ctx.beginPath();
      ctx.moveTo(W / 2, ay - 15); ctx.lineTo(W / 2 - 15, ay + 5);
      ctx.lineTo(W / 2 - 5, ay + 5); ctx.lineTo(W / 2 - 5, ay + 20);
      ctx.lineTo(W / 2 + 5, ay + 20); ctx.lineTo(W / 2 + 5, ay + 5);
      ctx.lineTo(W / 2 + 15, ay + 5); ctx.closePath(); ctx.fill();
    },

    // ===== NEW ANIMATORS =====

    DrawArcSmelter: function(ctx, W, H, t) {
      var cx = W / 2, cy = H / 2;
      ctx.fillStyle = '#3a2a3a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a0f1a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // center core
      ctx.fillStyle = '#1a0f1a';
      ctx.beginPath(); ctx.arc(cx, cy, W * 0.15, 0, Math.PI * 2); ctx.fill();
      var pulse = 0.5 + Math.sin(t * 4) * 0.5;
      ctx.fillStyle = 'rgba(220,150,255,' + pulse + ')';
      ctx.beginPath(); ctx.arc(cx, cy, W * 0.12, 0, Math.PI * 2); ctx.fill();
      // electric arcs
      for (var i = 0; i < 4; i++) {
        var seed = i * 100 + Math.floor(t * 15);
        var a1 = (i / 4) * Math.PI * 2;
        var a2 = a1 + Math.PI * (0.3 + Math.random() * 0.4);
        var x1 = cx + Math.cos(a1) * W * 0.3;
        var y1 = cy + Math.sin(a1) * W * 0.3;
        var x2 = cx + Math.cos(a2) * W * 0.3;
        var y2 = cy + Math.sin(a2) * W * 0.3;
        ctx.strokeStyle = 'rgba(220,180,255,' + (0.6 + Math.random() * 0.4) + ')';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (var st = 0; st <= 5; st++) {
          var ix = x1 + (x2 - x1) * (st / 5) + (Math.random() - 0.5) * 8;
          var iy = y1 + (y2 - y1) * (st / 5) + (Math.random() - 0.5) * 8;
          if (st === 0) ctx.moveTo(ix, iy); else ctx.lineTo(ix, iy);
        }
        ctx.stroke();
      }
    },

    DrawHeatRegion: function(ctx, W, H, t) {
      ctx.fillStyle = '#3a2a20'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a0f0f'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      var heat = 0.4 + Math.sin(t * 3) * 0.4;
      var grd = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.45);
      grd.addColorStop(0, 'rgba(255,120,40,' + heat + ')');
      grd.addColorStop(0.6, 'rgba(255,80,20,' + (heat * 0.5) + ')');
      grd.addColorStop(1, 'rgba(255,40,10,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(15, 15, W - 30, H - 30);
    },

    DrawPistons: function(ctx, W, H, t) {
      ctx.fillStyle = '#2a2a3a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a1a2a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // 4 pistons moving up/down
      for (var i = 0; i < 4; i++) {
        var col = i % 2;
        var row = Math.floor(i / 2);
        var px = 30 + col * (W - 60);
        var py = 30 + row * (H - 60);
        var offset = Math.sin(t * 3 + i * 1.5) * 8;
        ctx.fillStyle = '#4a4a5a';
        ctx.fillRect(px - 10, py - 15, 20, 30);
        ctx.fillStyle = '#8a8a9a';
        ctx.fillRect(px - 6, py - 15 + offset, 12, 12);
        ctx.strokeStyle = '#1a1a2a';
        ctx.lineWidth = 1;
        ctx.strokeRect(px - 10, py - 15, 20, 30);
      }
    },

    DrawCultivator: function(ctx, W, H, t) {
      ctx.fillStyle = '#2a3a2a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a2a1a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // expanding rings
      for (var i = 0; i < 3; i++) {
        var p = ((t * 0.5 + i * 0.33) % 1);
        var r = p * W * 0.4;
        var a = (1 - p) * 0.7;
        ctx.strokeStyle = 'rgba(140,255,160,' + a + ')';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(W / 2, H / 2, r, 0, Math.PI * 2); ctx.stroke();
      }
      // center seed
      ctx.fillStyle = '#7bdc80';
      ctx.beginPath(); ctx.arc(W / 2, H / 2, 6, 0, Math.PI * 2); ctx.fill();
    },

    DrawShape: function(ctx, W, H, t) {
      ctx.fillStyle = '#3a2a3a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a0f1a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // rotating polygon
      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.rotate(t * 1.2);
      ctx.strokeStyle = '#b090d0';
      ctx.lineWidth = 3;
      var sides = 5;
      var r = W * 0.28;
      ctx.beginPath();
      for (var i = 0; i <= sides; i++) {
        var a = (i / sides) * Math.PI * 2 - Math.PI / 2;
        var px = Math.cos(a) * r, py = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
      // inner shape counter-rotating
      ctx.rotate(-t * 2);
      ctx.strokeStyle = '#d0b0f0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var j = 0; j <= 3; j++) {
        var a2 = (j / 3) * Math.PI * 2 - Math.PI / 2;
        var px2 = Math.cos(a2) * r * 0.5, py2 = Math.sin(a2) * r * 0.5;
        if (j === 0) ctx.moveTo(px2, py2); else ctx.lineTo(px2, py2);
      }
      ctx.stroke();
      ctx.restore();
    },

    DrawWeave: function(ctx, W, H, t) {
      ctx.fillStyle = '#2a2a20'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a1a10'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // woven pattern
      ctx.strokeStyle = 'rgba(220,200,140,0.7)';
      ctx.lineWidth = 3;
      var offset = (t * 20) % 20;
      for (var i = -1; i < 10; i++) {
        var x = 15 + i * 20 + offset;
        ctx.beginPath();
        ctx.moveTo(x, 15);
        for (var y = 15; y <= H - 15; y += 10) {
          ctx.lineTo(x + Math.sin(y * 0.15 + t * 2) * 8, y);
        }
        ctx.stroke();
      }
    },

    DrawParticles: function(ctx, W, H, t) {
      ctx.fillStyle = '#2a2a3a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a1a2a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      for (var i = 0; i < 12; i++) {
        var seed = i * 7;
        var px = 20 + ((seed * 37) % (W - 40));
        var py = 20 + ((seed * 51) % (H - 40));
        var drift = Math.sin(t * 2 + i) * 6;
        var dy = Math.cos(t * 1.5 + i * 0.7) * 6;
        var a = 0.4 + Math.sin(t * 3 + i) * 0.4;
        ctx.fillStyle = 'rgba(255,240,180,' + a + ')';
        ctx.beginPath(); ctx.arc(px + drift, py + dy, 2 + (i % 3), 0, Math.PI * 2); ctx.fill();
      }
    },

    DrawSoftShadow: function(ctx, W, H, t) {
      ctx.fillStyle = '#2a2a2a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // soft shadow beneath
      var shadowPulse = 0.5 + Math.sin(t * 2) * 0.3;
      var grd = ctx.createRadialGradient(W / 2, H * 0.75, 0, W / 2, H * 0.75, W * 0.4);
      grd.addColorStop(0, 'rgba(0,0,0,' + shadowPulse + ')');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(15, H * 0.5, W - 30, H * 0.5 - 15);
      // floating block
      var bob = Math.sin(t * 2) * 4;
      ctx.fillStyle = '#7a7a9a';
      ctx.fillRect(W / 2 - 25, H / 2 - 25 + bob, 50, 40);
      ctx.strokeStyle = '#3a3a5a'; ctx.lineWidth = 2;
      ctx.strokeRect(W / 2 - 25, H / 2 - 25 + bob, 50, 40);
    },

    DrawIcon: function(ctx, W, H, t) {
      ctx.fillStyle = '#3a3a4a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a1a2a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // centered icon (gear)
      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.rotate(t * 1.5);
      ctx.fillStyle = '#ffd84a';
      ctx.beginPath();
      for (var i = 0; i < 8; i++) {
        var a = (i / 8) * Math.PI * 2;
        ctx.save(); ctx.rotate(a);
        ctx.fillRect(-4, -22, 8, 8);
        ctx.restore();
      }
      ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#3a3a4a';
      ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },

    DrawCenter: function(ctx, W, H, t) {
      ctx.fillStyle = '#3a3a4a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a1a2a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // centered rotating square
      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.rotate(t * 0.8);
      ctx.fillStyle = '#7bc4ff';
      ctx.fillRect(-20, -20, 40, 40);
      ctx.strokeStyle = '#2c5282'; ctx.lineWidth = 2;
      ctx.strokeRect(-20, -20, 40, 40);
      ctx.restore();
    },

    DrawCenterRegion: function(ctx, W, H, t) {
      ctx.fillStyle = '#3a3a4a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a1a2a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // pulsing centered region
      var pulse = 0.5 + Math.sin(t * 3) * 0.5;
      ctx.fillStyle = 'rgba(120,200,255,' + (0.4 + pulse * 0.3) + ')';
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, 24 + pulse * 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(200,230,255,' + pulse + ')';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, 30 + pulse * 6, 0, Math.PI * 2);
      ctx.stroke();
    },

    DrawLiquidRegion: function(ctx, W, H, t) {
      ctx.fillStyle = '#1a2a3a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#0a1a2a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // liquid surface with waves
      ctx.fillStyle = 'rgba(80,180,220,0.65)';
      ctx.beginPath();
      ctx.moveTo(20, H * 0.55);
      for (var x = 20; x <= W - 20; x += 4) {
        var wy = H * 0.55 + Math.sin(x * 0.12 + t * 3) * 6 + Math.cos(x * 0.07 - t * 2) * 3;
        ctx.lineTo(x, wy);
      }
      ctx.lineTo(W - 20, H - 20);
      ctx.lineTo(20, H - 20);
      ctx.closePath();
      ctx.fill();
      // shimmer highlights
      for (var i = 0; i < 4; i++) {
        var px = 30 + ((t * 30 + i * 40) % (W - 60));
        var py = H * 0.55 + Math.sin(px * 0.12 + t * 3) * 6;
        ctx.fillStyle = 'rgba(180,230,255,0.6)';
        ctx.fillRect(px, py - 1, 8, 2);
      }
    },

    DrawLiquidTile: function(ctx, W, H, t) {
      ctx.fillStyle = '#1a2a3a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#0a1a2a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // tiled liquid pattern moving
      var tileSize = 24;
      var offX = (t * 20) % tileSize;
      var offY = (t * 15) % tileSize;
      for (var y = 15 - tileSize; y < H - 15; y += tileSize) {
        for (var x = 15 - tileSize; x < W - 15; x += tileSize) {
          var tx = x + offX, ty = y + offY;
          if (tx < 15) continue; if (tx > W - 15 - 10) continue;
          if (ty < 15) continue; if (ty > H - 15 - 10) continue;
          ctx.fillStyle = 'rgba(80,180,220,' + (0.4 + Math.sin((x + y + t * 40) * 0.05) * 0.2) + ')';
          ctx.fillRect(tx, ty, tileSize - 4, tileSize - 4);
        }
      }
    },

    DrawBlurSpin: function(ctx, W, H, t) {
      var cx = W / 2, cy = H / 2;
      ctx.fillStyle = '#2a2a3a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a1a2a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // blur trail
      for (var i = 0; i < 12; i++) {
        var a = (i / 12) * Math.PI * 2 + t * 4;
        var alpha = 1 - i / 12;
        ctx.strokeStyle = 'rgba(180,180,220,' + (alpha * 0.5) + ')';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(cx, cy, W * 0.25, a, a + 0.3);
        ctx.stroke();
      }
      // center
      ctx.fillStyle = '#a0a0d0';
      ctx.beginPath(); ctx.arc(cx, cy, 12, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#2a2a3a';
      ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
    },

    DrawRail: function(ctx, W, H, t) {
      var cx = W / 2, cy = H / 2;
      ctx.fillStyle = '#2a2a3a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a1a2a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // rail base
      ctx.fillStyle = '#1a1a2a';
      ctx.fillRect(cx - 10, cy - 30, 20, 50);
      // long rail barrel extending upward
      ctx.fillStyle = '#4a4a6a';
      ctx.fillRect(cx - 4, 15, 8, cy - 30);
      ctx.strokeStyle = '#1a1a2a'; ctx.lineWidth = 1;
      ctx.strokeRect(cx - 4, 15, 8, cy - 30);
      // charging glow pulse
      var pulse = 0.4 + Math.sin(t * 3) * 0.6;
      ctx.fillStyle = 'rgba(120,200,255,' + pulse + ')';
      ctx.fillRect(cx - 2, 15, 4, cy - 30);
      // muzzle flash when charging peak
      if (Math.sin(t * 3) > 0.9) {
        ctx.fillStyle = 'rgba(200,240,255,0.9)';
        ctx.beginPath(); ctx.arc(cx, 15, 8, 0, Math.PI * 2); ctx.fill();
      }
    },

    DrawSpin: function(ctx, W, H, t) {
      var cx = W / 2, cy = H / 2;
      ctx.fillStyle = '#2d3748'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a202c'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // socket
      ctx.fillStyle = '#1a202c';
      ctx.beginPath(); ctx.arc(cx, cy, W * 0.18, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, cy, W * 0.18, 0, Math.PI * 2); ctx.stroke();
      // fast-spinning barrel
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 4);
      for (var i = 0; i < 2; i++) {
        ctx.save(); ctx.rotate(i * Math.PI);
        ctx.fillStyle = '#4a5568';
        ctx.fillRect(-4, -W * 0.32, 8, W * 0.3);
        ctx.strokeStyle = '#1a202c'; ctx.lineWidth = 1;
        ctx.strokeRect(-4, -W * 0.32, 8, W * 0.3);
        ctx.restore();
      }
      ctx.restore();
      ctx.fillStyle = '#a0aec0';
      ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
    },

    DrawBase: function(ctx, W, H, t) {
      var cx = W / 2, cy = H / 2;
      ctx.fillStyle = '#2d3748'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a202c'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // base octagon
      ctx.fillStyle = '#4a5568';
      ctx.beginPath();
      var oct = 8, r = W * 0.32;
      for (var i = 0; i <= oct; i++) {
        var a = (i / oct) * Math.PI * 2 - Math.PI / 2;
        var px = cx + Math.cos(a) * r;
        var py = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#1a202c'; ctx.lineWidth = 2; ctx.stroke();
      // inner ring
      ctx.fillStyle = '#1a202c';
      ctx.beginPath(); ctx.arc(cx, cy, W * 0.16, 0, Math.PI * 2); ctx.fill();
      // bolt dots at corners
      ctx.fillStyle = '#a0aec0';
      for (var b = 0; b < oct; b++) {
        var ab = (b / oct) * Math.PI * 2 - Math.PI / 2;
        var bx = cx + Math.cos(ab) * r * 0.75;
        var by = cy + Math.sin(ab) * r * 0.75;
        ctx.beginPath(); ctx.arc(bx, by, 2, 0, Math.PI * 2); ctx.fill();
      }
    },

    DrawGlow: function(ctx, W, H, t) {
      ctx.fillStyle = '#2a2a3a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a1a2a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // pulsing additive glow
      var pulse = 0.4 + Math.sin(t * 2.5) * 0.5;
      var grd = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.5);
      grd.addColorStop(0, 'rgba(255,220,120,' + pulse + ')');
      grd.addColorStop(0.5, 'rgba(255,180,60,' + (pulse * 0.6) + ')');
      grd.addColorStop(1, 'rgba(255,120,40,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
      // core dot
      ctx.fillStyle = 'rgba(255,240,180,' + pulse + ')';
      ctx.beginPath(); ctx.arc(W / 2, H / 2, 8, 0, Math.PI * 2); ctx.fill();
    },

    DrawFade: function(ctx, W, H, t) {
      ctx.fillStyle = '#3a3a4a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a1a2a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // fading block
      var alpha = (Math.sin(t * 1.5) + 1) / 2;
      ctx.fillStyle = 'rgba(150,200,255,' + alpha + ')';
      ctx.fillRect(W / 2 - 30, H / 2 - 30, 60, 60);
      ctx.strokeStyle = 'rgba(255,255,255,' + alpha + ')';
      ctx.lineWidth = 2;
      ctx.strokeRect(W / 2 - 30, H / 2 - 30, 60, 60);
    },

    DrawSquares: function(ctx, W, H, t) {
      ctx.fillStyle = '#2a2a3a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a1a2a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      var grid = 4;
      var cellW = (W - 30) / grid;
      var cellH = (H - 30) / grid;
      for (var y = 0; y < grid; y++) {
        for (var x = 0; x < grid; x++) {
          var on = (Math.sin(t * 3 + x * 1.3 + y * 2.1) + 1) / 2;
          ctx.fillStyle = 'rgba(150,200,255,' + (on * 0.7) + ')';
          ctx.fillRect(15 + x * cellW + 2, 15 + y * cellH + 2, cellW - 4, cellH - 4);
        }
      }
    },

    DrawCircles: function(ctx, W, H, t) {
      ctx.fillStyle = '#2a2a3a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a1a2a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      for (var i = 0; i < 4; i++) {
        var p = ((t * 0.6 + i * 0.25) % 1);
        var r = p * W * 0.4;
        var a = 1 - p;
        ctx.strokeStyle = 'rgba(180,220,255,' + a + ')';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(W / 2, H / 2, r, 0, Math.PI * 2); ctx.stroke();
      }
    },

    DrawScanner: function(ctx, W, H, t) {
      ctx.fillStyle = '#1a2a3a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#0a1a2a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // grid
      ctx.strokeStyle = 'rgba(100,180,255,0.2)'; ctx.lineWidth = 1;
      for (var i = 1; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(15 + i * (W - 30) / 4, 15);
        ctx.lineTo(15 + i * (W - 30) / 4, H - 15);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(15, 15 + i * (H - 30) / 4);
        ctx.lineTo(W - 15, 15 + i * (H - 30) / 4);
        ctx.stroke();
      }
      // sweeping line
      var sweep = (t * 0.5) % 1;
      var sy = 15 + sweep * (H - 30);
      ctx.strokeStyle = 'rgba(120,255,180,0.9)';
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(15, sy); ctx.lineTo(W - 15, sy); ctx.stroke();
      // glow above line
      var grd = ctx.createLinearGradient(0, sy - 20, 0, sy);
      grd.addColorStop(0, 'rgba(120,255,180,0)');
      grd.addColorStop(1, 'rgba(120,255,180,0.5)');
      ctx.fillStyle = grd;
      ctx.fillRect(15, sy - 20, W - 30, 20);
    },

    DrawPlasma: function(ctx, W, H, t) {
      var cx = W / 2, cy = H / 2;
      ctx.fillStyle = '#1a1a3a'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#0a0a1a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // plasma ball
      var r = W * 0.25 + Math.sin(t * 3) * 5;
      var grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grd.addColorStop(0, 'rgba(255,220,255,0.95)');
      grd.addColorStop(0.3, 'rgba(200,120,255,0.85)');
      grd.addColorStop(0.7, 'rgba(140,60,220,0.6)');
      grd.addColorStop(1, 'rgba(80,20,140,0)');
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
      // crackles
      for (var i = 0; i < 5; i++) {
        var a = (i / 5) * Math.PI * 2 + t * 2;
        var r1 = r * 0.6;
        var r2 = r * 1.3;
        ctx.strokeStyle = 'rgba(255,220,255,' + (0.4 + Math.random() * 0.5) + ')';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
        ctx.lineTo(cx + Math.cos(a) * r2 + (Math.random() - 0.5) * 5,
                   cy + Math.sin(a) * r2 + (Math.random() - 0.5) * 5);
        ctx.stroke();
      }
    },

    DrawStarfield: function(ctx, W, H, t) {
      ctx.fillStyle = '#050510'; ctx.fillRect(15, 15, W - 30, H - 30);
      ctx.strokeStyle = '#1a1a2a'; ctx.lineWidth = 3; ctx.strokeRect(15, 15, W - 30, H - 30);
      // stars
      for (var i = 0; i < 30; i++) {
        var sx = 20 + ((i * 73) % (W - 40));
        var sy = 20 + ((i * 137) % (H - 40));
        var twinkle = 0.4 + Math.sin(t * 3 + i * 0.7) * 0.6;
        var size = 1 + (i % 3);
        ctx.fillStyle = 'rgba(255,255,255,' + twinkle + ')';
        ctx.beginPath(); ctx.arc(sx, sy, size, 0, Math.PI * 2); ctx.fill();
      }
      // moving stars
      for (var j = 0; j < 5; j++) {
        var px = ((t * 30 + j * 60) % (W - 40)) + 20;
        var py = 20 + ((j * 41) % (H - 40));
        ctx.fillStyle = 'rgba(200,220,255,0.9)';
        ctx.beginPath(); ctx.arc(px, py, 1.5, 0, Math.PI * 2); ctx.fill();
      }
    }
  };

  function makePreview(prefix) {
    var sec = document.getElementById("section-" + prefix);
    if (!sec) return;
    var drw = document.getElementById(prefix + "Drawer");
    if (!drw) return;

    var anchor = drw;
    if (drw.parentNode && drw.parentNode.classList &&
        drw.parentNode.classList.contains("custom-select")) {
      anchor = drw.parentNode;
    }

    if (anchor._drawerPreview) return;

    var wrap = document.createElement("div");
    wrap.className = "drawer-preview-wrap";
    wrap.innerHTML =
      '<div class="drawer-preview-title">Drawer Preview</div>' +
      '<canvas class="drawer-preview-canvas" width="180" height="120"></canvas>' +
      '<div class="drawer-preview-name"></div>';

    anchor.parentNode.insertBefore(wrap, anchor.nextSibling);
    anchor._drawerPreview = wrap;

    var canvas = wrap.querySelector(".drawer-preview-canvas");
    var nameEl = wrap.querySelector(".drawer-preview-name");
    var ctx = canvas.getContext("2d");

    function tick(time) {
      if (sec.classList.contains("active")) {
        var secs = (time || 0) / 1000;
        var name = drw.value;
        nameEl.textContent = name;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        var fn = animators[name];
        if (fn) fn(ctx, canvas.width, canvas.height, secs);
        else {
          ctx.fillStyle = "rgba(214,216,221,0.4)";
          ctx.font = "12px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("(no preview)", canvas.width / 2, canvas.height / 2);
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function addPreviews() {
    ["wall", "power", "turret", "drill", "crafter"].forEach(makePreview);
  }

  function apply() { addPreviews(); }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() { setTimeout(apply, 400); });
  } else {
    setTimeout(apply, 400);
  }
  setInterval(addPreviews, 2000);
})();