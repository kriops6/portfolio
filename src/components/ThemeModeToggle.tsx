'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './SeasonalThemeProvider';

export function ThemeModeToggle() {
  const { themeMode, toggleMode } = useTheme();
  const isDark = themeMode === 'dark';

  return (
    <motion.button
      onClick={toggleMode}
      className="fixed bottom-24 left-8 z-50 p-4 rounded-full backdrop-blur-xl border transition-all duration-300 hover:scale-110"
      style={{
        background: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(241, 245, 249, 0.8)',
        borderColor: isDark ? 'rgba(148, 163, 184, 0.3)' : 'rgba(51, 65, 85, 0.3)',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : 180,
          scale: isDark ? 1 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-yellow-300" />
        ) : (
          <Moon className="w-6 h-6 text-slate-700" />
        )}
      </motion.div>
    </motion.button>
  );
}
