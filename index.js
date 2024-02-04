class Circle {
  constructor(x, y, radius, velocity, color, opacityModifier) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = { x: velocity.x, y: velocity.y };
    this.color = color;
    this.alpha = 1;
    this.opacityModifier = opacityModifier;
    this.canvas = document.querySelector('.canvas');
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }

  move() {
    if (this.isOutOfBounds()) {
      this.resetCircle();
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  update(ctx) {
    this.draw(ctx);
    this.move();
    this.updateAlpha();
  }

  isOutOfBounds() {
    return (
      this.x + this.radius > this.canvas.width ||
      this.x - this.radius < 0 ||
      this.y > this.canvas.height
    );
  }

  updateAlpha() {
    this.alpha =
      Math.abs(Math.sin(Date.now() * this.opacityModifier)) * 0.5 + 0.5;
  }

  resetCircle() {
    this.x =
      Math.random() * (this.canvas.width - this.radius * 2) + this.radius;
    this.y = -this.radius;
  }
}

class CanvasAnimation {
  constructor() {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    this.colorsArr = ['#343434', '#1c1c1c', '#6c6c6c', '#575757', '#808080'];
    this.opacityModifiers = [0.001, 0.002, 0.003, 0.004, 0.005];
    this.circlesArr = this.createCircles(160);

    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.resetAllCircles();
    });

    this.initAnimation();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createCircles(num) {
    return Array.from({ length: num }, () => {
      const radius = randomNumber(5, 20);
      const x = Math.random() * (this.canvas.width - radius * 2) + radius;
      const y = Math.random() * (this.canvas.height - radius * 2) + radius;
      const velocity = { x: 0.2, y: (Math.random() + 0.1) * 5 };
      const color = this.colorsArr[randomNumber(0, this.colorsArr.length - 1)];
      const opacityModifier =
        this.opacityModifiers[
          randomNumber(0, this.opacityModifiers.length - 1)
        ];
      return new Circle(x, y, radius, velocity, color, opacityModifier);
    });
  }

  resetAllCircles() {
    this.circlesArr.forEach(circle => {
      circle.x =
        Math.random() * (this.canvas.width - circle.radius * 2) + circle.radius;
      circle.y =
        Math.random() * (this.canvas.height - circle.radius * 2) +
        circle.radius;
    });
  }

  initAnimation() {
    requestAnimationFrame(() => this.initAnimation());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.circlesArr.forEach(circle => {
      if (circle.alpha <= 0) {
        circle.alpha = 1;
      }
      circle.update(this.ctx);
    });
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const canvas = document.querySelector('.canvas');
const canvasAnimation = new CanvasAnimation(canvas);
