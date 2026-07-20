import type { HTMLAttributes, ReactNode } from 'react';

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  strong?: boolean;
  hover?: boolean;
}

export default function GlassPanel({
  children,
  strong = false,
  hover = false,
  className = '',
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-xl transition-all duration-500 ${
        strong ? 'bg-white/[0.06]' : 'bg-white/[0.03]'
      } ${hover ? 'hover:border-white/20 hover:bg-white/[0.05]' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
