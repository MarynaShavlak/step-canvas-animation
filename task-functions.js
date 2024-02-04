// const canvas = document.createElement('canvas');
// const body = document.querySelector('body');
// const ctx = canvas.getContext('2d');
// let width = (canvas.width = window.innerWidth);
// let height = (canvas.height = window.innerHeight);

// let particles = [];
// const options = {
//   bgColor: 'rgba(0,0,0,1)',
//   particleCount: 70,
//   particleRadius: 3,
//   particleColor: 'rgba(255,233,0,1)',
//   particleVelocity: 0.8,
//   lineLength: 160,
//   particleLife: 7,
// };
// body.appendChild(canvas);

// window.onresize = function () {
//   width = canvas.width = window.innerWidth;
//   height = canvas.height = window.innerHeight;
// };

// class Particle {
//   constructor() {
//     this.reset();
//   }
//   reset() {
//     this.x = Math.random() * width;
//     this.y = Math.random() * height;
//     this.velX =
//       Math.random() * (options.particleVelocity * 2) - options.particleVelocity;
//     this.velY =
//       Math.random() * (options.particleVelocity * 2) - options.particleVelocity;
//     this.life = Math.random() * options.particleLife * 60;
//   }

//   updatePosition() {
//     this.checkBoundaryCollision('x', this.velX, width);
//     this.checkBoundaryCollision('y', this.velY, height);

//     this.x += this.velX;
//     this.y += this.velY;
//   }

//   draw() {
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, options.particleRadius, 0, Math.PI * 2);
//     ctx.closePath();
//     ctx.fillStyle = options.particleColor;
//     ctx.fill();
//   }

//   checkBoundaryCollision(axis, velocity, boundary) {
//     if (
//       (this[axis] + velocity > boundary && velocity > 0) ||
//       (this[axis] + velocity < 0 && velocity < 0)
//     ) {
//       this[axis === 'x' ? 'velX' : 'velY'] *= -1;
//     }
//   }

//   calculateLife() {
//     if (this.life < 1) {
//       this.reset();
//     }
//     this.life -= 1;
//   }
// }

// init();

// function drawLines() {
//   let x1, y1, x2, y2, length, opacity;
//   for (let i in particles) {
//     for (let j in particles) {
//       x1 = particles[i].x;
//       y1 = particles[i].y;
//       x2 = particles[j].x;
//       y2 = particles[j].y;
//       length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
//       if (length < options.lineLength) {
//         opacity = 1 - length / options.lineLength;
//         ctx.lineWidth = '0.5';
//         ctx.strokeStyle = 'rgba(255,233,0,' + opacity + ')';
//         ctx.beginPath();
//         ctx.moveTo(x1, y1);
//         ctx.lineTo(x2, y2);
//         ctx.closePath();
//         ctx.stroke();
//       }
//     }
//   }
// }
// function drawAllParticles() {
//   particles.forEach(particle => {
//     particle.calculateLife();
//     particle.updatePosition();
//     particle.draw();
//   });
// }

// function init() {
//   particles = Array.from({ length: options.particleCount }, () => {
//     return new Particle();
//   });

//   animate();
// }

// function animate() {
//   setBackground();
//   drawAllParticles();
//   drawLines();
//   requestAnimationFrame(animate);
// }

// function setBackground() {
//   ctx.fillStyle = options.bgColor;
//   ctx.fillRect(0, 0, width, height);
// }

////___________________________________________
