import { useEffect, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import { LOADING_MESSAGES } from '../constants';

export default function Loader({ onComplete }: { onComplete?: () => void }) {
  const [count, setCount] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const [exiting, setExiting] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2,
        dur: Math.random() * 3 + 3,
      })),
    [],
  );

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dur = reduce ? 200 : 1700;
    const start = performance.now();

    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setExiting(true);
        gsap.to('#loader', {
          opacity: 0,
          scale: 1.04,
          filter: 'blur(8px)',
          duration: 0.7,
          ease: 'power3.inOut',
          onComplete: () => onComplete?.(),
        });
      }
    };
    raf = requestAnimationFrame(tick);

    const msgTimer = setInterval(
      () => setMsgIdx((i) => (i + 1) % LOADING_MESSAGES.length),
      600,
    );

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(msgTimer);
    };
  }, [onComplete]);

  return (
    <div
      id="loader"
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-ink-950"
      style={{ pointerEvents: exiting ? 'none' : 'auto' }}
    >
      {/* Background lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan/10 blur-[100px]" />
      </div>

      {/* Particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/40"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              animation: `float-slow ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Glass panel */}
      <div className="glass-strong relative flex flex-col items-center rounded-3xl px-10 py-12 sm:px-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-cyan">
            <span className="text-sm font-bold text-white">A</span>
          </span>
          <span className="text-sm font-semibold tracking-[0.3em]">AXIOM</span>
          <span className="h-px w-6 bg-white/20" />
          <span className="text-sm font-medium tracking-[0.3em] text-muted">STUDIO</span>
        </div>

        {/* Progress bar */}
        <div className="mt-10 h-px w-[240px] overflow-hidden bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-accent via-accent-cyan to-accent-orange transition-[width] duration-100 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>

        {/* Percentage + message */}
        <div className="mt-4 flex w-[240px] items-center justify-between text-[11px] tabular-nums tracking-widest text-muted">
          <span>{count.toString().padStart(3, '0')}%</span>
          <span className="text-right text-muted/70">{LOADING_MESSAGES[msgIdx]}</span>
        </div>
      </div>
    </div>
  );
}
