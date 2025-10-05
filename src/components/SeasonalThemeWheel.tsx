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

const ORBIT_RADIUS = 72; // distance from center to option bubble centers
const OPTION_SIZE = 56; // w-14 / h-14
const RING_RADIUS = ORBIT_RADIUS; // ring follows the same arc as option centers

export function SeasonalThemeWheel() {
  const { currentTheme, setTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const themes: SeasonalTheme[] = ['regular', 'summer', 'autumn', 'winter', 'spring'];
  const CurrentIcon = themeIcons[currentTheme].icon;

  // Calculate positions for the wheel (circular arrangement)
  const getThemePosition = (index: number, total: number) => {
    const angle = (index * 360) / total - 90; // Start from top
    const radius = ORBIT_RADIUS;
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius,
    };
  };

  return (
    <div
      className="fixed bottom-24 right-24 z-50"
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
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    exit={{ scale: 0, opacity: 0 }}
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
                    className="absolute w-14 h-14 rounded-full shadow-xl backdrop-blur-xl border-2 flex flex-col items-center justify-center group"
                    style={{
                      backgroundColor: `${themeIcons[theme].color}20`,
                      borderColor: themeIcons[theme].color,
                      // Position bubble center exactly ORBIT_RADIUS distance from button center
                      // Button center: (32, 32), Bubble center should be at (32 + pos.x, 32 + pos.y)
                      left: `${32 + pos.x}px`,
                      top: `${32 + pos.y}px`,
                      // Center the 56px bubble on that point
                      marginLeft: '-28px',  // Half of 56px
                      marginTop: '-28px',   // Half of 56px
                    }}
                  >
                    {/* Debug: Show center point */}
                    <div className="absolute w-1 h-1 bg-red-500 rounded-full" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
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

              {/* Orbital ring that passes through the option bubble centers */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                exit={{ opacity: 0 }}
                className="absolute rounded-full border-2 border-dashed pointer-events-none"
                style={{ 
                  borderColor: themeIcons[currentTheme].color,
                  // Ring with exact radius matching orbit
                  width: `${RING_RADIUS * 2}px`,
                  height: `${RING_RADIUS * 2}px`,
                  // Position at button center (32px, 32px)
                  left: '32px',
                  top: '32px',
                  marginLeft: `-${RING_RADIUS}px`,
                  marginTop: `-${RING_RADIUS}px`,
                }}
              >
                {/* Debug: Center point marker */}
                <div className="absolute w-2 h-2 bg-red-500 rounded-full" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
