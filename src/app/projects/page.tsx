// Filename: src/app/projects/page.tsx
// This component creates the "Projects" page, now featuring dynamic filtering
// with fluid animations powered by Framer Motion.

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Code, ExternalLink, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data for the Projects page ---
const projectsData = [
  {
    title: "Spin State (Project Pulsor)",
    category: "Full-Stack",
    year: "2025",
    description: "Designed, developed, and deployed a full-stack platform from the ground up to enable seamless collaboration among scientists and engineers. The platform features a responsive front-end, a secure back-end with RESTful APIs, and is deployed using modern containerization techniques.",
    features: [
      "User Profiles & Secure Authentication",
      "Submission System & Q&A Forums",
      "Live Feed & Project Workspaces",
      "Containerized Deployment with Docker"
    ],
    tech: ["React.js", "Tailwind CSS", "Node.js", "Django", "Docker", "MongoDB", "PostgreSQL", "REST APIs"],
    link: "#" // Placeholder for live project link
  },
  {
    title: "Automated Harbor Prototype",
    category: "Robotics",
    year: "2023",
    description: "Engineered a functional, scaled-down model of an automated harbor, integrating principles of robotics and mechatronics. This project demonstrated practical design, innovation, and problem-solving skills, earning 4th place in the prestigious National Science Research Competition.",
    features: [
        "Robotic Arm Integration",
        "Automated Container Movement",
        "Sensor-Based Logic Control",
        "Mechatronic System Design"
    ],
    tech: ["Robotics", "Mechatronics", "Engineering Design", "System Integration", "AutoCAD"],
    link: "#" // Placeholder for project video or repository
  },
];

const filterCategories = ["All", "Full-Stack", "Robotics"];


const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All"
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <main className="relative z-10 container mx-auto px-6 py-24 sm:py-32">
      {/* --- Page Header --- */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black mb-4">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              My Creations
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            A showcase of my passion for building innovative and practical solutions.
          </p>
        </div>
      </motion.div>

      {/* --- Filter Buttons --- */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
        <div className="flex justify-center items-center space-x-2 bg-black/20 rounded-full p-2 mb-16 max-w-md mx-auto">
            {filterCategories.map(category => (
                <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className="relative w-full px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300 text-gray-300 hover:text-white"
                >
                    <span className="relative z-10">{category}</span>
                    {activeFilter === category && (
                        <motion.div
                            layoutId="project-filter-pill"
                            className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full"
                            style={{ borderRadius: 9999 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                </button>
            ))}
        </div>
      </motion.div>

      {/* --- Projects Grid --- */}
      <motion.div layout className="space-y-16">
        <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Project Details */}
                  <div className={index % 2 !== 0 ? 'lg:order-last' : ''}>
                    <p className="text-sm font-semibold text-cyan-400 mb-2">{project.category}</p>
                    <h2 className="text-4xl font-bold text-white mb-4">{project.title}</h2>
                    <p className="text-gray-300 leading-relaxed mb-6">{project.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {project.features.map(feature => (
                            <div key={feature} className="flex items-center space-x-2">
                                <Star size={16} className="text-yellow-400 flex-shrink-0"/>
                                <span className="text-sm text-gray-400">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-white/10 text-cyan-300 rounded-full text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:scale-105 transition-transform duration-300">
                      <ExternalLink size={20}/>
                      <span>View Project</span>
                    </a>
                  </div>
                  
                  {/* Project Visual Placeholder */}
                  <div className="group relative w-full h-80 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                     <Rocket size={64} className="text-gray-500 group-hover:text-white group-hover:scale-110 transition-all duration-500"/>
                     <span className="absolute bottom-4 right-4 text-xs text-gray-600 group-hover:text-white transition-colors duration-300">Visual Coming Soon</span>
                  </div>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
    </main>
  );
};

export default ProjectsPage;
