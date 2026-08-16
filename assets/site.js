/* Hero ambience: packets crossing an inspection line.
   Some pass. Some are dropped at the gateway. That is the whole event,
   drawn once, quietly, behind the headline. */
(function () {
  "use strict";

  var canvas = document.getElementById("flow");
  if (!canvas || !canvas.getContext) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var ctx = canvas.getContext("2d");
  var w = 0, h = 0, dpr = 1;
  var lanes = [];
  var inspectX = 0;
  var raf = null;

  var RED = "#FF5A36";
  var BLUE = "#6EA8FF";
  var DIM = "#263140";

  function rand(a, b) { return a + Math.random() * (b - a); }

  function build() {
    var rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    inspectX = w * 0.62;

    var count = Math.max(6, Math.min(16, Math.round(h / 46)));
    lanes = [];
    for (var i = 0; i < count; i++) {
      var y = ((i + 0.5) / count) * h;
      var packets = [];
      var n = Math.round(rand(2, 5));
      for (var j = 0; j < n; j++) {
        packets.push(makePacket(rand(-w, w)));
      }
      lanes.push({ y: y, speed: rand(14, 34), packets: packets });
    }
  }

  function makePacket(x) {
    return {
      x: x,
      len: rand(10, 34),
      // Roughly a third of traffic gets caught at the inspection line.
      blocked: Math.random() < 0.34,
      dropped: false
    };
  }

  function draw(dt) {
    ctx.clearRect(0, 0, w, h);

    // The inspection line: where deep packet inspection happens.
    ctx.strokeStyle = DIM;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(inspectX + 0.5, 0);
    ctx.lineTo(inspectX + 0.5, h);
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.lineCap = "butt";

    for (var i = 0; i < lanes.length; i++) {
      var lane = lanes[i];
      for (var j = 0; j < lane.packets.length; j++) {
        var p = lane.packets[j];

        if (!p.dropped) p.x += lane.speed * dt;

        // Caught at the gateway: the head of the packet stops on the line.
        if (p.blocked && !p.dropped && p.x + p.len >= inspectX) {
          p.x = inspectX - p.len;
          p.dropped = true;
          p.fade = 1;
        }

        var alpha, colour;
        if (p.dropped) {
          p.fade -= dt * 0.85;
          if (p.fade <= 0) {
            lane.packets[j] = makePacket(-rand(40, w * 0.5));
            continue;
          }
          alpha = p.fade * 0.55;
          colour = BLUE;
        } else {
          alpha = p.x > inspectX ? 0.4 : 0.62;
          colour = RED;
        }

        if (p.x > w) { lane.packets[j] = makePacket(-rand(40, w * 0.6)); continue; }

        ctx.globalAlpha = alpha;
        ctx.strokeStyle = colour;
        ctx.beginPath();
        ctx.moveTo(p.x, lane.y + 0.5);
        ctx.lineTo(p.x + p.len, lane.y + 0.5);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }

  var last = 0;
  function frame(now) {
    var dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    draw(dt);
    raf = window.requestAnimationFrame(frame);
  }

  function start() {
    build();
    if (reduce.matches) {
      draw(0); // one static frame, no motion
      return;
    }
    last = window.performance.now();
    raf = window.requestAnimationFrame(frame);
  }

  function stop() {
    if (raf) { window.cancelAnimationFrame(raf); raf = null; }
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      stop();
      start();
    }, 180);
  });

  if (reduce.addEventListener) {
    reduce.addEventListener("change", function () { stop(); start(); });
  }

  // Don't burn cycles when the tab is hidden.
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { stop(); }
    else if (!reduce.matches && !raf) { last = window.performance.now(); raf = window.requestAnimationFrame(frame); }
  });

  start();
})();
