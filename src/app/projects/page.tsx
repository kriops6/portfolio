// Filename: src/app/projects/page.tsx
// Projects page — single clean component (no local opaque backgrounds)

"use client";

import React, { useState } from 'react';
import { Rocket, ExternalLink, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const projectsData = [
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

const filterCategories = ["All", "Full-Stack", "Robotics"];

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All"
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <main className="relative z-10 container mx-auto px-6 py-24 sm:py-32">
      {/* Subtle page-level aurora/gradient to ensure vibrancy on this tab */}
      <div className="absolute inset-0 -z-10 aurora opacity-28 pointer-events-none" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black mb-4">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">My Creations</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">A showcase of my work.</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
        <div className="flex justify-center items-center gap-3 mb-16">
          {filterCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white border border-white/10"
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div layout className="space-y-16">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div key={project.title} layout initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.45 }}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 !== 0 ? 'lg:order-last' : ''}>
                  <p className="text-sm font-semibold text-cyan-400 mb-2">{project.category}</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.title}</h2>
                  <p className="text-gray-300 mb-6">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(t => (
                      <span key={t} className="px-3 py-1 text-cyan-300 rounded-full text-xs font-medium border border-cyan-500/20">{t}</span>
                    ))}
                  </div>

                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-5 py-2 rounded-md font-semibold border border-purple-500/30 hover:bg-purple-500/10 transition-all duration-200">
                    <ExternalLink size={18} />
                    <span>View Project</span>
                  </a>
                </div>

                <div className="group relative w-full h-64 md:h-80 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden hover:border-purple-500/40 transition-all duration-300">
                  <Rocket size={56} className="text-gray-400 group-hover:text-white transition-all duration-400" />
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
