import type { ReactNode } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

export default function LenisProvider({ children }: { children: ReactNode }) {
  useSmoothScroll();
  return <>{children}</>;
}
