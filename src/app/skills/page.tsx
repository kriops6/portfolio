'use client';
import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import { Sparkles, Code, Server, Cloud, Cpu, Brain, Zap, Database, Globe, BarChart3, Activity } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useTheme } from '../../components/ThemeProvider';

// Radar chart data for main skill areas
const arsenalData = [
  { skill: 'AI Optimization & Context Engineering', value: 88, fullMark: 100 },
  { skill: 'Frontend Development', value: 92, fullMark: 100 },
  { skill: 'Backend Development', value: 85, fullMark: 100 },
  { skill: 'Robotics & Hardware', value: 78, fullMark: 100 },
  { skill: 'DevOps & Cloud', value: 72, fullMark: 100 },
  { skill: 'Database & APIs', value: 80, fullMark: 100 }
];

const skillCategories = [
  {
    type: 'AI Optimization & Context Engineering',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-purple-500 to-violet-400',
    description: 'Leveraging AI and optimized context engineering for maximum efficiency',
    skills: [
      { name: 'GitHub Copilot', level: 95 },
      { name: 'ChatGPT Integration', level: 90 },
      { name: 'Context Engineering', level: 92 },
      { name: 'Automated Workflows', level: 85 },
      { name: 'CI/CD Pipelines', level: 80 },
      { name: 'AI-Assisted Development', level: 92 }
    ]
  },
  {
    type: 'Frontend Development',
    icon: <Code className="w-6 h-6" />,
    color: 'from-cyan-500 to-blue-400',
    description: 'Building responsive and interactive user interfaces',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'HTML5 & CSS3', level: 98 },
      { name: 'JavaScript ES6+', level: 92 },
      { name: 'Framer Motion', level: 85 },
      { name: 'Responsive Design', level: 95 }
    ]
  },
  {
    type: 'Backend Development',
    icon: <Server className="w-6 h-6" />,
    color: 'from-emerald-500 to-green-400',
    description: 'Scalable server-side solutions and APIs',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Python', level: 92 },
      { name: 'Express.js', level: 85 },
      { name: 'FastAPI', level: 80 },
      { name: 'REST APIs', level: 90 },
      { name: 'GraphQL', level: 75 },
      { name: 'Microservices', level: 78 },
      { name: 'WebSockets', level: 82 }
    ]
  },
  {
    type: 'Database & APIs',
    icon: <Database className="w-6 h-6" />,
    color: 'from-pink-500 to-rose-400',
    description: 'Data management and integration solutions',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Redis', level: 75 },
      { name: 'Prisma ORM', level: 78 },
      { name: 'API Design', level: 88 },
      { name: 'Database Optimization', level: 72 },
      { name: 'Data Modeling', level: 80 }
    ]
  },
  {
    type: 'DevOps & Cloud',
    icon: <Cloud className="w-6 h-6" />,
    color: 'from-red-500 to-orange-400',
    description: 'Infrastructure and deployment automation',
    skills: [
      { name: 'Docker', level: 82 },
      { name: 'AWS', level: 75 },
      { name: 'Vercel', level: 90 },
      { name: 'Git & GitHub', level: 95 },
      { name: 'Linux', level: 85 },
      { name: 'Nginx', level: 70 },
      { name: 'CI/CD', level: 78 }
    ]
  },
  {
    type: 'Robotics & Hardware',
    icon: <Cpu className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-400',
    description: 'Physical computing and embedded systems',
    skills: [
      { name: 'Arduino', level: 90 },
      { name: 'Raspberry Pi', level: 85 },
      { name: 'C/C++', level: 82 },
      { name: 'Robot Operating System', level: 75 },
      { name: 'Circuit Design', level: 78 },
      { name: 'Sensor Integration', level: 88 },
      { name: 'IoT Development', level: 80 },
      { name: 'PCB Design', level: 70 }
    ]
  }
];

export default function ArsenalPage() {
  const { isDarkMode } = useTheme();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [chartView, setChartView] = useState<'radar' | 'bar'>('radar');

  const handleDotClick = (data: any) => {
    if (data && data.payload) {
      setSelectedSkill(data.payload.skill);
      setSelectedValue(data.payload.value);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              My Arsenal
            </span>
          </h1>
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            A comprehensive overview of my technical capabilities and expertise across multiple domains
          </p>
        </motion.div>

        {/* Radial Chart Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`p-8 rounded-2xl border mb-16 ${
            isDarkMode 
              ? 'glass-panel border-white/10' 
              : 'bg-white/80 backdrop-blur-sm border-gray-200 shadow-xl'
          }`}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <h2 className="text-3xl font-bold flex items-center">
                <Zap className="w-8 h-8 text-yellow-400 mr-3" />
                Skill Proficiency Overview
              </h2>
            </div>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Visual representation of expertise across different domains</p>
            
            {/* Chart Toggle Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setChartView('radar')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  chartView === 'radar' 
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg' 
                    : isDarkMode 
                      ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Activity className="w-4 h-4" />
                Radar Chart
              </button>
              <button
                onClick={() => setChartView('bar')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  chartView === 'bar' 
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg' 
                    : isDarkMode 
                      ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Bar Chart
              </button>
            </div>
          </div>
          
          <div className="h-[500px] w-full">
            {chartView === 'radar' ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart 
                  cx="50%" 
                  cy="50%" 
                  outerRadius="85%" 
                  data={arsenalData}
                onClick={handleDotClick}
              >
                <defs>
                  <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity={0.6}/>
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <PolarGrid 
                  stroke={isDarkMode ? "#ffffff" : "#374151"} 
                  strokeWidth={1}
                  radialLines={true}
                />
                <PolarAngleAxis 
                  dataKey="skill" 
                  tick={{ fill: isDarkMode ? '#ffffff' : '#1f2937', fontSize: 13, fontWeight: 500 }}
                />
                <PolarRadiusAxis
                  angle={0}
                  domain={[0, 100]}
                  tick={false}
                  tickCount={5}
                  axisLine={false}
                />
                <Radar
                  dataKey="value"
                  stroke="url(#radarGradient)"
                  fill="url(#radarGradient)"
                  fillOpacity={0.25}
                  strokeWidth={3}
                  dot={{ 
                    fill: '#ffffff', 
                    stroke: '#8b5cf6', 
                    strokeWidth: 3, 
                    r: 6,
                    className: 'drop-shadow-lg',
                    cursor: 'pointer'
                  }}
                  activeDot={false}
                />
              </RadarChart>
            </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={arsenalData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.6}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#d1d5db"} />
                  <XAxis 
                    dataKey="skill" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    tick={{ fill: isDarkMode ? '#ffffff' : '#1f2937', fontSize: 12 }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tick={{ fill: isDarkMode ? '#ffffff' : '#1f2937', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff', 
                      border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '8px',
                      color: isDarkMode ? '#ffffff' : '#1f2937'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="url(#barGradient)"
                    radius={[8, 8, 0, 0]}
                    onClick={handleDotClick}
                    cursor="pointer"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          
          {/* Selected skill display only */}
          {selectedSkill && selectedValue && (
            <div className="mt-6 flex justify-center">
              <div className={`font-medium text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {selectedSkill}: {selectedValue}%
              </div>
            </div>
          )}
        </motion.div>

        {/* Detailed Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => {
            const SkillCard = () => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true, margin: "-100px" });

              return (
                <motion.div
                  ref={ref}
                  key={category.type}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
                  className={`p-6 rounded-2xl border transition-all duration-300 ${
                    isDarkMode 
                      ? 'glass-panel border-white/10 hover:border-white/20' 
                      : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:border-gray-300 shadow-lg'
                  } hover:scale-105`}
                >
                  {/* Category Header */}
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{category.type}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{category.description}</p>
                    </div>
                  </div>
                  
                  {/* Skills List */}
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                        className="skill-item group relative"
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10 transition-opacity">
                          <div className={`text-xs rounded-lg py-2 px-3 shadow-lg border ${
                            isDarkMode 
                              ? 'bg-gray-800 text-white border-gray-700' 
                              : 'bg-white text-gray-900 border-gray-300'
                          }`}>
                            <div className="font-semibold mb-1">{skill.name}</div>
                            <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Proficiency: {skill.level}%</div>
                            <div className={`text-[10px] mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {skill.level >= 90 ? '? Expert Level' : 
                               skill.level >= 75 ? '?? Advanced' : 
                               skill.level >= 50 ? '?? Intermediate' : '?? Learning'}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-2">
                          <span className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{skill.name}</span>
                          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className={`w-full rounded-full h-1.5 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                            className={`h-1.5 rounded-full bg-gradient-to-r ${category.color}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Category Stats */}
                  <div className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                    <div className="flex justify-between text-sm">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Average Proficiency</span>
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            };
            
            return <SkillCard key={category.type} />;
          })}
        </div>
        {/* Skills Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass-panel p-8 rounded-2xl border border-white/10 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">0</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">5</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">∞</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Learning Mode</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Soft Skills Section */}
      <div className="mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-5xl md:text-6xl font-black mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Soft Skills
            </span>
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto`}>
            Beyond technical expertise, I bring strong interpersonal and leadership skills honed through international representation, cross-cultural collaboration, and event management.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Leadership & Diplomacy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-xl ${isDarkMode ? 'bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/30' : 'bg-gradient-to-br from-purple-100 to-indigo-100 border border-purple-300/50'} backdrop-blur-sm`}
          >
            <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Leadership & Diplomacy</h3>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>� Student Ambassador representing Queen's University Belfast</li>
              <li>� International Student Representative serving diverse communities</li>
              <li>� Led 15+ member teams in high-pressure event coordination</li>
              <li>� Skilled in conflict resolution and consensus building</li>
            </ul>
          </motion.div>

          {/* Communication & Public Speaking */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`p-6 rounded-xl ${isDarkMode ? 'bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/30' : 'bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-300/50'} backdrop-blur-sm`}
          >
            <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Communication & Public Speaking</h3>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>� Delivered presentations at university open days and student events</li>
              <li>� Experienced in facilitating cross-cultural dialogue</li>
              <li>� Mentored hundreds of students through complex transitions</li>
              <li>� Clear and effective communicator across diverse audiences</li>
            </ul>
          </motion.div>

          {/* Multilingual & Cultural Intelligence */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-6 rounded-xl ${isDarkMode ? 'bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-500/30' : 'bg-gradient-to-br from-green-100 to-emerald-100 border border-green-300/50'} backdrop-blur-sm`}
          >
            <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Multilingual & Cultural Intelligence</h3>
            <div className={`space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <div>
                <p className="font-semibold mb-2">Languages:</p>
                <ul className="space-y-1 ml-4">
                  <li>� Tamil (Native)</li>
                  <li>� English (IELTS 8.0)</li>
                  <li>� Hindi (Fluent)</li>
                  <li>� Japanese (Basic)</li>
                </ul>
              </div>
              <p>� International Student Representative serving diverse communities</p>
            </div>
          </motion.div>

          {/* Teamwork & Collaboration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`p-6 rounded-xl ${isDarkMode ? 'bg-gradient-to-br from-orange-900/40 to-red-900/40 border border-orange-500/30' : 'bg-gradient-to-br from-orange-100 to-red-100 border border-orange-300/50'} backdrop-blur-sm`}
          >
            <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Teamwork & Collaboration</h3>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>� Collaborated with 15+ member councils to execute major events</li>
              <li>� Coordinated logistics for 20+ annual school programs (1,000+ attendees)</li>
              <li>� Built consensus across diverse stakeholder groups</li>
              <li>� Fostered inclusive environments for international students</li>
            </ul>
          </motion.div>

          {/* Problem Solving & Critical Thinking */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`p-6 rounded-xl ${isDarkMode ? 'bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border border-yellow-500/30' : 'bg-gradient-to-br from-yellow-100 to-amber-100 border border-yellow-300/50'} backdrop-blur-sm`}
          >
            <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Problem Solving & Critical Thinking</h3>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>� Developed innovative solutions for student integration challenges</li>
              <li>� Managed event logistics with tight deadlines and constraints</li>
              <li>� Adapted quickly to multicultural academic environments</li>
              <li>� Applied systematic thinking from physics to solve complex problems</li>
            </ul>
          </motion.div>

          {/* Adaptability & Growth Mindset */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`p-6 rounded-xl ${isDarkMode ? 'bg-gradient-to-br from-pink-900/40 to-rose-900/40 border border-pink-500/30' : 'bg-gradient-to-br from-pink-100 to-rose-100 border border-pink-300/50'} backdrop-blur-sm`}
          >
            <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Adaptability & Growth Mindset</h3>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>� Successfully transitioned across countries and educational systems</li>
              <li>� Continuously learning new technologies and methodologies</li>
              <li>� Studying physics from mechanics to quantum mechanics</li>
              <li>� Embraced challenges as opportunities for growth</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
