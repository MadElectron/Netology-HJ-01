const objectCount = rand(25, 100);
const shapes = [];
const canvas = document.getElementById('wall');
const ctx = canvas.getContext('2d');
let time = 0;
let timerId;

timeFunctions = {
  0: function nextPoint(x, y, time) {
    return {
      x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
      y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    };
  },
  1: function(x, y, time) {
    return {
      x: x + Math.sin((x + (time / 10)) / 100) * 5,
      y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
    }
  }
};

// ==== Objects ====

class Shape {
  constructor(x, y, size, nextPoint) {
    this.coords = {};
    this.coords.x = x;
    this.coords.y = y;
    this.size = size;
    this.nextPoint = nextPoint;
  }
  draw() {
    //
  }
}

class Circle extends Shape {
  constructor(x, y, size, nextPoint) {
    super(x, y, size, nextPoint);
    this.radius = 12 * this.size;
  }
  draw(ctx) {
    ctx.strokeStyle = '#fff';
    ctx.moveTo(this.coords.x, this.coords.y);
    ctx.beginPath();
    ctx.arc(this.coords.x, this.coords.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  }
}

class Cross extends Shape {
  constructor(x, y, size, nextPoint, speed) {
    super(x, y, size, nextPoint);
    this.side = 20 * this.size;
    this.speed = speed;

    // @TODO: Angle!
  }
  draw(ctx) {
    ctx.strokeStyle = '#fff';
    ctx.moveTo(this.coords.x, this.coords.y);
    ctx.beginPath();
    ctx.arc(this.coords.x, this.coords.y, this.side, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke()
  }
}


init();


function init() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  for(let i = 0; i < objectCount; i++) {
    shapes.push(new Circle(
      rand(0, canvas.width),
      rand(0, canvas.height),
      rand(0.1, 0.6, true),
      timeFunctions[Math.round(Math.random(0.5))],
      ));
    shapes.push(new Cross(
      rand(0, canvas.width),
      rand(0, canvas.height),
      rand(0.1, 0.6, true),
      timeFunctions[Math.round(Math.random(0.5))],
      rand(-0.2, 0.2, true)  
    ));
  }
}

function repaint() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  shapes.forEach(shape => {
    shape.coords = shape.nextPoint(shape.coords.x, shape.coords.y, Date.now());
    shape.draw(ctx);
  });
}

// console.log(shapes)
// console.log(shapes[0].nextPoint(10,10,1));
repaint();


function rand(min, max, float = false) {
  const result = Math.random() * (max - min) + min;
  return float ? result : Math.floor(result);
}

function nextPoint(x, y, time) {
  return {
    x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
    y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
  };
}

timerId = setInterval(repaint, 50);