"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Zap, ChevronDown, Brain } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import OptimizedBackground from '../components/OptimizedBackground';

// --- Reusable Animated Component ---
const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
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

// Custom typing animation component
const TypeAnimation = () => {
  const { isDarkMode } = useTheme();
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const texts = [
    'Software Engineering Student',
    'Full-Stack Developer',
    'Context Engineer',
    'Robotics Engineer',
    'Innovator & Problem Solver'
  ];
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[currentIndex];
      
      if (!isDeleting) {
        setCurrentText(current.substring(0, currentText.length + 1));
        
        if (currentText === current) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(current.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts]);
  
  return (
    <span className="inline-flex items-baseline text-white">
      <span className="text-white">{currentText}</span>
      <span className="inline-block w-0.5 h-[1em] bg-white ml-1 animate-pulse">&nbsp;</span>
    </span>
  );
};

// --- Data for Featured Projects ---
const featuredProjects = [
  {
    title: "Spin State (Project Pulsor)",
    category: "Full-Stack",
    description: "Designed and deployed a comprehensive full-stack platform enabling seamless collaboration among scientists and engineers.",
    tech: ["React.js", "Node.js", "Docker", "MongoDB"],
    link: "/projects"
  },
  {
    title: "ORION-R: Autonomous Drone Swarm",
    category: "AI/ML & Robotics",
    description: "Leading development of synchronized autonomous drones using computer vision and swarm intelligence for search & rescue operations.",
    tech: ["Computer Vision", "Swarm AI", "ROS", "Python"],
    link: "/projects"
  },
  {
    title: "Project Umbra: Haptic Headband",
    category: "Hardware & AI",
    description: "Designed a smart haptic feedback headband for visually impaired navigation using depth sensors and spatial audio.",
    tech: ["Arduino", "Depth Sensing", "Haptics", "Spatial Audio"],
    link: "/projects"
  },
  {
    title: "IronEye: AI Manufacturing Inspector",
    category: "AI/ML",
    description: "Built an AI-powered visual inspection system detecting manufacturing defects with 95% accuracy using deep learning.",
    tech: ["TensorFlow", "Computer Vision", "Deep Learning", "Python"],
    link: "/projects"
  },
];

export default function HomePage() {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen w-full relative transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <OptimizedBackground particleCount={25} connectionDistance={90} />
      
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 py-20 text-center">
          <div className="max-w-7xl mx-auto">
              <AnimatedSection>
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight">
                    <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      KRISHNA
                    </span>
                    <span className="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                      THIRUMALAI
                    </span>
                  </h1>
              </AnimatedSection>
              
              <AnimatedSection delay={2}>
                  <div className={`text-2xl md:text-4xl lg:text-5xl font-light ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-8 h-16 md:h-20`}>
                      <span className={`bg-gradient-to-r ${isDarkMode ? 'from-cyan-400 to-blue-400' : 'from-cyan-600 to-blue-600'} bg-clip-text text-transparent`}>
                        <TypeAnimation />
                      </span>
                  </div>
              </AnimatedSection>
              
              <AnimatedSection delay={4}>
                  <p className={`text-lg md:text-xl lg:text-2xl ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} max-w-5xl mx-auto mb-12 leading-relaxed`}>
                    From engineering <span className={`${isDarkMode ? 'text-purple-300' : 'text-purple-700'} font-semibold`}>autonomous swarm drone systems</span> with intelligent docking to developing <span className={`${isDarkMode ? 'text-cyan-300' : 'text-cyan-700'} font-semibold`}>AI-powered industrial inspection tools</span> and <span className={`${isDarkMode ? 'text-green-300' : 'text-green-700'} font-semibold`}>assistive wearables for the visually impaired</span>, I transform complex technical challenges into innovative, real-world solutions that push the boundaries of robotics, AI, and human-computer interaction.
                  </p>
              </AnimatedSection>
              
              <AnimatedSection delay={6}>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                    <a href="/projects" className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
                      <span className="relative z-10 flex items-center space-x-3">
                        <Sparkles size={24} />
                        <span>Explore My Projects</span>
                      </span>
                    </a>
                    <a href="/contact" className="group px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105">
                      <span className="relative z-10 flex items-center space-x-3">
                        <Zap size={24} />
                        <span>Get In Touch</span>
                      </span>
                    </a>
                  </div>
              </AnimatedSection>
              
              <div className="mt-20">
                  <a href="#about-snippet" className={`flex flex-col items-center space-y-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm transition-colors duration-300`}>
                      <span>Discover more</span>
                      <ChevronDown size={28} className="animate-bounce" />
                  </a>
              </div>
          </div>
        </section>

        {/* About Me Snippet */}
        <section id="about-snippet" className="py-20 px-6">
          <AnimatedSection>
              <div className={`max-w-4xl mx-auto text-center p-8 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/60 border-gray-200/50 hover:bg-white/80'} backdrop-blur-xl border rounded-3xl transition-all duration-300`}>
                  <Brain className={`mx-auto h-12 w-12 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} mb-6`}/>
                  <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>A Multi-Disciplinary Approach</h2>
                  <p className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} leading-relaxed`}>
                      I am a software engineering student with a deep passion for building intelligent systems. My work spans the full stack of web development, from crafting responsive user interfaces with React to architecting robust back-end services, and extends into the physical world with robotics and mechatronics. Beyond code, I'm actively studying physics—from classical mechanics through quantum mechanics—with aspirations to achieve deep knowledge in particle physics, bringing a unique analytical lens to every challenge.
                  </p>
              </div>
          </AnimatedSection>
        </section>

        {/* Featured Projects Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
              <AnimatedSection>
                  <div className="text-center mb-16">
                      <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Featured Projects</h2>
                      <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>A glimpse into my recent work.</p>
                  </div>
              </AnimatedSection>
              
              <div className="grid md:grid-cols-2 gap-8">
                  {featuredProjects.map((project, index) => (
                      <AnimatedSection key={project.title} delay={index + 2}>
                          <a href={project.link} className={`group block h-full p-6 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-400/50' : 'bg-white/60 border-gray-200/50 hover:bg-white/80 hover:border-purple-400/80'} backdrop-blur-xl border rounded-2xl transition-all duration-300 hover:-translate-y-2`}>
                              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white group-hover:text-purple-300' : 'text-gray-900 group-hover:text-purple-600'} mb-2 transition-colors`}>{project.title}</h3>
                              <p className={`text-sm font-semibold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} mb-3`}>{project.category}</p>
                              <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-4 text-sm`}>{project.description}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                  {project.tech.map(tech => (
                                      <span key={tech} className={`px-2 py-1 ${isDarkMode ? 'bg-blue-500/20 text-cyan-300 border-cyan-500/30' : 'bg-blue-100 text-cyan-700 border-cyan-400/50'} rounded text-xs border`}>{tech}</span>
                                  ))}
                              </div>
                              <span className={`font-semibold ${isDarkMode ? 'text-purple-300 group-hover:text-white' : 'text-purple-600 group-hover:text-purple-900'} flex items-center space-x-2 transition-colors text-sm`}>
                                  <span>View Details</span>
                                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                              </span>
                          </a>
                      </AnimatedSection>
                  ))}
              </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 text-center">
          <AnimatedSection>
              <div className={`p-8 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/60 border-gray-200/50'} backdrop-blur-xl border rounded-3xl max-w-4xl mx-auto`}>
                  <Sparkles className={`mx-auto h-12 w-12 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} mb-6`}/>
                  <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Have an Idea?</h2>
                  <p className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} max-w-2xl mx-auto mb-8`}>
                      I'm always ready for the next challenge. Let's build something amazing together.
                  </p>
                  <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105">
                      <span>Let's Build Together</span>
                  </a>
              </div>
          </AnimatedSection>
        </section>
      </div>
    </div>
  );
}
