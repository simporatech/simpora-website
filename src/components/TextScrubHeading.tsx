import React from 'react';
import { motion } from 'motion/react';

interface TextScrubHeadingProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  accentWord?: string;
}

export const TextScrubHeading: React.FC<TextScrubHeadingProps> = ({
  text,
  className = '',
  as = 'h2',
  accentWord,
}) => {
  const words = text.split(' ');
  const Component = motion[as] as any;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.035, // Rápido y fluido
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      style={{ willChange: 'transform, opacity' }}
      className={`font-display font-extrabold tracking-tight ${className}`}
    >
      {words.map((word, i) => {
        const isAccent = accentWord
          ? word.toLowerCase().includes(accentWord.toLowerCase())
          : false;

        return (
          <motion.span
            key={`${word}-${i}`}
            variants={wordVariants}
            style={{ willChange: 'transform, opacity' }}
            className={`inline-block mr-[0.26em] last:mr-0 ${
              isAccent ? 'text-[#121212] font-black' : 'text-[#121212]'
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </Component>
  );
};

