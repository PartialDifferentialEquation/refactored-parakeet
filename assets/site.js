/* Hero ambience: packets crossing an inspection line.
   Most are short and ordinary; a few are long streaks that clear the line and
   keep going — the bridges the event actually scores. Some are dropped at the
   gateway. That is the whole event, drawn quietly behind the headline.

   Runs against every .hero__canvas on the page, so one page or three (the
   combined preview build) both work without an id. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  var RED = "#FF5A36";
  var BLUE = "#6EA8FF";
  var DIM = "#263140";

  function rand(a, b) { return a + Math.random() * (b - a); }

  function Flow(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.lanes = [];
    this.w = 0; this.h = 0;
    this.raf = null;
    this.last = 0;
  }

  Flow.prototype.build = function () {
    var rect = this.canvas.getBoundingClientRect();
    // A hidden page measures zero; bail and retry on the next frame.
    if (rect.width < 2 || rect.height < 2) { this.w = 0; return false; }

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = rect.width;
    this.h = rect.height;
    this.canvas.width = Math.round(this.w * dpr);
    this.canvas.height = Math.round(this.h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.inspectX = this.w * 0.62;

    var count = Math.max(6, Math.min(16, Math.round(this.h / 46)));
    this.lanes = [];
    for (var i = 0; i < count; i++) {
      var packets = [];
      var n = Math.round(rand(2, 5));
      for (var j = 0; j < n; j++) packets.push(this.packet(rand(-this.w, this.w)));
      this.lanes.push({
        y: ((i + 0.5) / count) * this.h,
        speed: rand(14, 34),
        packets: packets
      });
    }
    return true;
  };

  Flow.prototype.packet = function (x) {
    var bridge = Math.random() < 0.18;
    return {
      x: x,
      len: bridge ? rand(90, 190) : rand(10, 34),
      bridge: bridge,
      blocked: !bridge && Math.random() < 0.4,
      dropped: false,
      fade: 1
    };
  };

  Flow.prototype.draw = function (dt) {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);

    // The inspection line: where deep packet inspection happens.
    ctx.strokeStyle = DIM;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.inspectX + 0.5, 0);
    ctx.lineTo(this.inspectX + 0.5, this.h);
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.lineCap = "butt";

    for (var i = 0; i < this.lanes.length; i++) {
      var lane = this.lanes[i];
      for (var j = 0; j < lane.packets.length; j++) {
        var p = lane.packets[j];
        if (!p.dropped) p.x += lane.speed * dt;

        // Caught at the gateway: the head of the packet stops on the line.
        if (p.blocked && !p.dropped && p.x + p.len >= this.inspectX) {
          p.x = this.inspectX - p.len;
          p.dropped = true;
          p.fade = 1;
        }

        var alpha, colour;
        if (p.dropped) {
          p.fade -= dt * 0.85;
          if (p.fade <= 0) { lane.packets[j] = this.packet(-rand(40, this.w * 0.5)); continue; }
          alpha = p.fade * 0.55;
          colour = BLUE;
        } else {
          if (p.x > this.w) { lane.packets[j] = this.packet(-rand(40, this.w * 0.6)); continue; }
          // A bridge that has cleared the line is the strongest mark on screen.
          alpha = p.bridge ? (p.x > this.inspectX ? 0.72 : 0.5)
                           : (p.x > this.inspectX ? 0.34 : 0.6);
          colour = RED;
        }

        ctx.globalAlpha = alpha;
        ctx.strokeStyle = colour;
        ctx.beginPath();
        ctx.moveTo(p.x, lane.y + 0.5);
        ctx.lineTo(p.x + p.len, lane.y + 0.5);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  };

  Flow.prototype.frame = function (now) {
    if (!this.w && !this.build()) {          // page was hidden; try again
      this.raf = window.requestAnimationFrame(this.frame.bind(this));
      return;
    }
    var dt = Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    this.draw(dt);
    this.raf = window.requestAnimationFrame(this.frame.bind(this));
  };

  Flow.prototype.start = function () {
    this.build();
    if (reduce.matches) { if (this.w) this.draw(0); return; }   // one static frame
    this.last = window.performance.now();
    this.raf = window.requestAnimationFrame(this.frame.bind(this));
  };

  Flow.prototype.stop = function () {
    if (this.raf) { window.cancelAnimationFrame(this.raf); this.raf = null; }
  };

  var flows = [];
  document.querySelectorAll("canvas.hero__canvas").forEach(function (c) {
    if (!c.getContext) return;
    var f = new Flow(c);
    flows.push(f);
    f.start();
  });
  if (!flows.length) return;

  function restart() { flows.forEach(function (f) { f.stop(); f.start(); }); }

  var resizeTimer;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(restart, 180);
  });

  if (reduce.addEventListener) reduce.addEventListener("change", restart);

  // Don't burn cycles when the tab is hidden.
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) flows.forEach(function (f) { f.stop(); });
    else if (!reduce.matches) flows.forEach(function (f) {
      if (!f.raf) { f.last = window.performance.now(); f.raf = window.requestAnimationFrame(f.frame.bind(f)); }
    });
  });
})();
