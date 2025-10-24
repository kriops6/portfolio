'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export type SeasonalTheme = 'regular' | 'summer' | 'autumn' | 'winter' | 'spring';
export type ThemeMode = 'light' | 'dark';

interface ThemeConfig {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    backgroundGradient: string;
    text: string;
    textSecondary: string;
    border: string;
    cardBg: string;
    cardBorder: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  particleColors: string[];
}

interface ThemeVariants {
  dark: ThemeConfig;
  light: ThemeConfig;
}

const themeConfigs: Record<SeasonalTheme, ThemeVariants> = {
  regular: {
    dark: {
      name: 'Regular Dark',
      colors: {
        primary: '#60a5fa',
        secondary: '#818cf8',
        accent: '#a78bfa',
        background: '#0f172a',
        backgroundGradient: 'from-slate-950 via-slate-900 to-slate-950',
        text: '#f1f5f9',
        textSecondary: '#94a3b8',
        border: 'rgba(148, 163, 184, 0.2)',
        cardBg: 'rgba(30, 41, 59, 0.5)',
        cardBorder: 'rgba(100, 116, 139, 0.3)',
      },
      fonts: {
        heading: 'var(--font-geist-sans)',
        body: 'var(--font-geist-sans)',
      },
      particleColors: ['#60a5fa', '#818cf8', '#a78bfa'],
    },
    light: {
      name: 'Regular Light',
      colors: {
        primary: '#93c5fd',
        secondary: '#a5b4fc',
        accent: '#c4b5fd',
        background: '#e0e7ff',
        backgroundGradient: 'from-slate-200 via-blue-200 to-indigo-200',
        text: '#1e293b',
        textSecondary: '#64748b',
        border: 'rgba(148, 163, 184, 0.2)',
        cardBg: 'rgba(248, 250, 252, 0.8)',
        cardBorder: 'rgba(203, 213, 225, 0.3)',
      },
      fonts: {
        heading: 'var(--font-geist-sans)',
        body: 'var(--font-geist-sans)',
      },
      particleColors: ['#93c5fd', '#a5b4fc', '#c4b5fd'],
    },
  },
  summer: {
    dark: {
      name: 'Summer Dark',
      colors: {
        primary: '#fbbf24',
        secondary: '#fb923c',
        accent: '#f97316',
        background: '#1e1b1b',
        backgroundGradient: 'from-orange-950 via-amber-950 to-yellow-950',
        text: '#fef3c7',
        textSecondary: '#fde68a',
        border: 'rgba(251, 191, 36, 0.3)',
        cardBg: 'rgba(120, 53, 15, 0.4)',
        cardBorder: 'rgba(251, 191, 36, 0.4)',
      },
      fonts: {
        heading: 'var(--font-geist-sans)',
        body: 'var(--font-geist-sans)',
      },
      particleColors: ['#fbbf24', '#fb923c', '#facc15'],
    },
    light: {
      name: 'Summer Light',
      colors: {
        primary: '#f6ad55',
        secondary: '#fbbf24',
        accent: '#38bdf8',
        background: '#f8f5f1',
        backgroundGradient: 'from-amber-50 via-stone-100 to-sky-50',
        text: '#4a3422',
        textSecondary: '#72552d',
        border: 'rgba(251, 191, 36, 0.14)',
        cardBg: 'rgba(255, 250, 245, 0.85)',
        cardBorder: 'rgba(56, 189, 248, 0.18)',
      },
      fonts: {
        heading: 'var(--font-geist-sans)',
        body: 'var(--font-geist-sans)',
      },
      particleColors: ['#fbd38d', '#fbbf24', '#38bdf8'],
    },
  },
  autumn: {
    dark: {
      name: 'Autumn Dark',
      colors: {
        primary: '#f59e0b',
        secondary: '#dc2626',
        accent: '#b91c1c',
        background: '#1c1917',
        backgroundGradient: 'from-stone-950 via-red-950 to-orange-950',
        text: '#fef2f2',
        textSecondary: '#fed7aa',
        border: 'rgba(245, 158, 11, 0.3)',
        cardBg: 'rgba(87, 24, 14, 0.5)',
        cardBorder: 'rgba(245, 158, 11, 0.4)',
      },
      fonts: {
        heading: 'var(--font-geist-sans)',
        body: 'var(--font-geist-sans)',
      },
      particleColors: ['#f59e0b', '#dc2626', '#ea580c'],
    },
    light: {
      name: 'Autumn Light',
      colors: {
        primary: '#fb923c',
        secondary: '#fdba74',
        accent: '#fca5a5',
        background: '#fafaf9',
        backgroundGradient: 'from-stone-100 via-orange-50 to-amber-50',
        text: '#7c2d12',
        textSecondary: '#9a3412',
        border: 'rgba(251, 146, 60, 0.2)',
        cardBg: 'rgba(250, 250, 249, 0.8)',
        cardBorder: 'rgba(253, 186, 116, 0.3)',
      },
      fonts: {
        heading: 'var(--font-geist-sans)',
        body: 'var(--font-geist-sans)',
      },
      particleColors: ['#fed7aa', '#fdba74', '#fde68a'],
    },
  },
  winter: {
    dark: {
      name: 'Winter Dark',
      colors: {
        primary: '#67e8f9',
        secondary: '#a5f3fc',
        accent: '#22d3ee',
        background: '#0c1a24',
        backgroundGradient: 'from-slate-950 via-cyan-950 to-blue-950',
        text: '#ecfeff',
        textSecondary: '#cffafe',
        border: 'rgba(103, 232, 249, 0.3)',
        cardBg: 'rgba(8, 51, 68, 0.5)',
        cardBorder: 'rgba(103, 232, 249, 0.4)',
      },
      fonts: {
        heading: 'var(--font-geist-sans)',
        body: 'var(--font-geist-sans)',
      },
      particleColors: ['#67e8f9', '#a5f3fc', '#22d3ee'],
    },
    light: {
      name: 'Winter Light',
      colors: {
        primary: '#38bdf8',
        secondary: '#7dd3fc',
        accent: '#bae6fd',
        background: '#f4f9fb',
        backgroundGradient: 'from-slate-50 via-cyan-50 to-blue-100',
        text: '#0f172a',
        textSecondary: '#1e3a8a',
        border: 'rgba(56, 189, 248, 0.18)',
        cardBg: 'rgba(244, 249, 252, 0.85)',
        cardBorder: 'rgba(125, 211, 252, 0.25)',
      },
      fonts: {
        heading: 'var(--font-geist-sans)',
        body: 'var(--font-geist-sans)',
      },
      particleColors: ['#bae6fd', '#7dd3fc', '#38bdf8'],
    },
  },
  spring: {
    dark: {
      name: 'Spring Dark',
      colors: {
        primary: '#ffc9e3',
        secondary: '#ffb3d9',
        accent: '#ff9ec7',
        background: '#1a0a14',
        backgroundGradient: 'from-pink-950 via-rose-950 to-purple-950',
        text: '#fff0f8',
        textSecondary: '#ffc9e3',
        border: 'rgba(255, 201, 227, 0.3)',
        cardBg: 'rgba(46, 5, 30, 0.5)',
        cardBorder: 'rgba(255, 201, 227, 0.4)',
      },
      fonts: {
        heading: 'var(--font-geist-sans)',
        body: 'var(--font-geist-sans)',
      },
      particleColors: ['#ffc9e3', '#ffb3d9', '#ffe0f0'],
    },
    light: {
      name: 'Spring Light',
      colors: {
        primary: '#f9a8d4',
        secondary: '#fbcfe8',
        accent: '#f5d0fe',
        background: '#fce7f3',
        backgroundGradient: 'from-pink-200 via-rose-200 to-fuchsia-200',
        text: '#831843',
        textSecondary: '#9f1239',
        border: 'rgba(249, 168, 212, 0.2)',
        cardBg: 'rgba(253, 242, 248, 0.8)',
        cardBorder: 'rgba(251, 207, 232, 0.3)',
      },
      fonts: {
        heading: 'var(--font-geist-sans)',
        body: 'var(--font-geist-sans)',
      },
      particleColors: ['#fbcfe8', '#f9a8d4', '#fce7f3'],
    },
  },
};

interface ThemeContextType {
  currentTheme: SeasonalTheme;
  themeMode: ThemeMode;
  themeConfig: ThemeConfig;
  setTheme: (theme: SeasonalTheme) => void;
  toggleMode: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within SeasonalThemeProvider');
  }
  return context;
}

export function SeasonalThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPhysicsPage = pathname === '/physics';
  
  const [currentTheme, setCurrentTheme] = useState<SeasonalTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('seasonal-theme');
      return (saved as SeasonalTheme) || 'regular';
    }
    return 'regular';
  });

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme-mode');
      return (saved as ThemeMode) || 'dark';
    }
    return 'dark';
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('seasonal-theme', currentTheme);
    }
  }, [currentTheme, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme-mode', themeMode);
    }
  }, [themeMode, mounted]);

  const setTheme = (theme: SeasonalTheme) => {
    setCurrentTheme(theme);
  };

  const toggleMode = () => {
    setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleTheme = () => {
    const themes: SeasonalTheme[] = ['regular', 'spring', 'summer', 'autumn', 'winter'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setCurrentTheme(themes[nextIndex]);
  };

  const themeConfig = themeConfigs[currentTheme][themeMode];
  const isDarkMode = themeMode === 'dark';

  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    root.style.setProperty('--color-primary', themeConfig.colors.primary);
    root.style.setProperty('--color-secondary', themeConfig.colors.secondary);
    root.style.setProperty('--color-accent', themeConfig.colors.accent);
    root.style.setProperty('--color-background', themeConfig.colors.background);
    root.style.setProperty('--color-text', themeConfig.colors.text);
    root.style.setProperty('--color-text-secondary', themeConfig.colors.textSecondary);
    root.style.setProperty('--font-heading', themeConfig.fonts.heading);
    root.style.setProperty('--font-body', themeConfig.fonts.body);
  }, [themeConfig, mounted]);

  if (!mounted) {
    return null;
  }

  if (isPhysicsPage) {
    return (
      <ThemeContext.Provider value={{ currentTheme, themeMode, themeConfig, setTheme, toggleMode, isDarkMode, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, themeMode, themeConfig, setTheme, toggleMode, isDarkMode, toggleTheme }}>
      <div
        className={`min-h-screen bg-gradient-to-br ${themeConfig.colors.backgroundGradient} transition-all duration-700`}
        style={{
          fontFamily: themeConfig.fonts.body,
          color: themeConfig.colors.text,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
