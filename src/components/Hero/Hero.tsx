import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { ROTATING_SUBTITLES } from '../../data/content';
import Container from '../ui/Container';
import { useReveal } from '../../hooks/useReveal';
import { useMagnetic } from '../../hooks/useMagnetic';

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const titleRef = useReveal<HTMLHeadingElement>({ y: 32, duration: 1 });
  const subRef = useReveal<HTMLParagraphElement>({ y: 20, delay: 0.15 });
  const ctaRef = useReveal<HTMLDivElement>({ y: 20, delay: 0.3 });
  const badgeRef = useReveal<HTMLSpanElement>({ y: 16, delay: 0.05 });
  const magneticPrimary = useMagnetic<HTMLAnchorElement>({ strength: 0.3 });
  const magneticSecondary = useMagnetic<HTMLAnchorElement>({ strength: 0.3 });

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % ROTATING_SUBTITLES.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center">
          <span
            ref={badgeRef}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium tracking-wide text-muted backdrop-blur-md"
          >
            <Sparkles size={13} className="text-accent-cyan" />
            Available for select freelance projects
          </span>

          <h1
            ref={titleRef}
            className="mt-8 max-w-5xl text-balance text-[clamp(2.75rem,8vw,7.5rem)] font-semibold leading-[0.98] tracking-tightest"
          >
            <span className="text-gradient">Augustine Amos A</span>
          </h1>

          <p
            ref={subRef}
            className="mt-6 max-w-2xl text-balance text-lg text-muted sm:text-xl"
          >
            Full Stack Web Developer &amp; Digital Experience Designer.
          </p>

          <div className="mt-3 h-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={idx}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-base font-medium text-gradient-accent sm:text-lg"
              >
                {ROTATING_SUBTITLES[idx]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              ref={magneticPrimary}
              href="#work"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink-950 transition-all duration-300 hover:bg-white/90"
            >
              View selected work
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </a>
            <a
              ref={magneticSecondary}
              href="#contact"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[11px] tracking-[0.3em]">SCROLL</span>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
