import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WEBSITE_STYLES } from '../../data/content';
import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';
import GlassPanel from '../ui/GlassPanel';
import { useReveal } from '../../hooks/useReveal';

export default function WebsiteStyles() {
  const [active, setActive] = useState(0);
  const previewRef = useReveal<HTMLDivElement>({ y: 24, duration: 1 });

  return (
    <Section id="styles">
      <Container>
        <SectionTitle
          eyebrow="Aesthetic Range"
          title="Every style, executed with restraint"
          description="A premium product isn't one aesthetic — it's the right aesthetic. Here are the visual languages I work in fluently."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-2">
              {WEBSITE_STYLES.map((style, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={style.name}
                    onClick={() => setActive(i)}
                    data-cursor="hover"
                    className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500 ${
                      isActive
                        ? 'border-white/20 bg-white/[0.05]'
                        : 'border-white/[0.08] bg-transparent hover:border-white/15 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-lg font-medium transition-colors ${
                          isActive ? 'text-white' : 'text-muted group-hover:text-white'
                        }`}
                      >
                        {style.name}
                      </span>
                      <span
                        className="h-2.5 w-2.5 rounded-full transition-transform duration-500"
                        style={{
                          background: style.accent,
                          transform: isActive ? 'scale(1.4)' : 'scale(1)',
                          boxShadow: isActive ? `0 0 16px ${style.accent}` : 'none',
                        }}
                      />
                    </div>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-sm leading-relaxed text-muted">{style.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>

          <div ref={previewRef as React.Ref<HTMLDivElement>} className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassPanel strong className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="absolute inset-0 transition-all duration-700"
                    style={{
                      background: `radial-gradient(circle at 50% 30%, ${WEBSITE_STYLES[active].accent}22, #050505 70%)`,
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                    <span
                      className="h-16 w-16 rounded-full blur-xl transition-colors duration-700"
                      style={{ background: WEBSITE_STYLES[active].accent }}
                    />
                    <h3 className="mt-8 text-3xl font-semibold tracking-tightest sm:text-4xl">
                      {WEBSITE_STYLES[active].name}
                    </h3>
                    <p className="mt-3 max-w-xs text-sm text-muted">{WEBSITE_STYLES[active].desc}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
                </GlassPanel>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
