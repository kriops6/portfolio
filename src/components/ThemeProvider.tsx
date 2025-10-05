'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);
  const [showSpamToast, setShowSpamToast] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Reset toggle count after 3 seconds of no toggling
  useEffect(() => {
    if (toggleCount > 0) {
      const timer = setTimeout(() => setToggleCount(0), 3000);
      return () => clearTimeout(timer);
    }
  }, [toggleCount]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Increment toggle count
    const newCount = toggleCount + 1;
    setToggleCount(newCount);
    
    // Show spam toast if toggled 5+ times
    if (newCount >= 5 && !showSpamToast) {
      setShowSpamToast(true);
      setTimeout(() => setShowSpamToast(false), 3000);
    }
    
    // Show toast only when switching TO light mode
    if (!newTheme && newCount < 5) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
      
      {/* Funny Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-8 right-8 z-[9999] max-w-sm"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-yellow-400/50 p-6 backdrop-blur-xl">
              <div className="flex items-start space-x-4">
                <span className="text-4xl">😸</span>
                <div>
                  <p className="text-gray-900 dark:text-white font-bold text-lg mb-1">
                    Oh, did I blind you there?
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Welcome to the bright side! ✨
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Toggle Spam Toast */}
      <AnimatePresence>
        {showSpamToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-8 right-8 z-[9999] max-w-sm"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-purple-400/50 p-6 backdrop-blur-xl">
              <div className="flex items-start space-x-4">
                <span className="text-4xl">🎪</span>
                <div>
                  <p className="text-gray-900 dark:text-white font-bold text-lg mb-1">
                    Having fun?
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    The toggle isn't going anywhere! 😄
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeContext.Provider>
  );
}
