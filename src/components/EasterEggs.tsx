'use client';
import React, { useState, useEffect, useRef } from 'react';
import YodaModal from './YodaModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function EasterEggs() {
  const [clickCount, setClickCount] = useState(0);
  const [showSecretToast, setShowSecretToast] = useState(false);
  const [showYodaIdle, setShowYodaIdle] = useState(false);
  const [showYodaShake, setShowYodaShake] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastShakeRef = useRef<number>(0);

  // Idle detection (#12)
  useEffect(() => {
    const resetIdleTimer = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(() => {
        setShowYodaIdle(true);
      }, 120000); // 2 minutes (120 seconds)
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer);
    });

    resetIdleTimer();

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer);
      });
    };
  }, []);

  // Shake detection (#5)
  useEffect(() => {
    let shakeCount = 0;
    const shakeThreshold = 20;
    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;

    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;

      const x = acceleration.x ?? 0;
      const y = acceleration.y ?? 0;
      const z = acceleration.z ?? 0;
      const change = Math.abs(x - lastX) + Math.abs(y - lastY) + Math.abs(z - lastZ);

      if (change > shakeThreshold) {
        shakeCount++;
        if (shakeCount > 3 && Date.now() - lastShakeRef.current > 3000) {
          lastShakeRef.current = Date.now();
          setShowYodaShake(true);
          shakeCount = 0;
        }
      }

      lastX = x;
      lastY = y;
      lastZ = z;
    };

    // Also detect rapid mouse movements as "shake" on desktop
    let lastMouseX = 0;
    let lastMouseY = 0;
    let rapidMoveCount = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const deltaX = Math.abs(event.clientX - lastMouseX);
      const deltaY = Math.abs(event.clientY - lastMouseY);
      
      if (deltaX > 100 || deltaY > 100) {
        rapidMoveCount++;
        if (rapidMoveCount > 10 && Date.now() - lastShakeRef.current > 3000) {
          lastShakeRef.current = Date.now();
          setShowYodaShake(true);
          rapidMoveCount = 0;
        }
      }

      lastMouseX = event.clientX;
      lastMouseY = event.clientY;

      // Reset rapid move count after a pause
      setTimeout(() => {
        rapidMoveCount = Math.max(0, rapidMoveCount - 1);
      }, 100);
    };

    window.addEventListener('devicemotion', handleDeviceMotion);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Click spam detection (#9)
  useEffect(() => {
    const handleClick = () => {
      setClickCount(prev => prev + 1);

      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }

      clickTimerRef.current = setTimeout(() => {
        setClickCount(0);
      }, 2000); // Reset after 2 seconds
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  // Show secret toast when click count reaches 10
  useEffect(() => {
    if (clickCount >= 10 && !showSecretToast) {
      setShowSecretToast(true);
      setTimeout(() => setShowSecretToast(false), 4000);
      setClickCount(0); // Reset
    }
  }, [clickCount, showSecretToast]);

  return (
    <>
      {/* Click Spam Secret Toast */}
      <AnimatePresence>
        {showSecretToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-8 left-8 z-[9999] max-w-sm"
          >
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl shadow-2xl border-2 border-white/30 p-6 backdrop-blur-xl">
              <div className="flex items-start space-x-4">
                <span className="text-4xl">🎵</span>
                <div>
                  <p className="text-white font-bold text-lg mb-1">
                    Caught you clicking!
                  </p>
                  <p className="text-white/90 text-sm font-medium">
                    I actually like Sabrina Carpenter 💖
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Yoda Modal for Idle */}
      <YodaModal
        isOpen={showYodaIdle}
        onClose={() => setShowYodaIdle(false)}
        message="Patience you must have, young one. But still here, you are?"
      />

      {/* Yoda Modal for Shake */}
      <YodaModal
        isOpen={showYodaShake}
        onClose={() => setShowYodaShake(false)}
        message="Calm, you must stay. Peace and tranquility, the path to wisdom are."
      />
    </>
  );
}
