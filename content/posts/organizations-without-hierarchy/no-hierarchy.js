/*
 * No top: an org chart loses its boss, melts into ten equal people, and grows
 * into a network of nearly 200 where an idea can start anywhere.
 *
 * Plain Canvas 2D. Watercolour blobs are layered, deformed polygons painted
 * once into sprites; ink lines "boil" by re-jittering 12 times a second.
 * The simulation runs on a fixed 60 Hz step from a seeded RNG, so a given
 * time always looks the same. Debug: ?sketch-t=12 seeks, &sketch-freeze=1 stops.
 */
(() => {
  'use strict';

  const script = document.currentScript;
  const fig = document.getElementById(script && script.dataset.figure);
  if (!fig) return;
  const stage = fig.querySelector('.sketch-stage');
  const canvas = fig.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Igalia's palette, in the light → dark pairs of its logo petals.
  const PAIRS = [['#ffff00', '#a1c22d'], ['#bfe7e5', '#0067b1'], ['#ff0000', '#670164'], ['#ffff99', '#ff9900']];
  // The canvas is transparent so the drawing sits straight on the page.
  // Ink and cards follow the site's light/dark theme.
  let INK = '#232838', CARD = '#f1ece2';
  const setTheme = () => {
    const dark = document.documentElement.classList.contains('dark');
    INK = dark ? '#e5e7eb' : '#232838';
    CARD = dark ? '#2f3542' : '#f1ece2';
  };
  // The caption is real text laid over the canvas, so it reads, selects and
  // styles like the post's body text. The canvas only keeps room for it.
  // Sits in a row of its own so page controls (e.g. sound) can share the line.
  const capRow = document.createElement('div'), capEl = document.createElement('div');
  capRow.className = 'sketch-caption-row';
  capEl.className = 'sketch-live-caption';
  capRow.appendChild(capEl);
  stage.appendChild(capRow);
  let capPx = 16;
  const TAU = Math.PI * 2, DT = 1 / 60, HOP = 0.11, FINAL_N = 200;

  // Timeline, in seconds.
  const T = {
    chart: 0.5, wobble: 4.6, crown: 5.1, cut: 5.5, morph: 6.0, ring: 7.9,
    idea: 9.0, grow: 10.4, growEnd: 20.4, live: 21.2,
  };

  // --- helpers --------------------------------------------------------------

  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, k) => a + (b - a) * k;
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const ease = k => k * k * (3 - 2 * k);
  const backOut = k => { const s = 1.9; k -= 1; return k * k * ((s + 1) * k + s) + 1; };

  function mulberry32(a) {
    return () => {
      a = a + 0x6d2b79f5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  // Stable pseudo-random value in [-1, 1] for a pair of integers.
  function hash(a, b = 0) {
    let h = Math.imul(a | 0, 374761393) + Math.imul(b | 0, 668265263);
    h = Math.imul(h ^ h >>> 13, 1274126177);
    return ((h ^ h >>> 16) >>> 0) / 4294967296 * 2 - 1;
  }

  // --- watercolour ---------------------------------------------------------

  // Recursive midpoint displacement, the classic watercolour-polygon trick.
  function deform(pts, depth, v, rnd) {
    for (let d = 0; d < depth; d++) {
      const out = [];
      for (let i = 0; i < pts.length; i++) {
        const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length];
        const len = Math.hypot(x2 - x1, y2 - y1);
        const g = (rnd() + rnd() + rnd() - 1.5) * v * len, a = rnd() * TAU;
        out.push([x1, y1], [(x1 + x2) / 2 + Math.cos(a) * g, (y1 + y2) / 2 + Math.sin(a) * g]);
      }
      pts = out;
    }
    return pts;
  }

  function polyPath(g, pts) {
    g.beginPath();
    pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
    g.closePath();
  }

  const SPRITE = 160, BLOB_R = SPRITE * 0.3;

  function blobSprite(pair, seed) {
    const c = document.createElement('canvas');
    c.width = c.height = SPRITE;
    const g = c.getContext('2d'), rnd = mulberry32(seed), m = SPRITE / 2;
    const base = [];
    for (let i = 0; i < 10; i++) {
      const a = i / 10 * TAU, r = BLOB_R * (1 + (rnd() - 0.5) * 0.12);
      base.push([m + Math.cos(a) * r, m + Math.sin(a) * r]);
    }
    const shape = deform(base, 2, 0.22, rnd);
    const grad = g.createLinearGradient(SPRITE * 0.25, SPRITE * 0.15, SPRITE * 0.75, SPRITE * 0.9);
    grad.addColorStop(0, pair[0]); grad.addColorStop(1, pair[1]);
    g.fillStyle = grad;
    for (let l = 0; l < 26; l++) {
      g.globalAlpha = 0.055;
      polyPath(g, deform(shape, 3, 0.17, rnd)); g.fill();
    }
    g.strokeStyle = pair[1]; g.lineWidth = 1.2;
    for (let l = 0; l < 3; l++) {
      g.globalAlpha = 0.14;
      polyPath(g, deform(shape, 2, 0.07, rnd)); g.stroke();
    }
    g.fillStyle = pair[1];
    for (let i = 0; i < 90; i++) {
      const a = rnd() * TAU, r = Math.sqrt(rnd()) * BLOB_R * 0.95;
      g.globalAlpha = 0.07 + rnd() * 0.1;
      g.fillRect(m + Math.cos(a) * r, m + Math.sin(a) * r, 1.3, 1.3);
    }
    return c;
  }

  const sprites = PAIRS.map((p, i) => [0, 1, 2, 3].map(v => blobSprite(p, 101 + i * 17 + v)));

  // --- ink ------------------------------------------------------------------

  let boil = 0; // re-jitter counter, 12 per second

  function inkLine(x1, y1, x2, y2, id, o = {}) {
    const len = Math.hypot(x2 - x1, y2 - y1);
    if (len < 0.5) return;
    const nx = -(y2 - y1) / len, ny = (x2 - x1) / len;
    const bow = (o.bow ?? hash(id, 99) * 0.03) * len, a = o.jit ?? 1.1;
    const j = k => hash(id * 13 + k, boil) * a;
    ctx.strokeStyle = o.color || INK;
    ctx.lineCap = 'round';
    for (let p = 0; p < 2; p++) {
      ctx.globalAlpha = (o.alpha ?? 1) * (p ? 0.35 : 0.85);
      ctx.lineWidth = (o.w ?? 1.6) * (p ? 0.7 : 1);
      ctx.beginPath();
      ctx.moveTo(x1 + j(p * 7 + 1), y1 + j(p * 7 + 2));
      ctx.quadraticCurveTo(
        (x1 + x2) / 2 + nx * (bow + j(p * 7 + 3) * 1.5), (y1 + y2) / 2 + ny * (bow + j(p * 7 + 4) * 1.5),
        x2 + j(p * 7 + 5), y2 + j(p * 7 + 6));
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // Part of a straight segment, from fraction a to fraction b.
  function inkPart(x1, y1, x2, y2, a, b, id, o) {
    if (b <= a) return;
    inkLine(lerp(x1, x2, a), lerp(y1, y2, a), lerp(x1, x2, b), lerp(y1, y2, b), id, o);
  }

  // --- world ----------------------------------------------------------------

  let W = 1000, H = 625, scale = 1, cssW = 0;
  // Every idea leaves a watercolour bloom where it started; old ones fade.
  let stain = document.createElement('canvas'), sctx = stain.getContext('2d');
  let rnd, t, nodes, edges, pulses, crown, nextIdea, lastKnn, pointer;

  function layout() {
    // Six staff spread evenly, managers above each pair, the boss on top.
    const top = H / 2 - (W < 800 ? 210 : 170), gap = W < 800 ? 150 : 150;
    const bw = Math.min(88, W * 0.8 / 6 * 0.8);
    const boxes = [];
    const staffX = i => W * (0.1 + 0.8 * (i + 0.5) / 6);
    for (let i = 0; i < 6; i++) boxes[4 + i] = { x: staffX(i), y: top + gap * 2, w: bw, h: bw * 0.45, lvl: 2, parent: 1 + (i >> 1) };
    for (let i = 0; i < 3; i++) boxes[1 + i] = { x: (staffX(i * 2) + staffX(i * 2 + 1)) / 2, y: top + gap, w: bw * 1.18, h: bw * 0.5, lvl: 1, parent: 0 };
    boxes[0] = { x: W / 2, y: top, w: bw * 1.45, h: bw * 0.56, lvl: 0, parent: -1 };
    const R = Math.min(W, H) * 0.27, cy = H * 0.47;
    for (const n of nodes.slice(0, 10)) {
      const b = boxes[n.i];
      Object.assign(n, { bx: b.x, by: b.y, bw: b.w, bh: b.h, lvl: b.lvl, parent: b.parent });
      const a = -Math.PI / 2 + (n.order + 0.5) / 10 * TAU;
      n.rx = W / 2 + Math.cos(a) * R; n.ry = cy + Math.sin(a) * R;
    }
  }

  function makeNode(i, x, y, born) {
    const pair = Math.floor(rnd() * 4);
    return { i, x, y, vx: 0, vy: 0, born, pair, sprite: sprites[pair][Math.floor(rnd() * 4)], phase: rnd() * TAU };
  }

  function reset() {
    rnd = mulberry32(2001);
    sctx.setTransform(1, 0, 0, 1, 0, 0);
    sctx.clearRect(0, 0, stain.width, stain.height);
    t = 0; edges = new Map(); pulses = []; nextIdea = T.live + 1.2; lastKnn = -1;
    nodes = [];
    const order = [3, 7, 0, 5, 9, 1, 6, 2, 8, 4];
    for (let i = 0; i < 10; i++) {
      const n = makeNode(i, 0, 0, 0);
      n.pair = [1, 3, 0, 2][i % 4]; n.sprite = sprites[n.pair][i % 4];
      n.order = order[i];
      nodes.push(n);
    }
    layout();
    for (const n of nodes) { n.x = n.bx; n.y = n.by; }
    crown = null;
  }

  const spacing = n => Math.sqrt(W * H * 0.52 / Math.max(n, 24));
  const R0 = () => Math.min(W, H) * 0.045;
  const radius = () => lerp(R0(), spacing(FINAL_N) * 0.21, Math.pow(seg(nodes.length, 10, FINAL_N), 0.6));
  const capSize = () => capPx / scale;
  // Height kept free under the dots for the caption, with breathing room above it.
  const capBand = () => capSize() * 4.6;
  const bossWobble = () => Math.sin((t - T.wobble) * 28) * 3 * seg(t, T.wobble, T.crown) * (1 - seg(t, T.crown, T.cut));

  // --- ideas ----------------------------------------------------------------

  function adjacency() {
    const adj = nodes.map(() => []);
    if (t < T.grow) {
      for (let a = 0; a < 10; a++) for (let b = 0; b < 10; b++) if (a !== b) adj[a].push(b);
    } else {
      for (const e of edges.values()) if (!e.dead) { adj[e.a].push(e.b); adj[e.b].push(e.a); }
    }
    return adj;
  }

  // Fade the bloom layer out towards the canvas edges, so no bloom is ever cut
  // by a straight line.
  function featherStain() {
    const w = stain.width, h = stain.height, f = Math.min(w, h) * 0.14;
    sctx.setTransform(1, 0, 0, 1, 0, 0);
    sctx.globalCompositeOperation = 'destination-out';
    sctx.globalAlpha = 1;
    for (const [x0, y0, x1, y1, rx, ry, rw, rh] of [
      [0, 0, 0, f, 0, 0, w, f], [0, h, 0, h - f, 0, h - f, w, f],
      [0, 0, f, 0, 0, 0, f, h], [w, 0, w - f, 0, w - f, 0, f, h],
    ]) {
      const g = sctx.createLinearGradient(x0, y0, x1, y1);
      g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)');
      sctx.fillStyle = g; sctx.fillRect(rx, ry, rw, rh);
    }
    sctx.globalCompositeOperation = 'source-over';
  }

  function startIdea(src, pair) {
    const adj = adjacency(), hop = new Array(nodes.length).fill(-1), queue = [src];
    hop[src] = 0;
    for (let q = 0; q < queue.length; q++) {
      for (const nb of adj[queue[q]]) if (hop[nb] < 0) { hop[nb] = hop[queue[q]] + 1; queue.push(nb); }
    }
    const max = Math.max(...hop);
    const col = pair ?? nodes[src].pair, n = nodes[src], s = stain.width / W, r = radius();
    sctx.setTransform(s, 0, 0, s, 0, 0);
    for (let k = 0; k < 3; k++) {
      const d = r * (5 + k * 2.5) / BLOB_R * SPRITE;
      sctx.globalAlpha = 0.09;
      sctx.drawImage(sprites[col][(src + k) % 4], n.x - d / 2 + hash(src, k) * r, n.y - d / 2 + hash(k, src) * r, d, d);
    }
    sctx.globalAlpha = 1;
    featherStain();
    pulses.push({ t0: t, hop, pair: col, end: t + max * HOP + 1 });
  }

  function nearest(x, y) {
    let best = 0, bd = Infinity;
    nodes.forEach((n, i) => { const d = (n.x - x) ** 2 + (n.y - y) ** 2; if (d < bd) { bd = d; best = i; } });
    return best;
  }

  // --- simulation -----------------------------------------------------------

  function knn() {
    const k = 3, want = new Set();
    for (let a = 0; a < nodes.length; a++) {
      const d = [];
      for (let b = 0; b < nodes.length; b++) if (a !== b) d.push([(nodes[a].x - nodes[b].x) ** 2 + (nodes[a].y - nodes[b].y) ** 2, b]);
      d.sort((p, q) => p[0] - q[0]);
      for (let i = 0; i < Math.min(k, d.length); i++) want.add(a < d[i][1] ? `${a}-${d[i][1]}` : `${d[i][1]}-${a}`);
    }
    for (const [key, e] of edges) {
      if (want.has(key)) e.dead = null;
      else if (!e.dead) e.dead = t;
      else if (t - e.dead > 0.6) edges.delete(key);
    }
    for (const key of want) if (!edges.has(key)) {
      const [a, b] = key.split('-').map(Number);
      edges.set(key, { a, b, born: t, dead: null });
    }
  }

  function step() {
    t += DT;

    // The crown slips off and tumbles to the floor.
    if (t >= T.crown && !crown) {
      const boss = nodes[0];
      crown = { x: boss.bx, y: boss.by - boss.bh / 2 - 12, vx: 1.3, vy: -3.2, rot: -0.08, vr: 0.07, bounces: 0 };
    }
    if (crown) {
      crown.vy += 0.42; crown.x += crown.vx; crown.y += crown.vy; crown.rot += crown.vr;
      const floor = H - 22;
      if (crown.y > floor) {
        crown.y = floor; crown.vy *= -0.42; crown.vx *= 0.6; crown.vr *= -0.5; crown.bounces++;
        if (crown.bounces > 2) { crown.vy = 0; crown.vr = 0; crown.vx = 0; crown.rot = lerp(crown.rot, 0.35, 0.2); }
      }
    }

    // New colleagues join next to someone who is already there.
    if (t >= T.grow) {
      const p = ease(seg(t, T.grow, T.growEnd));
      const target = Math.round(10 + (FINAL_N - 10) * p);
      while (nodes.length < target) {
        const parent = nodes[Math.floor(rnd() * nodes.length)], a = rnd() * TAU, r = radius() * 2.4;
        const n = makeNode(nodes.length, parent.x + Math.cos(a) * r, parent.y + Math.sin(a) * r, t);
        n.vx = Math.cos(a) * 2; n.vy = Math.sin(a) * 2;
        nodes.push(n);
      }
      if (t - lastKnn > 0.2) { knn(); lastKnn = t; }
    }

    // Before the ring forms, the ten follow the script: chart, wobble, melt.
    if (t < T.ring) {
      for (const n of nodes) {
        const e = ease(seg(t, T.morph + n.i * 0.07, T.ring + n.i * 0.07 - 0.2));
        n.x = lerp(n.bx, n.rx, e) + (n.i === 0 ? bossWobble() : 0);
        n.y = lerp(n.by, n.ry, e);
      }
    }

    const physics = t >= T.ring;
    if (physics) {
      const n = nodes.length, sp = spacing(n), rr = sp * 1.3, rest = sp * 0.95, r = radius();
      const hold = 1 - seg(t, T.grow, T.grow + 1.5);
      for (let a = 0; a < n; a++) {
        const A = nodes[a];
        for (let b = a + 1; b < n; b++) {
          const B = nodes[b], dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy) || 0.01;
          if (d < rr) {
            const f = 0.9 * (1 - d / rr) ** 2, fx = dx / d * f, fy = dy / d * f;
            A.vx -= fx; A.vy -= fy; B.vx += fx; B.vy += fy;
          }
        }
      }
      for (const e of edges.values()) {
        if (e.dead) continue;
        const A = nodes[e.a], B = nodes[e.b], dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy) || 0.01;
        const f = (d - rest) * 0.012, fx = dx / d * f, fy = dy / d * f;
        A.vx += fx; A.vy += fy; B.vx -= fx; B.vy -= fy;
      }
      const m = r + 18, bottom = H - r - capBand();
      // Keep the crowd centred as a whole; nobody is pulled to a middle.
      let cx = 0, cy = 0;
      for (const N of nodes) { cx += N.x / n; cy += N.y / n; }
      const shx = (W / 2 - cx) * 0.004, shy = ((H - capBand()) / 2 - cy) * 0.004;
      for (const N of nodes) {
        if (t >= T.grow) { N.vx += shx; N.vy += shy; }
        if (N.i < 10 && hold > 0) { N.vx += (N.rx - N.x) * 0.05 * hold; N.vy += (N.ry - N.y) * 0.05 * hold; }
        if (N.x < m) N.vx += (m - N.x) * 0.08;
        if (N.x > W - m) N.vx -= (N.x - W + m) * 0.08;
        if (N.y < m) N.vy += (m - N.y) * 0.08;
        if (N.y > bottom) N.vy -= (N.y - bottom) * 0.08;
        if (pointer && !reduceMotion) {
          const dx = N.x - pointer.x, dy = N.y - pointer.y, d = Math.hypot(dx, dy) || 0.01, pr = 110;
          if (d < pr) { const f = 1.1 * (1 - d / pr); N.vx += dx / d * f; N.vy += dy / d * f; }
        }
        if (!reduceMotion) { N.vx += Math.sin(t * 0.35 + N.phase) * 0.012; N.vy += Math.cos(t * 0.3 + N.phase * 1.3) * 0.012; }
        N.vx *= 0.86; N.vy *= 0.86;
        N.x += N.vx; N.y += N.vy;
      }
    }

    // Ideas: one in the ring, a few while growing, then every few seconds.
    if (Math.abs(t - T.idea) < DT / 2) startIdea(nodes[4].i);
    if (!reduceMotion && t >= T.grow + 4 && t >= nextIdea) {
      startIdea(Math.floor(rnd() * nodes.length));
      nextIdea = t + (t < T.live ? 1.8 : 2.4 + rnd() * 1.6);
    }
    if (Math.round(t / DT) % 60 === 0) {
      sctx.setTransform(1, 0, 0, 1, 0, 0);
      sctx.globalCompositeOperation = 'destination-out';
      sctx.globalAlpha = 0.04; sctx.fillRect(0, 0, stain.width, stain.height);
      sctx.globalCompositeOperation = 'source-over';
    }
    sctx.globalAlpha = 1;
    pulses = pulses.filter(p => t < p.end);
  }

  // --- drawing --------------------------------------------------------------

  function drawBox(n, alpha) {
    const { bx: cx, by: cy, bw: w, bh: h } = n, x0 = cx - w / 2, y0 = cy - h / 2, x1 = cx + w / 2, y1 = cy + h / 2, id = n.i * 10;
    ctx.globalAlpha = alpha * 0.9; ctx.fillStyle = CARD;
    ctx.fillRect(x0 + 2, y0 + 2, w - 3, h - 3);
    const o = { alpha, w: n.lvl === 0 ? 2.2 : 1.6 };
    inkLine(x0, y0, x1, y0, id + 1, o); inkLine(x1, y0, x1, y1, id + 2, o);
    inkLine(x1, y1, x0, y1, id + 3, o); inkLine(x0, y1, x0, y0, id + 4, o);
    inkLine(x0 + w * 0.18, cy - h * 0.12, x0 + w * (0.55 + 0.25 * Math.abs(hash(id, 5))), cy - h * 0.12, id + 5, { alpha: alpha * 0.8, w: 1.4, jit: 0.6 });
    inkLine(x0 + w * 0.18, cy + h * 0.2, x0 + w * (0.4 + 0.2 * Math.abs(hash(id, 6))), cy + h * 0.2, id + 6, { alpha: alpha * 0.45, w: 1, jit: 0.6 });
  }

  function drawCrown(x, y, rot, alpha) {
    const s = W < 800 ? 1.1 : 1;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    const pts = [[-17, 10], [-17, -6], [-9, 2], [0, -12], [9, 2], [17, -6], [17, 10]];
    ctx.globalAlpha = alpha * 0.9;
    const g = ctx.createLinearGradient(0, -12, 0, 10);
    g.addColorStop(0, '#ffff99'); g.addColorStop(1, '#ff9900');
    ctx.fillStyle = g; polyPath(ctx, pts); ctx.fill();
    for (let i = 0; i < pts.length; i++) {
      const [ax, ay] = pts[i], [bx, by] = pts[(i + 1) % pts.length];
      inkLine(ax, ay, bx, by, 900 + i, { alpha, w: 1.5, jit: 0.5 });
    }
    ctx.globalAlpha = alpha; ctx.fillStyle = '#ff0000';
    ctx.beginPath(); ctx.arc(0, 3, 2.4, 0, TAU); ctx.fill();
    ctx.restore(); ctx.globalAlpha = 1;
  }

  function drawBlob(n, r, alpha, sprite = n.sprite) {
    const d = r / BLOB_R * SPRITE;
    ctx.globalAlpha = alpha;
    ctx.drawImage(sprite, n.x - d / 2, n.y - d / 2, d, d);
    ctx.globalAlpha = 1;
  }

  const captionLines = (year, n) => /^pt/i.test(document.documentElement.lang) ? [
    [T.chart, 'o formato de sempre'],
    [T.crown - 0.3, 'mas e se ninguém estiver no topo?'],
    [T.ring, '2001 · dez engenheiros, todos conectados'],
    [T.grow + 0.3, `${year} · ${n} pessoas, e ainda sem chefes`],
  ] : [
    [T.chart, 'the usual shape'],
    [T.crown - 0.3, 'but what if nobody is on top?'],
    [T.ring, '2001 · ten engineers, all connected'],
    [T.grow + 0.3, `${year} · ${n} people, still no bosses`],
  ];

  function caption() {
    const n = nodes.length, year = Math.min(2026, 2001 + Math.floor(25 * seg(t, T.grow, T.growEnd - 0.4)));
    const lines = captionLines(year, n);
    let cur = lines[0];
    for (const l of lines) if (t >= l[0]) cur = l;
    const text = t < T.chart ? '' : cur[1].slice(0, Math.floor((t - cur[0]) * 40));
    if (capEl.textContent !== text) capEl.textContent = text;
  }

  function render() {
    boil = reduceMotion ? 0 : Math.floor(t * 12);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    setTheme();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(stain, 0, 0);
    const s = canvas.width / W;
    ctx.setTransform(s, 0, 0, s, 0, 0);

    // A faint year in the background while the network grows.
    const yearK = seg(t, T.ring, T.ring + 0.6) * (1 - 0.6 * seg(t, T.live, T.live + 2));
    if (yearK > 0) {
      const year = t < T.grow ? 2001 : Math.min(2026, 2001 + Math.floor(25 * seg(t, T.grow, T.growEnd - 0.4)));
      ctx.font = `700 ${H * 0.2}px Lora, Georgia, serif`;
      ctx.textAlign = 'right'; ctx.fillStyle = INK; ctx.globalAlpha = 0.06 * yearK;
      ctx.fillText(String(year), W * 0.96, H * 0.22);
      ctx.textAlign = 'left'; ctx.globalAlpha = 1;
    }

    // Org chart connectors: drawn on, then cut in the middle and pulled apart.
    if (t < T.morph + 1) {
      const cut = ease(seg(t, T.cut, T.morph + 0.6));
      for (const n of nodes.slice(1, 10)) {
        const P = nodes[n.parent], x1 = P.bx, y1 = P.by + P.bh / 2, x2 = n.bx, y2 = n.by - n.bh / 2, my = (y1 + y2) / 2;
        const drawn = seg(t, T.chart + 0.5 + n.lvl * 1.1 + n.i * 0.08, T.chart + 1.1 + n.lvl * 1.1 + n.i * 0.08);
        const parts = [[x1, y1, x1, my], [x1, my, x2, my], [x2, my, x2, y2]];
        const o = { alpha: 1 - cut * 0.8, w: 1.5 };
        parts.forEach(([ax, ay, bx, by], k) => {
          const d = clamp(drawn * 3 - k), gapA = 0.5 - 0.5 * (1 - cut), gapB = 0.5 + 0.5 * (1 - cut);
          if (cut > 0) { inkPart(ax, ay, bx, by, 0, Math.min(d, gapA), n.i * 31 + k, o); inkPart(ax, ay, bx, by, gapB, d, n.i * 31 + k + 7, o); }
          else inkPart(ax, ay, bx, by, 0, d, n.i * 31 + k, o);
        });
      }
    }

    // Everyone strung to everyone, like string art.
    const strings = seg(t, T.ring, T.ring + 1.2) * (1 - seg(t, T.grow, T.grow + 1.6));
    if (strings > 0) {
      let e = 0;
      for (let a = 0; a < 10; a++) for (let b = a + 1; b < 10; b++, e++) {
        const k = seg(t, T.ring + e * 0.018, T.ring + e * 0.018 + 0.5) * strings;
        if (k > 0) inkPart(nodes[a].x, nodes[a].y, nodes[b].x, nodes[b].y, 0, k, 500 + e, { alpha: 0.4 * strings, w: 1, jit: 0.7, bow: 0 });
      }
    }

    // The network.
    for (const e of edges.values()) {
      const k = seg(t, e.born, e.born + 0.5) * (e.dead ? 1 - seg(t, e.dead, e.dead + 0.5) : 1);
      const A = nodes[e.a], B = nodes[e.b];
      if (k > 0 && A && B) inkLine(A.x, A.y, B.x, B.y, e.a * 1009 + e.b, { alpha: 0.45 * k, w: 1.05, jit: 0.8, bow: hash(e.a, e.b) * 0.08 });
    }

    // Ideas travelling along the threads.
    const adj = pulses.length ? adjacency() : null;
    for (const p of pulses) {
      const col = PAIRS[p.pair][1];
      ctx.fillStyle = col;
      adj.forEach((nbs, a) => {
        const ha = p.hop[a];
        if (ha < 0) return;
        const q = (t - (p.t0 + ha * HOP)) / HOP;
        if (q <= 0 || q >= 1) return;
        for (const b of nbs) if (p.hop[b] === ha + 1) {
          const A = nodes[a], B = nodes[b];
          ctx.globalAlpha = 0.9;
          ctx.beginPath(); ctx.arc(lerp(A.x, B.x, q), lerp(A.y, B.y, q), Math.max(2, radius() * 0.28), 0, TAU); ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
    }

    // People.
    const r = radius();
    for (const n of nodes) {
      if (n.i < 10 && t < T.ring + 0.9) {
        const k = seg(t, T.morph + n.i * 0.07, T.ring + n.i * 0.07 - 0.2);
        const appear = backOut(seg(t, T.chart + n.lvl * 1.1 + n.i * 0.08, T.chart + 0.4 + n.lvl * 1.1 + n.i * 0.08));
        const boxA = 1 - seg(k, 0, 0.45);
        if (boxA > 0 && appear > 0) {
          ctx.save(); ctx.translate(n.x, n.y); ctx.scale(appear, appear); ctx.translate(-n.bx, -n.by);
          drawBox(n, boxA); ctx.restore();
        }
        const blobK = backOut(seg(k, 0.2, 1));
        if (blobK > 0) drawBlob(n, R0() * blobK, clamp(seg(k, 0.2, 0.6)));
        if (n.i === 0 && t < T.crown && appear > 0) drawCrown(n.x, n.by - n.bh / 2 - 12, -0.08 + bossWobble() * 0.03, 1);
        continue;
      }
      const born = backOut(seg(t, n.born, n.born + 0.5));
      let sz = r * born * (1 + 0.04 * Math.sin(t * 1.3 + n.phase));
      for (const p of pulses) {
        const h = p.hop[n.i];
        if (h < 0) continue;
        const dt = t - (p.t0 + h * HOP);
        if (dt >= 0 && dt < 0.8) {
          const k = dt / 0.8;
          sz *= 1 + 0.35 * (1 - k);
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 2.4);
          glow.addColorStop(0, PAIRS[p.pair][1]); glow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glow; ctx.globalAlpha = 0.3 * (1 - k);
          ctx.beginPath(); ctx.arc(n.x, n.y, r * 2.4, 0, TAU); ctx.fill();
          ctx.strokeStyle = PAIRS[p.pair][1]; ctx.lineWidth = 1.2; ctx.globalAlpha = 0.6 * (1 - k);
          ctx.beginPath(); ctx.arc(n.x, n.y, r * (1.2 + 1.8 * k), 0, TAU); ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
      drawBlob(n, sz, 1);
    }

    if (crown) drawCrown(crown.x, crown.y, crown.rot, 1 - seg(t, T.grow - 0.8, T.grow));

    caption();
  }

  // --- plumbing -------------------------------------------------------------

  function resize() {
    const w = stage.clientWidth;
    if (!w) return;
    capPx = parseFloat(getComputedStyle(capEl).fontSize) || 16;
    const mobile = w < 560, nW = mobile ? 640 : 1000, nH = mobile ? 800 : 625;
    if (nodes && (nW !== W || nH !== H)) {
      for (const n of nodes) { n.x *= nW / W; n.y *= nH / H; }
      if (crown) { crown.x *= nW / W; crown.y *= nH / H; }
    }
    W = nW; H = nH;
    stage.style.aspectRatio = `${W} / ${H}`;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    cssW = w; scale = w / W;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(w * H / W * dpr);
    const old = stain;
    stain = document.createElement('canvas');
    stain.width = canvas.width; stain.height = canvas.height;
    sctx = stain.getContext('2d');
    if (old.width) sctx.drawImage(old, 0, 0, stain.width, stain.height);
    if (nodes) { layout(); render(); }
  }

  let ready = false, visible = false, raf = 0, last = 0, acc = 0, frozen = false;

  function frame(now) {
    raf = 0;
    if (!visible || frozen) return;
    acc += Math.min(0.05, (now - (last || now)) / 1000);
    last = now;
    while (acc >= DT) { step(); acc -= DT; }
    render();
    raf = requestAnimationFrame(frame);
  }

  function kick() {
    if (ready && !raf && visible && !frozen) { last = 0; raf = requestAnimationFrame(frame); }
  }

  function seek(target) { reset(); while (t < target) step(); }

  function toWorld(e) {
    const b = canvas.getBoundingClientRect();
    return { x: (e.clientX - b.left) / b.width * W, y: (e.clientY - b.top) / b.height * H };
  }

  canvas.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') pointer = toWorld(e); });
  canvas.addEventListener('pointerleave', () => { pointer = null; });
  canvas.addEventListener('pointerdown', e => {
    if (!ready || t < T.chart) return;
    const p = toWorld(e);
    if (t < T.ring) { seek(T.ring); }
    startIdea(nearest(p.x, p.y), Math.floor(rnd() * 4));
  });

  new IntersectionObserver(([en]) => { visible = en.isIntersecting; kick(); }, { threshold: 0.15 }).observe(canvas);
  document.addEventListener('visibilitychange', () => { if (document.hidden) visible = false; });
  new ResizeObserver(resize).observe(stage);

  const params = new URLSearchParams(location.search);
  const fonts = document.fonts ? Promise.race([
    document.fonts.load('700 40px Lora'),
    new Promise(r => setTimeout(r, 1500)),
  ]) : Promise.resolve();

  fonts.then(() => {
    resize();
    reset();
    if (params.has('sketch-t')) seek(parseFloat(params.get('sketch-t')));
    else if (reduceMotion) seek(T.live + 0.5);
    frozen = params.has('sketch-freeze');
    ready = true;
    render();
    kick();
  });
})();
