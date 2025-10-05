'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
}

interface OptimizedBackgroundProps {
  particleCount?: number;
  connectionDistance?: number;
  gradientColors?: string[];
}

export default function OptimizedBackground({ 
  particleCount = 50, // Increased for better visibility
  connectionDistance = 120, 
  gradientColors = ['#047857', '#1e40af', '#7c3aed', '#be185d']
}: OptimizedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let isVisible = true;

    // Handle visibility changes to pause when tab is hidden
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles only once
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.8,
          hue: Math.random() * 180 + 180,
        });
      }
    }

    const particles = particlesRef.current;

    const animate = (currentTime: number) => {
      // Skip frame if tab is not visible
      if (!isVisible) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
        return;
      }

      // Throttle to ~30 FPS instead of 60 FPS
      const deltaTime = currentTime - lastFrameTimeRef.current;
      if (deltaTime < 33) { // ~30fps
        animationFrameIdRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTimeRef.current = currentTime;

      timeRef.current += 0.005;

      // Clear canvas with transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        const alpha = 0.4 + Math.sin(timeRef.current + i) * 0.2;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue + timeRef.current * 20}, 70%, 65%, ${alpha})`;
        ctx.fill();

        // Optimized connection drawing - only check ahead
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distSq = dx * dx + dy * dy; // Use squared distance to avoid sqrt
          
          if (distSq < connectionDistance * connectionDistance) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `hsla(${particle.hue}, 60%, 60%, ${0.1 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [particleCount, connectionDistance, gradientColors]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
}
