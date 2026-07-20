import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}

export default function Badge({ children, className = '', dot = true }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted backdrop-blur-md ${className}`}
    >
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_#00D4FF]" />
      )}
      {children}
    </span>
  );
}
