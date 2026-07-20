import { useLayoutEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Returns a ref whose `clipPath` inset animates from bottom on scroll. */
export function useClipReveal<T extends HTMLElement = HTMLDivElement>(
  start = 'top 85%',
): RefObject<T> {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)' });

    const tween = gsap.to(el, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.1,
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start, once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [start]);

  return ref as RefObject<T>;
}
