import { Code2, Sparkles, Layers, Gauge } from 'lucide-react';
import { SERVICES } from '../../data/content';
import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import { useReveal } from '../../hooks/useReveal';

const ICONS: Record<string, typeof Code2> = {
  code: Code2,
  sparkles: Sparkles,
  layers: Layers,
  gauge: Gauge,
};

export default function Services() {
  const gridRef = useReveal<HTMLDivElement>({ stagger: 0.1, y: 28 });

  return (
    <Section id="services">
      <Container>
        <SectionTitle
          eyebrow="Services"
          title="What I craft"
          description="End-to-end product work — from first sketch to launch day. Each engagement is scoped, designed, and built to a premium standard."
        />

        <div ref={gridRef as React.Ref<HTMLDivElement>} className="mt-14 grid gap-4 sm:grid-cols-2">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon] ?? Code2;
            return (
              <Card key={s.id} className="p-7 sm:p-9">
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-white transition-colors duration-500 group-hover:border-accent/40 group-hover:text-accent-cyan">
                    <Icon size={20} />
                  </div>
                  <span className="text-sm tabular-nums tracking-widest text-muted/60">{s.id}</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{s.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-muted"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
