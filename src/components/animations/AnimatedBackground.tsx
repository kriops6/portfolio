import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let time = 0;
    
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles: Particle[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 3 + 0.5,
        hue: Math.random() * 300 + 180,
      });
    }
    
    const animate = () => {
      time += 0.005;
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `hsl(${230 + Math.sin(time) * 30}, 60%, 20%)`);
      gradient.addColorStop(0.2, `hsl(${260 + Math.cos(time * 1.3) * 25}, 65%, 15%)`);
      gradient.addColorStop(0.4, `hsl(${290 + Math.sin(time * 0.7) * 35}, 70%, 22%)`);
      gradient.addColorStop(0.6, `hsl(${220 + Math.cos(time * 1.1) * 20}, 55%, 18%)`);
      gradient.addColorStop(0.8, `hsl(${270 + Math.sin(time * 1.5) * 30}, 60%, 25%)`);
      gradient.addColorStop(1, `hsl(${240 + Math.cos(time * 0.8) * 25}, 58%, 20%)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.x += particle.vx + Math.sin(time + i * 0.3) * 0.1;
        particle.y += particle.vy + Math.cos(time + i * 0.5) * 0.1;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        
        const alpha = 0.3 + Math.sin(time + i) * 0.4;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue + time * 50}, 80%, 70%, ${alpha})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue + time * 50}, 90%, 80%, ${alpha * 0.2})`;
        ctx.fill();
        
        particles.slice(i + 1).forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `hsla(${particle.hue + time * 50}, 75%, 65%, ${0.15 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      
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
      style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 20%, #6366f1 40%, #8b5cf6 60%, #a855f7 80%, #1e1b4b 100%)' }}
    />
  );
};