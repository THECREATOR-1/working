import { useEffect, useState } from 'react';

type Theme = 'dark';

const STORAGE_KEY = 'axiom-theme';

export function useTheme() {
  const [theme] = useState<Theme>('dark');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = stored ?? 'dark';
    localStorage.setItem(STORAGE_KEY, initial);
    document.documentElement.style.colorScheme = initial;
    document.documentElement.dataset.theme = initial;
  }, [theme]);

  return { theme };
}
