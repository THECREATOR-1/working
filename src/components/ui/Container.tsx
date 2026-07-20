import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

const sizes = {
  narrow: 'max-w-[960px]',
  default: 'max-w-[1280px]',
  wide: 'max-w-[1480px]',
};

export default function Container({
  children,
  className = '',
  size = 'default',
}: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-6 sm:px-8 lg:px-12 ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
}
