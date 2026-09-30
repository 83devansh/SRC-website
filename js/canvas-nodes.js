/**
 * ==========================================================================
 * Interactive Connected Nodes & Particle Constellation Canvas
 * High-performance futuristic research network background
 * ==========================================================================
 */

class NodeConstellation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.animationFrameId = null;

    // Check prefers-reduced-motion
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.resize();
    this.createNodes();
    this.bindEvents();
    this.animate();
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  createNodes() {
    this.nodes = [];
    // Dynamic node count based on viewport area
    const count = Math.floor((this.width * this.height) / 12000);
    const totalNodes = Math.min(Math.max(count, 35), 85);

    for (let i = 0; i < totalNodes; i++) {
      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * (this.reducedMotion ? 0.1 : 0.6),
        vy: (Math.random() - 0.5) * (this.reducedMotion ? 0.1 : 0.6),
        radius: Math.random() * 2 + 1.2,
        color: Math.random() > 0.4 ? 'rgba(0, 210, 255, ' : 'rgba(139, 92, 246, ',
        baseAlpha: Math.random() * 0.5 + 0.3
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createNodes();
    });

    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update & draw nodes
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];

      // Movement
      if (!this.reducedMotion) {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < 0 || node.x > this.width) node.vx *= -1;
        if (node.y < 0 || node.y > this.height) node.vy *= -1;

        // Mouse interaction (gentle attraction / repulsion)
        if (this.mouse.x !== null && this.mouse.y !== null) {
          const dx = this.mouse.x - node.x;
          const dy = this.mouse.y - node.y;
          const dist = Math.hypot(dx, dy);

          if (dist < this.mouse.radius) {
            const force = (this.mouse.radius - dist) / this.mouse.radius;
            node.x -= (dx / dist) * force * 1.5;
            node.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      // Draw node circle
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${node.color}${node.baseAlpha})`;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = node.color.includes('210') ? 'rgba(0, 210, 255, 0.6)' : 'rgba(139, 92, 246, 0.6)';
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      // Draw connections between close nodes
      for (let j = i + 1; j < this.nodes.length; j++) {
        const other = this.nodes[j];
        const dist = Math.hypot(node.x - other.x, node.y - other.y);
        const maxDist = 135;

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.28;
          this.ctx.beginPath();
          this.ctx.moveTo(node.x, node.y);
          this.ctx.lineTo(other.x, other.y);
          this.ctx.strokeStyle = `rgba(0, 210, 255, ${alpha})`;
          this.ctx.lineWidth = 0.85;
          this.ctx.stroke();
        }
      }

      // Connect to mouse cursor
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const mouseDist = Math.hypot(node.x - this.mouse.x, node.y - this.mouse.y);
        if (mouseDist < this.mouse.radius) {
          const alpha = (1 - mouseDist / this.mouse.radius) * 0.45;
          this.ctx.beginPath();
          this.ctx.moveTo(node.x, node.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}

// Auto instantiate on DOM load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('hero-canvas')) {
    new NodeConstellation('hero-canvas');
  }
});
