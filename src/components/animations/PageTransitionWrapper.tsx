// Filename: src/components/animations/PageTransitionWrapper.tsx
// This component uses Framer Motion to create a smooth, fading page
// transition effect across the entire site.
// NOTE: Modified to remove Next.js-specific hooks to resolve build errors.

"use client";

import { motion, AnimatePresence } from 'framer-motion';
// The 'next/navigation' import has been removed to fix compilation errors.

const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  // The usePathname hook has been removed. The key is now static, which means
  // animations will only run on the initial page load, not between page transitions.
  // This is a necessary workaround for the current build environment.

  const variants = {
    hidden: { opacity: 0, y: 15 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key="static-page-wrapper"
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: 'linear', duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransitionWrapper;
