import React from 'react';
import { Box, Title } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import { gradientShift } from './AnimationKeyframes';

const Logo: React.FC = () => {
  const { hovered: logoHovered, ref: logoRef } = useHover();

  // Logo animation
  const logoVariants = {
    normal: { rotate: 0, scale: 1 },
    hover: { rotate: 10, scale: 1.15, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      ref={logoRef as React.RefObject<HTMLDivElement>}
      variants={logoVariants}
      animate={logoHovered ? "hover" : "normal"}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <Link 
        to="/" 
        style={{ 
          textDecoration: 'none', 
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        {/* Enhanced funky logo with stronger glow effect and 3D feel */}
        <Box
          sx={{
            background: 'var(--mantine-animated-gradient)',
            backgroundSize: '300% 100%',
            animation: `${gradientShift} 8s ease infinite`,
            width: 48, // Larger
            height: 48, // Larger
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', // Organic shape
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '20px', // Larger text
            fontFamily: '"Clash Display", sans-serif', // Quirky font
            color: 'white',
            letterSpacing: '-0.03em',
            transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
            boxShadow: logoHovered ? 
              '0 0 30px rgba(0, 120, 240, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.4)' : 
              '0 0 15px rgba(0, 120, 240, 0.4), inset 0 0 5px rgba(255, 255, 255, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            transform: logoHovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0) scale(1)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
              opacity: logoHovered ? 0.8 : 0.3,
              transition: 'opacity 0.3s ease',
            }
          }}
        >
          RT
        </Box>
        <Title 
          order={3}
          sx={{
            background: 'var(--mantine-animated-gradient)',
            backgroundSize: '300% 100%',
            animation: `${gradientShift} 8s ease infinite`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { base: '1.4rem', md: '1.7rem' }, // Larger
            fontWeight: 800, // Bolder
            fontFamily: '"Clash Display", sans-serif', // Quirky font
            letterSpacing: '-0.03em',
            textShadow: '0 0 15px rgba(0, 120, 240, 0.2)', // Subtle glow
            transform: logoHovered ? 'translateX(3px)' : 'translateX(0)',
            transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          travnikov.dev
        </Title>
      </Link>
    </motion.div>
  );
};

export default Logo;