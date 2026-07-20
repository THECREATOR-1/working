import { PROCESS_STEPS } from '../../data/content';
import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';
import { useReveal } from '../../hooks/useReveal';

export default function Process() {
  const gridRef = useReveal<HTMLDivElement>({ stagger: 0.12, y: 28 });

  return (
    <Section id="process">
      <Container>
        <SectionTitle
          eyebrow="Process"
          title="A calm, deliberate path to launch"
          description="No black boxes. You'll always know where we are, what's next, and why."
        />

        <div
          ref={gridRef}
          className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] md:grid-cols-4"
        >
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.id}
              className="group relative flex flex-col gap-4 bg-ink-900/60 p-7 transition-colors duration-500 hover:bg-ink-800/60 sm:p-9"
            >
              <span className="text-5xl font-semibold tracking-tightest text-white/10 transition-colors duration-500 group-hover:text-accent/40">
                {step.id}
              </span>
              <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
