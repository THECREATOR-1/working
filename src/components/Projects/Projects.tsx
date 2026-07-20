import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../../data/content';
import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';
import { useReveal } from '../../hooks/useReveal';
import { useClipReveal } from '../../hooks/useClipReveal';

export default function Projects() {
  const gridRef = useReveal<HTMLDivElement>({ stagger: 0.12, y: 32 });

  return (
    <Section id="work">
      <Container>
        <SectionTitle
          eyebrow="Selected Work"
          title="Projects with intent."
          description="A focused selection of recent engagements. Each one started with a conversation and ended with a product people remember."
        />

        <div ref={gridRef as React.Ref<HTMLDivElement>} className="mt-14 grid gap-5 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} wide={i % 3 === 0} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ProjectCard({
  project,
  wide,
}: {
  project: (typeof PROJECTS)[number];
  wide: boolean;
}) {
  const imgRef = useClipReveal<HTMLDivElement>();

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition-colors duration-500 hover:border-white/20 ${
        wide ? 'md:col-span-2' : ''
      }`}
      data-cursor="hover"
    >
      <div ref={imgRef} className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} — ${project.category}`}
          loading="lazy"
          className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
        <div className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-ink-950/40 backdrop-blur-md transition-all duration-500 group-hover:bg-white group-hover:text-ink-950">
          <ArrowUpRight size={16} />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6 sm:p-8">
        <div className="flex items-center justify-between text-xs tracking-widest text-muted">
          <span>{project.category.toUpperCase()}</span>
          <span className="tabular-nums">{project.year}</span>
        </div>
        <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{project.title}</h3>
        <p className="max-w-xl text-[15px] leading-relaxed text-muted">{project.desc}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
