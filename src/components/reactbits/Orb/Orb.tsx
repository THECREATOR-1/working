import { useEffect, useRef } from 'react';

interface OrbProps {
  className?: string;
  color?: string;
  intensity?: number;
  hoverIntensity?: number;
}

/**
 * React Bits — Orb
 * A soft, animated gradient orb rendered on canvas with subtle mouse parallax.
 * Isolated, self-contained; only props are customized.
 */
export default function Orb({
  className = '',
  color = '#6D5DFB',
  intensity = 0.6,
  hoverIntensity = 1.2,
}: OrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;
    let mx = 0;
    let my = 0;
    let targetMx = 0;
    let targetMy = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    const draw = () => {
      t += 0.006;
      mx += (targetMx - mx) * 0.05;
      my += (targetMy - my) * 0.05;

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2 + mx * 20;
      const cy = h / 2 + my * 20;
      const baseR = Math.min(w, h) * 0.36;

      // Outer ambient glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 1.8);
      glow.addColorStop(0, `${color}33`);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Core orb with shifting gradient
      const r = baseR * (intensity + Math.sin(t * 1.5) * 0.04 + Math.abs(mx) * 0.02 * hoverIntensity);
      const grad = ctx.createRadialGradient(
        cx - r * 0.3,
        cy - r * 0.3,
        r * 0.1,
        cx,
        cy,
        r,
      );
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.25, `${color}cc`);
      grad.addColorStop(0.7, `${color}55`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Inner highlight swirl
      const swirl = ctx.createRadialGradient(
        cx + Math.cos(t) * r * 0.3,
        cy + Math.sin(t * 1.3) * r * 0.3,
        0,
        cx,
        cy,
        r * 0.7,
      );
      swirl.addColorStop(0, 'rgba(255,255,255,0.25)');
      swirl.addColorStop(1, 'transparent');
      ctx.fillStyle = swirl;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, [color, intensity, hoverIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
