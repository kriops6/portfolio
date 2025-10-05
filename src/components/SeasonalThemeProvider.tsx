'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export type SeasonalTheme = 'regular' | 'summer' | 'autumn' | 'winter' | 'spring';

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

const themeConfigs: Record<SeasonalTheme, ThemeConfig> = {
  regular: {
    name: 'Regular Dark',
    colors: {
      primary: '#60a5fa', // blue-400
      secondary: '#818cf8', // indigo-400
      accent: '#a78bfa', // violet-400
      background: '#0f172a', // slate-900
      backgroundGradient: 'from-slate-950 via-slate-900 to-slate-950',
      text: '#f1f5f9', // slate-100
      textSecondary: '#94a3b8', // slate-400
      border: 'rgba(148, 163, 184, 0.2)',
      cardBg: 'rgba(30, 41, 59, 0.5)', // slate-800/50
      cardBorder: 'rgba(100, 116, 139, 0.3)',
    },
    fonts: {
      heading: 'var(--font-geist-sans)',
      body: 'var(--font-geist-sans)',
    },
    particleColors: ['#60a5fa', '#818cf8', '#a78bfa'],
  },
  summer: {
    name: 'Summer Vibes',
    colors: {
      primary: '#fbbf24', // amber-400
      secondary: '#fb923c', // orange-400
      accent: '#f97316', // orange-500
      background: '#1e1b1b',
      backgroundGradient: 'from-orange-950 via-amber-950 to-yellow-950',
      text: '#fef3c7', // amber-100
      textSecondary: '#fde68a', // amber-200
      border: 'rgba(251, 191, 36, 0.3)',
      cardBg: 'rgba(120, 53, 15, 0.4)', // amber-900/40
      cardBorder: 'rgba(251, 191, 36, 0.4)',
    },
    fonts: {
      heading: 'Georgia, serif',
      body: 'system-ui, sans-serif',
    },
    particleColors: ['#fbbf24', '#fb923c', '#facc15'],
  },
  autumn: {
    name: 'Autumn Fall',
    colors: {
      primary: '#f59e0b', // amber-500
      secondary: '#dc2626', // red-600
      accent: '#b91c1c', // red-700
      background: '#1c1917', // stone-900
      backgroundGradient: 'from-stone-950 via-red-950 to-orange-950',
      text: '#fef2f2', // red-50
      textSecondary: '#fed7aa', // orange-200
      border: 'rgba(245, 158, 11, 0.3)',
      cardBg: 'rgba(87, 24, 14, 0.5)', // red-950/50
      cardBorder: 'rgba(245, 158, 11, 0.4)',
    },
    fonts: {
      heading: '"Courier New", monospace',
      body: '"Courier New", monospace',
    },
    particleColors: ['#f59e0b', '#dc2626', '#ea580c'],
  },
  winter: {
    name: 'Winter Frost',
    colors: {
      primary: '#67e8f9', // cyan-300
      secondary: '#a5f3fc', // cyan-200
      accent: '#22d3ee', // cyan-400
      background: '#0c1a24',
      backgroundGradient: 'from-slate-950 via-cyan-950 to-blue-950',
      text: '#ecfeff', // cyan-50
      textSecondary: '#cffafe', // cyan-100
      border: 'rgba(103, 232, 249, 0.3)',
      cardBg: 'rgba(8, 51, 68, 0.5)', // cyan-950/50
      cardBorder: 'rgba(103, 232, 249, 0.4)',
    },
    fonts: {
      heading: 'Helvetica, Arial, sans-serif',
      body: 'Helvetica, Arial, sans-serif',
    },
    particleColors: ['#67e8f9', '#a5f3fc', '#22d3ee'],
  },
  spring: {
    name: 'Spring Bloom',
    colors: {
      primary: '#ffc9e3', // pink-300
      secondary: '#ffb3d9', // pink-400
      accent: '#ff9ec7', // pink-500
      background: '#1a0a14',
      backgroundGradient: 'from-pink-950 via-rose-950 to-purple-950',
      text: '#fff0f8', // pink-50
      textSecondary: '#ffc9e3', // pink-300
      border: 'rgba(255, 201, 227, 0.3)',
      cardBg: 'rgba(46, 5, 30, 0.5)', // pink-950/50
      cardBorder: 'rgba(255, 201, 227, 0.4)',
    },
    fonts: {
      heading: '"Times New Roman", serif',
      body: 'Georgia, serif',
    },
    particleColors: ['#ffc9e3', '#ffb3d9', '#ffe0f0'],
  },
};

interface ThemeContextType {
  currentTheme: SeasonalTheme;
  themeConfig: ThemeConfig;
  setTheme: (theme: SeasonalTheme) => void;
  isDarkMode: boolean; // For backwards compatibility
  toggleTheme: () => void; // For backwards compatibility
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'regular',
  themeConfig: themeConfigs.regular,
  setTheme: () => {},
  isDarkMode: true,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function SeasonalThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPhysicsPage = pathname === '/physics';
  
  const [currentTheme, setCurrentTheme] = useState<SeasonalTheme>(() => {
    // Initialize from localStorage if available (client-side only)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('seasonalTheme') as SeasonalTheme;
      if (saved && themeConfigs[saved]) {
        return saved;
      }
    }
    return 'regular';
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setTheme = (theme: SeasonalTheme) => {
    setCurrentTheme(theme);
    localStorage.setItem('seasonalTheme', theme);
  };

  // Backwards compatibility
  const isDarkMode = true; // Always dark mode with seasonal variations
  const toggleTheme = () => {
    // Cycle through themes
    const themes: SeasonalTheme[] = ['regular', 'summer', 'autumn', 'winter', 'spring'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const themeConfig = themeConfigs[currentTheme];

  // Apply theme CSS variables
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

  // Prevent flash by not rendering until mounted on client
  if (!mounted) {
    return null;
  }

  // For /physics page, render children without seasonal theming
  if (isPhysicsPage) {
    return (
      <ThemeContext.Provider value={{ currentTheme, themeConfig, setTheme, isDarkMode, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, themeConfig, setTheme, isDarkMode, toggleTheme }}>
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
