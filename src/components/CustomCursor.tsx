import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ultra-responsive spring physics for the precision cursor dot
  const cursorSpringConfig = { damping: 28, stiffness: 450, mass: 0.2 };
  const cursorX = useSpring(mouseX, cursorSpringConfig);
  const cursorY = useSpring(mouseY, cursorSpringConfig);

  // Soft, fluid spring physics for the ambient background glow
  const glowSpringConfig = { damping: 35, stiffness: 180, mass: 0.8 };
  const glowX = useSpring(mouseX, glowSpringConfig);
  const glowY = useSpring(mouseY, glowSpringConfig);

  // Slightly lagged spring for the outer precision ring
  const ringSpringConfig = { damping: 24, stiffness: 260, mass: 0.4 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    // Only activate custom cursor on desktop/fine-pointer devices
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerFine(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerFine(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable or interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, label, [data-interactive]')
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-4), newRipple]); // Keep up to 5 concurrent ripples
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  if (!isPointerFine) return null;

  return (
    <>
      {/* 1. Ambient Mouse Hover Glow (High Z-index, illuminates everywhere over all sections) */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? (isHovered ? 0.65 : 0.45) : 0,
        }}
        className="fixed top-0 left-0 pointer-events-none z-[99997] transition-opacity duration-300 will-change-transform"
      >
        <div className="w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(151,242,204,0.25)_0%,rgba(151,242,204,0.08)_35%,transparent_65%)]" />
      </motion.div>

      {/* 2. Quantum Click Ripple Wave (Onda cuántica menta suave al hacer clic) */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          initial={{ scale: 0.2, opacity: 0.9 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            left: r.x,
            top: r.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="fixed pointer-events-none z-[99998] w-8 h-8 rounded-full border border-[#97F2CC] bg-[#97F2CC]/25 shadow-[0_0_15px_#97F2CC]"
        />
      ))}

      {/* 3. Precision Outer Interactive Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovered ? 1.65 : 1,
          borderColor: isHovered ? '#97F2CC' : 'rgba(18, 18, 18, 0.45)',
          backgroundColor: isHovered ? 'rgba(151, 242, 204, 0.15)' : 'rgba(255, 255, 255, 0)',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="fixed top-0 left-0 pointer-events-none z-[99999] w-7 h-7 rounded-full border border-zinc-800/40 will-change-transform flex items-center justify-center"
      />

      {/* 4. Core High-Tech Precision Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovered ? 0.6 : 1,
          backgroundColor: isHovered ? '#121212' : '#97F2CC',
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 pointer-events-none z-[99999] w-2 h-2 rounded-full shadow-[0_0_8px_#97F2CC] will-change-transform"
      />
    </>
  );
};
