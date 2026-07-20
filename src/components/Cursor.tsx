import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

type CursorState = 'default' | 'hover' | 'text';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>('default');
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setHidden(true);
      return;
    }

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const glow = glowRef.current!;

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });
    const glowX = gsap.quickTo(glow, 'x', { duration: 0.6, ease: 'power3.out' });
    const glowY = gsap.quickTo(glow, 'y', { duration: 0.6, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      glowX(e.clientX);
      glowY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, [data-cursor="text"]')) setState('text');
      else if (t.closest('a, button, [data-cursor="hover"]')) setState('hover');
      else setState('default');
    };

    const onDown = () => gsap.to([ring, dot], { scale: 0.85, duration: 0.2 });
    const onUp = () => gsap.to([ring, dot], { scale: 1, duration: 0.3 });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  if (hidden) return null;

  const ringSize = state === 'hover' ? 56 : state === 'text' ? 4 : 36;
  const dotSize = state === 'text' ? 0 : 6;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Soft glow */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-40 w-40 rounded-full opacity-40 blur-[40px]"
        style={{
          background:
            state === 'hover'
              ? 'radial-gradient(circle,#6D5DFB,transparent 70%)'
              : 'radial-gradient(circle,rgba(255,255,255,0.4),transparent 70%)',
          marginLeft: -80,
          marginTop: -80,
          willChange: 'transform',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 rounded-full border border-white/50 mix-blend-difference transition-[width,height,margin] duration-300"
        style={{
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          willChange: 'transform',
          background: state === 'text' ? 'rgba(255,255,255,0.9)' : 'transparent',
        }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 rounded-full bg-white mix-blend-difference"
        style={{
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          willChange: 'transform',
        }}
      />
    </div>
  );
}
