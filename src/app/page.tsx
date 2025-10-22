"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, ChevronDown, Brain } from 'lucide-react';
import { useTheme } from '../components/SeasonalThemeProvider';
import OptimizedBackground from '../components/OptimizedBackground';

// Motion.dev spring config for smooth animations
const springConfig = { stiffness: 100, damping: 20, restDelta: 0.001 };

// Stagger container for child animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, ...springConfig }
  }
};

// Custom typing animation component
const TypeAnimation = () => {
  const { themeConfig } = useTheme();
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
    <span className="inline-flex items-baseline" style={{ color: themeConfig.colors.primary }}>
      <span>{currentText}</span>
      <span className="inline-block w-0.5 h-[1em] ml-1 animate-pulse" style={{ backgroundColor: themeConfig.colors.primary }}>&nbsp;</span>
    </span>
  );
};

// --- Data for Featured Projects ---
const featuredProjects = [
  {
    title: "Spin State (Project Pulsor)",
    category: "Full-Stack",
    description: "A collaboration platform I built from scratch for scientists and engineers. Full-stack web app with real-time features and containerized deployment.",
    tech: ["React.js", "Node.js", "Docker", "MongoDB"],
    link: "/projects"
  },
  {
    title: "ORION-R: Autonomous Drone Swarm",
    category: "AI/ML & Robotics",
    description: "Getting multiple drones to work together autonomously for search & rescue. They use computer vision and swarm intelligence to coordinate without human input.",
    tech: ["Computer Vision", "Swarm AI", "ROS", "Python"],
    link: "/projects"
  },
  {
    title: "Project Umbra: Haptic Headband",
    category: "Hardware & AI",
    description: "A wearable that helps visually impaired people navigate using vibration patterns. Depth sensors detect obstacles, spatial audio provides direction cues.",
    tech: ["Arduino", "Depth Sensing", "Haptics", "Spatial Audio"],
    link: "/projects"
  },
  {
    title: "IronEye: AI Manufacturing Inspector",
    category: "AI/ML",
    description: "AI that spots defects in manufacturing. Trained a deep learning model that catches issues with 95% accuracy—way better than manual inspection.",
    tech: ["TensorFlow", "Computer Vision", "Deep Learning", "Python"],
    link: "/projects"
  },
];

export default function HomePage() {
  const { themeConfig, isDarkMode } = useTheme();
  
  return (
    <div className="min-h-screen w-full relative">
      {/* OptimizedBackground will handle the visual effects */}
      <OptimizedBackground particleCount={35} connectionDistance={100} />
      
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 py-20 text-center">
          <motion.div 
            className="max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
              <motion.div variants={itemVariants}>
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight" style={{ fontFamily: themeConfig.fonts.heading }}>
                    <motion.span 
                      className="block bg-gradient-to-r bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary}, ${themeConfig.colors.accent})`
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", ...springConfig, delay: 0.2 }}
                    >
                      KRISHNA
                    </motion.span>
                    <motion.span 
                      className="block bg-gradient-to-r bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${themeConfig.colors.secondary}, ${themeConfig.colors.primary}, ${themeConfig.colors.accent})`
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", ...springConfig, delay: 0.4 }}
                    >
                      THIRUMALAI
                    </motion.span>
                  </h1>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                  <div className={`text-2xl md:text-4xl lg:text-5xl font-light ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-8 h-16 md:h-20`}>
                      <span className={`bg-gradient-to-r ${isDarkMode ? 'from-cyan-400 to-blue-400' : 'from-cyan-600 to-blue-600'} bg-clip-text text-transparent`}>
                        <TypeAnimation />
                      </span>
                  </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                  <p className={`text-lg md:text-xl lg:text-2xl ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} max-w-5xl mx-auto mb-12 leading-relaxed`}>
                    I build things that matter. From <span className={`${isDarkMode ? 'text-purple-300' : 'text-purple-700'} font-semibold`}>drone swarms that talk to each other</span> to <span className={`${isDarkMode ? 'text-cyan-300' : 'text-cyan-700'} font-semibold`}>AI that spots manufacturing defects</span> and <span className={`${isDarkMode ? 'text-green-300' : 'text-green-700'} font-semibold`}>wearables that help people navigate</span>—I love turning wild ideas into working tech.
                  </p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                    <motion.a 
                      href="/projects" 
                      className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-xl font-bold text-lg transition-all duration-300"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(168, 85, 247, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center space-x-3">
                        <Sparkles size={24} />
                        <span>Explore My Projects</span>
                      </span>
                    </motion.a>
                    <motion.a 
                      href="/contact" 
                      className="group px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl font-bold text-lg transition-all duration-300"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center space-x-3">
                        <Zap size={24} />
                        <span>Get In Touch</span>
                      </span>
                    </motion.a>
                  </div>
              </motion.div>
              
              <motion.div 
                className="mt-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, ...springConfig }}
              >
                  <a href="#about-snippet" className={`flex flex-col items-center space-y-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm transition-colors duration-300`}>
                      <span>Discover more</span>
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <ChevronDown size={28} />
                      </motion.div>
                  </a>
              </motion.div>
          </motion.div>
        </section>

        {/* About Me Snippet */}
        <section id="about-snippet" className="py-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring" as const, ...springConfig }}
          >
              <div className={`max-w-4xl mx-auto text-center p-8 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/60 border-gray-200/50 hover:bg-white/80'} backdrop-blur-xl border rounded-3xl transition-all duration-300`}>
                  <Brain className={`mx-auto h-12 w-12 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} mb-6`}/>
                  <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Code Meets Hardware</h2>
                  <p className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} leading-relaxed`}>
                      I'm a software engineering student who can't stick to just one thing. I build full-stack web apps, mess around with robotics, and somehow ended up studying physics—from classical mechanics all the way to quantum. My goal? Understanding particle physics. Why? Because I'm curious about how everything works, from websites to the universe itself.
                  </p>
              </div>
          </motion.div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring" as const, ...springConfig }}
              >
                  <div className="text-center mb-16">
                      <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Featured Projects</h2>
                      <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>A glimpse into my recent work.</p>
                  </div>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-8">
                  {featuredProjects.map((project, index) => (
                      <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          type: "spring" as const, 
                          ...springConfig,
                          delay: index * 0.1
                        }}
                      >
                          <motion.a 
                            href={project.link} 
                            className={`group block h-full p-6 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-400/50' : 'bg-white/60 border-gray-200/50 hover:bg-white/80 hover:border-purple-400/80'} backdrop-blur-xl border rounded-2xl transition-all duration-300`}
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
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
                          </motion.a>
                      </motion.div>
                  ))}
              </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, ...springConfig }}
          >
              <div className={`p-8 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/60 border-gray-200/50'} backdrop-blur-xl border rounded-3xl max-w-4xl mx-auto`}>
                  <Sparkles className={`mx-auto h-12 w-12 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} mb-6`}/>
                  <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Got Something Cool in Mind?</h2>
                  <p className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} max-w-2xl mx-auto mb-8`}>
                      I'm always down for interesting projects. Let's talk.
                  </p>
                  <motion.a 
                    href="/contact" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl font-bold text-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                      <span>Let's Talk</span>
                  </motion.a>
              </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
