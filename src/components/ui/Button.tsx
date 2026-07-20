import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';

type Variant = 'primary' | 'ghost' | 'outline' | 'glass';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  magnetic?: boolean;
  as?: 'button' | 'a';
  href?: string;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-white text-ink-950 hover:bg-white/90 shadow-[0_8px_40px_-12px_rgba(255,255,255,0.4)]',
  ghost: 'text-muted hover:text-white',
  outline:
    'border border-white/15 text-white hover:border-white/40 hover:bg-white/5 backdrop-blur-md',
  glass:
    'glass-strong text-white hover:border-white/25 hover:bg-white/[0.08]',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', className = '', children, magnetic = false, ...props },
    _ref,
  ) => {
    const magRef = useMagnetic<HTMLButtonElement>({ strength: 0.4, radius: 100 });
    const ref = magnetic ? magRef : _ref;

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        data-cursor="hover"
        className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
export default Button;
