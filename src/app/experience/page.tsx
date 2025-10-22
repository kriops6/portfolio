"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Users, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../components/ThemeProvider';
import OptimizedBackground from '../../components/OptimizedBackground';

// --- Data for the Experience page ---
const experienceData = [
  {
    role: "Student Ambassador",
    company: "Queen's University Belfast",
    location: "Belfast, UK",
    years: "2024 – Present",
    description: "Representing the university at open days and events, providing guidance and support to prospective students.",
    points: [
      "Engaged with prospective students and families at university open days, showcasing campus life and academic programs.",
      "Delivered presentations and tours to help students make informed decisions about their academic future.",
      "Collaborated with university staff to enhance the visitor experience and promote the institution's values.",
    ],
  },
  {
    role: "International Student Representative",
    company: "Queen's University Belfast",
    location: "Belfast, UK",
    years: "2024 – Present",
    description: "Helping international students settle in and making their university experience better. I coordinate events, run mentorship programs, and make sure people feel welcome.",
    points: [
      "Started programs that helped international students feel more at home and connected to campus life.",
      "Helped organize and run 15+ major university events, from open days to outreach programs.",
      "Mentored hundreds of new international students—helping them navigate both the academic stuff and adjusting to a new country.",
    ],
  },
];

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
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const ExperiencePage = () => {
  const { isDarkMode } = useTheme();
  const [showRecruiterToast, setShowRecruiterToast] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // Recruiter hover detector
  useEffect(() => {
    let hoverStartTime = 0;
    let isHovering = false;

    const handleMouseEnter = () => {
      isHovering = true;
      hoverStartTime = Date.now();
      
      hoverTimerRef.current = setTimeout(() => {
        if (isHovering && !showRecruiterToast) {
          setShowRecruiterToast(true);
          setTimeout(() => setShowRecruiterToast(false), 5000);
        }
      }, 30000); // 30 seconds
    };

    const handleMouseLeave = () => {
      isHovering = false;
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };

    const pageElement = pageRef.current;
    if (pageElement) {
      pageElement.addEventListener('mouseenter', handleMouseEnter);
      pageElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
      if (pageElement) {
        pageElement.removeEventListener('mouseenter', handleMouseEnter);
        pageElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [showRecruiterToast]);
  
  return (
    <div ref={pageRef} className="min-h-screen overflow-hidden">
      <OptimizedBackground 
        particleCount={20} 
        connectionDistance={80}
      />
      
      <main className="relative z-10 container mx-auto px-6 py-24 sm:py-32">
        {/* --- Page Header --- */}
        <AnimatedCard>
          <div className="text-center mb-10">
            <h1 className="text-6xl md:text-8xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                Professional Path
              </span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              A summary of my roles, responsibilities, and contributions.
            </p>
          </div>
        </AnimatedCard>

        {/* --- Experience Timeline --- */}
        <div className={`relative max-w-4xl mx-auto border-l-2 ${isDarkMode ? 'border-white/20' : 'border-gray-300/50'}`}>
          {experienceData.map((job, index) => (
            <AnimatedCard key={index} delay={index * 200}>
              <div className="mb-12 pl-12 relative">
                <div className="absolute -left-5 top-1">
                  <div className={`w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center ring-8 ${isDarkMode ? 'ring-blue-900/50' : 'ring-blue-200/50'}`}>
                    <Briefcase size={20} className="text-white"/>
                  </div>
                </div>
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-cyan-300' : 'text-cyan-600'} mb-2`}>{job.years}</p>
                <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{job.role}</h2>
                <p className={`text-md ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>{job.company} - {job.location}</p>
                <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} leading-relaxed mb-6`}>{job.description}</p>
                <div className="space-y-3">
                  {job.points.map(point => (
                    <div key={point} className="flex items-start space-x-3">
                      <Star size={16} className="text-yellow-400 mt-1 flex-shrink-0"/>
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </main>

      {/* Recruiter Toast */}
      <AnimatePresence>
        {showRecruiterToast && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-8 right-8 z-[9999] max-w-sm"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-2xl border-2 border-white/30 p-6 backdrop-blur-xl">
              <div className="flex items-start space-x-4">
                <span className="text-4xl">😉</span>
                <div>
                  <p className="text-white font-bold text-lg mb-1">
                    Psst... I'm available for opportunities
                  </p>
                  <p className="text-white/90 text-sm">
                    Let's build something amazing together! 🚀
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExperiencePage;
