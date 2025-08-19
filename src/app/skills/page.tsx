// Filename: src/app/skills/page.tsx
// This component creates an innovative "Skills" page, featuring an interactive
// radar chart and a balanced six-category grid of skills.

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Code, Database, Wrench, Brain, Layers, Star, Palette } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

// --- Data for the Skills page ---
const skillsData = {
  radar: [
    { subject: 'Frontend Dev', A: 85, fullMark: 100 },
    { subject: 'Backend Dev', A: 85, fullMark: 100 },
    { subject: 'Robotics', A: 95, fullMark: 100 },
    { subject: 'Project Management', A: 88, fullMark: 100 },
    { subject: 'AI Integration', A: 92, fullMark: 100 },
    { subject: 'UI/UX Design', A: 70, fullMark: 100 },
  ],
  categories: [
    {
      title: "Programming Languages",
      icon: Code,
      skills: ["Python (Certified)", "JavaScript", "C", "C++", "BASIC", "Lua", "Wren", "Nim"]
    },
    {
      title: "Web Technologies",
      icon: Layers,
      skills: ["React.js", "Tailwind CSS", "HTML5", "CSS3", "Node.js/Express.js", "Django", "Flask", "REST APIs", "Async Programming"]
    },
    {
      title: "Tools & Platforms",
      icon: Wrench,
      skills: ["Docker", "WSL2 Ubuntu", "Git", "GitHub", "VS Code", "NI Multisim", "Jira"]
    },
    {
      title: "Databases",
      icon: Database,
      skills: ["MongoDB", "PostgreSQL", "SQL", "NoSQL"]
    },
    {
      title: "Concepts & Paradigms",
      icon: Brain,
      skills: ["Full-Stack Development", "OOP", "Data Structures & Algorithms", "API Design", "System Design", "Agile", "Debugging", "Software Architecture"]
    },
    {
      title: "Design & Graphics",
      icon: Palette,
      skills: ["Figma", "Blender", "AutoCAD", "Engineering Graphics", "UI/UX Principles"]
    }
  ]
};

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
        <div
            ref={ref}
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};


const SkillsPage = () => {
    return (
                <main className="relative z-10 container mx-auto px-6 py-24 sm:py-32">
                    {/* Subtle page-level aurora/gradient to ensure vibrancy on this tab */}
                    <div className="absolute inset-0 -z-10 aurora opacity-28 pointer-events-none" />
            {/* --- Page Header --- */}
            <AnimatedCard>
                <div className="text-center mb-20">
                    <h1 className="text-6xl md:text-8xl font-black mb-4">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                            My Arsenal
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                        A curated collection of the technologies, tools, and concepts I command.
                    </p>
                </div>
            </AnimatedCard>

            {/* --- Interactive Radar Chart Section --- */}
            <AnimatedCard delay={200}>
                <section className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white">Core Competencies</h2>
                    </div>
                    <div className="w-full h-96 md:h-[500px] p-4 rounded-3xl border border-white/10">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData.radar}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 14 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Proficiency" dataKey="A" stroke="#8884d8" fill="url(#colorUv)" fillOpacity={0.6} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(10, 20, 30, 0.8)',
                                        borderColor: '#8884d8',
                                        borderRadius: '1rem',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                    labelStyle={{ color: '#ffffff' }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </section>
            </AnimatedCard>

            {/* --- Categorized Skills Grid --- */}
            <section>
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white">Technical Stack</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillsData.categories.map((category, index) => (
                        <AnimatedCard key={category.title} delay={index * 150}>
                            <div className="h-full p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 transition-all duration-300 hover:border-cyan-400 hover:-translate-y-2">
                                <div className="flex items-center space-x-4 mb-6">
                                    <category.icon size={28} className="text-cyan-400"/>
                                    <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {category.skills.map(skill => (
                                        <div key={skill} className="px-4 py-2 bg-white/10 rounded-lg text-gray-300 text-sm font-medium hover:bg-white/20 hover:text-white transition-colors duration-200 cursor-default">
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AnimatedCard>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default SkillsPage;
