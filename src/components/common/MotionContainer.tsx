'use client';

import { motion, useInView } from 'framer-motion';
import React, { ReactNode, useRef, useEffect, useState, useCallback } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

interface MotionContainerProps {
  children: ReactNode;
  direction?: Direction;
  duration?: number;
  delay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

export const MotionContainer: React.FC<MotionContainerProps> = ({
  children,
  direction = 'up',
  duration = 0.5,
  delay = 0,
  className = '',
  once = true,
  amount = 50,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const prevScrollYRef = useRef(0);
  const lastScrollTime = useRef(0);
  const throttleDelay = 100; // Throttle to 100ms

  // Define animation variants
  const getVariants = () => {
    const variants = {
      hidden: {},
      visible: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    };

    switch (direction) {
      case 'up':
        variants.hidden = { y: amount, opacity: 0 };
        break;
      case 'down':
        variants.hidden = { y: -amount, opacity: 0 };
        break;
      case 'left':
        variants.hidden = { x: amount, opacity: 0 };
        break;
      case 'right':
        variants.hidden = { x: -amount, opacity: 0 };
        break;
    }

    return variants;
  };

  const handleScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollTime.current < throttleDelay) return;
    lastScrollTime.current = now;

    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > prevScrollYRef.current;

    if (isScrollingDown && isInView && (!hasAnimated || !once)) {
      setShouldAnimate(true);
      if (once) setHasAnimated(true);
    } else if (!isScrollingDown && !once) {
      setShouldAnimate(false);
    }

    prevScrollYRef.current = currentScrollY;
  }, [isInView, hasAnimated, once]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only add listener if animation hasn’t completed (for once=true) or if repeatable (once=false)
    if (!once || !hasAnimated) {
      window.addEventListener('scroll', handleScroll);
    }

    // Initial check when element comes into view
    if (isInView && !hasAnimated) {
      setShouldAnimate(true);
      if (once) setHasAnimated(true);
    }

    // Cleanup: Remove listener when unmounting or animation completes
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, isInView, hasAnimated, once]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
};