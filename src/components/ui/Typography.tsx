import type { ElementType, ReactNode } from 'react';

type Variant = 'display' | 'h1' | 'h2' | 'h3' | 'body' | 'lead' | 'caption' | 'label';

interface TypographyProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  as?: ElementType;
  gradient?: boolean;
  accent?: boolean;
}

const styles: Record<Variant, string> = {
  display:
    'text-[clamp(2.75rem,8vw,7.5rem)] font-semibold leading-[0.98] tracking-tightest',
  h1: 'text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-tightest',
  h2: 'text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-tightest',
  h3: 'text-xl font-semibold tracking-tight sm:text-2xl',
  body: 'text-base leading-relaxed text-muted',
  lead: 'text-lg leading-relaxed text-muted sm:text-xl',
  caption: 'text-sm text-muted',
  label: 'text-xs tracking-[0.25em] text-muted/70 uppercase',
};

export default function Typography({
  variant = 'body',
  children,
  className = '',
  as,
  gradient = false,
  accent = false,
}: TypographyProps) {
  const Tag = as ?? 'p';
  const colorClass = gradient
    ? 'text-gradient'
    : accent
      ? 'text-gradient-accent'
      : '';
  return (
    <Tag className={`${styles[variant]} ${colorClass} ${className}`}>{children}</Tag>
  );
}
