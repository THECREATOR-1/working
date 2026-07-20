import { ArrowUpRight } from 'lucide-react';
import { NAV_LINKS, SITE } from '../../data/content';
import Container from '../ui/Container';
import { useReveal } from '../../hooks/useReveal';
import { useClipReveal } from '../../hooks/useClipReveal';

const SOCIALS = [
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
  { label: 'Dribbble', href: '#' },
];

export default function Footer() {
  const topRef = useReveal<HTMLDivElement>({ stagger: 0.08, y: 24 });
  const wordmarkRef = useClipReveal<HTMLParagraphElement>('top 90%');

  return (
    <footer className="relative overflow-hidden border-t border-white/10 pt-20">
      <Container>
        <div ref={topRef} className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <a href="#hero" className="flex items-center gap-2.5" aria-label="Axiom Studio home">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-cyan">
                <span className="text-xs font-bold text-white">A</span>
              </span>
              <span className="text-sm font-semibold tracking-tight">{SITE.name}</span>
            </a>
            <p className="mt-6 max-w-md text-balance text-lg leading-relaxed text-muted">
              {SITE.developer} — {SITE.title}. Crafting premium digital experiences from first sketch to launch.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs tracking-[0.25em] text-muted/70">NAVIGATE</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs tracking-[0.25em] text-muted/70">ELSEWHERE</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-white"
                  >
                    {s.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          ref={wordmarkRef}
          className="mt-16 select-none bg-gradient-to-b from-white/[0.06] to-transparent bg-clip-text text-[clamp(3rem,12vw,11rem)] font-semibold leading-none tracking-tightest text-transparent"
        >
          AXIOM
        </p>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 py-8 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {SITE.name} — {SITE.developer}. All rights reserved.</p>
          <p>Designed &amp; built with intent.</p>
        </div>
      </Container>
    </footer>
  );
}
