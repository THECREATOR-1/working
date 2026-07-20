import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';

interface CardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: boolean;
  href?: string;
}

/** Premium card with optional 3D tilt + accent glow on hover. */
export default function Card({
  children,
  className = '',
  tilt = true,
  glow = true,
  href,
}: CardProps) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !tilt) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: px * 8,
      rotateX: -py * 8,
      transformPerspective: 900,
      transformOrigin: 'center',
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' });
  };

  const Tag = href ? 'a' : 'div';

  return (
    <Tag
      // @ts-expect-error polymorphic ref
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
      className={`group preserve-3d relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition-colors duration-500 hover:border-white/20 ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {glow && (
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      )}
      <div className="relative">{children}</div>
    </Tag>
  );
}
