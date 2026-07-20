import { STATS } from '../../data/content';
import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';
import GlassPanel from '../ui/GlassPanel';
import { useReveal } from '../../hooks/useReveal';
import { useTextReveal } from '../../hooks/useTextReveal';

export default function About() {
  const statsRef = useReveal<HTMLDivElement>({ stagger: 0.08, y: 24 });
  const quoteRef = useTextReveal<HTMLParagraphElement>({ stagger: 0.06, duration: 0.9 });

  return (
    <Section id="about">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <SectionTitle
              eyebrow="About"
              title="I build digital experiences that feel inevitable."
              description="I'm Augustine — a full stack developer and digital experience designer. I partner with founders, agencies, and brands to ship websites that don't just function, but feel premium. Every pixel, transition, and millisecond is intentional."
            />
          </div>

          <div className="lg:col-span-5 lg:pt-4">
            <div ref={statsRef} className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
              {STATS.map((s) => (
                <GlassPanel key={s.label} strong className="bg-ink-900/40 p-6 sm:p-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl font-semibold tracking-tightest sm:text-4xl">
                      {s.value}
                    </span>
                    <span className="text-sm text-muted">{s.label}</span>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </div>
        </div>

        <p
          ref={quoteRef}
          className="mt-16 max-w-3xl text-balance text-xl leading-relaxed text-white/80 sm:text-2xl"
        >
          Technology is secondary. Experience is primary. I craft products that make visitors think — this developer builds premium things.
        </p>
      </Container>
    </Section>
  );
}
