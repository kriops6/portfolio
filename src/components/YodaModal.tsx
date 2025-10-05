'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface YodaModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  showHomeButton?: boolean;
}

export default function YodaModal({ isOpen, onClose, message, showHomeButton = false }: YodaModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-[9998] backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotateY: 180 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-md px-4"
          >
            <div className="bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 rounded-3xl shadow-2xl border-4 border-green-500/50 p-8 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Yoda Image/Icon */}
              <div className="text-center mb-6">
                <div className="inline-block text-8xl animate-bounce">
                  🧙‍♂️
                </div>
              </div>

              {/* Yoda's Message */}
              <div className="text-center mb-6">
                <p className="text-2xl md:text-3xl font-bold text-green-300 mb-2 italic leading-relaxed">
                  "{message}"
                </p>
                <p className="text-green-400 text-sm">- Master Yoda</p>
              </div>

              {/* Home Button (for 404) */}
              {showHomeButton && (
                <motion.a
                  href="/"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="block w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-lg rounded-xl transition-all hover:scale-105 text-center"
                >
                  Return Home, You Must
                </motion.a>
              )}

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-green-500/20 rounded-full blur-2xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
