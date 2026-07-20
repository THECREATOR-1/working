import { useLayoutEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type TextRevealOptions = {
  stagger?: number;
  duration?: number;
  start?: string;
  once?: boolean;
};

/** Splits text content into word spans and reveals them on scroll. */
export function useTextReveal<T extends HTMLElement = HTMLHeadingElement>(
  options: TextRevealOptions = {},
): RefObject<T> {
  const ref = useRef<T>(null);
  const { stagger = 0.08, duration = 0.8, start = 'top 80%', once = true } = options;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const text = el.textContent ?? '';
    el.textContent = '';
    const words = text.split(' ');
    const spans: HTMLSpanElement[] = [];

    words.forEach((word) => {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.style.overflow = 'hidden';
      span.style.verticalAlign = 'top';

      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.style.willChange = 'transform';
      inner.textContent = word;
      span.appendChild(inner);
      el.appendChild(span);
      spans.push(inner);
      el.appendChild(document.createTextNode(' '));
    });

    gsap.set(spans, { yPercent: 110, opacity: 0 });

    const tween = gsap.to(spans, {
      yPercent: 0,
      opacity: 1,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start, once },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      el.textContent = text;
    };
  }, [stagger, duration, start, once]);

  return ref as RefObject<T>;
}
