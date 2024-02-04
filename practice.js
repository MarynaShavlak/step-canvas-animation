const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// const colorsArr = ['#ffcce8', '#fc8fcf', '#f42e9e', '#f70994', '#e2148c'];

class Circle {
  constructor(x, y, radius, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
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
    // if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
    //   this.speedX = -this.speedX;
    // }
    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
      this.speedY = -this.speedY;
    }
    // this.x += this.speedX;
    this.y += this.speedY;
  }
}
const colorsArr = ['#ffcce8', '#fc8fcf', '#f42e9e', '#f70994', '#e2148c'];
const circlesArr = [];
for (let i = 0; i < 20; i++) {
  let radius = randomNumber(2, 10);
  let x = Math.random() * (window.innerWidth - radius * 2) + radius;
  let y = Math.random() * (window.innerHeight - radius * 2) + radius;

  let speedX = (Math.random() - 0.5) * 10;
  let speedY = (Math.random() - 0.6) * 10;
  let color = colorsArr[randomNumber(0, colorsArr.length - 1)];
  circlesArr.push(new Circle(x, y, radius, speedX, speedY, color));
}

function animation() {
  requestAnimationFrame(animation);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < circlesArr.length; i++) {
    circlesArr[i].showCircle();
    circlesArr[i].moveCircle();
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

animation();
