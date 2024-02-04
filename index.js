class Circle {
  constructor(x, y, radius, speedX, speedY, color, opacity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.opacity = opacity;
  }
  showCircle() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;

    ctx.stroke();
    ctx.fill();
  }
  moveCircle() {
    if (
      this.x + this.radius > canvas.width ||
      this.x - this.radius < 0 ||
      this.y > canvas.height
    ) {
      this.resetCircle();
    }
    this.x += this.speedX;
    this.y += this.speedY;
    ctx.strokeStyle = `rgba(${hexToRgb(this.color)}, ${this.opacity})`;
    ctx.fillStyle = `rgba(${hexToRgb(this.color)}, ${this.opacity})`;
  }

  resetCircle() {
    this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
    this.y = -this.radius;
  }
}

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colorsArr = ['#343434', '#1c1c1c', '#6c6c6c', '#575757', '#808080'];
const circlesArr = createCircles(160);

function createCircles(num) {
  return Array.from({ length: num }, () => {
    const radius = randomNumber(3, 10);
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const speedX = 0.2;
    const speedY = (Math.random() + 0.1) * 5;
    const color = colorsArr[randomNumber(0, colorsArr.length - 1)];
    const opacity = 0.1;
    return new Circle(x, y, radius, speedX, speedY, color, opacity);
  });
}

function resetAllCircles() {
  circlesArr.forEach(circle => {
    circle.x =
      Math.random() * (canvas.width - circle.radius * 2) + circle.radius;
    circle.y =
      Math.random() * (canvas.height - circle.radius * 2) + circle.radius;
  });
}

function initAnimation() {
  requestAnimationFrame(initAnimation);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  circlesArr.forEach((circle, index) => {
    circle.opacity = 0.5 + 0.5 * Math.sin((index + 1) * 0.05);
    circle.showCircle();
    circle.moveCircle();
  });
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16,
      )}`
    : null;
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  resetAllCircles();
});

initAnimation();
