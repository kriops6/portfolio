"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Github, Mail, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

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
        transition={{ type: 'tween', duration: 0.3, ease: 'linear' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// --- Header Component (Nav bubble updated) ---
const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Experience', href: '/experience' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Contact', href: '/contact' },
  ];

  // Preload all pages on mount for instant navigation
  useEffect(() => {
    navLinks.forEach(link => {
      router.prefetch(link.href);
    });
  }, [router]);

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 bg-black/20 rounded-full p-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                prefetch={true}
                className="relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 text-gray-300 hover:text-white"
              >
                {pathname === link.href && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/20 backdrop-blur-xl backdrop-saturate-200 rounded-full border border-white/30 shadow-lg"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {/* Desktop Social Icons */}
            <a
              href="https://github.com/kriops6"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group border border-white/10"
            >
              <Github size={20} className="text-white" />
            </a>
            <a
              href="mailto:Krishnatmsv@gmail.com"
              className="hidden md:block p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 group shadow-lg"
            >
              <Mail size={20} className="text-white" />
            </a>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-2 pb-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      pathname === link.href
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Mobile Social Links */}
                <div className="flex space-x-3 pt-4 border-t border-white/10">
                  <a
                    href="https://github.com/kriops6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-center"
                  >
                    <Github size={20} className="text-white mx-auto" />
                  </a>
                  <a
                    href="mailto:Krishnatmsv@gmail.com"
                    className="flex-1 p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 text-center"
                  >
                    <Mail size={20} className="text-white mx-auto" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// Export the client layout component
const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="flex-grow pt-20">
        <PageTransitionWrapper>{children}</PageTransitionWrapper>
      </main>
    </>
  );
};

export default ClientLayout;
