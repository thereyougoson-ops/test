import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function Parallax3DSection({ children, className = '', intensity = 50 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [intensity, -intensity]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className={`relative ${className}`} style={{ perspective: '1000px' }}>
      <motion.div
        style={{
          y: springY,
          opacity,
          scale: springScale,
          rotateX,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function FadeInOnScroll({ children, className = '', delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const directions = {
    up: { y: [50, 0] },
    down: { y: [-50, 0] },
    left: { x: [50, 0] },
    right: { x: [-50, 0] },
  };

  const transform = directions[direction];
  const y = transform.y ? useTransform(scrollYProgress, [0, 1], transform.y) : 0;
  const x = transform.x ? useTransform(scrollYProgress, [0, 1], transform.x) : 0;
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, x, opacity, transitionDelay: `${delay}ms` }}>
        {children}
      </motion.div>
    </div>
  );
}

export function ScaleOnScroll({ children, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const springScale = useSpring(scale, { stiffness: 100, damping: 20 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale: springScale, opacity }}>
        {children}
      </motion.div>
    </div>
  );
}

export function RotateOnScroll({ children, className = '', rotateAmount = 10 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-rotateAmount, rotateAmount]);
  const springRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ rotate: springRotate }}>
        {children}
      </motion.div>
    </div>
  );
}

export function FloatingElement({ children, className = '', amplitude = 20, duration = 3 }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}
