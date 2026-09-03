import React from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'motion/react';

export const CyberGridWarp: React.FC = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // High-performance spring physics for ultra-smooth damping
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 40,
    stiffness: 220,
    mass: 0.3,
  });

  // Transform velocity into warp intensity (0 to 1)
  const warpIntensity = useTransform(smoothVelocity, [-2200, 0, 2200], [1, 0, 1]);
  const gridScaleY = useTransform(warpIntensity, [0, 1], [1, 1.8]);
  const warpOpacity = useTransform(warpIntensity, [0, 0.25, 1], [0.03, 0.08, 0.25]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden select-none">
      {/* 100% GPU-accelerated perspective grid scale without CPU timer loops */}
      <motion.div
        style={{
          scaleY: gridScaleY,
          opacity: warpOpacity,
        }}
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(151,242,204,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(18,18,18,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] transform-gpu"
      />
    </div>
  );
};
