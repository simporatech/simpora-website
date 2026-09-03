import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  layer: number; // 0: background, 1: midground, 2: foreground
  phase: number;
  phaseSpeed: number;
}

interface Pulse {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  speed: number;
}

export const NeuralConstellation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Highly optimized particle count for silky-smooth locked 60 FPS
    const isMobile = width < 768;
    const particleCount = isMobile ? 14 : 28;
    const maxConnectionDistance = isMobile ? 90 : 125;
    const maxDistanceSq = maxConnectionDistance * maxConnectionDistance;

    const particles: Particle[] = [];
    const pulses: Pulse[] = [];

    // Initialize particles across the full screen
    for (let i = 0; i < particleCount; i++) {
      const layer = Math.random() < 0.3 ? 0 : Math.random() < 0.7 ? 1 : 2;
      const radius = layer === 0 ? 1.0 : layer === 1 ? 1.6 : 2.2;
      const speedScale = layer === 0 ? 0.18 : layer === 1 ? 0.28 : 0.38;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speedScale,
        vy: (Math.random() - 0.5) * speedScale,
        radius,
        baseRadius: radius,
        layer,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.012 + Math.random() * 0.015,
      });
    }

    // Occasional energy pulse (controlled cadence)
    const pulseInterval = setInterval(() => {
      if (!isVisible || particles.length < 2 || pulses.length > 3) return;
      const idx = Math.floor(Math.random() * particles.length);
      const p1 = particles[idx];

      for (let j = 0; j < particles.length; j++) {
        if (idx === j) continue;
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistanceSq) {
          pulses.push({
            fromX: p1.x,
            fromY: p1.y,
            toX: p2.x,
            toY: p2.y,
            progress: 0,
            speed: 0.018 + Math.random() * 0.012,
          });
          break;
        }
      }
    }, 700);

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Kinematic particle drift
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;

        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        p.phase += p.phaseSpeed;
        const currentRadius = p.baseRadius + Math.sin(p.phase) * 0.3;

        // Render particle nodes
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, currentRadius), 0, Math.PI * 2);

        if (p.layer === 2) {
          ctx.fillStyle = 'rgba(18, 18, 18, 0.45)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(151, 242, 204, 0.35)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.1, 0, Math.PI * 2);
          ctx.fillStyle = '#97F2CC';
          ctx.fill();
        } else if (p.layer === 1) {
          ctx.fillStyle = 'rgba(18, 18, 18, 0.25)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.0, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(151, 242, 204, 0.7)';
          ctx.fill();
        } else {
          ctx.fillStyle = 'rgba(151, 242, 204, 0.35)';
          ctx.fill();
        }
      }

      // 2. High-Performance Batched Synapses (Draws ALL lines in 2 batched stroke calls!)
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        let connections = 0;

        for (let j = i + 1; j < particles.length; j++) {
          if (connections >= 3) break;
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            connections++;
          }
        }
      }
      ctx.strokeStyle = 'rgba(151, 242, 204, 0.22)';
      ctx.lineWidth = 0.85;
      ctx.stroke();

      // 3. Batched Energy Pulses
      for (let k = pulses.length - 1; k >= 0; k--) {
        const pulse = pulses[k];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(k, 1);
          continue;
        }

        const currX = pulse.fromX + (pulse.toX - pulse.fromX) * pulse.progress;
        const currY = pulse.fromY + (pulse.toY - pulse.fromY) * pulse.progress;

        ctx.beginPath();
        ctx.arc(currX, currY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(151, 242, 204, 0.4)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(currX, currY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(pulseInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1] select-none">
      {/* Lightweight ambient glow layers (Pure CSS, no heavy blur filters) */}
      <div className="absolute top-[25%] left-[20%] w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(151,242,204,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-[65%] right-[20%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(151,242,204,0.09)_0%,transparent_70%)] pointer-events-none" />

      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
