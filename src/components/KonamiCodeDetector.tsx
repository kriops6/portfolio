'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export default function KonamiCodeDetector() {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [retro8Bit, setRetro8Bit] = useState(false);
  const [showKonamiToast, setShowKonamiToast] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      
      if (key === KONAMI_CODE[konamiIndex]) {
        const newIndex = konamiIndex + 1;
        setKonamiIndex(newIndex);
        
        if (newIndex === KONAMI_CODE.length) {
          // Konami code complete!
          setRetro8Bit(true);
          setShowKonamiToast(true);
          setKonamiIndex(0);
          
          setTimeout(() => setShowKonamiToast(false), 5000);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex]);

  return (
    <>
      {/* 8-bit Retro Overlay */}
      <AnimatePresence>
        {retro8Bit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] pointer-events-none"
            style={{
              mixBlendMode: 'color',
              background: 'linear-gradient(45deg, #ff00ff20, #00ffff20, #ffff0020)',
            }}
          >
            {/* Scanlines */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.1) 2px, rgba(0,0,0,.1) 4px)',
                animation: 'scanline 8s linear infinite',
              }}
            />
            
            {/* Pixel Grid */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,255,255,0.3) 3px, rgba(0,255,255,0.3) 6px), repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,0,255,0.3) 3px, rgba(255,0,255,0.3) 6px)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global 8-bit CSS */}
      {retro8Bit && (
        <style jsx global>{`
          @keyframes scanline {
            0% { transform: translateY(0); }
            100% { transform: translateY(100%); }
          }
          
          * {
            image-rendering: pixelated !important;
            font-family: 'Courier New', monospace !important;
            text-shadow: 2px 2px 0px rgba(0,255,255,0.5), -2px -2px 0px rgba(255,0,255,0.5) !important;
          }
          
          body {
            filter: contrast(1.2) saturate(1.5) !important;
          }
          
          button, a {
            box-shadow: 4px 4px 0px rgba(0,0,0,0.5) !important;
            border: 3px solid currentColor !important;
          }
          
          img {
            filter: contrast(1.3) saturate(1.5) hue-rotate(10deg) !important;
          }
        `}</style>
      )}

      {/* Toggle Button (appears after activation) */}
      <AnimatePresence>
        {retro8Bit && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            onClick={() => setRetro8Bit(false)}
            className="fixed bottom-8 left-8 z-[10001] px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-2xl hover:scale-110 transition-transform"
            style={{
              fontFamily: 'Courier New, monospace',
              textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
              boxShadow: '4px 4px 0px rgba(0,0,0,0.5)',
              border: '3px solid white',
            }}
          >
            EXIT 8-BIT MODE
          </motion.button>
        )}
      </AnimatePresence>

      {/* Konami Code Success Toast */}
      <AnimatePresence>
        {showKonamiToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.5 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[10002] max-w-lg"
          >
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-2xl shadow-2xl border-4 border-yellow-400 p-6 backdrop-blur-xl">
              <div className="text-center">
                <p className="text-4xl mb-3">🎮</p>
                <p className="text-white font-black text-2xl mb-2" style={{ fontFamily: 'Courier New, monospace', textShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>
                  KONAMI CODE ACTIVATED!
                </p>
                <p className="text-yellow-200 font-bold text-sm" style={{ fontFamily: 'Courier New, monospace' }}>
                  Welcome to 8-BIT MODE! 🕹️✨
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
