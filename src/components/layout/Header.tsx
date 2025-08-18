// Filename: src/components/layout/Header.tsx
// The Header now features a "liquid glass" pill that animates to the active link
// using Framer Motion's layout animations.
// NOTE: Reverted to standard <a> tags to resolve build errors.

"use client";

import React from 'react';
// Imports for 'next/link' and 'next/navigation' removed to fix compilation errors.
import { Code, Github, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  // The usePathname hook has been removed to fix build errors.
  // As a result, the active link highlighting is disabled.

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
          <a href="/" className="flex items-center space-x-3">
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
          </a>
          
          <div className="hidden md:flex items-center space-x-1 bg-black/20 rounded-full p-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 text-gray-300 hover:text-white"
              >
                 <span className="relative z-10">{link.name}</span>
              </a>
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

export default Header;
