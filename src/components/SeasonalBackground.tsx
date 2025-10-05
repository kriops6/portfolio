'use client';

import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { useTheme } from './SeasonalThemeProvider';

export function SeasonalBackground() {
  const { currentTheme } = useTheme();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  // Winter theme with snowflakes
  if (currentTheme === 'winter') {
    return (
      <>
        {/* Radial light source - top right - balanced brightness */}
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 1000px 800px at 70% 10%, rgba(220, 240, 255, 0.4), rgba(190, 225, 255, 0.25) 40%, transparent 70%)',
            zIndex: 0,
          }}
        />
        
        {/* Ambient light */}
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(210, 235, 255, 0.2), transparent 50%)',
            zIndex: 0,
          }}
        />
        
        {/* Snowflakes using tsparticles */}
        <Particles
          id="winter-snow"
          init={particlesInit}
          className="fixed inset-0 pointer-events-none"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 1,
          }}
          options={{
            fullScreen: {
              enable: false,
            },
            particles: {
              number: {
                value: 150,
                density: {
                  enable: true,
                  area: 800,
                },
              },
              color: {
                value: '#ffffff',
              },
              shape: {
                type: 'circle',
              },
              opacity: {
                value: 0.7,
                random: true,
                animation: {
                  enable: true,
                  speed: 0.5,
                  minimumValue: 0.3,
                  sync: false,
                },
              },
              size: {
                value: 4,
                random: { enable: true, minimumValue: 1 },
              },
              move: {
                enable: true,
                speed: 1.5,
                direction: 'bottom',
                random: true,
                straight: false,
                outModes: {
                  default: 'out',
                  bottom: 'out',
                  left: 'out',
                  right: 'out',
                  top: 'out',
                },
              },
              wobble: {
                enable: true,
                distance: 10,
                speed: 10,
              },
            },
            detectRetina: true,
            background: {
              color: 'transparent',
            },
          }}
        />
      </>
    );
  }

  // Spring theme with cherry blossom petals
  if (currentTheme === 'spring') {
    return (
      <>
        {/* Soft spring light - pink/white tones */}
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 1200px 900px at 30% 20%, rgba(255, 240, 250, 0.25), rgba(255, 220, 240, 0.12) 40%, transparent 70%)',
            zIndex: 0,
          }}
        />
        
        {/* Cherry blossom petals - star/polygon shapes */}
        <Particles
          id="spring-petals"
          init={particlesInit}
          className="fixed inset-0 pointer-events-none"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 1,
          }}
          options={{
            fullScreen: {
              enable: false,
            },
            particles: {
              number: {
                value: 50,
                density: {
                  enable: true,
                  area: 800,
                },
              },
              color: {
                value: ['#ffb3d9', '#ffc9e3', '#ffe0f0', '#ffffff', '#ffcce5'],
              },
              shape: {
                type: 'star',
                options: {
                  star: {
                    sides: 5,
                  },
                },
              },
              opacity: {
                value: 0.6,
                random: true,
                animation: {
                  enable: true,
                  speed: 0.8,
                  minimumValue: 0.2,
                  sync: false,
                },
              },
              size: {
                value: 8,
                random: { enable: true, minimumValue: 4 },
              },
              move: {
                enable: true,
                speed: 1,
                direction: 'bottom-right',
                random: true,
                straight: false,
                outModes: {
                  default: 'out',
                },
              },
              wobble: {
                enable: true,
                distance: 15,
                speed: 15,
              },
              rotate: {
                value: 0,
                random: true,
                animation: {
                  enable: true,
                  speed: 10,
                  sync: false,
                },
              },
            },
            detectRetina: true,
            background: {
              color: 'transparent',
            },
          }}
        />
      </>
    );
  }

  // Summer theme with sun rays and floating particles
  if (currentTheme === 'summer') {
    return (
      <>
        {/* Sun rays from top */}
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 1000px 1000px at 50% -20%, rgba(255, 245, 200, 0.4), rgba(255, 220, 150, 0.2) 30%, transparent 60%)',
            zIndex: 0,
          }}
        />
        
        {/* Warm ambient glow */}
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 240, 200, 0.15), transparent 40%)',
            zIndex: 0,
          }}
        />
        
        {/* Floating fireflies - small triangles */}
        <Particles
          id="summer-particles"
          init={particlesInit}
          className="fixed inset-0 pointer-events-none"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 1,
          }}
          options={{
            fullScreen: {
              enable: false,
            },
            particles: {
              number: {
                value: 40,
                density: {
                  enable: true,
                  area: 800,
                },
              },
              color: {
                value: ['#ffd700', '#ffed4e', '#fff9c4', '#ffe57f'],
              },
              shape: {
                type: 'triangle',
              },
              opacity: {
                value: 0.4,
                random: true,
                animation: {
                  enable: true,
                  speed: 1,
                  minimumValue: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 4,
                random: { enable: true, minimumValue: 2 },
              },
              move: {
                enable: true,
                speed: 0.5,
                direction: 'none',
                random: true,
                straight: false,
                outModes: {
                  default: 'bounce',
                },
              },
              rotate: {
                value: 0,
                random: true,
                animation: {
                  enable: true,
                  speed: 5,
                  sync: false,
                },
              },
            },
            detectRetina: true,
            background: {
              color: 'transparent',
            },
          }}
        />
      </>
    );
  }

  // Autumn theme with falling leaves
  if (currentTheme === 'autumn') {
    return (
      <>
        {/* Warm autumn light */}
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 1100px 800px at 60% 15%, rgba(255, 200, 150, 0.3), rgba(255, 170, 100, 0.15) 40%, transparent 70%)',
            zIndex: 0,
          }}
        />
        
        {/* Falling autumn leaves - polygon shapes */}
        <Particles
          id="autumn-leaves"
          init={particlesInit}
          className="fixed inset-0 pointer-events-none"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 1,
          }}
          options={{
            fullScreen: {
              enable: false,
            },
            particles: {
              number: {
                value: 60,
                density: {
                  enable: true,
                  area: 800,
                },
              },
              color: {
                value: ['#ff6b35', '#f7931e', '#c1502e', '#8b4513', '#d2691e'],
              },
              shape: {
                type: 'polygon',
                options: {
                  polygon: {
                    sides: 6,
                  },
                },
              },
              opacity: {
                value: 0.7,
                random: true,
                animation: {
                  enable: true,
                  speed: 0.5,
                  minimumValue: 0.3,
                  sync: false,
                },
              },
              size: {
                value: 10,
                random: { enable: true, minimumValue: 5 },
              },
              move: {
                enable: true,
                speed: 2,
                direction: 'bottom',
                random: true,
                straight: false,
                outModes: {
                  default: 'out',
                },
              },
              wobble: {
                enable: true,
                distance: 20,
                speed: 12,
              },
              rotate: {
                value: 0,
                random: true,
                animation: {
                  enable: true,
                  speed: 15,
                  sync: false,
                },
              },
            },
            detectRetina: true,
            background: {
              color: 'transparent',
            },
          }}
        />
      </>
    );
  }

  // Regular theme - return null (uses default background)
  return null;
}
