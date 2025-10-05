'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Zap } from 'lucide-react';

const CODE_SNIPPETS = [
  'const greeting = "Hello, World!";',
  'function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }',
  'const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);',
  'let sum = arr.reduce((acc, val) => acc + val, 0);',
  'const isPrime = num => { for(let i = 2; i < num; i++) if(num % i === 0) return false; return num > 1; }',
];

interface TypingStats {
  wpm: number;
  accuracy: number;
  date: string;
}

export default function TypingTestGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerCount, setTriggerCount] = useState(0);
  const [currentSnippet, setCurrentSnippet] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [stats, setStats] = useState<TypingStats | null>(null);
  const [bestScore, setBestScore] = useState<TypingStats | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load best score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('typingTestBestScore');
    if (saved) {
      setBestScore(JSON.parse(saved));
    }
  }, []);

  // Detect "typing" typed 3 times
  useEffect(() => {
    let buffer = '';
    
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only track when game is not open
      if (isOpen) return;
      
      buffer += e.key.toLowerCase();
      
      // Keep only last 20 characters
      if (buffer.length > 20) {
        buffer = buffer.slice(-20);
      }
      
      // Check if "typing" appears
      if (buffer.includes('typing')) {
        setTriggerCount(prev => prev + 1);
        buffer = ''; // Reset buffer after detection
        
        // Reset trigger count after 5 seconds
        if (triggerTimerRef.current) {
          clearTimeout(triggerTimerRef.current);
        }
        triggerTimerRef.current = setTimeout(() => {
          setTriggerCount(0);
        }, 5000);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
      if (triggerTimerRef.current) {
        clearTimeout(triggerTimerRef.current);
      }
    };
  }, [isOpen]);

  // Open game when typed 3 times
  useEffect(() => {
    if (triggerCount >= 3 && !isOpen) {
      startNewGame();
      setTriggerCount(0);
    }
  }, [triggerCount, isOpen]);

  const startNewGame = () => {
    const randomSnippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
    setCurrentSnippet(randomSnippet);
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setIsComplete(false);
    setStats(null);
    setIsOpen(true);
    
    // Focus input after a short delay
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Start timer on first character
    if (!startTime && value.length === 1) {
      setStartTime(Date.now());
    }

    setUserInput(value);

    // Check if complete
    if (value === currentSnippet) {
      const end = Date.now();
      setEndTime(end);
      setIsComplete(true);
      calculateStats(end);
    }
  };

  const calculateStats = (end: number) => {
    if (!startTime) return;

    const timeInMinutes = (end - startTime) / 1000 / 60;
    const words = currentSnippet.split(' ').length;
    const wpm = Math.round(words / timeInMinutes);

    // Calculate accuracy
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === currentSnippet[i]) correct++;
    }
    const accuracy = Math.round((correct / currentSnippet.length) * 100);

    const newStats = {
      wpm,
      accuracy,
      date: new Date().toLocaleDateString(),
    };

    setStats(newStats);

    // Update best score if better
    if (!bestScore || wpm > bestScore.wpm) {
      setBestScore(newStats);
      localStorage.setItem('typingTestBestScore', JSON.stringify(newStats));
    }
  };

  const getCharacterClass = (index: number) => {
    if (index >= userInput.length) return 'text-gray-500';
    if (userInput[index] === currentSnippet[index]) return 'text-green-400';
    return 'text-red-400';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 z-[9998] backdrop-blur-sm"
          />

          {/* Game Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-3xl max-h-[90vh] overflow-y-auto px-4"
          >
            <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 rounded-3xl shadow-2xl border-2 border-purple-500/50 p-8">
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-yellow-400 mr-2" />
                  <h2 className="text-4xl font-black text-white">Typing Speed Test</h2>
                  <Zap className="w-8 h-8 text-yellow-400 ml-2" />
                </div>
                <p className="text-purple-200">Type the code snippet as fast as you can!</p>
              </div>

              {/* Code to type */}
              <div className="bg-black/40 rounded-2xl p-6 mb-6 font-mono text-lg">
                <div className="mb-4 text-center">
                  {currentSnippet.split('').map((char, index) => (
                    <span key={index} className={getCharacterClass(index)}>
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              {/* Input */}
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                disabled={isComplete}
                placeholder="Start typing..."
                className="w-full px-6 py-4 bg-white/10 border-2 border-purple-400/50 rounded-xl text-white placeholder-gray-400 font-mono text-lg focus:outline-none focus:border-purple-400 disabled:opacity-50"
              />

              {/* Stats */}
              {isComplete && stats && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border-2 border-green-400/50">
                    <div className="flex items-center justify-center mb-4">
                      <Trophy className="w-8 h-8 text-yellow-400 mr-2" />
                      <h3 className="text-2xl font-bold text-white">Complete!</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-gray-300 text-sm">Speed</p>
                        <p className="text-4xl font-black text-green-400">{stats.wpm}</p>
                        <p className="text-gray-400 text-xs">WPM</p>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">Accuracy</p>
                        <p className="text-4xl font-black text-blue-400">{stats.accuracy}%</p>
                        <p className="text-gray-400 text-xs">Correct</p>
                      </div>
                    </div>

                    {bestScore && stats.wpm >= bestScore.wpm && (
                      <p className="text-center mt-4 text-yellow-300 font-bold">
                        🎉 New Personal Best!
                      </p>
                    )}

                    <button
                      onClick={startNewGame}
                      className="mt-4 w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all"
                    >
                      Try Again
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Best Score Display */}
              {bestScore && !isComplete && (
                <div className="mt-4 text-center text-sm text-purple-200">
                  Personal Best: <span className="font-bold text-yellow-400">{bestScore.wpm} WPM</span> at{' '}
                  <span className="font-bold">{bestScore.accuracy}% accuracy</span>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
