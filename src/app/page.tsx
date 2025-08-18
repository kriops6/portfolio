"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Zap, ChevronDown, Rocket, Code, Star, ExternalLink, Brain } from 'lucide-react';

// --- Reusable Animated Component ---
const AnimatedSection = ({ children, delay = 0 }) => {
    return (
        <div
            className="opacity-0 translate-y-5 animate-[fadeInUp_0.7s_ease-out_forwards]"
            style={{ animationDelay: `${delay * 0.1}s` }}
        >
            {children}
        </div>
    );
};

// Custom typing animation component
const TypeAnimation = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const texts = [
    'Software Engineering Student',
    'Full-Stack Developer',
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
    <span>
      {currentText}
      <span className="typing-cursor">&nbsp;</span>
    </span>
  );
};

// --- Data for Featured Projects ---
const featuredProjects = [
  {
    title: "Spin State (Project Pulsor)",
    category: "Full-Stack",
    description: "Designed and deployed a full-stack platform from scratch to enable seamless collaboration among scientists and engineers.",
    tech: ["React.js", "Node.js", "Docker", "MongoDB"],
    link: "/projects"
  },
  {
    title: "Automated Harbor Prototype",
    category: "Robotics",
    description: "Engineered a functional, scaled-down model of an automated harbor, integrating robotics and mechatronics to earn 4th place in a national competition.",
    tech: ["Robotics", "Mechatronics", "System Integration"],
    link: "/projects"
  },
];

const HomePage = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes drift {
          0% { transform: translateX(-100px) translateY(0px); }
          25% { transform: translateX(100px) translateY(-50px); }
          50% { transform: translateX(200px) translateY(0px); }
          75% { transform: translateX(50px) translateY(50px); }
          100% { transform: translateX(-100px) translateY(0px); }
        }
        @keyframes aurora-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .floating { animation: float 6s ease-in-out infinite; }
        .rotating { animation: rotate 20s linear infinite; }
        .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .drifting { animation: drift 25s ease-in-out infinite; }
        .aurora {
          background: linear-gradient(45deg, rgba(98, 63, 226, 0.12), rgba(78, 70, 224, 0.08), rgba(137, 99, 241, 0.1), rgba(139, 92, 246, 0.09), rgba(67, 56, 202, 0.11));
          background-size: 400% 400%;
          animation: aurora-shift 8s ease infinite;
        }
        .glass-morphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .typing-cursor {
          display: inline-block;
          background-color: #ffffffff;
          margin-left: 3px;
          width: 3px;
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}} />

      <main className="relative z-10 overflow-hidden">
        {/* Multi-layered Background */}
        <div className="fixed inset-0 z-[-10]">
          {/* Base gradient matching the image */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-blue-900 to-violet-900"></div>
          
          {/* Aurora background with purple-blue tones */}
          <div className="absolute inset-0 aurora opacity-30"></div>
          
          {/* Small pinpoint glowy particles in top left */}
          <div className="absolute top-16 left-16 w-1 h-1 bg-cyan-400 rounded-full pulse-glow"></div>
          <div className="absolute top-24 left-24 w-1.5 h-1.5 bg-purple-400 rounded-full pulse-glow" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-32 left-8 w-1 h-1 bg-blue-400 rounded-full pulse-glow" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-40 left-32 w-2 h-2 bg-violet-400 rounded-full pulse-glow" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-48 left-12 w-1 h-1 bg-pink-400 rounded-full pulse-glow" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-56 left-28 w-1.5 h-1.5 bg-indigo-400 rounded-full pulse-glow" style={{animationDelay: '2.5s'}}></div>
          <div className="absolute top-64 left-20 w-1 h-1 bg-cyan-300 rounded-full pulse-glow" style={{animationDelay: '1.5s'}}></div>
          
          {/* Very subtle radial gradients for depth */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-purple-600/8 via-transparent to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-violet-600/8 via-transparent to-transparent blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-600/6 via-transparent to-transparent blur-3xl"></div>
        </div>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center px-6 py-32 text-center">
          <div className="relative z-10 max-w-7xl mx-auto">
              <div className="opacity-0 translate-y-5 animate-[fadeInUp_0.7s_ease-out_forwards]">
                  <h1 className="text-7xl md:text-9xl font-black mb-8 leading-tight">
                    <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
                      KRISHNA
                    </span>
                    <br />
                    <span className="inline-block bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
                      THIRUMALAI
                    </span>
                  </h1>
              </div>
              <div className="opacity-0 translate-y-5 animate-[fadeInUp_0.7s_ease-out_0.2s_forwards]">
                  <div className="text-3xl md:text-5xl font-light text-gray-300 mb-8 h-24 md:h-16">
                      <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        <TypeAnimation />
                      </span>
                  </div>
              </div>
              <div className="opacity-0 translate-y-5 animate-[fadeInUp_0.7s_ease-out_0.4s_forwards]">
                  <p className="text-xl md:text-2xl text-gray-400 max-w-5xl mx-auto mb-16 leading-relaxed">
                    From architecting <span className="text-purple-400 font-semibold">full-stack collaborative platforms</span> with React and Node.js to engineering <span className="text-green-400 font-semibold">competition-winning automated robotics</span>, I thrive on transforming complex technical challenges into high-performance, scalable solutions.
                  </p>
              </div>
              <div className="opacity-0 translate-y-5 animate-[fadeInUp_0.7s_ease-out_0.6s_forwards]">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a href="/projects" className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/30">
                      <span className="relative z-10 flex items-center space-x-3">
                        <Sparkles size={24} />
                        <span>Explore My Projects</span>
                      </span>
                    </a>
                    <a href="/contact" className="group px-10 py-5 glass-morphism rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-110">
                      <span className="relative z-10 flex items-center space-x-3">
                        <Zap size={24} />
                        <span>Get In Touch</span>
                      </span>
                    </a>
                  </div>
              </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <a href="#about-snippet" className="flex flex-col items-center space-y-2 text-gray-400 text-sm animate-pulse">
                  <span>Discover more</span>
                  <ChevronDown size={28} className="animate-bounce" />
              </a>
          </div>
        </section>

        {/* --- About Me Snippet --- */}
        <section id="about-snippet" className="py-24 sm:py-32 px-6">
          <AnimatedSection>
              <div className="max-w-4xl mx-auto text-center p-8 glass-morphism rounded-3xl">
                  <Brain className="mx-auto h-12 w-12 text-cyan-400 mb-6"/>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">A Multi-Disciplinary Approach</h2>
                  <p className="text-lg text-gray-300 leading-relaxed">
                      I am a software engineering student with a deep passion for building intelligent systems. My work spans the full stack of web development, from crafting responsive user interfaces with React to architecting robust back-end services, and extends into the physical world with robotics and mechatronics. I believe the most powerful innovations happen at the intersection of different fields, and I am driven to build solutions that are not only technically excellent but also intuitive and impactful.
                  </p>
              </div>
          </AnimatedSection>
        </section>

        {/* --- Featured Projects Section --- */}
        <section className="py-24 sm:py-32 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-purple-900/30 backdrop-blur-sm"></div>
          <div className="max-w-7xl mx-auto relative z-10">
              <AnimatedSection>
                  <div className="text-center mb-16">
                      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
                      <p className="text-lg text-gray-400">A glimpse into my recent work.</p>
                  </div>
              </AnimatedSection>
              <div className="grid md:grid-cols-2 gap-8">
                  {featuredProjects.map((project, index) => (
                      <AnimatedSection key={project.title} delay={index + 2}>
                          <a href={project.link} className="group relative block h-full p-8 glass-morphism rounded-3xl transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2">
                               <div className="absolute -inset-px rounded-3xl border-2 border-transparent opacity-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                               <div className="absolute -inset-0.5 rounded-3xl bg-slate-900/80 -z-5"></div>
                              <h3 className="relative text-2xl font-bold text-white mb-2">{project.title}</h3>
                              <p className="relative text-sm font-semibold text-cyan-400 mb-4">{project.category}</p>
                              <p className="relative text-gray-400 mb-6">{project.description}</p>
                              <div className="relative flex flex-wrap gap-2 mb-6">
                                  {project.tech.map(tech => (
                                      <span key={tech} className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-cyan-300 rounded-full text-xs font-medium border border-cyan-500/30">{tech}</span>
                                  ))}
                              </div>
                              <span className="relative font-semibold text-purple-300 flex items-center space-x-2 group-hover:text-white transition-colors duration-300">
                                  <span>View Details</span>
                                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300"/>
                              </span>
                          </a>
                      </AnimatedSection>
                  ))}
              </div>
          </div>
        </section>

        {/* --- Final Call to Action --- */}
        <section className="py-24 sm:py-32 px-6 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
          <AnimatedSection>
              <div className="relative z-10 p-12 glass-morphism rounded-3xl max-w-4xl mx-auto">
                  <Sparkles className="mx-auto h-12 w-12 text-yellow-400 animate-pulse mb-6"/>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Have an Idea?</h2>
                  <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                      I'm always ready for the next challenge. If you're looking for a passionate engineer to help bring your vision to life, let's talk.
                  </p>
                  <a href="/contact" className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-pink-500/30">
                      <span className="relative z-10">Let's Build Together</span>
                  </a>
              </div>
          </AnimatedSection>
        </section>
      </main>
    </>
  );
};

export default HomePage;