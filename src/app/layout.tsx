// Filename: src/app/layout.tsx
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Github, Mail } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
        transition={{ type: 'linear', duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// --- Header Component (Nav bubble updated) ---
const Header = () => {
  const pathname = usePathname();
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Experience', href: '/experience' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/40 border-b border-white/20 shadow-2xl backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Code size={24} className="text-white" />
              </div>
            </div>
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Krishna Thirumalai
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1 bg-black/20 rounded-full p-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 text-gray-300 hover:text-white"
              >
                {/* LIQUID GLASS BUBBLE */}
                {pathname === link.href && (
                  <motion.div
                    layoutId="active-pill"
                    className="
                      absolute inset-0
                      bg-white/20
                      backdrop-blur-xl
                      backdrop-saturate-200
                      rounded-full
                      border border-white/30
                      shadow-lg
                      before:content-['']
                      before:absolute before:inset-0
                      before:rounded-full
                      before:bg-gradient-to-br before:from-white/40 before:to-transparent
                      before:opacity-30
                    "
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
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group border border-white/10"
            >
              <Github size={20} />
            </a>
            <a
              href="mailto:Krishnatmsv@gmail.com"
              className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 group shadow-lg"
            >
              <Mail size={20} />
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
      <head>
  <title>Krishna Thirumalai | Software Engineer</title>
  <meta name="description" content="Personal portfolio of Krishna Thirumalai, a software engineering student specializing in full-stack development, robotics, and innovative technologies." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white min-h-screen">
        <Header />
        <main className="pt-20">
          <PageTransitionWrapper>
            {children}
          </PageTransitionWrapper>
        </main>
      </body>
    </html>
  );
}
