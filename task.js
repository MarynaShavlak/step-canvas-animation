class ParticleSystem {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.body = document.querySelector('body');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;

    this.particles = [];
    this.options = {
      bgColor: 'rgba(0,0,0,1)',
      particleCount: 70,
      particleRadius: 3,
      particleColor: 'rgba(255,233,0,1)',
      particleVelocity: 0.8,
      lineLength: 160,
      particleLife: 7,
    };

    this.body.appendChild(this.canvas);

    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  init() {
    this.particles = Array.from(
      { length: this.options.particleCount },
      () => new Particle(),
    );
    this.animate();
  }

  animate() {
    this.setBackground();
    this.drawAllParticles();
    this.drawLines();
    requestAnimationFrame(() => this.animate());
  }

  setBackground() {
    this.ctx.fillStyle = this.options.bgColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawLines() {
    let x1, y1, x2, y2, length, opacity;
    for (let i in this.particles) {
      for (let j in this.particles) {
        x1 = this.particles[i].x;
        y1 = this.particles[i].y;
        x2 = this.particles[j].x;
        y2 = this.particles[j].y;
        length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        if (length < this.options.lineLength) {
          opacity = 1 - length / this.options.lineLength;
          this.ctx.lineWidth = '0.5';
          this.ctx.strokeStyle = 'rgba(255,233,0,' + opacity + ')';
          this.ctx.beginPath();
          this.ctx.moveTo(x1, y1);
          this.ctx.lineTo(x2, y2);
          this.ctx.closePath();
          this.ctx.stroke();
        }
      }
    }
  }

  drawAllParticles() {
    this.particles.forEach(particle => {
      particle.calculateLife();
      particle.updatePosition();
      particle.draw();
    });
  }
}

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * particleSystem.width;
    this.y = Math.random() * particleSystem.height;
    this.velX =
      Math.random() * (particleSystem.options.particleVelocity * 2) -
      particleSystem.options.particleVelocity;
    this.velY =
      Math.random() * (particleSystem.options.particleVelocity * 2) -
      particleSystem.options.particleVelocity;
    this.life = Math.random() * particleSystem.options.particleLife * 60;
  }

  updatePosition() {
    this.checkBoundaryCollision('x', this.velX, particleSystem.width);
    this.checkBoundaryCollision('y', this.velY, particleSystem.height);

    this.x += this.velX;
    this.y += this.velY;
  }

  draw() {
    particleSystem.ctx.beginPath();
    particleSystem.ctx.arc(
      this.x,
      this.y,
      particleSystem.options.particleRadius,
      0,
      Math.PI * 2,
    );
    particleSystem.ctx.closePath();
    particleSystem.ctx.fillStyle = particleSystem.options.particleColor;
    particleSystem.ctx.fill();
  }

  checkBoundaryCollision(axis, velocity, boundary) {
    if (
      (this[axis] + velocity > boundary && velocity > 0) ||
      (this[axis] + velocity < 0 && velocity < 0)
    ) {
      this[axis === 'x' ? 'velX' : 'velY'] *= -1;
    }
  }

  calculateLife() {
    if (this.life < 1) {
      this.reset();
    }
    this.life -= 1;
  }
}

const particleSystem = new ParticleSystem();
particleSystem.init();
