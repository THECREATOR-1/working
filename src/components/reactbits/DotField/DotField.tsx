import { useEffect, useRef } from 'react';

interface DotFieldProps {
  className?: string;
  color?: string;
  density?: number;
  radius?: number;
  interactive?: boolean;
}

/**
 * React Bits — DotField
 * A field of dots that gently repel from the cursor on a canvas.
 * Isolated, self-contained; only props are customized.
 */
export default function DotField({
  className = '',
  color = '#ffffff',
  density = 26,
  radius = 120,
  interactive = true,
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dots: { x: number; y: number; ox: number; oy: number; vx: number; vy: number }[] = [];
    let mx = -9999;
    let my = -9999;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(w / density);
      const rows = Math.ceil(h / density);
      dots = [];
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * density;
          const y = j * density;
          dots.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
        }
      }
    };
    build();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };
    if (interactive) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseleave', onLeave);
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dx = d.x - mx;
        const dy = d.y - my;
        const dist = Math.hypot(dx, dy);
        if (interactive && dist < radius) {
          const force = (1 - dist / radius) * 14;
          const ang = Math.atan2(dy, dx);
          d.vx += Math.cos(ang) * force * 0.18;
          d.vy += Math.sin(ang) * force * 0.18;
        }
        d.vx *= 0.86;
        d.vy *= 0.86;
        d.x += d.vx;
        d.y += d.vy;
        d.x += (d.ox - d.x) * 0.08;
        d.y += (d.oy - d.y) * 0.08;

        const opacity = interactive && dist < radius ? 0.9 : 0.22;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onResize = () => build();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [color, density, radius, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
