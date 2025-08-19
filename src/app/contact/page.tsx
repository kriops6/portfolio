// Filename: src/app/contact/page.tsx
// This component creates an epic, inviting, and highly stylized "Contact Me" page.

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Mail, Github, Sparkles, ArrowRight, Send, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Reusable Animated Component ---
const AnimatedCard = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: delay * 0.1 }}
        >
            {children}
        </motion.div>
    );
};

const ContactPage = () => {
  return (
    <main className="relative z-10 container mx-auto px-6 py-24 sm:py-32 overflow-hidden">
      {/* --- Page Header --- */}
      <AnimatedCard>
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-black mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                            Let&apos;s Build the Future.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                        I&apos;m always searching for the next great challenge. If you have an innovative idea, a groundbreaking project, or an opportunity to push the boundaries of technology, I want to hear from it.
          </p>
        </div>
      </AnimatedCard>

      {/* --- Contact Options Grid --- */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Email Card */}
        <AnimatedCard delay={2}>
            <a href="mailto:krishnatmsv@gmail.com" className="group relative block h-full p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-purple-400 hover:-translate-y-2">
                <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl group-hover:w-64 group-hover:h-64 transition-all duration-500"></div>
                <div className="relative">
                    <div className="p-4 inline-flex bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-6">
                        <Mail size={28} className="text-white"/>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Email Me</h2>
                        <p className="text-gray-400 mb-6">The most direct way to get in touch. I&apos;m responsive and ready to discuss your ideas in detail.</p>
                    <span className="font-semibold text-purple-300 flex items-center space-x-2 group-hover:text-white transition-colors duration-300">
                        <span>Send a Message</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300"/>
                    </span>
                </div>
            </a>
        </AnimatedCard>

        {/* Phone Card */}
        <AnimatedCard delay={3}>
            <a href="tel:+4407823750719" className="group relative block h-full p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-cyan-400 hover:-translate-y-2">
                <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-cyan-500/20 rounded-full blur-2xl group-hover:w-64 group-hover:h-64 transition-all duration-500"></div>
                <div className="relative">
                    <div className="p-4 inline-flex bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl mb-6">
                        <Phone size={28} className="text-white"/>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Call or Text</h2>
                        <p className="text-gray-400 mb-6">For urgent matters or a more direct conversation, feel free to reach out via phone.</p>
                    <span className="font-semibold text-cyan-300 flex items-center space-x-2 group-hover:text-white transition-colors duration-300">
                        <span>+44 07823750719</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300"/>
                    </span>
                </div>
            </a>
        </AnimatedCard>
        
        {/* GitHub Card */}
        <AnimatedCard delay={4}>
            <a href="https://github.com/kriops6" target="_blank" rel="noopener noreferrer" className="group relative block h-full p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-green-400 hover:-translate-y-2">
                <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-green-500/20 rounded-full blur-2xl group-hover:w-64 group-hover:h-64 transition-all duration-500"></div>
                <div className="relative">
                    <div className="p-4 inline-flex bg-gradient-to-br from-green-500 to-blue-500 rounded-xl mb-6">
                        <Github size={28} className="text-white"/>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Explore My Code</h2>
                        <p className="text-gray-400 mb-6">Dive into my projects, see my coding style, and feel free to open an issue or pull request to collaborate.</p>
                    <span className="font-semibold text-green-300 flex items-center space-x-2 group-hover:text-white transition-colors duration-300">
                        <span>Visit GitHub</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300"/>
                    </span>
                </div>
            </a>
        </AnimatedCard>
      </div>

      {/* --- Final Call to Action --- */}
       <AnimatedCard delay={5}>
        <div className="text-center mt-24">
            <Sparkles className="mx-auto h-12 w-12 text-yellow-400 animate-pulse mb-4"/>
            <p className="text-lg text-gray-300">
                Let&apos;s turn visionary ideas into tangible reality.
            </p>
        </div>
      </AnimatedCard>

    </main>
  );
};

export default ContactPage;
