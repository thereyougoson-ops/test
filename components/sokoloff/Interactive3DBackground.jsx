import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function Interactive3DBackground() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  
  const springRotateX = useSpring(rotateX, { stiffness: 50, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating 3D Geometric Shapes */}
      <motion.div
        className="absolute top-20 left-[10%] w-32 h-32"
        style={{
          perspective: '1000px',
          rotateX: springRotateX,
          x: mousePosition.x * 30 - 15,
          y: mousePosition.y * 30 - 15,
        }}
      >
        <div 
          className="w-full h-full border border-red-500/20 rotate-45"
          style={{
            transform: `rotateX(${mousePosition.y * 20}deg) rotateY(${mousePosition.x * 20}deg)`,
            boxShadow: '0 0 40px rgba(239, 68, 68, 0.1)',
          }}
        />
      </motion.div>

      <motion.div
        className="absolute top-[40%] right-[15%] w-24 h-24"
        animate={{
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          x: mousePosition.x * -40 + 20,
          y: mousePosition.y * -40 + 20,
        }}
      >
        <div className="w-full h-full border-2 border-white/10 rounded-full" />
        <div className="absolute inset-4 border border-red-500/30 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-[30%] left-[20%] w-40 h-40"
        style={{
          x: mousePosition.x * 50 - 25,
          y: mousePosition.y * 50 - 25,
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{
            rotateX: [0, 180, 360],
            rotateY: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
        >
          {/* 3D Cube faces */}
          <div className="absolute inset-0 border border-zinc-700/30" style={{ transform: 'translateZ(20px)' }} />
          <div className="absolute inset-0 border border-zinc-700/20" style={{ transform: 'translateZ(-20px)' }} />
        </motion.div>
      </motion.div>

      {/* Floating orbs with glow */}
      <motion.div
        className="absolute top-[60%] right-[30%] w-4 h-4 rounded-full bg-red-500/50"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)',
        }}
      />

      <motion.div
        className="absolute top-[25%] left-[40%] w-3 h-3 rounded-full bg-white/30"
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
        style={{
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
        }}
      />

      <motion.div
        className="absolute bottom-[20%] right-[10%] w-6 h-6 rounded-full bg-red-500/30"
        animate={{
          y: [0, -40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
        style={{
          boxShadow: '0 0 40px rgba(239, 68, 68, 0.4)',
        }}
      />

      {/* Grid lines with parallax */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -200]),
        }}
      >
        {[...Array(10)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent"
            style={{ top: `${(i + 1) * 10}%` }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-zinc-500 to-transparent"
            style={{ left: `${(i + 1) * 10}%` }}
          />
        ))}
      </motion.div>
    </div>
  );
}
