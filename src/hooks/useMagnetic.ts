import { useEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';

type MagneticOptions = {
  strength?: number;
  radius?: number;
};

/** Magnetic attraction toward the cursor on hover. Returns a ref to attach to any element. */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
  options: MagneticOptions = {},
): RefObject<T> {
  const ref = useRef<T>(null);
  const { strength = 0.35, radius = 80 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(max-width: 768px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius + Math.max(rect.width, rect.height) / 2) {
        xTo(0);
        yTo(0);
        return;
      }
      xTo(dx * strength);
      yTo(dy * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength, radius]);

  return ref as RefObject<T>;
}
