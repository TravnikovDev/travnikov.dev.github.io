import React from 'react';
import { Title, Text, Stack, Button, Group, Container, Grid, Box, Badge } from '@mantine/core';
import { keyframes } from '@emotion/react';
import { Link } from 'gatsby';
import HeroAnimation from './HeroAnimation';
import { motion } from 'framer-motion';

// Enhanced keyframes for animated elements
const fadeInUp = keyframes({
  '0%': { opacity: 0, transform: 'translateY(30px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' }
});

const pulseGlow = keyframes({
  '0%': { boxShadow: '0 0 0 0 rgba(34, 144, 224, 0.6)' },
  '50%': { boxShadow: '0 0 20px 5px rgba(34, 144, 224, 0.2)' },
  '100%': { boxShadow: '0 0 0 0 rgba(34, 144, 224, 0.6)' }
});

const shimmer = keyframes({
  '0%': { backgroundPosition: '200% 0' },
  '100%': { backgroundPosition: '-200% 0' }
});

// Staggered animation variants for text reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: 'spring', 
      stiffness: 100,
      damping: 10
    }
  }
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    y: -5,
    transition: { 
      type: 'spring', 
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.98 }
};

export default function HeroSection() {
  return (
    <Container size="xl" py={{ base: 'md', sm: 'xl' }} mt={{ base: 20, sm: 30 }}>
      <Grid gutter={{ base: 20, sm: 40 }} align="center">
        <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Stack spacing={{ base: 'lg', sm: 'xl' }} h="100%" justify="center">
              <motion.div variants={itemVariants}>
                <Box mb="xs">
                  <Badge 
                    size="lg" 
                    radius="sm"
                    variant="gradient" 
                    gradient={{ from: 'primary', to: 'secondary', deg: 45 }}
                    style={{ 
                      textTransform: 'none',
                      padding: '8px 16px',
                    }}
                  >
                    Senior Frontend Developer
                  </Badge>
                </Box>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Title
                  order={1}
                  mb={{ base: 'md', sm: 'lg' }}
                  sx={(theme) => ({
                    fontSize: { base: '2.8rem', sm: '3.8rem' },
                    lineHeight: 1.1,
                    background: 'var(--mantine-primary-gradient)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.5px',
                    fontWeight: 800,
                    animation: `${shimmer} 8s ease-in-out infinite`,
                    textShadow: '0 0 30px rgba(34, 144, 224, 0.1)',
                  })}
                >
                  Roman Travnikov
                </Title>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Text 
                  size="xl" 
                  mb={{ base: 'xl', sm: '2rem' }}
                  sx={{ 
                    lineHeight: 1.8,
                    maxWidth: '540px',
                    color: 'rgba(255, 255, 255, 0.85)',
                  }}
                >
                  I craft <Box component="span" fw={700} sx={{ color: 'var(--mantine-color-primary-5)' }}>innovative</Box> and 
                  <Box component="span" fw={700} sx={{ color: 'var(--mantine-color-secondary-5)' }}> high-performance</Box> user interfaces 
                  with 10+ years of experience. My expertise spans across React, TypeScript, and 
                  modern frontend technologies to create exceptional user experiences.
                </Text>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Group gap="md" mt={{ base: 5, sm: 10 }}>
                  <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button 
                      component={Link} 
                      to="/projects" 
                      size="xl"
                      radius="md"
                      px={30}
                      sx={(theme) => ({
                        background: 'var(--mantine-primary-gradient)',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(34, 144, 224, 0.6)',
                        animation: `${pulseGlow} 3s infinite`,
                        height: '60px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        '&:active': {
                          transform: 'translateY(2px)',
                        }
                      })}
                    >
                      View My Projects
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button 
                      component={Link} 
                      to="/contact" 
                      variant="outline" 
                      size="xl"
                      radius="md"
                      px={30}
                      sx={{
                        borderWidth: 2,
                        height: '60px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderColor: 'var(--mantine-color-secondary-6)',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                        letterSpacing: '0.5px',
                        '&:active': {
                          transform: 'translateY(2px)',
                        }
                      }}
                    >
                      Get in Touch
                    </Button>
                  </motion.div>
                </Group>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                style={{ marginTop: '1.5rem' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.9rem',
                  }}
                >
                  <Box
                    sx={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'var(--mantine-color-primary-6)',
                      boxShadow: '0 0 10px var(--mantine-color-primary-6)',
                      animation: `${pulseGlow} 2s infinite`,
                    }}
                  />
                  Available for new opportunities
                </Box>
              </motion.div>
            </Stack>
          </motion.div>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              type: 'spring',
              stiffness: 100
            }}
          >
            <Box
              sx={{
                position: 'relative',
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              <HeroAnimation />
              
              {/* Enhanced glow effect behind the animation */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '70%',
                  background: 'radial-gradient(ellipse at center, rgba(34, 144, 224, 0.2) 0%, rgba(132, 34, 224, 0.15) 40%, rgba(0, 0, 0, 0) 80%)',
                  filter: 'blur(60px)',
                  zIndex: -1,
                  top: '15%',
                  left: '0%',
                  transform: 'translateZ(-10px) rotateX(10deg)',
                  animation: `${pulseGlow} 4s infinite alternate`,
                }}
              />
            </Box>
          </motion.div>
        </Grid.Col>
      </Grid>
    </Container>
  );
}