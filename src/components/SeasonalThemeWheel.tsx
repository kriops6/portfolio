'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Droplets, Wind, Snowflake, Flower, Moon } from 'lucide-react';
import { useTheme, SeasonalTheme } from './SeasonalThemeProvider';

const themeIcons: Record<SeasonalTheme, { icon: React.ElementType; color: string; label: string }> = {
  regular: { icon: Moon, color: '#60a5fa', label: 'Regular' },
  summer: { icon: Sun, color: '#fbbf24', label: 'Summer' },
  autumn: { icon: Wind, color: '#f59e0b', label: 'Autumn' },
  winter: { icon: Snowflake, color: '#67e8f9', label: 'Winter' },
  spring: { icon: Flower, color: '#4ade80', label: 'Spring' },
};

export function SeasonalThemeWheel() {
  const { currentTheme, setTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const themes: SeasonalTheme[] = ['regular', 'summer', 'autumn', 'winter', 'spring'];
  const CurrentIcon = themeIcons[currentTheme].icon;

  // Calculate positions for the wheel (circular arrangement)
  const getThemePosition = (index: number, total: number) => {
    const angle = (index * 360) / total - 90; // Start from top
    const radius = 80; // Distance from center
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius,
    };
  };

  return (
    <div
      className="fixed bottom-8 right-8 z-50"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Main Theme Button */}
      <motion.div
        className="relative"
        animate={{
          scale: isExpanded ? 1.1 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-16 h-16 rounded-full shadow-2xl backdrop-blur-xl border-2 flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundColor: `${themeIcons[currentTheme].color}20`,
            borderColor: themeIcons[currentTheme].color,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated background glow */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle, ${themeIcons[currentTheme].color}40 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          <CurrentIcon
            className="relative z-10"
            size={28}
            style={{ color: themeIcons[currentTheme].color }}
          />
        </motion.button>

        {/* Theme Wheel */}
        <AnimatePresence>
          {isExpanded && (
            <>
              {themes.map((theme, index) => {
                if (theme === currentTheme) return null;
                
                const pos = getThemePosition(
                  themes.filter(t => t !== currentTheme).indexOf(theme),
                  themes.length - 1
                );
                const ThemeIcon = themeIcons[theme].icon;

                return (
                  <motion.button
                    key={theme}
                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      x: pos.x,
                      y: pos.y,
                    }}
                    exit={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                      delay: index * 0.05,
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setTheme(theme);
                      setIsExpanded(false);
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full shadow-xl backdrop-blur-xl border-2 flex flex-col items-center justify-center group"
                    style={{
                      backgroundColor: `${themeIcons[theme].color}20`,
                      borderColor: themeIcons[theme].color,
                    }}
                  >
                    {/* Theme glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `radial-gradient(circle, ${themeIcons[theme].color}60 0%, transparent 70%)`,
                      }}
                    />
                    
                    <ThemeIcon
                      className="relative z-10"
                      size={24}
                      style={{ color: themeIcons[theme].color }}
                    />
                    
                    {/* Label */}
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-6 text-xs font-bold whitespace-nowrap"
                      style={{ color: themeIcons[theme].color }}
                    >
                      {themeIcons[theme].label}
                    </motion.span>
                  </motion.button>
                );
              })}

              {/* Center connecting lines */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                exit={{ opacity: 0 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-dashed pointer-events-none"
                style={{ borderColor: themeIcons[currentTheme].color }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Theme name tooltip */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-16 right-0 px-4 py-2 rounded-lg shadow-xl backdrop-blur-xl border whitespace-nowrap"
            style={{
              backgroundColor: `${themeIcons[currentTheme].color}20`,
              borderColor: themeIcons[currentTheme].color,
              color: themeIcons[currentTheme].color,
            }}
          >
            <p className="text-sm font-bold">Current: {themeIcons[currentTheme].label}</p>
            <p className="text-xs opacity-75">Hover to change</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
