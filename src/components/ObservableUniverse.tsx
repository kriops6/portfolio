"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Info, X, ArrowLeft, ArrowRight } from 'lucide-react';

// Unique visual components for each scale
const ObservableUniverseVisual = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 600;
    canvas.height = 600;
    
    const galaxyClusters = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 30 + 20,
      brightness: Math.random() * 0.5 + 0.5
    }));
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      galaxyClusters.forEach(cluster => {
        const gradient = ctx.createRadialGradient(cluster.x, cluster.y, 0, cluster.x, cluster.y, cluster.size);
        gradient.addColorStop(0, `rgba(200, 150, 255, ${cluster.brightness})`);
        gradient.addColorStop(0.5, `rgba(100, 50, 200, ${cluster.brightness * 0.5})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(cluster.x - cluster.size, cluster.y - cluster.size, cluster.size * 2, cluster.size * 2);
      });
      
      requestAnimationFrame(animate);
    };
    animate();
  }, []);
  
  return <canvas ref={canvasRef} className="mx-auto rounded-lg" />;
};

const VirgoVisual = () => {
  // Different from Laniakea - more concentrated cluster structure
  return (
    <svg className="w-full h-96 mx-auto" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="virgo-glow">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* Dense central cluster */}
      <circle cx="200" cy="200" r="60" fill="url(#virgo-glow)" opacity="0.3">
        <animate attributeName="r" values="60;70;60" dur="4s" repeatCount="indefinite" />
      </circle>
      {/* Surrounding galaxy groups */}
      {[
        {x:120,y:120,r:8},{x:280,y:120,r:10},{x:320,y:200,r:7},
        {x:280,y:280,r:9},{x:120,y:280,r:8},{x:80,y:200,r:7},
        {x:150,y:160,r:6},{x:250,y:160,r:7},{x:250,y:240,r:6},{x:150,y:240,r:7}
      ].map((galaxy, i) => (
        <g key={i}>
          <circle
            cx={galaxy.x}
            cy={galaxy.y}
            r={galaxy.r}
            fill="url(#virgo-glow)"
            opacity="0.7"
          >
            <animate attributeName="opacity" values="0.7;1;0.7" dur={`${3+i*0.2}s`} repeatCount="indefinite" />
          </circle>
          {/* Connection to center */}
          <line
            x1={galaxy.x}
            y1={galaxy.y}
            x2="200"
            y2="200"
            stroke="#60a5fa"
            strokeWidth="1"
            opacity="0.2"
          />
        </g>
      ))}
    </svg>
  );
};

const SuperclusterVisual = () => {
  // Web-like structure of galaxy filaments for Laniakea
  return (
    <svg className="w-full h-96 mx-auto" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="node-glow">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* Filaments */}
      {[[50,50,150,150],[150,150,300,250],[300,250,350,350],[50,300,150,250],[150,250,250,200],[250,200,350,100]].map((line, i) => (
        <line
          key={i}
          x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]}
          stroke="url(#node-glow)"
          strokeWidth="3"
          opacity="0.4"
        />
      ))}
      {/* Galaxy nodes */}
      {[{x:50,y:50},{x:150,y:150},{x:300,y:250},{x:350,y:350},{x:50,y:300},{x:250,y:200},{x:350,y:100}].map((pos, i) => (
        <circle
          key={i}
          cx={pos.x}
          cy={pos.y}
          r={10 + Math.random() * 5}
          fill="url(#node-glow)"
          opacity="0.8"
        >
          <animate attributeName="r" values="10;15;10" dur="3s" repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
};

const LocalGroupVisual = () => {
  // Andromeda, Milky Way, and dwarf galaxies
  return (
    <div className="relative w-96 h-96 mx-auto">
      {/* Andromeda - larger spiral */}
      <div className="absolute top-20 right-20 w-32 h-32">
        <div className="relative w-full h-full" style={{ animation: 'spin 15s linear infinite' }}>
          {[0, 72, 144, 216, 288].map((angle) => (
            <div key={angle} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
              <div className="w-full h-2 bg-gradient-to-r from-transparent via-blue-300 to-transparent rounded-full blur-sm" />
            </div>
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-blue-200 blur-md" />
        </div>
      </div>
      
      {/* Milky Way - our galaxy */}
      <div className="absolute bottom-20 left-20 w-28 h-28">
        <div className="relative w-full h-full" style={{ animation: 'spin 20s linear infinite reverse' }}>
          {[0, 90, 180, 270].map((angle) => (
            <div key={angle} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
              <div className="w-full h-2 bg-gradient-to-r from-transparent via-yellow-200 to-transparent rounded-full blur-sm" />
            </div>
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-yellow-200 blur-md" />
        </div>
      </div>
      
      {/* Dwarf galaxies */}
      {[{x:60,y:40},{x:200,y:80},{x:300,y:200},{x:100,y:250}].map((pos, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-purple-300 blur-sm"
          style={{ left: pos.x, top: pos.y, animation: `pulse ${2+i*0.5}s ease-in-out infinite` }}
        />
      ))}
    </div>
  );
};

const GalaxyVisual = () => (
  <div className="relative w-80 h-80 mx-auto flex items-center justify-center">
    <div className="relative w-full h-full" style={{ animation: 'spin 30s linear infinite' }}>
      {/* Spiral arms with proper curve */}
      {[0, 90, 180, 270].map((rotation, i) => (
        <div key={i} className="absolute inset-0" style={{ transform: `rotate(${rotation}deg)` }}>
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <path
              d="M 100 100 Q 120 80, 140 70 T 180 60"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="4"
              fill="none"
              filter="blur(2px)"
            />
          </svg>
        </div>
      ))}
      {/* Central bulge */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-yellow-100 blur-lg shadow-[0_0_60px_20px_rgba(255,255,200,0.8)]" />
      {/* Star clusters */}
      {Array.from({length: 50}).map((_, i) => {
        const angle = (i / 50) * Math.PI * 2;
        const radius = 60 + Math.random() * 80;
        return (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${50 + Math.cos(angle) * radius}%`,
              top: `${50 + Math.sin(angle) * radius}%`,
              boxShadow: '0 0 3px 1px rgba(255,255,255,0.8)'
            }}
          />
        );
      })}
    </div>
  </div>
);

const SolarSystemVisual = () => {
  const planets = [
    { name: 'Mercury', radius: 40, size: 4, color: '#8b7355', speed: 8, startAngle: 0 },
    { name: 'Venus', radius: 60, size: 6, color: '#d4a574', speed: 12, startAngle: 45 },
    { name: 'Earth', radius: 85, size: 6, color: '#4169e1', speed: 16, startAngle: 90 },
    { name: 'Mars', radius: 110, size: 5, color: '#dc143c', speed: 20, startAngle: 135 },
    { name: 'Jupiter', radius: 150, size: 12, color: '#daa520', speed: 28, startAngle: 180 },
    { name: 'Saturn', radius: 190, size: 10, color: '#f4e7c3', speed: 36, startAngle: 225 },
    { name: 'Uranus', radius: 225, size: 8, color: '#4682b4', speed: 44, startAngle: 270 },
    { name: 'Neptune', radius: 255, size: 8, color: '#1e90ff', speed: 52, startAngle: 315 }
  ];
  
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      {/* Sun */}
      <div className="absolute w-16 h-16 rounded-full bg-yellow-400 shadow-[0_0_60px_20px_rgba(250,204,21,0.7)]" />
      
      {/* Orbital paths */}
      {planets.map((planet, i) => (
        <div key={`orbit-${i}`} className="absolute border border-white/10 rounded-full" style={{
          width: planet.radius * 2,
          height: planet.radius * 2
        }} />
      ))}
      
      {/* Planets - Each starts at different angle */}
      {planets.map((planet) => {
        const angleRad = (planet.startAngle * Math.PI) / 180;
        const x = Math.cos(angleRad) * planet.radius;
        const y = Math.sin(angleRad) * planet.radius;
        
        return (
          <div
            key={planet.name}
            className="absolute"
            style={{
              width: planet.size,
              height: planet.size,
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
              animation: `orbit-planet ${planet.speed}s linear infinite`,
              '--orbit-radius': `${planet.radius}px`,
              '--start-angle': `${planet.startAngle}deg`
            } as React.CSSProperties}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: planet.color,
                boxShadow: `0 0 10px 2px ${planet.color}60`
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const EarthVisual = () => (
  <div className="relative w-72 h-72 mx-auto">
    <div 
      className="w-full h-full rounded-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 30%, #10b981 50%, #059669 70%, #1e3a8a 100%)',
        boxShadow: '0 0 60px 20px rgba(59, 130, 246, 0.4), inset -20px -20px 40px rgba(0,0,0,0.4)',
        animation: 'spin 30s linear infinite'
      }}
    >
      {/* Continents */}
      <div className="absolute top-1/4 left-1/4 w-20 h-14 bg-green-700 rounded-full opacity-70" />
      <div className="absolute top-1/2 right-1/4 w-24 h-18 bg-green-600 rounded-full opacity-70" />
      <div className="absolute bottom-1/4 left-1/3 w-16 h-12 bg-green-700 rounded-full opacity-70" />
      {/* Clouds */}
      <div className="absolute top-1/3 right-1/3 w-16 h-8 bg-white/50 rounded-full blur-md" />
      <div className="absolute bottom-1/3 left-1/4 w-20 h-10 bg-white/40 rounded-full blur-md" />
      <div className="absolute top-2/3 right-1/2 w-12 h-6 bg-white/45 rounded-full blur-md" />
    </div>
  </div>
);

const AtomVisual = () => (
  <div className="relative w-72 h-72 mx-auto flex items-center justify-center">
    {/* Nucleus */}
    <div className="absolute w-10 h-10 rounded-full bg-red-500 shadow-[0_0_40px_15px_rgba(239,68,68,0.6)]" />
    {/* Electron orbits at different angles */}
    {[
      { size: 80, rotation: 0, speed: 2 },
      { size: 130, rotation: 60, speed: 3 },
      { size: 180, rotation: 120, speed: 4 }
    ].map((orbit, i) => (
      <div key={i}>
        <div 
          className="absolute border-2 border-cyan-400/30 rounded-full"
          style={{
            width: orbit.size,
            height: orbit.size,
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) rotateX(${orbit.rotation}deg)`,
          }}
        />
        {/* Electron */}
        <div
          style={{
            animation: `orbit ${orbit.speed}s linear infinite`,
            width: orbit.size,
            height: orbit.size,
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div 
            className="absolute w-4 h-4 rounded-full bg-cyan-400"
            style={{
              boxShadow: '0 0 15px 3px rgba(34, 211, 238, 0.9)',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          />
        </div>
      </div>
    ))}
  </div>
);

const NucleusVisual = () => {
  // Protons and neutrons packed together
  const nucleons = Array.from({ length: 16 }, (_, i) => ({
    x: (i % 4) * 20 + 10,
    y: Math.floor(i / 4) * 20 + 10,
    isProton: i % 2 === 0
  }));
  
  return (
    <div className="relative w-96 h-96 mx-auto flex items-center justify-center">
      <div className="relative w-40 h-40">
        {nucleons.map((nucleon, i) => (
          <div
            key={i}
            className={`absolute w-8 h-8 rounded-full ${nucleon.isProton ? 'bg-red-500' : 'bg-blue-500'}`}
            style={{
              left: nucleon.x,
              top: nucleon.y,
              boxShadow: `0 0 20px 5px ${nucleon.isProton ? 'rgba(239, 68, 68, 0.8)' : 'rgba(59, 130, 246, 0.8)'}`,
              animation: `pulse ${2 + (i % 3) * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
              {nucleon.isProton ? 'p' : 'n'}
            </div>
          </div>
        ))}
        {/* Gluon field */}
        <svg className="absolute inset-0 w-full h-full" style={{ animation: 'pulse 3s ease-in-out infinite' }}>
          {nucleons.slice(0, -1).map((n, i) => (
            <line
              key={i}
              x1={n.x + 16}
              y1={n.y + 16}
              x2={nucleons[i + 1].x + 16}
              y2={nucleons[i + 1].y + 16}
              stroke="#a855f7"
              strokeWidth="1"
              opacity="0.4"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

const QuarkVisual = () => (
  <div className="relative w-96 h-96 mx-auto flex items-center justify-center">
    {/* Three quarks in triangle - up, down, strange */}
    {[
      { angle: 0, color: '#ef4444', label: 'u', name: 'up' },
      { angle: 120, color: '#3b82f6', label: 'd', name: 'down' },
      { angle: 240, color: '#22c55e', label: 's', name: 'strange' }
    ].map((quark, i) => (
      <div
        key={i}
        className="absolute"
        style={{
          transform: `rotate(${quark.angle}deg) translateY(-60px)`,
        }}
      >
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
          style={{
            background: quark.color,
            boxShadow: `0 0 30px 8px ${quark.color}80`,
            animation: `pulse 2s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
            transform: `rotate(-${quark.angle}deg)`
          }}
        >
          {quark.label}
        </div>
      </div>
    ))}
    {/* Gluon field connections */}
    <svg className="absolute inset-0 w-full h-full" style={{ animation: 'spin 8s linear infinite' }}>
      <defs>
        <linearGradient id="gluon-gradient">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <path d="M 200 140 Q 160 200, 200 260" stroke="url(#gluon-gradient)" strokeWidth="3" fill="none" opacity="0.7" />
      <path d="M 200 260 Q 240 200, 200 140" stroke="url(#gluon-gradient)" strokeWidth="3" fill="none" opacity="0.7" />
      <path d="M 200 140 Q 200 200, 200 140" stroke="url(#gluon-gradient)" strokeWidth="3" fill="none" opacity="0.7" />
    </svg>
  </div>
);

// Theory visualization components
const QuantumFoamTheoryVisual = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 500;
    canvas.height = 500;
    
    const particles: Array<{x: number, y: number, vx: number, vy: number, life: number}> = [];
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create virtual particles constantly
      if (Math.random() > 0.6) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          life: 40
        });
      }
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        
        const alpha = p.life / 40;
        ctx.fillStyle = `rgba(147, 51, 234, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Quantum connections
        for (const other of particles) {
          if (other === p) continue;
          const dx = other.x - p.x;
          const dy = other.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx.strokeStyle = `rgba(236, 72, 153, ${(1 - dist / 60) * alpha * 0.5})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);
  
  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} className="mx-auto rounded-lg" />
      <div className="mt-6 max-w-2xl text-gray-300 space-y-4">
        <p>
          <strong className="text-purple-400">Core Concept:</strong> Spacetime itself is not smooth at the Planck scale (10⁻³⁵ m). 
          Instead, it's a churning, probabilistic "foam" where quantum fluctuations constantly create and destroy virtual 
          particle-antiparticle pairs.
        </p>
        <p>
          <strong className="text-purple-400">Key Predictions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Spacetime has a minimum length scale (Planck length)</li>
          <li>Virtual particles exist for ΔE·Δt ≈ ℏ (Heisenberg uncertainty)</li>
          <li>Black holes emit Hawking radiation due to this foam</li>
          <li>Vacuum energy contributes to dark energy</li>
        </ul>
        <p>
          <strong className="text-purple-400">Status:</strong> Widely accepted concept but lacks experimental verification. 
          Provides framework for understanding quantum effects in gravity.
        </p>
      </div>
    </div>
  );
};

const StringTheoryVisual = () => {
  return (
    <div className="flex flex-col items-center">
      <svg className="w-full max-w-2xl h-96" viewBox="0 0 600 400">
        <defs>
          <linearGradient id="string-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        {/* Vibrating strings */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <path
              d={`M ${50 + i * 120} 200 Q ${100 + i * 120} ${150 + Math.sin(i) * 30}, ${150 + i * 120} 200 T ${250 + i * 120} 200`}
              stroke="url(#string-grad)"
              strokeWidth="3"
              fill="none"
            >
              <animate
                attributeName="d"
                values={`M ${50 + i * 120} 200 Q ${100 + i * 120} ${150 + Math.sin(i) * 30}, ${150 + i * 120} 200 T ${250 + i * 120} 200;
                        M ${50 + i * 120} 200 Q ${100 + i * 120} ${250 - Math.sin(i) * 30}, ${150 + i * 120} 200 T ${250 + i * 120} 200;
                        M ${50 + i * 120} 200 Q ${100 + i * 120} ${150 + Math.sin(i) * 30}, ${150 + i * 120} 200 T ${250 + i * 120} 200`}
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </path>
          </g>
        ))}
        <text x="300" y="350" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">
          Vibrating 1D Strings in 10-11 Dimensions
        </text>
      </svg>
      <div className="mt-6 max-w-2xl text-gray-300 space-y-4">
        <p>
          <strong className="text-cyan-400">Core Concept:</strong> All fundamental particles are actually tiny, 
          vibrating strings. Different vibration modes produce different particles (electron, quark, photon, etc.). 
          Requires 10 or 11 dimensions to work mathematically.
        </p>
        <p>
          <strong className="text-cyan-400">Key Predictions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Gravity naturally emerges from string vibrations</li>
          <li>Extra dimensions compactified at ~10⁻³⁵ m scale</li>
          <li>Unifies all forces including gravity</li>
          <li>Predicts supersymmetric partner particles</li>
          <li>String length ≈ Planck length (10⁻³⁵ m)</li>
        </ul>
        <p>
          <strong className="text-cyan-400">Status:</strong> Mathematically elegant but no experimental evidence yet. 
          Requires particle accelerators millions of times more powerful than LHC to test.
        </p>
      </div>
    </div>
  );
};

const LoopQuantumGravityVisual = () => {
  return (
    <div className="flex flex-col items-center">
      <svg className="w-full max-w-2xl h-96" viewBox="0 0 600 400">
        <defs>
          <linearGradient id="loop-grad">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        {/* Network of loops */}
        {Array.from({length: 30}).map((_, i) => {
          const x = 100 + (i % 6) * 80;
          const y = 80 + Math.floor(i / 6) * 60;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="15" stroke="url(#loop-grad)" strokeWidth="3" fill="none">
                <animate attributeName="r" values="15;18;15" dur="3s" repeatCount="indefinite" />
              </circle>
              {/* Connections to neighbors */}
              {i < 24 && (
                <line
                  x1={x}
                  y1={y}
                  x2={x + 80}
                  y2={y}
                  stroke="url(#loop-grad)"
                  strokeWidth="2"
                  opacity="0.4"
                />
              )}
              {i < 30 - 6 && (
                <line
                  x1={x}
                  y1={y}
                  x2={x}
                  y2={y + 60}
                  stroke="url(#loop-grad)"
                  strokeWidth="2"
                  opacity="0.4"
                />
              )}
            </g>
          );
        })}
        <text x="300" y="370" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">
          Discrete Spacetime Network
        </text>
      </svg>
      <div className="mt-6 max-w-2xl text-gray-300 space-y-4">
        <p>
          <strong className="text-green-400">Core Concept:</strong> Spacetime is not continuous but made of discrete, 
          quantized loops forming a "spin network." Space itself has atoms—fundamental quanta of area and volume.
        </p>
        <p>
          <strong className="text-green-400">Key Predictions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Spacetime is quantized: minimum area ≈ 10⁻⁷⁰ m²</li>
          <li>Big Bang was actually a "Big Bounce" from previous universe</li>
          <li>Black hole singularities don't exist (quantum repulsion)</li>
          <li>Only 4 dimensions (no extra dimensions needed)</li>
          <li>Background independent (no need for pre-existing spacetime)</li>
        </ul>
        <p>
          <strong className="text-green-400">Status:</strong> Main competitor to string theory. More conservative 
          (only quantizes gravity, doesn't unify all forces). Testable predictions for early universe cosmology.
        </p>
      </div>
    </div>
  );
};

const CausalSetTheoryVisual = () => {
  return (
    <div className="flex flex-col items-center">
      <svg className="w-full max-w-2xl h-96" viewBox="0 0 600 400">
        <defs>
          <linearGradient id="causal-grad">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        {/* Causal diamond structure */}
        {Array.from({length: 50}).map((_, i) => {
          const level = Math.floor(Math.sqrt(i));
          const posInLevel = i - level * level;
          const x = 300 + (posInLevel - level) * 40;
          const y = 100 + level * 40;
          
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill="url(#causal-grad)">
                <animate attributeName="opacity" values="1;0.3;1" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
              </circle>
              {/* Causal links */}
              {i > 0 && level > 0 && (
                <>
                  <line
                    x1={x}
                    y1={y}
                    x2={300 + (posInLevel - (level-1)) * 40}
                    y2={y - 40}
                    stroke="url(#causal-grad)"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  {posInLevel > 0 && (
                    <line
                      x1={x}
                      y1={y}
                      x2={300 + (posInLevel - 1 - (level-1)) * 40}
                      y2={y - 40}
                      stroke="url(#causal-grad)"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  )}
                </>
              )}
            </g>
          );
        })}
        <text x="300" y="380" textAnchor="middle" fill="#f97316" fontSize="16" fontWeight="bold">
          Causal Event Network
        </text>
      </svg>
      <div className="mt-6 max-w-2xl text-gray-300 space-y-4">
        <p>
          <strong className="text-orange-400">Core Concept:</strong> Spacetime emerges from a discrete set of 
          causal events. Events are either causally related (one can influence the other) or not. Spacetime 
          is fundamentally discrete and random at the Planck scale.
        </p>
        <p>
          <strong className="text-orange-400">Key Predictions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Spacetime has ~10¹⁸⁵ fundamental events per cubic meter</li>
          <li>Predicts specific value for cosmological constant (dark energy)</li>
          <li>Lorentz symmetry may be violated at tiny scales</li>
          <li>Time is more fundamental than space</li>
          <li>Could explain discreteness of black hole entropy</li>
        </ul>
        <p>
          <strong className="text-orange-400">Status:</strong> Emerging theory with fewer researchers but unique 
          testable predictions. Cosmological constant prediction matches observations within error bars!
        </p>
      </div>
    </div>
  );
};

// Theory selection screen - final level
const TheorySelection = ({ onSelectTheory }: { onSelectTheory: (theory: string) => void }) => {
  const theories = [
    {
      id: 'quantum-foam',
      name: 'Quantum Foam',
      description: 'Spacetime fluctuates at the Planck scale, creating virtual particles',
      proponent: 'John Wheeler',
      status: 'Theoretical',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'string-theory',
      name: 'String Theory',
      description: 'Fundamental particles are vibrating strings in 10-11 dimensions',
      proponent: 'Multiple (M-Theory)',
      status: 'Unproven',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'loop-quantum',
      name: 'Loop Quantum Gravity',
      description: 'Spacetime is quantized into discrete loops at Planck scale',
      proponent: 'Carlo Rovelli',
      status: 'Alternative',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'causal-sets',
      name: 'Causal Set Theory',
      description: 'Spacetime emerges from discrete causal events',
      proponent: 'Rafael Sorkin',
      status: 'Emerging',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-black text-white mb-4">Current Theories of Quantum Gravity</h2>
        <p className="text-gray-300 text-lg">
          At the Planck scale, our physics breaks down. Multiple theories compete to explain what happens here.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {theories.map((theory, i) => (
          <motion.button
            key={theory.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => onSelectTheory(theory.id)}
            className={`p-8 rounded-3xl bg-gradient-to-br ${theory.color} bg-opacity-20 border-2 border-white/20 hover:border-white/40 transition-all text-left group`}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className={`text-2xl font-black text-white`}>
                {theory.name}
              </h3>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs">
                {theory.status}
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-4">{theory.description}</p>
            <div className="flex items-center justify-between text-xs text-white/80">
              <span>Proposed by: {theory.proponent}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
      >
        <p className="text-gray-400 text-sm">
          💡 Each theory offers a different perspective on quantum gravity. Click any to explore its visual representation and predictions.
        </p>
      </motion.div>
    </div>
  );
};

const ObservableUniverse = ({ onClose }: { onClose: () => void }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedTheory, setSelectedTheory] = useState<string | null>(null);

  // Auto-show info after level change
  useEffect(() => {
    setShowInfo(false);
    const timer = setTimeout(() => {
      setShowInfo(true);
    }, 800);
    return () => clearTimeout(timer);
  }, [currentLevel]);

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const prevLevel = () => {
    if (currentLevel > 0) {
      setCurrentLevel(currentLevel - 1);
    }
  };

  const levels = [
    {
      id: 0,
      name: "Observable Universe",
      scale: "8.8 × 10²⁶ meters",
      size: "93 billion light-years",
      description: "The entire observable universe contains approximately 2 trillion galaxies, each with hundreds of billions of stars. This is the limit of what we can possibly see, constrained by the age of the universe and the speed of light.",
      physics: "Cosmology, Dark Energy, Expansion of Spacetime",
      facts: [
        "Contains ~10²⁴ stars",
        "Age: 13.8 billion years",
        "Expanding at accelerating rate due to dark energy",
        "Observable horizon constantly growing"
      ],
      Visual: ObservableUniverseVisual,
      bgGradient: "from-purple-950 via-black to-black",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 1,
      name: "Laniakea Supercluster",
      scale: "5.2 × 10²⁴ meters",
      size: "520 million light-years",
      description: "Our galactic supercluster contains approximately 100,000 galaxies including the Milky Way. All galaxies in Laniakea are gravitationally bound and moving together through space toward the Great Attractor.",
      physics: "Large-Scale Structure, Dark Matter Halos, Gravitational Dynamics",
      facts: [
        "Mass: 10¹⁷ solar masses",
        "Contains ~100,000 galaxies",
        "Named 'Laniakea' (Hawaiian for 'immeasurable heaven')",
        "Discovered in 2014"
      ],
      Visual: SuperclusterVisual,
      bgGradient: "from-violet-950 via-black to-black",
      color: "from-violet-500 to-purple-500"
    },
    {
      id: 2,
      name: "Virgo Supercluster",
      scale: "1.1 × 10²³ meters",
      size: "110 million light-years",
      description: "Part of Laniakea, the Virgo Supercluster contains the Local Group (our galaxy cluster). It consists of about 100 galaxy groups and clusters, with the massive Virgo Cluster at its heart.",
      physics: "Cluster Dynamics, Gravitational Lensing",
      facts: [
        "Contains at least 100 galaxy groups",
        "Total mass: 10¹⁵ solar masses",
        "Virgo Cluster contains 1,300+ galaxies",
        "We're on the outer edge"
      ],
      Visual: VirgoVisual,
      bgGradient: "from-blue-950 via-violet-950 to-black",
      color: "from-blue-500 to-violet-500"
    },
    {
      id: 3,
      name: "Local Group",
      scale: "1.0 × 10²² meters",
      size: "10 million light-years",
      description: "Our galactic neighborhood containing the Milky Way, Andromeda, Triangulum, and about 80 smaller dwarf galaxies. The Milky Way and Andromeda are on a collision course, set to merge in ~4.5 billion years.",
      physics: "Galactic Interactions, Tidal Forces, Dark Matter Distribution",
      facts: [
        "Contains ~80 galaxies",
        "Dominated by Milky Way and Andromeda",
        "Total mass: 2 × 10¹² solar masses",
        "Galaxies gravitationally bound together"
      ],
      Visual: LocalGroupVisual,
      bgGradient: "from-cyan-950 via-blue-950 to-black",
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 4,
      name: "Milky Way Galaxy",
      scale: "9.5 × 10²⁰ meters",
      size: "100,000 light-years",
      description: "Our home galaxy is a barred spiral containing 200-400 billion stars, plus an enormous amount of dark matter. At its center lies Sagittarius A*, a supermassive black hole 4 million times the Sun's mass.",
      physics: "Galactic Rotation, Stellar Dynamics, Supermassive Black Holes",
      facts: [
        "200-400 billion stars",
        "Age: 13.6 billion years",
        "Rotating at 828,000 km/h (at Sun's position)",
        "Contains 4 major spiral arms"
      ],
      Visual: GalaxyVisual,
      bgGradient: "from-slate-900 via-purple-950 to-black",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 5,
      name: "Solar System",
      scale: "1.2 × 10¹³ meters",
      size: "~80 AU (to heliopause)",
      description: "Our solar system consists of the Sun, 8 planets, 5 dwarf planets, hundreds of moons, and countless asteroids and comets. The Sun contains 99.86% of the system's total mass.",
      physics: "Orbital Mechanics, Kepler's Laws, Gravitational N-Body Problem",
      facts: [
        "Sun mass: 1.989 × 10³⁰ kg",
        "Age: 4.6 billion years",
        "Orbits galactic center every 225-250 million years",
        "Solar wind creates heliosphere bubble"
      ],
      Visual: SolarSystemVisual,
      bgGradient: "from-orange-950 via-black to-black",
      color: "from-orange-500 to-yellow-500"
    },
    {
      id: 6,
      name: "Earth",
      scale: "1.3 × 10⁷ meters",
      size: "12,742 km diameter",
      description: "Our planet, the only known world harboring life. Earth's magnetic field protects us from solar wind, while its atmosphere maintains the greenhouse effect necessary for liquid water.",
      physics: "Planetary Science, Fluid Dynamics, Magnetohydrodynamics",
      facts: [
        "Mass: 5.972 × 10²⁴ kg",
        "Age: 4.54 billion years",
        "71% covered by water",
        "Only planet with plate tectonics"
      ],
      Visual: EarthVisual,
      bgGradient: "from-blue-900 via-green-950 to-black",
      color: "from-blue-500 to-green-500"
    },
    {
      id: 7,
      name: "Human Scale",
      scale: "~2 meters",
      size: "Average human height",
      description: "The everyday world we experience. At this scale, classical physics dominates and quantum effects are negligible. Electromagnetic forces hold atoms together in molecules that form our bodies.",
      physics: "Classical Mechanics, Thermodynamics, Biology",
      facts: [
        "~7 × 10²⁷ atoms per person",
        "98% of atoms replaced yearly",
        "Body generates ~100 watts of power",
        "Classical physics highly accurate"
      ],
      Visual: () => <div className="text-9xl">🧍</div>,
      bgGradient: "from-green-900 via-blue-950 to-black",
      color: "from-green-500 to-blue-500"
    },
    {
      id: 8,
      name: "Cellular Scale",
      scale: "1.0 × 10⁻⁵ meters",
      size: "10 micrometers",
      description: "The world of cells and bacteria. Here, surface tension dominates over gravity. Cells are complex molecular machines, each containing millions of proteins working in concert.",
      physics: "Biophysics, Fluid Mechanics at Low Reynolds Number, Molecular Dynamics",
      facts: [
        "Human body: ~37 trillion cells",
        "Cells can be 1-100 micrometers",
        "Bacteria outnumber human cells",
        "Quantum effects still negligible"
      ],
      Visual: () => <div className="text-9xl">🦠</div>,
      bgGradient: "from-purple-900 via-indigo-950 to-black",
      color: "from-purple-500 to-indigo-500"
    },
    {
      id: 9,
      name: "Atomic Scale",
      scale: "1.0 × 10⁻¹⁰ meters",
      size: "1 angstrom",
      description: "Atoms and molecules. Electrons exist in probability clouds around nuclei. Chemical bonds form through quantum mechanical interactions. This is where quantum mechanics becomes essential.",
      physics: "Quantum Mechanics, Quantum Chemistry, Atomic Physics",
      facts: [
        "Atom is 99.9999999999996% empty space",
        "Electron orbits are probability distributions",
        "Quantum tunneling is common",
        "Pauli exclusion principle governs structure"
      ],
      Visual: AtomVisual,
      bgGradient: "from-cyan-900 via-blue-950 to-black",
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 10,
      name: "Atomic Nucleus",
      scale: "1.0 × 10⁻¹⁵ meters",
      size: "1 femtometer",
      description: "The dense core of atoms, containing protons and neutrons bound by the strong nuclear force—the strongest force in nature. Nuclear reactions here power stars and create elements.",
      physics: "Nuclear Physics, Quantum Chromodynamics (QCD), Strong Force",
      facts: [
        "Contains 99.9% of atom's mass",
        "Protons/neutrons made of quarks",
        "Strong force ~100× electromagnetic",
        "Nuclear fusion powers stars"
      ],
      Visual: NucleusVisual,
      bgGradient: "from-red-900 via-orange-950 to-black",
      color: "from-red-500 to-orange-500"
    },
    {
      id: 11,
      name: "Quarks & Leptons",
      scale: "< 10⁻¹⁸ meters",
      size: "Point particles",
      description: "The fundamental particles of matter. Quarks combine to form protons and neutrons. Electrons are leptons. These are currently believed to be truly fundamental with no internal structure.",
      physics: "Particle Physics, Standard Model, Quantum Field Theory",
      facts: [
        "6 types of quarks: up, down, strange, charm, top, bottom",
        "6 types of leptons: electron, muon, tau + neutrinos",
        "Point particles (no measurable size)",
        "Described by quantum fields"
      ],
      Visual: QuarkVisual,
      bgGradient: "from-pink-900 via-purple-950 to-black",
      color: "from-pink-500 to-purple-500"
    }
  ];

  // Show theory detail view when theory is selected
  if (selectedTheory) {
    const renderTheoryVisualization = () => {
      switch (selectedTheory) {
        case 'quantum-foam':
          return <QuantumFoamTheoryVisual />;
        case 'string-theory':
          return <StringTheoryVisual />;
        case 'loop-quantum':
          return <LoopQuantumGravityVisual />;
        case 'causal-sets':
          return <CausalSetTheoryVisual />;
        default:
          return null;
      }
    };

    return (
      <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-y-auto">
        <button
          onClick={onClose}
          className="fixed top-8 right-8 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all group"
        >
          <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>
        <button
          onClick={() => setSelectedTheory(null)}
          className="fixed top-8 left-8 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all group"
        >
          <ArrowLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform duration-300" />
        </button>
        <div className="w-full max-w-5xl mx-auto py-20 px-8">
          {renderTheoryVisualization()}
        </div>
      </div>
    );
  }

  // Check if we've reached the end - show theory selection
  if (currentLevel >= levels.length) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-y-auto">
        <button
          onClick={onClose}
          className="fixed top-8 right-8 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all group"
        >
          <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>
        <button
          onClick={() => setCurrentLevel(levels.length - 1)}
          className="fixed top-8 left-8 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all group"
        >
          <ArrowLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform duration-300" />
        </button>
        <TheorySelection onSelectTheory={setSelectedTheory} />
      </div>
    );
  }

  const current = levels[currentLevel];
  const VisualComponent = current.Visual;

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <style jsx global>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(var(--orbit-radius, 0px)) rotate(0deg); }
          to { transform: rotate(360deg) translateX(var(--orbit-radius, 0px)) rotate(-360deg); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Close button - moved to top right, above everything */}
      <button
        onClick={onClose}
        className="fixed top-8 right-8 z-[100] p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all group"
      >
        <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Animated background with smooth transitions */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${current.bgGradient} transition-all duration-1000 ease-in-out`}
      />

      {/* Main content with smooth scaling */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLevel}
          initial={{ scale: 0.5, opacity: 0, filter: 'blur(20px)' }}
          animate={{ 
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }}
          exit={{ 
            scale: 2,
            opacity: 0,
            filter: 'blur(20px)'
          }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1] // Custom easing for smoother animation
          }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          {/* Visual representation */}
          <div className="w-full h-2/3 flex items-center justify-center">
            <VisualComponent />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Top: Scale indicator with smooth fade */}
      <motion.div
        key={`header-${currentLevel}`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0, duration: 0.4 }}
        className="absolute top-4 left-0 right-0 text-center px-4 z-20 mb-4"
      >
        <div className="text-white/60 text-sm mb-2">LEVEL {currentLevel + 1} / {levels.length}</div>
        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r ${current.color} bg-clip-text text-transparent mb-4 pb-2 leading-tight`}>
          {current.name}
        </h1>
        <div className="text-xl md:text-2xl text-white/80 font-mono mb-2">{current.scale}</div>
        <div className="text-base md:text-lg text-white/60">{current.size}</div>
      </motion.div>

      {/* Progress bar - fixed spacing */}
      <div className="absolute top-56 left-0 right-0 px-8 md:px-16 z-20">
        <div className="max-w-3xl mx-auto">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-4">
            <motion.div
              className={`h-full bg-gradient-to-r ${current.color}`}
              initial={false}
              animate={{ width: `${((currentLevel + 1) / levels.length) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-white/40 text-xs px-2">
            <span>Observable Universe</span>
            <span>Planck Scale</span>
          </div>
        </div>
      </div>

      {/* Bottom: Info card (lazy appear) */}
      <AnimatePresence mode="wait">
        {showInfo && (
          <motion.div
            key={`info-${currentLevel}`}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ 
              delay: 0,
              duration: 0.3,
              ease: "easeOut"
            }}
            className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-20"
          >
            <div className="max-w-5xl mx-auto bg-black/70 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center mb-4">
                    <Info className="w-6 h-6 text-cyan-400 mr-2 flex-shrink-0" />
                    <h3 className="text-xl font-bold text-white">Description</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {current.description}
                  </p>
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${current.color} bg-opacity-20 border border-white/20`}>
                    <p className="text-white text-xs font-semibold">{current.physics}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Key Facts</h3>
                  <ul className="space-y-2">
                    {current.facts.map((fact, i) => (
                      <motion.li
                        key={i}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                        className="text-gray-300 text-sm flex items-start"
                      >
                        <span className={`text-transparent bg-gradient-to-r ${current.color} bg-clip-text mr-2 flex-shrink-0`}>▸</span>
                        {fact}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation Controls - Bidirectional */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={prevLevel}
                  disabled={currentLevel === 0}
                  className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all ${
                    currentLevel === 0
                      ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-[1.02]'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Zoom Out</span>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={nextLevel}
                  disabled={currentLevel === levels.length - 1}
                  className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all ${
                    currentLevel === levels.length - 1
                      ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                      : `bg-gradient-to-r ${current.color} text-white hover:scale-[1.02]`
                  }`}
                >
                  <span>Zoom In</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* End of journey - theory selection button */}
              {currentLevel === levels.length - 1 && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setCurrentLevel(levels.length)}
                  className="mt-4 w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-lg hover:scale-[1.02] transition-transform"
                >
                  🔬 Explore Quantum Gravity Theories →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ObservableUniverse;
