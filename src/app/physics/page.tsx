"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Atom, BookOpen, Brain, Rocket, Sparkles, Zap, Target, Telescope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import heavy component with no SSR
const ObservableUniverse = dynamic(() => import('../../components/ObservableUniverse'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <div className="text-white text-xl">Loading Universe...</div>
    </div>
  ),
});

// --- Quantum Physics Background Component ---
const QuantumPhysicsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let time = 0;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Quantum particles (representing electrons, photons, quarks)
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      charge: number; // positive or negative
      type: 'electron' | 'photon' | 'quark' | 'neutrino';
      phase: number;
    }> = [];
    
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 3 + 1,
        charge: Math.random() > 0.5 ? 1 : -1,
        type: ['electron', 'photon', 'quark', 'neutrino'][Math.floor(Math.random() * 4)] as any,
        phase: Math.random() * Math.PI * 2,
      });
    }
    
    // Wave functions (representing probability waves)
    const waves: Array<{
      y: number;
      amplitude: number;
      frequency: number;
      speed: number;
      phase: number;
    }> = [];
    
    for (let i = 0; i < 8; i++) {
      waves.push({
        y: (canvas.height / 8) * i,
        amplitude: Math.random() * 30 + 20,
        frequency: Math.random() * 0.02 + 0.01,
        speed: (Math.random() - 0.5) * 0.5,
        phase: Math.random() * Math.PI * 2,
      });
    }
    
    // Quantum field grid
    const gridSpacing = 60;
    const gridPoints: Array<{
      x: number;
      y: number;
      energy: number;
    }> = [];
    
    for (let x = 0; x < canvas.width; x += gridSpacing) {
      for (let y = 0; y < canvas.height; y += gridSpacing) {
        gridPoints.push({
          x,
          y,
          energy: Math.random(),
        });
      }
    }
    
    // Particle accelerator beams (LHC-style)
    const beams: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      progress: number;
      color: string;
    }> = [];
    
    for (let i = 0; i < 5; i++) {
      beams.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        progress: Math.random(),
        color: ['rgba(0, 200, 255, 0.8)', 'rgba(255, 100, 255, 0.8)', 'rgba(100, 255, 100, 0.8)'][i % 3],
      });
    }
    
    // High-energy collision events
    const collisionEvents: Array<{
      x: number;
      y: number;
      age: number;
      maxAge: number;
      particles: Array<{
        angle: number;
        speed: number;
        charge: number;
      }>;
    }> = [];
    
    // Particle decay paths (showing particle transformations)
    const decayPaths: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      particleType: string;
      color: string;
    }> = [];
    
    // Feynman diagram-like vertices
    const feynmanVertices: Array<{
      x: number;
      y: number;
      lines: Array<{ angle: number; length: number; wavy: boolean }>;
      alpha: number;
    }> = [];
    
    for (let i = 0; i < 8; i++) {
      const numLines = Math.floor(Math.random() * 2) + 3; // 3-4 lines
      const lines = [];
      for (let j = 0; j < numLines; j++) {
        lines.push({
          angle: (Math.PI * 2 * j) / numLines + Math.random() * 0.5,
          length: Math.random() * 60 + 40,
          wavy: Math.random() > 0.5, // wavy lines for bosons
        });
      }
      feynmanVertices.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        lines,
        alpha: Math.random() * 0.5 + 0.3,
      });
    }
    
    const animate = () => {
      time += 0.02;
      
      // Deep space background with subtle gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#000510');
      gradient.addColorStop(0.5, '#000a1a');
      gradient.addColorStop(1, '#001025');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw quantum field grid (subtle energy field)
      ctx.strokeStyle = 'rgba(0, 150, 255, 0.05)';
      ctx.lineWidth = 1;
      gridPoints.forEach((point, i) => {
        const energyWave = Math.sin(time + point.x * 0.01 + point.y * 0.01) * 0.5 + 0.5;
        const opacity = energyWave * 0.1;
        
        // Vertical lines
        if (point.y === 0 || point.y % (gridSpacing * 2) === 0) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 150, 255, ${opacity})`;
          ctx.moveTo(point.x, 0);
          ctx.lineTo(point.x, canvas.height);
          ctx.stroke();
        }
        
        // Horizontal lines
        if (point.x === 0 || point.x % (gridSpacing * 2) === 0) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 150, 255, ${opacity})`;
          ctx.moveTo(0, point.y);
          ctx.lineTo(canvas.width, point.y);
          ctx.stroke();
        }
      });
      
      // Draw probability wave functions
      waves.forEach((wave) => {
        wave.phase += wave.speed;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(138, 43, 226, 0.3)';
        ctx.lineWidth = 2;
        
        for (let x = 0; x < canvas.width; x += 5) {
          const y = wave.y + Math.sin(x * wave.frequency + wave.phase + time) * wave.amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        
        // Add wave glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(138, 43, 226, 0.5)';
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
      
      // Draw quantum particles with different characteristics
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.phase += 0.1;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Quantum uncertainty - particles flicker and move unpredictably
        const uncertainty = Math.sin(particle.phase) * 2;
        const renderX = particle.x + uncertainty;
        const renderY = particle.y + Math.cos(particle.phase) * 2;
        
        // Draw particle based on type
        let color, glowColor;
        switch (particle.type) {
          case 'electron':
            color = particle.charge > 0 ? 'rgba(255, 100, 100, 0.8)' : 'rgba(100, 200, 255, 0.8)';
            glowColor = particle.charge > 0 ? 'rgba(255, 100, 100, 0.6)' : 'rgba(100, 200, 255, 0.6)';
            break;
          case 'photon':
            color = 'rgba(255, 255, 100, 0.9)';
            glowColor = 'rgba(255, 255, 100, 0.7)';
            break;
          case 'quark':
            color = 'rgba(100, 255, 150, 0.8)';
            glowColor = 'rgba(100, 255, 150, 0.6)';
            break;
          case 'neutrino':
            color = 'rgba(200, 150, 255, 0.6)';
            glowColor = 'rgba(200, 150, 255, 0.4)';
            break;
        }
        
        // Draw glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = glowColor;
        ctx.beginPath();
        ctx.arc(renderX, renderY, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Draw particle trails (wave-particle duality)
        ctx.globalAlpha = 0.2;
        for (let j = 1; j <= 3; j++) {
          const trailX = renderX - particle.vx * j * 3;
          const trailY = renderY - particle.vy * j * 3;
          ctx.beginPath();
          ctx.arc(trailX, trailY, particle.size * (1 - j * 0.2), 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        
        // Draw connections between nearby particles (quantum entanglement)
        particles.forEach((other, j) => {
          if (j <= i) return;
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });
      
      // Draw Feynman diagram vertices (particle interactions)
      feynmanVertices.forEach((vertex) => {
        ctx.globalAlpha = vertex.alpha;
        
        vertex.lines.forEach((line) => {
          ctx.beginPath();
          const endX = vertex.x + Math.cos(line.angle) * line.length;
          const endY = vertex.y + Math.sin(line.angle) * line.length;
          
          if (line.wavy) {
            // Wavy line for bosons (force carriers)
            ctx.strokeStyle = 'rgba(255, 200, 0, 0.6)';
            ctx.lineWidth = 2;
            let currentX = vertex.x;
            let currentY = vertex.y;
            const segments = 10;
            for (let i = 0; i <= segments; i++) {
              const t = i / segments;
              const x = vertex.x + (endX - vertex.x) * t;
              const y = vertex.y + (endY - vertex.y) * t;
              const perpX = -(endY - vertex.y);
              const perpY = (endX - vertex.x);
              const length = Math.sqrt(perpX * perpX + perpY * perpY);
              const wave = Math.sin(t * Math.PI * 4 + time * 2) * 5;
              const offsetX = (perpX / length) * wave;
              const offsetY = (perpY / length) * wave;
              
              if (i === 0) {
                ctx.moveTo(x + offsetX, y + offsetY);
              } else {
                ctx.lineTo(x + offsetX, y + offsetY);
              }
            }
            ctx.stroke();
          } else {
            // Straight line for fermions
            ctx.strokeStyle = 'rgba(100, 200, 255, 0.5)';
            ctx.lineWidth = 2;
            ctx.moveTo(vertex.x, vertex.y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            
            // Arrow head
            const arrowSize = 8;
            const angle = Math.atan2(endY - vertex.y, endX - vertex.x);
            ctx.beginPath();
            ctx.moveTo(endX, endY);
            ctx.lineTo(
              endX - arrowSize * Math.cos(angle - Math.PI / 6),
              endY - arrowSize * Math.sin(angle - Math.PI / 6)
            );
            ctx.moveTo(endX, endY);
            ctx.lineTo(
              endX - arrowSize * Math.cos(angle + Math.PI / 6),
              endY - arrowSize * Math.sin(angle + Math.PI / 6)
            );
            ctx.stroke();
          }
        });
        
        // Vertex point
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(vertex.x, vertex.y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalAlpha = 1;
      });
      
      // Draw particle accelerator beams
      beams.forEach((beam) => {
        beam.progress += 0.02;
        if (beam.progress > 1) beam.progress = 0;
        
        // Draw beam path
        ctx.strokeStyle = beam.color.replace('0.8', '0.3');
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(beam.x1, beam.y1);
        ctx.lineTo(beam.x2, beam.y2);
        ctx.stroke();
        
        // Draw moving particle along beam
        const beamX = beam.x1 + (beam.x2 - beam.x1) * beam.progress;
        const beamY = beam.y1 + (beam.y2 - beam.y1) * beam.progress;
        
        ctx.shadowBlur = 20;
        ctx.shadowColor = beam.color;
        ctx.fillStyle = beam.color;
        ctx.beginPath();
        ctx.arc(beamX, beamY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Check for collision at end point
        if (beam.progress > 0.95 && Math.random() > 0.9) {
          // Create collision event
          collisionEvents.push({
            x: beam.x2,
            y: beam.y2,
            age: 0,
            maxAge: 60,
            particles: Array.from({ length: 8 }, () => ({
              angle: Math.random() * Math.PI * 2,
              speed: Math.random() * 3 + 2,
              charge: Math.random() > 0.5 ? 1 : -1,
            })),
          });
        }
      });
      
      // Update and draw collision events
      for (let i = collisionEvents.length - 1; i >= 0; i--) {
        const event = collisionEvents[i];
        event.age++;
        
        if (event.age > event.maxAge) {
          collisionEvents.splice(i, 1);
          continue;
        }
        
        const progress = event.age / event.maxAge;
        const alpha = 1 - progress;
        
        // Draw particle spray from collision
        event.particles.forEach((p) => {
          const dist = event.age * p.speed;
          const x = event.x + Math.cos(p.angle) * dist;
          const y = event.y + Math.sin(p.angle) * dist;
          
          const particleColor = p.charge > 0 
            ? `rgba(255, 100, 100, ${alpha * 0.8})` 
            : `rgba(100, 200, 255, ${alpha * 0.8})`;
          
          ctx.strokeStyle = particleColor;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(event.x, event.y);
          ctx.lineTo(x, y);
          ctx.stroke();
          
          ctx.fillStyle = particleColor;
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        });
        
        // Central collision flash
        if (event.age < 10) {
          const flashSize = (10 - event.age) * 5;
          const flashGradient = ctx.createRadialGradient(event.x, event.y, 0, event.x, event.y, flashSize);
          flashGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
          flashGradient.addColorStop(0.5, 'rgba(255, 200, 100, 0.5)');
          flashGradient.addColorStop(1, 'rgba(255, 100, 100, 0)');
          
          ctx.fillStyle = flashGradient;
          ctx.beginPath();
          ctx.arc(event.x, event.y, flashSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Update and draw decay paths
      for (let i = decayPaths.length - 1; i >= 0; i--) {
        const decay = decayPaths[i];
        decay.life++;
        decay.x += decay.vx;
        decay.y += decay.vy;
        
        if (decay.life > decay.maxLife) {
          decayPaths.splice(i, 1);
          continue;
        }
        
        const alpha = 1 - (decay.life / decay.maxLife);
        ctx.strokeStyle = decay.color.replace('0.8', `${alpha * 0.8}`);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(decay.x, decay.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = decay.color.replace('0.8', `${alpha * 0.6}`);
        ctx.fill();
      }
      
      // Randomly create particle decays
      if (Math.random() > 0.98) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const angle = Math.random() * Math.PI * 2;
        decayPaths.push({
          x,
          y,
          vx: Math.cos(angle) * 2,
          vy: Math.sin(angle) * 2,
          life: 0,
          maxLife: 40,
          particleType: 'muon',
          color: 'rgba(255, 150, 255, 0.8)',
        });
      }
      
      // Draw energy bursts (particle collisions)
      if (Math.random() > 0.97) {
        const burstX = Math.random() * canvas.width;
        const burstY = Math.random() * canvas.height;
        const burstGradient = ctx.createRadialGradient(burstX, burstY, 0, burstX, burstY, 50);
        burstGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        burstGradient.addColorStop(0.5, 'rgba(100, 200, 255, 0.4)');
        burstGradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
        
        ctx.fillStyle = burstGradient;
        ctx.beginPath();
        ctx.arc(burstX, burstY, 50, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
    />
  );
};

const PhysicsPage = () => {
  const [showObservableUniverse, setShowObservableUniverse] = useState(false);

  const learningPath = [
    {
      icon: BookOpen,
      title: "Classical Mechanics",
      status: "Completed Fundamentals",
      description: "Newton's laws, kinematics, dynamics, energy, momentum, and rotational motion",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Electromagnetism",
      status: "In Progress",
      description: "Electric and magnetic fields, Maxwell's equations, electromagnetic waves",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Atom,
      title: "Quantum Mechanics",
      status: "Currently Learning",
      description: "Wave-particle duality, Schrödinger equation, quantum states, and uncertainty principle",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Rocket,
      title: "Particle Physics",
      status: "Future Goal",
      description: "Standard Model, fundamental particles, quantum field theory, and high-energy physics",
      color: "from-green-500 to-emerald-500",
    },
  ];
  
  return (
    <>
      <div className={`overflow-hidden transition-colors duration-500`}>
        <QuantumPhysicsBackground />
        
        <main className="relative z-10 container mx-auto px-6 py-12 sm:py-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-white bg-clip-text text-transparent">
              Beyond the Code
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-gray-200">
            My intellectual curiosity extends far beyond software engineering. I'm actively learning physics, 
            progressing from classical mechanics through quantum mechanics, with the ultimate goal of achieving 
            deep knowledge in particle physics.
          </p>
        </motion.div>

        {/* Why Physics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12 p-8 rounded-3xl bg-white/5 border-white/10 border backdrop-blur-xl"
        >
          <div className="flex items-center mb-6">
            <Brain className="w-12 h-12 mr-4 text-orange-400" />
            <h2 className="text-3xl font-bold text-white">
              Why Physics?
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-gray-300">
            Understanding the fundamental laws that govern our universe provides a unique analytical perspective 
            that strengthens problem-solving abilities in any field. Physics teaches rigorous mathematical thinking, 
            systematic analysis, and the ability to break down complex systems into fundamental components—skills 
            that directly translate to software engineering and beyond. My journey through physics isn't just about 
            learning formulas; it's about developing a deeper understanding of how the universe works at every scale, 
            from the quantum realm to the cosmic.
          </p>
        </motion.div>

        {/* Observable Universe Interactive Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <button
            onClick={() => setShowObservableUniverse(true)}
            className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl font-bold text-xl text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center space-x-3">
              <Telescope className="w-8 h-8" />
              <span>Explore the Observable Universe</span>
              <Sparkles className="w-6 h-6" />
            </div>
          </button>
          <p className="text-gray-400 mt-4 text-sm">
            Journey through 61 orders of magnitude — from quantum foam to the cosmic web
          </p>
        </motion.div>

        {/* Learning Path */}
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl font-bold text-center mb-12 text-white"
          >
            Learning Roadmap
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {learningPath.map((stage, index) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="p-8 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 border backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20"
              >
                <div className={`inline-flex p-4 bg-gradient-to-r ${stage.color} rounded-xl mb-4`}>
                  <stage.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {stage.title}
                </h3>
                <p className="text-sm font-semibold mb-3 text-orange-300">
                  {stage.status}
                </p>
                <p className="text-gray-300">
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interdisciplinary Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mb-12"
        >
          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-white/5 border-white/10 border backdrop-blur-xl">
            <Sparkles className="mx-auto h-12 w-12 mb-4 text-yellow-400" />
            <h2 className="text-3xl font-bold mb-4 text-white">
              Cross-Pollination: Physics × Code
            </h2>
            <p className="text-lg leading-relaxed text-gray-300">
              My ultimate goal is to merge these disciplines—leveraging computational power to solve physics problems 
              and applying physics principles to create better algorithms. The intersection of physics and software 
              engineering opens doors to quantum computing, particle simulations, AI-driven research, and novel 
              approaches to complex system modeling.
            </p>
          </div>
        </motion.div>

        {/* Research Interests */}
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-4xl font-bold text-center mb-12 text-white"
          >
            Research Interests
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-xl hover:border-purple-500/40 transition-all"
            >
              <div className="flex items-start mb-4">
                <Atom className="w-8 h-8 mr-3 text-purple-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Atomic Transmutation</h3>
                  <p className="text-gray-300 text-sm">
                    Exploring methods to convert one element into another by taking advantage of beta decay-like 
                    processes. Investigating controlled nuclear reactions and isotope transformation at the atomic level.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-xl hover:border-blue-500/40 transition-all"
            >
              <div className="flex items-start mb-4">
                <Target className="w-8 h-8 mr-3 text-cyan-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Three-Body Problem</h3>
                  <p className="text-gray-300 text-sm">
                    Leveraging AI and complex algorithms to find analytical or numerical solutions to the classical 
                    three-body problem. Applying machine learning to predict chaotic orbital dynamics and stability.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-xl hover:border-green-500/40 transition-all"
            >
              <div className="flex items-start mb-4">
                <Sparkles className="w-8 h-8 mr-3 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Quantum Computing Applications</h3>
                  <p className="text-gray-300 text-sm">
                    Investigating quantum algorithms for solving classically intractable physics problems. 
                    Exploring quantum simulation of particle systems and quantum machine learning for physics research.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 backdrop-blur-xl hover:border-orange-500/40 transition-all"
            >
              <div className="flex items-start mb-4">
                <Rocket className="w-8 h-8 mr-3 text-orange-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Computational Particle Physics</h3>
                  <p className="text-gray-300 text-sm">
                    Developing simulations of particle collisions and interactions. Using computational methods 
                    to analyze high-energy physics data and model fundamental particle behavior.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* The Great Questions */}
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-4xl font-bold text-center mb-12 text-white"
          >
            The Great Questions
          </motion.h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "What is dark matter and dark energy?",
                context: "95% of the universe is invisible to us. What are these mysterious substances that dominate cosmic evolution?",
                color: "from-purple-500 to-violet-600"
              },
              {
                question: "Can we unify quantum mechanics and general relativity?",
                context: "The Theory of Everything remains elusive. How do we reconcile the quantum world with spacetime curvature?",
                color: "from-blue-500 to-cyan-600"
              },
              {
                question: "Why does anything exist at all?",
                context: "Why is there something rather than nothing? What caused the universe to begin, and what is its ultimate fate?",
                color: "from-orange-500 to-red-600"
              },
              {
                question: "What happens inside a black hole?",
                context: "Beyond the event horizon lies a mystery. Do singularities truly exist, or does quantum gravity change the picture?",
                color: "from-pink-500 to-purple-600"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border-white/10 border backdrop-blur-xl hover:bg-white/10 transition-all group"
              >
                <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${item.color} mb-3`}>
                  <h3 className="text-lg font-bold text-white">{item.question}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {item.context}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Learning Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.9 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Learning Resources
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/5 border-white/10 border backdrop-blur-xl">
              <BookOpen className="w-10 h-10 mb-4 text-blue-400" />
              <h3 className="text-xl font-bold text-white mb-3">Essential Textbooks</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• "Classical Mechanics" - Goldstein</li>
                <li>• "Introduction to Electrodynamics" - Griffiths</li>
                <li>• "Quantum Mechanics" - Griffiths</li>
                <li>• "Introduction to Elementary Particles" - Griffiths</li>
                <li>• "The Feynman Lectures on Physics"</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border-white/10 border backdrop-blur-xl">
              <Brain className="w-10 h-10 mb-4 text-purple-400" />
              <h3 className="text-xl font-bold text-white mb-3">Online Courses</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• MIT OpenCourseWare - Physics</li>
                <li>• Stanford Online - Quantum Mechanics</li>
                <li>• Coursera - Particle Physics</li>
                <li>• YouTube - 3Blue1Brown, PBS SpaceTime</li>
                <li>• arXiv.org - Research Papers</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border-white/10 border backdrop-blur-xl">
              <Sparkles className="w-10 h-10 mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold text-white mb-3">Tools & Simulations</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Mathematica / MATLAB</li>
                <li>• Python (NumPy, SciPy, SymPy)</li>
                <li>• PhET Interactive Simulations</li>
                <li>• Particle Data Group Resources</li>
                <li>• QuTiP (Quantum Toolbox in Python)</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
    {showObservableUniverse && (
      <ObservableUniverse onClose={() => setShowObservableUniverse(false)} />
    )}
    </>
  );
};

export default PhysicsPage;
