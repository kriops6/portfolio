"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Rocket, ExternalLink } from 'lucide-react';
import { useTheme } from '../../components/ThemeProvider';
import TiltCard from '../../components/ui/TiltCard';
import RippleButton from '../../components/ui/RippleButton';
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

const projectsData = [
  {
    title: "ORION-R – Autonomous Swarm Drone System",
    category: "Robotics",
    year: "2025",
    description: "Self-coordinating swarm of autonomous drones with intelligent docking and charging for disaster response, environmental monitoring, and search-and-rescue operations.",
    features: [
      "UWB-based swarm coordination (<10cm accuracy)",
      "Electromagnetic docking with magnetic alignment",
      "Mesh network architecture for decentralized control",
      "LIDAR mapping and thermal imaging",
      "24/7 autonomous operation with rotating deployment"
    ],
    tech: ["STM32", "ESP32", "UWB", "LIDAR", "Computer Vision", "Mesh Networks", "Embedded C"],
    link: "#"
  },
  {
    title: "Project Umbra – Spatial Awareness Headband",
    category: "Robotics",
    year: "2025",
    description: "Assistive wearable using haptic feedback to extend spatial perception for visually impaired individuals. Translates environmental depth data into intuitive tactile pressure patterns.",
    features: [
      "Miniature pressure actuators for haptic feedback",
      "AI-driven sensory filtering to prevent overload",
      "Depth sensors and stereo cameras for environment scanning",
      "Comfort-centric design for all-day wear",
      "Silent, hands-free spatial awareness"
    ],
    tech: ["Computer Vision", "Haptic Systems", "AI/ML", "Embedded Systems", "Python", "TensorFlow"],
    link: "#"
  },
  {
    title: "Project IronEye – AI Corrosion Inspector",
    category: "AI/ML",
    year: "2025",
    description: "AI-powered digital radiography system for real-time corrosion detection in industrial pipes. Reduces inspection workflow from 2 days to minutes with automated defect detection and reporting.",
    features: [
      "Real-time X-ray image processing and enhancement",
      "CNN-based corrosion detection (U-Net, YOLOv7)",
      "Automated wall-loss measurement and severity classification",
      "Field-ready mobile interface for rugged tablets",
      "DICONDE-compliant report generation"
    ],
    tech: ["PyTorch", "OpenCV", "FastAPI", "Flutter", "ONNX", "Computer Vision", "TensorFlow"],
    link: "#"
  },
  {
    title: "Spin State (Project Pulsor)",
    category: "Full-Stack",
    year: "2025",
    description: "Designed, developed, and deployed a full-stack platform from the ground up to enable seamless collaboration among scientists and engineers.",
    features: [
      "User Profiles & Secure Authentication",
      "Submission System & Q&A Forums",
      "Live Feed & Project Workspaces",
      "Containerized Deployment with Docker"
    ],
    tech: ["React.js", "Tailwind CSS", "Node.js", "Django", "Docker", "MongoDB"],
    link: "#"
  },
  {
    title: "Automated Harbor Prototype",
    category: "Robotics",
    year: "2023",
    description: "Engineered a functional, scaled-down model of an automated harbor, integrating robotics and mechatronics.",
    features: ["Robotic Arm Integration", "Automated Container Movement", "Sensor-Based Logic Control"],
    tech: ["Robotics", "Mechatronics", "System Integration"],
    link: "#"
  }
];

const filterCategories = ["All", "Full-Stack", "Robotics", "AI/ML"];

const ProjectsPage = () => {
  const { isDarkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState("All");
  const filteredProjects = activeFilter === "All"
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-green-800 via-blue-900 to-purple-900 text-white' 
        : 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 text-gray-900'
    }`}>
      <OptimizedBackground 
        particleCount={25} 
        connectionDistance={90}
        gradientColors={['#047857', '#1e40af', '#7c3aed', '#be185d']}
      />
      
      <main className="relative z-10 container mx-auto px-6 py-24 sm:py-32">
        <AnimatedCard>
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-black mb-4">
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                My Creations
              </span>
            </h1>
            <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mx-auto`}>
              A showcase of my work.
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={2}>
          <div className="flex justify-center items-center gap-3 mb-16">
            {filterCategories.map((cat) => (
              <RippleButton
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeFilter === cat
                    ? isDarkMode 
                      ? "bg-white/10 text-white border-purple-500" 
                      : "bg-purple-100 text-purple-900 border-purple-500"
                    : isDarkMode
                      ? "text-gray-300 hover:text-white border-white/10"
                      : "text-gray-700 hover:text-gray-900 border-gray-300/50"
                }`}
              >
                {cat}
              </RippleButton>
            ))}
          </div>
        </AnimatedCard>

        <div className="space-y-16">
          {filteredProjects.map((project, index) => (
            <AnimatedCard key={project.title} delay={index * 2 + 3}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 !== 0 ? "lg:order-last" : ""}>
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} mb-2`}>
                    {project.category}
                  </p>
                  <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                    {project.title}
                  </h2>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-6`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className={`px-3 py-1 ${isDarkMode ? 'text-cyan-300 border-cyan-500/20 bg-cyan-500/5' : 'text-cyan-700 border-cyan-400/40 bg-cyan-100'} rounded-full text-xs font-medium border`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center space-x-2 px-5 py-2 rounded-md font-semibold ${isDarkMode ? 'bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20' : 'bg-purple-100 border-purple-400/50 hover:bg-purple-200'} border transition-all duration-300`}
                  >
                    <ExternalLink size={18} />
                    <span>View Project</span>
                  </a>
                </div>
                <TiltCard maxTilt={10}>
                  <div className={`group relative w-full h-64 md:h-80 rounded-2xl ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-purple-500/40' : 'bg-white/40 border-gray-200/50 hover:border-purple-400/60'} backdrop-blur-xl border flex items-center justify-center overflow-hidden transition-all duration-300`}>
                    <Rocket
                      size={56}
                      className={`${isDarkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-gray-900'} transition-all duration-400`}
                    />
                  </div>
                </TiltCard>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;
