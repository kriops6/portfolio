"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Mail, Github, Sparkles, ArrowRight, Send, Phone } from 'lucide-react';
import { useTheme } from '../../components/ThemeProvider';
import OptimizedBackground from '../../components/OptimizedBackground';

// --- Reusable Animated Component ---
const AnimatedCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
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
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{
                transitionDelay: `${delay * 100}ms`
            }}
        >
            {children}
        </div>
    );
};

const ContactPage = () => {
  const { isDarkMode } = useTheme();
  
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Also copy email to clipboard as fallback
    navigator.clipboard.writeText('krishnatmsv@gmail.com').then(() => {
      console.log('Email copied to clipboard!');
    });
    // Let the mailto: link work normally
  };
  
  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white' 
        : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-900'
    }`}>
      <OptimizedBackground 
        particleCount={20} 
        connectionDistance={85}
        gradientColors={['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4']}
      />
      
      <main className="relative z-10 container mx-auto px-6 py-24 sm:py-32 overflow-hidden">
        {/* --- Page Header --- */}
        <AnimatedCard>
          <div className="text-center mb-10">
            <h1 className="text-6xl md:text-8xl font-black mb-4">
              <span className={`bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400' 
                  : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
              }`}>
                              Let's Build the Future.
              </span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
                          I'm always searching for the next great challenge. If you have an innovative idea, a groundbreaking project, or an opportunity to push the boundaries of technology, I want to hear from it.
            </p>
          </div>
        </AnimatedCard>

        {/* --- Contact Options Grid --- */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Email Card */}
          <AnimatedCard delay={2}>
              <a 
                href="mailto:krishnatmsv@gmail.com" 
                onClick={handleEmailClick}
                className={`group relative block h-full p-8 ${isDarkMode ? 'bg-white/10 border-white/20 hover:border-purple-300 hover:bg-white/15' : 'bg-white/60 border-gray-200/50 hover:border-purple-400 hover:bg-white/80'} backdrop-blur-xl rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer`}
              >
                  <div className={`absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 ${isDarkMode ? 'bg-purple-400/20' : 'bg-purple-300/30'} rounded-full blur-2xl group-hover:w-64 group-hover:h-64 transition-all duration-500`}></div>
                  <div className="relative">
                      <div className="p-4 inline-flex bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Mail size={28} className="text-white"/>
                      </div>
                      <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Email Me</h2>
                          <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-6`}>The most direct way to get in touch. I'm responsive and ready to discuss your ideas in detail.</p>
                      <span className={`font-semibold ${isDarkMode ? 'text-purple-200 group-hover:text-white' : 'text-purple-600 group-hover:text-purple-900'} flex items-center space-x-2 transition-colors duration-300`}>
                          <span>Send a Message</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300"/>
                      </span>
                  </div>
              </a>
          </AnimatedCard>

          {/* Phone Card */}
          <AnimatedCard delay={3}>
              <a href="tel:+4407823750719" className={`group relative block h-full p-8 ${isDarkMode ? 'bg-white/10 border-white/20 hover:border-cyan-300 hover:bg-white/15' : 'bg-white/60 border-gray-200/50 hover:border-cyan-400 hover:bg-white/80'} backdrop-blur-xl rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}>
                  <div className={`absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 ${isDarkMode ? 'bg-cyan-400/20' : 'bg-cyan-300/30'} rounded-full blur-2xl group-hover:w-64 group-hover:h-64 transition-all duration-500`}></div>
                  <div className="relative">
                      <div className="p-4 inline-flex bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Phone size={28} className="text-white"/>
                      </div>
                      <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Call or Text</h2>
                          <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-6`}>For urgent matters or a more direct conversation, feel free to reach out via phone.</p>
                      <span className={`font-semibold ${isDarkMode ? 'text-cyan-200 group-hover:text-white' : 'text-cyan-600 group-hover:text-cyan-900'} flex items-center space-x-2 transition-colors duration-300`}>
                          <span>+44 07823750719</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300"/>
                      </span>
                  </div>
              </a>
          </AnimatedCard>
          
          {/* GitHub Card */}
          <AnimatedCard delay={4}>
              <a href="https://github.com/kriops6" target="_blank" rel="noopener noreferrer" className={`group relative block h-full p-8 ${isDarkMode ? 'bg-white/10 border-white/20 hover:border-green-300 hover:bg-white/15' : 'bg-white/60 border-gray-200/50 hover:border-green-400 hover:bg-white/80'} backdrop-blur-xl rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}>
                  <div className={`absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 ${isDarkMode ? 'bg-green-400/20' : 'bg-green-300/30'} rounded-full blur-2xl group-hover:w-64 group-hover:h-64 transition-all duration-500`}></div>
                  <div className="relative">
                      <div className="p-4 inline-flex bg-gradient-to-br from-green-500 to-blue-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Github size={28} className="text-white"/>
                      </div>
                      <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Explore My Code</h2>
                          <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-6`}>Dive into my projects, see my coding style, and feel free to open an issue or pull request to collaborate.</p>
                      <span className={`font-semibold ${isDarkMode ? 'text-green-200 group-hover:text-white' : 'text-green-600 group-hover:text-green-900'} flex items-center space-x-2 transition-colors duration-300`}>
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
              <Sparkles className={`mx-auto h-12 w-12 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-600'} animate-pulse mb-4`}/>
              <p className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  Let's turn visionary ideas into tangible reality.
              </p>
          </div>
        </AnimatedCard>

      </main>
    </div>
  );
};

export default ContactPage;
