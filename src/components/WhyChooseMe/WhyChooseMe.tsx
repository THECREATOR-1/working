import { Gem, Zap, Accessibility, Handshake, TrendingUp, Rocket } from 'lucide-react';
import { WHY_CHOOSE_ME } from '../../data/content';
import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';
import GlassPanel from '../ui/GlassPanel';
import { useReveal } from '../../hooks/useReveal';
import { useParallax } from '../../hooks/useParallax';

const ICONS: Record<string, typeof Gem> = {
  gem: Gem,
  zap: Zap,
  accessibility: Accessibility,
  handshake: Handshake,
  trending: TrendingUp,
  rocket: Rocket,
};

export default function WhyChooseMe() {
  const gridRef = useReveal<HTMLDivElement>({ stagger: 0.08, y: 28 });
  const eyebrowRef = useParallax<HTMLDivElement>({ speed: 0.15 });

  return (
    <Section id="why">
      <Container>
        <div ref={eyebrowRef}>
          <SectionTitle
            eyebrow="Why work with me"
            title="The details that compound into premium."
            description="Premium isn't a coat of paint — it's a hundred small decisions made correctly. Here's what you get when we work together."
          />
        </div>

        <div ref={gridRef} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_ME.map((item) => {
            const Icon = ICONS[item.icon] ?? Gem;
            return (
              <GlassPanel
                key={item.id}
                hover
                className="group flex flex-col gap-4 p-7 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-white transition-colors duration-500 group-hover:border-accent-cyan/40 group-hover:text-accent-cyan">
                    <Icon size={18} />
                  </div>
                  <span className="text-xs tabular-nums tracking-widest text-muted/50">
                    {item.id}
                  </span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
              </GlassPanel>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
