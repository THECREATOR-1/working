import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  pad?: boolean;
}

export default function Section({
  id,
  children,
  className = '',
  pad = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative ${pad ? 'section-pad' : ''} ${className}`}
    >
      {children}
    </section>
  );
}
