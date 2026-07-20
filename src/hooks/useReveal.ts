import { useLayoutEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
  scale?: number;
  blur?: number;
};

/** Fade/slide/blur reveal on scroll. Works on any element or a container of children. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {},
): RefObject<T> {
  const ref = useRef<T>(null);
  const {
    y = 28,
    x = 0,
    opacity = 0,
    duration = 0.9,
    delay = 0,
    stagger = 0,
    start = 'top 85%',
    once = true,
    scale = 1,
    blur = 0,
  } = options;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1, filter: 'none' });
      return;
    }

    const targets = stagger > 0 ? el.children : el;
    gsap.set(targets, { opacity, y, x, scale, filter: blur ? `blur(${blur}px)` : 'none' });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        once,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [y, x, opacity, duration, delay, stagger, start, once, scale, blur]);

  return ref as RefObject<T>;
}
