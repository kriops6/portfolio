// Filename: src/app/layout.tsx
"use client";

import React from 'react';
import './globals.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Github, Mail } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SeasonalThemeProvider, useTheme } from '../components/SeasonalThemeProvider';
import { SeasonalThemeWheel } from '../components/SeasonalThemeWheel';
import { SeasonalBackground } from '../components/SeasonalBackground';
import { ThemeModeToggle } from '../components/ThemeModeToggle';
import EasterEggs from '../components/EasterEggs';
import KonamiCodeDetector from '../components/KonamiCodeDetector';
import TypingTestGame from '../components/TypingTestGame';
// Import will be handled by Next.js automatically

// --- Page Transition Wrapper Component ---
const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const variants = {
    hidden: { opacity: 0, y: 15 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// --- Header Component (Nav bubble updated) ---
const Header = () => {
  const pathname = usePathname();
  const { isDarkMode } = useTheme();
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Experience', href: '/experience' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Beyond the Code', href: '/physics' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDarkMode ? 'bg-black/80' : 'bg-white/90'} border-b ${isDarkMode ? 'border-white/20' : 'border-gray-300/30'} shadow-2xl`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Code size={24} className="text-white" />
              </div>
            </div>
            <div>
              <div className={`text-xl font-bold ${isDarkMode ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-gradient-to-r from-blue-600 to-purple-600'} bg-clip-text text-transparent`}>
                Krishna Thirumalai
              </div>
            </div>
          </Link>

          <div className={`hidden md:flex items-center space-x-1 ${isDarkMode ? 'bg-black/20' : 'bg-gray-200/40'} rounded-full p-1`}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
              >
                {/* LIQUID GLASS BUBBLE */}
                {pathname === link.href && (
                  <motion.div
                    layoutId="active-pill"
                    className={`
                      absolute inset-0
                      ${isDarkMode ? 'bg-white/20' : 'bg-white/60'}
                      backdrop-blur-xl
                      backdrop-saturate-200
                      rounded-full
                      border ${isDarkMode ? 'border-white/30' : 'border-gray-400/40'}
                      shadow-lg
                      before:content-['']
                      before:absolute before:inset-0
                      before:rounded-full
                      before:bg-gradient-to-br before:from-white/40 before:to-transparent
                      before:opacity-30
                    `}
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/kriops6"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full ${isDarkMode ? 'bg-white/10 hover:bg-white/20 border-white/10' : 'bg-gray-200/60 hover:bg-gray-300/80 border-gray-300/40'} transition-all duration-300 group border`}
            >
              <Github size={20} className={isDarkMode ? 'text-white' : 'text-gray-800'} />
            </a>
            <a
              href="mailto:Krishnatmsv@gmail.com"
              className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 group shadow-lg"
            >
              <Mail size={20} className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- Root Layout Component ---
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <SeasonalThemeProvider>
          <SeasonalBackground />
          <Header />
          <PageTransitionWrapper>
            {children}
          </PageTransitionWrapper>
          <SeasonalThemeWheel />
          <ThemeModeToggle />
          <EasterEggs />
          <KonamiCodeDetector />
          <TypingTestGame />
        </SeasonalThemeProvider>
      </body>
    </html>
  );
}