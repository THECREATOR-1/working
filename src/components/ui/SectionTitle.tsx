import type { ReactNode } from 'react';
import Badge from './Badge';
import { useReveal } from '../../hooks/useReveal';
import { useTextReveal } from '../../hooks/useTextReveal';

interface SectionTitleProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionTitleProps) {
  const isCenter = align === 'center';
  const wrapRef = useReveal<HTMLDivElement>({ stagger: 0.1, y: 24 });

  return (
    <div
      ref={wrapRef as React.Ref<HTMLDivElement>}
      className={`flex flex-col gap-5 ${isCenter ? 'items-center text-center' : 'items-start'}`}
    >
      {eyebrow && <Badge>{eyebrow}</Badge>}
      {typeof title === 'string' ? (
        <TitleText text={title} className={isCenter ? 'mx-auto' : ''} />
      ) : (
        <h2
          className={`max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tightest sm:text-5xl lg:text-6xl ${isCenter ? 'mx-auto' : ''}`}
        >
          {title}
        </h2>
      )}
      {description && (
        <p
          className={`max-w-xl text-base leading-relaxed text-muted sm:text-lg ${isCenter ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function TitleText({ text, className }: { text: string; className?: string }) {
  const ref = useTextReveal<HTMLHeadingElement>();
  return (
    <h2
      ref={ref as React.Ref<HTMLHeadingElement>}
      className={`max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tightest sm:text-5xl lg:text-6xl ${className}`}
    >
      {text}
    </h2>
  );
}
