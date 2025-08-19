// Filename: src/app/experience/page.tsx
// This component creates the "Experience" page, detailing professional roles
// and responsibilities in a clear, timeline-based format.

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Users, Star } from 'lucide-react';

// --- Data for the Experience page ---
const experienceData = [
  {
    role: "Student Ambassador & International Student Representative",
    company: "Queen’s University Belfast",
    location: "Belfast, UK",
    years: "2024 – Present",
    description: "Serving as a key liaison for the international student body, enhancing their university experience through proactive advocacy, event management, and mentorship.",
    points: [
      "Launched initiatives that significantly improved the integration and overall experience for international students.",
      "Supported the logistics and execution of over 15 major university events, including open days and outreach programs.",
      "Mentored hundreds of new international students, providing guidance to ease their academic and cultural transition.",
    ],
  },
  {
    role: "Student Council Assistant",
    company: "Al Khor International School (AKIS)",
    location: "Qatar",
    years: "2017 – 2024",
    description: "Played a pivotal role in student governance and event coordination, contributing to a vibrant and engaging school environment for over seven years.",
    points: [
      "Spearheaded the planning and execution of more than 20 annual school events, from Olympiads to cultural programs, for 1,000+ students.",
      "Managed all event logistics, ensuring a smooth and high-quality experience for all participants and attendees.",
      "Collaborated effectively with a 15-member council team to consistently achieve goals and meet strict timelines.",
    ],
  },
];

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

const ExperiencePage = () => {
  return (
    <main className="relative z-10 container mx-auto px-6 py-24 sm:py-32">
      {/* Subtle page-level aurora/gradient to ensure vibrancy on this tab */}
      <div className="absolute inset-0 -z-10 aurora opacity-28 pointer-events-none" />
      {/* --- Page Header --- */}
      <AnimatedCard>
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
              Professional Path
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            A summary of my roles, responsibilities, and contributions.
          </p>
        </div>
      </AnimatedCard>

      {/* --- Experience Timeline --- */}
      <div className="relative max-w-4xl mx-auto border-l-2 border-white/10">
        {experienceData.map((job, index) => (
          <AnimatedCard key={index} delay={index * 200}>
            <div className="mb-12 pl-12 relative">
              <div className="absolute -left-5 top-1">
                <div className="w-10 h-10 rounded-full flex items-center justify-center ring-8">
                  <Briefcase size={20} className="text-white"/>
                </div>
              </div>
              <p className="text-sm font-semibold text-cyan-400 mb-2">{job.years}</p>
              <h2 className="text-3xl font-bold text-white mb-1">{job.role}</h2>
              <p className="text-md text-gray-400 mb-6">{job.company} - {job.location}</p>
              <p className="text-gray-300 leading-relaxed mb-6">{job.description}</p>
              <div className="space-y-3">
                {job.points.map(point => (
                  <div key={point} className="flex items-start space-x-3">
                    <Star size={16} className="text-yellow-400 mt-1 flex-shrink-0"/>
                    <span className="text-gray-400">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </main>
  );
};

export default ExperiencePage;
