'use strict';

const BRUSH_RADIUS = 6;

const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

let curves = [];
let drawing = false;
let needsRepaint = false;
let brushRadius = 100;
let hue = 0;
let radiusDecreasing = true;

class Point {
  constructor(x, y, radius, color) {
    this.coords = [x, y];
    this.radius = radius;
    this.color = color;
  }
}

document.addEventListener('DOMContentLoaded', (evt) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

// curves and figures
function circle(point) {
  ctx.beginPath();
  ctx.fillStyle = point.color;
  ctx.arc(...point.coords, point.radius / 2, 0, 2 * Math.PI);
  ctx.fill();
}

function smoothCurveBetween (p1, p2) {
  // Bezier control point
  const cpCoords = p1.coords.map((coord, idx) => (coord + p2.coords[idx]) / 2);
  const cp = new Point(...cpCoords, brushRadius, hsl(hue, 100, 50));
  ctx.beginPath();
  ctx.quadraticCurveTo(...p1.coords, ...cp.coords);
  ctx.quadraticCurveTo(...cp.coords, ...p2.coords);
  ctx.closePath();
}

function smoothCurve(points) {
  
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  ctx.moveTo(...points[0].coords);

  for(let i = 1; i < points.length - 1; i++) {
    ctx.strokeStyle = points[i + 1].color;
    ctx.lineWidth = points[i + 1].radius;
    smoothCurveBetween(points[i], points[i + 1]);
    ctx.stroke();
  }
}

canvas.addEventListener('mousedown', (evt) => {
  drawing = true;

  const curve = []; // create a new curve
  const point = new Point(evt.offsetX, evt.offsetY, brushRadius, hsl(hue, 100, 50));

  curve.push(point); // add a new point
  curves.push(curve); // add the curve to the array of curves
  needsRepaint = true;
});

canvas.addEventListener('mouseup', (evt) => {
  drawing = false;
});

canvas.addEventListener('mouseleave', (evt) => {
  drawing = false;
});

canvas.addEventListener('mousemove', (evt) => {
  if (drawing) {
    // add a point
    const point = new Point(evt.offsetX, evt.offsetY, brushRadius, hsl(hue, 100, 50));
    curves[curves.length - 1].push(point);
    needsRepaint = true;
  }
});

// rendering
function repaint () {
  // clear before repainting
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  curves
    .forEach((curve) => {
      // first...
      circle(curve[0]);

      // the body is compraised of lines
      smoothCurve(curve);
    });
}

function tick () {
  if(needsRepaint) {
    repaint();
    needsRepaint = false;
  }

  initStyles();
  window.requestAnimationFrame(tick);
}


function initStyles() {
  if (radiusDecreasing) {
    brushRadius--;
  } else {
    brushRadius++;
  }
  if ([5, 100].indexOf(brushRadius) !== -1) {
    radiusDecreasing = !radiusDecreasing;
  }

  hue = ++hue % 360;
}

function hsl(h, s, l) {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

tick();