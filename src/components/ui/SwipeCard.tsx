'use client';
import { ReactNode } from 'react';
import { motion, PanInfo } from 'framer-motion';

interface SwipeCardProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
}

export default function SwipeCard({ 
  children, 
  onSwipeLeft, 
  onSwipeRight,
  className = '' 
}: SwipeCardProps) {
  
  const handleDragEnd = (_event: any, info: PanInfo) => {
    const swipeThreshold = 100;
    
    if (info.offset.x > swipeThreshold && onSwipeRight) {
      onSwipeRight();
    } else if (info.offset.x < -swipeThreshold && onSwipeLeft) {
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      className={`cursor-grab active:cursor-grabbing touch-pan-y ${className}`}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}
