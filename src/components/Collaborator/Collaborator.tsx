import { COLLABORATOR } from '../../data/content';
import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';
import GlassPanel from '../ui/GlassPanel';
import Orb from '../reactbits/Orb/Orb';
import { useReveal } from '../../hooks/useReveal';

export default function Collaborator() {
  const skillsRef = useReveal<HTMLDivElement>({ stagger: 0.06, y: 20 });

  return (
    <Section id="collaborator">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <GlassPanel strong className="relative aspect-square overflow-hidden">
              <div className="absolute inset-0">
                <Orb color="#00D4FF" intensity={0.6} hoverIntensity={1.2} />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="grid h-24 w-24 place-items-center rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md">
                  <span className="text-3xl font-semibold tracking-tightest">K</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight">{COLLABORATOR.name}</h3>
                <p className="mt-1 text-sm text-muted">{COLLABORATOR.role}</p>
              </div>
            </GlassPanel>
          </div>

          <div className="lg:col-span-7">
            <SectionTitle
              eyebrow="In collaboration with"
              title="A duo built for premium outcomes"
              description="Great products are rarely solo efforts. I collaborate with Keerthigasri — a frontend developer and software engineer who brings rigor, responsiveness, and performance to every build."
            />

            <div ref={skillsRef} className="mt-10 flex flex-col gap-8">
              <div>
                <p className="text-xs tracking-[0.25em] text-muted/70">SPECIALTIES</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {COLLABORATOR.specialties.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs tracking-[0.25em] text-muted/70">SKILLS</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {COLLABORATOR.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-sm text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
