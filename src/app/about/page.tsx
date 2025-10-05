"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, GraduationCap, Award, Sparkles, Brain, Target, Rocket, Users } from 'lucide-react';
import { useTheme } from '../../components/ThemeProvider';
import OptimizedBackground from '../../components/OptimizedBackground';

// --- Data specific to the About page ---
const aboutData = {
  summary: "Highly motivated and results-driven Software Engineering student at Queen's University Belfast (a Russell Group university) with a robust foundation in full-stack development, robotics, and engineering. Proven ability to translate complex technical requirements into innovative, scalable solutions, as evidenced by the independent design, development, and deployment of 'Spin State (Project Pulsor)'—a comprehensive collaborative platform. Beyond software, I'm pursuing deep knowledge in physics—progressing from classical mechanics through quantum mechanics toward particle physics—bringing a unique analytical perspective to technical challenges. Demonstrated leadership, strategic problem-solving, and cross-cultural communication skills, cultivated through significant academic achievements, competitive successes, and impactful student representation roles. Eager to leverage cutting-edge technology and interdisciplinary knowledge to drive innovation and foster collaborative success in dynamic software development environments.",
  timeline: [
    {
      type: 'education',
      icon: GraduationCap,
      date: 'Graduated 2024',
      title: 'High School Diploma',
      subtitle: 'Al Khor International School (AKIS), Qatar',
      description: 'Completed a comprehensive high school education, laying the groundwork for a future in engineering and technology.'
    },
    {
      type: 'education',
      icon: GraduationCap,
      date: '2023 – 2024',
      title: 'Diploma in Engineering',
      subtitle: 'Specialized Technical Institute',
      description: 'Completed an intensive diploma focusing on foundational engineering principles, applied mathematics, and hands-on workshop practices, providing a strong practical basis for advanced university studies.'
    },
    {
      type: 'work',
      icon: Briefcase,
      date: '2024 – Present',
      title: 'Student Ambassador & International Student Representative',
      subtitle: "Queen's University Belfast",
      description: 'Advocated for the international student community, supported 15+ major university events, and mentored hundreds of new international students, easing their academic and cultural transition.'
    },
    {
      type: 'education',
      icon: GraduationCap,
      date: '2024 – Present',
      title: 'BEng (Hons) Software Engineering',
      subtitle: "Queen's University Belfast, UK",
      description: 'Pursuing a rigorous curriculum at a prestigious Russell Group university, focusing on advanced software development principles and practices.'
    },
  ],
  achievements: [
    { icon: Award, title: 'Top Programmer', description: '3rd Place in the Alice Programming Competition at Carnegie Mellon University.', color: 'text-blue-400' },
    { icon: Rocket, title: 'Robotics Innovator', description: '4th Place in the National Science Research Competition for an automated harbor prototype.', color: 'text-purple-400' },
    { icon: Users, title: 'Diplomacy Expert', description: 'Awarded "Excellent Delegate" at Model United Nations (MUN) with a unanimously passed resolution.', color: 'text-green-400' },
    { icon: Brain, title: 'National Chess Finalist', description: 'Secured 3rd Place in the National Chess Competition, showcasing strategic thinking.', color: 'text-pink-400' },
  ]
};

// --- Reusable Animated Components ---
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

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

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

const AboutPage = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="min-h-screen overflow-hidden transition-colors duration-500">
      <OptimizedBackground 
        particleCount={25} 
        connectionDistance={85}
      />
      
      <main className="relative z-10 container mx-auto px-6 py-24 sm:py-32">
        {/* --- Page Header --- */}
        <AnimatedCard>
          <div className="text-center mb-10">
            <h1 className="text-6xl md:text-8xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                My Journey
              </span>
            </h1>
            <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} max-w-3xl mx-auto`}>
              A timeline of my academic pursuits, professional growth, and personal passions.
            </p>
          </div>
        </AnimatedCard>

        {/* --- Professional Summary --- */}
        <AnimatedCard delay={2}>
          <section className="mb-12 max-w-4xl mx-auto">
            <div className={`relative p-8 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/60 border-gray-200/50'} backdrop-blur-xl rounded-3xl border shadow-2xl`}>
              <div className="absolute -top-5 -left-5 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center transform -rotate-12">
                  <Brain size={32} className="text-white"/>
              </div>
              <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who I Am</h2>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-800'} leading-relaxed text-lg`}>
                {aboutData.summary}
              </p>
            </div>
          </section>
        </AnimatedCard>

        {/* --- Timeline Section --- */}
        <section className="mb-12">
          <AnimatedCard delay={3}>
              <div className="text-center mb-16">
                  <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Career & Education Timeline</h2>
              </div>
          </AnimatedCard>
          <div className="relative max-w-3xl mx-auto">
            {/* The vertical line in the timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 opacity-50"></div>

            {aboutData.timeline.map((item, index) => (
              <AnimatedCard key={index} delay={index * 1.5 + 4}>
                  <div className={`flex items-center w-full mb-8 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                      {/* Content Card */}
                      <div className="w-5/12">
                          <div className={`p-6 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' : 'bg-white/60 border-gray-200/50 hover:bg-white/80 hover:border-gray-300/70'} backdrop-blur-xl rounded-2xl border transition-all duration-300 text-right ${index % 2 !== 0 ? 'text-left' : ''}`}>
                              <p className={`text-sm font-semibold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} mb-1`}>{item.date}</p>
                              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{item.title}</h3>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} mb-3`}>{item.subtitle}</p>
                              <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{item.description}</p>
                          </div>
                      </div>

                      {/* Center Icon */}
                      <div className="relative z-10 flex items-center justify-center w-2/12">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 ${item.type === 'work' ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-green-500 to-cyan-500'}`}>
                              <item.icon size={24} className="text-white"/>
                          </div>
                      </div>

                      {/* Spacer */}
                      <div className="w-5/12"></div>
                  </div>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* --- Key Achievements Section --- */}
        <section>
          <AnimatedCard delay={10}>
              <div className="text-center mb-16">
                  <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Key Achievements</h2>
              </div>
          </AnimatedCard>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {aboutData.achievements.map((ach, index) => (
                  <AnimatedCard key={index} delay={index * 1.5 + 11}>
                      <div className={`group h-full text-center p-8 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' : 'bg-white/60 border-gray-200/50 hover:bg-white/80 hover:border-gray-300/70'} backdrop-blur-xl rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}>
                          <div className={`inline-flex p-4 ${isDarkMode ? 'bg-white/10' : 'bg-white/40'} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                              <ach.icon size={32} className={ach.color}/>
                          </div>
                          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{ach.title}</h3>
                          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'} text-sm`}>{ach.description}</p>
                      </div>
                  </AnimatedCard>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
