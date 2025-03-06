import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellFooter,
  Burger,
  Group,
  Title,
  Button,
  Text,
  Drawer,
  Stack,
  Divider,
  ActionIcon,
  useMantineTheme,
  Transition,
  Paper,
  Tooltip,
  ThemeIcon,
  rem,
  Grid,
} from "@mantine/core";
import { keyframes } from "@emotion/react";
import { useDisclosure, useWindowScroll, useHover } from "@mantine/hooks";
import { Link } from "gatsby";
import { motion } from "framer-motion";

// Enhanced animation keyframes
const fadeInDown = keyframes({
  "0%": { opacity: 0, transform: "translateY(-10px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const glowPulse = keyframes({
  "0%": { boxShadow: "0 0 5px rgba(34, 144, 224, 0.2)" },
  "50%": { boxShadow: "0 0 15px rgba(34, 144, 224, 0.4)" },
  "100%": { boxShadow: "0 0 5px rgba(34, 144, 224, 0.2)" },
});

const pulseGlow = keyframes({
  "0%": { boxShadow: "0 0 0 0 rgba(0, 120, 240, 0.4)" },
  "50%": { boxShadow: "0 0 15px 5px rgba(0, 120, 240, 0.2)" },
  "100%": { boxShadow: "0 0 0 0 rgba(0, 120, 240, 0.4)" },
});

const gradientShift = keyframes({
  "0%": { backgroundPosition: "0% 50%" },
  "50%": { backgroundPosition: "100% 50%" },
  "100%": { backgroundPosition: "0% 50%" },
});

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [scroll] = useWindowScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useMantineTheme();
  const { hovered: logoHovered, ref: logoRef } = useHover();

  // Update header style on scroll
  useEffect(() => {
    setIsScrolled(scroll.y > 20);
  }, [scroll.y]);

  // Simple path-based check for active links
  const isActive = (path: string) => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      // Handle the home page separately
      if (path === '/' && currentPath === '/') return true;
      // For other pages, check if the currentPath starts with the given path
      // But not for the home page to avoid matching all paths
      return path !== '/' && currentPath.startsWith(path);
    }
    return false;
  };

  // Navbar animation variants
  const navVariants = {
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: 0.2, 
        duration: 0.5, 
        ease: "easeOut" 
      } 
    },
    hidden: { 
      opacity: 0, 
      y: -20, 
      transition: { 
        duration: 0.5 
      } 
    }
  };

  // Logo animation
  const logoVariants = {
    normal: { rotate: 0, scale: 1 },
    hover: { rotate: 10, scale: 1.15, transition: { duration: 0.3 } }
  };

  // Navigation items and their icons
  const navItems = [
    { label: 'Projects', path: '/projects', color: 'primary' },
    { label: 'Blog', path: '/blog', color: 'secondary' },
    { label: 'Experiments', path: '/experiments', color: 'accent' }
  ];

  // Social links with improved styling
  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/TravnikovDev',
      icon: '📂',
      hoverColor: '#2290E0'
    },
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/roman-travnikov/',
      icon: '🔗', 
      hoverColor: '#8422E0'
    },
    { 
      name: 'Instagram', 
      url: 'https://instagram.com/travnikov.dev',
      icon: '📷',
      hoverColor: '#F01F24' 
    }
  ];

  return (
    <AppShell
      header={{ height: { base: 70, md: 80 } }}
      footer={{ height: { base: 100, md: 90 } }}
      padding="0" // Reduced padding to allow full-width sections
    >
      <AppShellHeader
        style={{
          borderBottom: isScrolled ? `1px solid rgba(255, 255, 255, 0.1)` : 'none',
          background: isScrolled ? 'rgba(12, 12, 18, 0.5)' : 'transparent', // Even more transparent
          backdropFilter: isScrolled ? 'blur(25px) saturate(200%)' : 'none', // Enhanced blur
          boxShadow: isScrolled ? 
            '0 15px 40px rgba(0, 0, 0, 0.25), 0 0 20px rgba(0, 120, 240, 0.15)' : 
            'none', // More dramatic glow
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)', // More dynamic transition
          zIndex: 'var(--mantine-z-navbar)',
          transform: isScrolled ? 'translateY(0)' : 'translateY(-100%)', // Slide-in effect on scroll
          opacity: isScrolled ? 1 : 0, // Fade in on scroll
          position: 'fixed',
          width: '100%',
          top: 0,
          // Add gradient highlight
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0, 120, 240, 0.5), transparent)',
            opacity: isScrolled ? 1 : 0,
            transition: 'opacity 0.6s ease',
          },
          // Add animated gradient 
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(0, 120, 240, 0.03), transparent 20%, rgba(112, 0, 224, 0.03), transparent 70%, rgba(0, 120, 240, 0.03))',
            backgroundSize: '400% 400%',
            animation: 'gradientAnimation 15s ease infinite',
            zIndex: -1,
            opacity: isScrolled ? 1 : 0,
            transition: 'opacity 0.6s ease',
          },
          '@keyframes gradientAnimation': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          }
        }}
      >
        <Container size="xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={navVariants}
          >
            <Group justify="space-between" h="100%" py={10}>
              <Group>
                <Burger 
                  opened={drawerOpened} 
                  onClick={toggleDrawer} 
                  hiddenFrom="md" 
                  size="sm"
                  color="var(--mantine-color-primary-6)"
                />
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
              </Group>
              
              {/* Enhanced Desktop Navigation */}
              <Group gap="lg" visibleFrom="md">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.3 + (index * 0.1),
                      duration: 0.5,
                      type: 'spring',
                      stiffness: 100,
                    }}
                  >
                    <Button 
                      component={Link} 
                      to={item.path} 
                      variant={isActive(item.path) ? "light" : "subtle"}
                      size="md"
                      sx={(theme) => ({
                        position: 'relative',
                        color: isActive(item.path) 
                          ? `var(--mantine-color-${item.color}-5)` 
                          : theme.colorScheme === 'dark' 
                            ? theme.colors.dark[0] 
                            : theme.colors.gray[7],
                        fontWeight: 700, // Bolder
                        fontSize: '1.1rem', // Larger
                        padding: '10px 20px', // More padding
                        letterSpacing: '-0.01em',
                        fontFamily: '"Cabinet Grotesk", sans-serif', // Quirky font
                        backdropFilter: isActive(item.path) ? 'blur(10px)' : 'none',
                        backgroundColor: isActive(item.path) 
                          ? 'rgba(255, 255, 255, 0.07)' 
                          : 'transparent',
                        boxShadow: isActive(item.path)
                          ? `0 8px 20px rgba(0, 0, 0, 0.1), 0 0 10px var(--mantine-color-${item.color}-6)`
                          : 'none',
                        borderRadius: theme.radius.xl,
                        border: isActive(item.path) 
                          ? `1px solid rgba(var(--mantine-color-${item.color}-6-rgb), 0.3)` 
                          : '1px solid transparent',
                        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        transform: isActive(item.path) ? 'translateY(-2px)' : 'translateY(0)',
                        
                        // Glowing underline with improved effect
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          left: '10%',
                          right: '10%',
                          bottom: 6,
                          height: 3,
                          borderRadius: 4,
                          background: `var(--mantine-color-${item.color}-6)`,
                          opacity: isActive(item.path) ? 0.9 : 0,
                          transform: isActive(item.path) ? 'scaleX(1)' : 'scaleX(0)',
                          transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease',
                          filter: `blur(1px) drop-shadow(0 0 5px var(--mantine-color-${item.color}-6))`,
                        },
                        
                        // Improved hover effects
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.07)',
                          transform: 'translateY(-3px)',
                          boxShadow: `0 10px 25px rgba(0, 0, 0, 0.1), 0 0 10px var(--mantine-color-${item.color}-6)`,
                        },
                        '&:hover::after': {
                          opacity: 0.7,
                          transform: 'scaleX(1)',
                        }
                      })}
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.6,
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    transition: { duration: 0.2 }
                  }}
                >
                  <Button 
                    component={Link} 
                    to="/contact" 
                    variant="gradient" 
                    gradient={{ from: 'primary', to: 'secondary', deg: 45 }}
                    radius="xl"
                    size="md"
                    px={30} // More horizontal padding
                    sx={{
                      height: 48, // Taller
                      fontSize: '1.1rem', // Larger text
                      fontWeight: 700, // Bolder
                      letterSpacing: '-0.01em',
                      fontFamily: '"Cabinet Grotesk", sans-serif', // Quirky font
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 120, 240, 0.3)', // Enhanced glow
                      border: '2px solid rgba(255, 255, 255, 0.2)', // More visible border
                      transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      animation: `${glowPulse} 4s infinite cubic-bezier(0.4, 0, 0.6, 1)`, // Smoother animation
                      position: 'relative',
                      overflow: 'hidden',
                      
                      // Shine effect overlay
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: -100,
                        width: '70px',
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.3)',
                        transform: 'skewX(-30deg)',
                        filter: 'blur(10px)',
                        animation: 'shine 5s infinite',
                      },
                      
                      // Enhanced hover state
                      '&:hover': {
                        transform: 'translateY(-5px) scale(1.03)',
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2), 0 0 30px rgba(0, 120, 240, 0.5)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                      },
                      
                      // Active/pressed state
                      '&:active': {
                        transform: 'translateY(3px)',
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 120, 240, 0.4)',
                        transition: 'all 0.1s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      },
                      
                      '@keyframes shine': {
                        '0%': { left: '-100px' },
                        '20%': { left: '100%' },
                        '100%': { left: '100%' },
                      },
                    }}
                  >
                    Contact
                  </Button>
                </motion.div>
              </Group>
            </Group>
          </motion.div>
        </Container>
      </AppShellHeader>
      
      {/* Enhanced Mobile Navigation Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="xl"
        title={
          <Title 
            order={2}
            sx={{
              background: 'var(--mantine-primary-gradient)',
              backgroundSize: '200% 200%',
              animation: `${gradientShift} 5s ease infinite`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.75rem',
              fontWeight: 800,
              letterSpacing: '-0.5px',
            }}
          >
            travnikov.dev
          </Title>
        }
        zIndex={1000}
        overlayProps={{ opacity: 0.7, blur: 2 }}
        transitionProps={{ duration: 300, transition: 'slide-right' }}
      >
        <Divider 
          my="lg" 
          labelPosition="center" 
          size="md"
          sx={{ 
            opacity: 0.5,
            '&::before, &::after': {
              borderTop: '2px solid rgba(255, 255, 255, 0.1)',
            } 
          }}
        />
        
        <Stack spacing="sm" mb={40}>
          {[
            { label: 'Home', path: '/' },
            ...navItems,
            { label: 'Contact', path: '/contact', color: 'primary' }
          ].map((item, index) => (
            <Paper
              key={item.path}
              shadow="sm"
              radius="md"
              p={0}
              sx={{
                overflow: 'hidden',
                transition: 'transform 0.2s ease',
                transform: isActive(item.path) ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              <Button 
                component={Link} 
                to={item.path}
                fullWidth
                size="xl"
                radius="md"
                variant={isActive(item.path) ? "gradient" : "subtle"}
                gradient={isActive(item.path) ? { from: 'primary', to: 'secondary', deg: 45 } : undefined}
                onClick={closeDrawer}
                sx={{
                  height: 60,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  boxShadow: isActive(item.path) ? '0 5px 15px rgba(0, 0, 0, 0.1)' : 'none',
                  animation: isActive(item.path) ? `${glowPulse} 3s infinite` : 'none',
                }}
              >
                {item.label}
              </Button>
            </Paper>
          ))}
        </Stack>
        
        <Divider 
          my="xl" 
          label="Connect with me" 
          labelPosition="center"
          labelProps={{ 
            size: 'lg',
            weight: 600,
            sx: { 
              opacity: 0.8,
              color: 'var(--mantine-color-primary-5)',
            }
          }}
          size="sm"
          sx={{ 
            opacity: 0.5,
            '&::before, &::after': {
              borderTop: '2px solid rgba(255, 255, 255, 0.1)',
            } 
          }}
        />
        
        <Group justify="center" my="xl" gap="xl">
          {socialLinks.map((link, index) => (
            <Tooltip 
              key={link.name} 
              label={link.name}
              position="bottom"
              withArrow
            >
              <ActionIcon 
                component="a" 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                variant="light"
                size={60}
                radius="xl"
                sx={{
                  transition: 'all 0.3s ease',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-5px)',
                    boxShadow: `0 8px 20px rgba(0, 0, 0, 0.15), 0 0 15px ${link.hoverColor}40`,
                  }
                }}
              >
                <Text size={30}>{link.icon}</Text>
              </ActionIcon>
            </Tooltip>
          ))}
        </Group>
      </Drawer>
      
      <AppShellMain>
        {children}
      </AppShellMain>
      
      {/* Fully enhanced footer with depth, lighting effects and GitHub activity */}
      <AppShellFooter
        sx={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'linear-gradient(180deg, rgba(15, 16, 21, 0) 0%, rgba(15, 16, 21, 0.9) 30%, rgba(15, 16, 21, 1) 100%)',
          backdropFilter: 'blur(15px)',
          position: 'relative',
          overflow: 'hidden',
          
          // Depth lighting effect
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '20%',
            right: '20%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0, 120, 240, 0.3), transparent)',
            filter: 'blur(2px)',
            zIndex: 1,
          },
          
          // Bottom glow
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -20,
            left: '30%',
            right: '30%',
            height: '30px',
            background: 'radial-gradient(ellipse at center, rgba(0, 120, 240, 0.15) 0%, transparent 70%)',
            filter: 'blur(10px)',
            zIndex: 0,
          }
        }}
      >
        <Container size="xl">
          <Grid py="xl" align="center">
            {/* Copyright with enhanced styling */}
            <Grid.Col span={{ base: 12, md: 4 }} order={{ base: 3, md: 1 }}>
              <Box
                sx={{
                  textAlign: { base: 'center', md: 'left' },
                  marginTop: { base: '1rem', md: 0 },
                }}
              >
                <Text
                  sx={{
                    fontSize: { base: '1rem', md: '1.1rem' },
                    fontWeight: 600,
                    fontFamily: '"Cabinet Grotesk", sans-serif',
                    letterSpacing: '-0.01em',
                    background: 'var(--mantine-animated-gradient)',
                    backgroundSize: '300% 100%',
                    animation: `${gradientShift} 8s ease infinite`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 10px rgba(0, 120, 240, 0.2)',
                  }}
                >
                  © {new Date().getFullYear()} Roman Travnikov
                </Text>
                <Text 
                  size="sm" 
                  c="dimmed" 
                  mt={5}
                  sx={{
                    fontFamily: '"Cabinet Grotesk", sans-serif',
                  }}
                >
                  Made with 🔥 and React
                </Text>
              </Box>
            </Grid.Col>
            
            {/* Social links with enhanced styling */}
            <Grid.Col span={{ base: 12, md: 4 }} order={{ base: 1, md: 2 }}>
              <Group justify="center" gap="xl">
                {socialLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ 
                      y: -5, 
                      transition: { duration: 0.2, type: "spring", stiffness: 500 } 
                    }}
                  >
                    <Link 
                      to={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        textDecoration: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          boxShadow: `0 5px 15px rgba(0, 0, 0, 0.1), 0 0 10px ${link.hoverColor}20`,
                          transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.1)',
                            boxShadow: `0 8px 25px rgba(0, 0, 0, 0.1), 0 0 20px ${link.hoverColor}40`,
                          }
                        }}
                      >
                        {link.icon}
                      </Box>
                      <Text
                        size="sm"
                        sx={{
                          fontWeight: 600,
                          fontFamily: '"Cabinet Grotesk", sans-serif',
                          color: link.hoverColor,
                          transition: 'color 0.2s ease',
                        }}
                      >
                        {link.name}
                      </Text>
                    </Link>
                  </motion.div>
                ))}
              </Group>
            </Grid.Col>
            
            {/* GitHub Activity Feed - Enhanced and More Interactive */}
            <Grid.Col span={{ base: 12, md: 4 }} order={{ base: 2, md: 3 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <Box
                  sx={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '16px',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15), 0 0 15px rgba(0, 120, 240, 0.1)',
                    height: '130px',
                    position: 'relative',
                    overflow: 'hidden',
                    transform: 'translateZ(0)',
                    transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 120, 240, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    },
                    
                    // Enhanced glow effect
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'radial-gradient(circle at bottom right, rgba(0, 120, 240, 0.15), transparent 70%), radial-gradient(circle at top left, rgba(112, 0, 224, 0.1), transparent 60%)',
                      zIndex: 0,
                    }
                  }}
                >
                  <Group position="apart" mb="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <Text 
                      size="sm" 
                      weight={700}
                      sx={{
                        fontFamily: '"Clash Display", sans-serif',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Box 
                        component="span" 
                        sx={{ 
                          fontSize: '1.2rem',
                          background: 'linear-gradient(135deg, #0078F0, #0D8FFF)',
                          borderRadius: '50%',
                          width: '22px',
                          height: '22px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 0 10px rgba(0, 120, 240, 0.5)'
                        }}
                      >
                        🐙
                      </Box>
                      GitHub Activity
                    </Text>
                    <ActionIcon 
                      component="a" 
                      href="https://github.com/TravnikovDev" 
                      target="_blank"
                      variant="subtle"
                      size="sm"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': {
                          color: '#fff',
                          background: 'rgba(255, 255, 255, 0.1)',
                        }
                      }}
                    >
                      <Text size="xs">View Profile</Text>
                    </ActionIcon>
                  </Group>
                  
                  {/* Contribution grid - much more visually impressive */}
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', gap: '3px', marginBottom: '6px' }}>
                      {['M', 'W', 'F'].map((day, i) => (
                        <Text 
                          key={i} 
                          size="xs" 
                          sx={{ 
                            color: 'rgba(255, 255, 255, 0.4)', 
                            width: '12px', 
                            fontSize: '0.6rem',
                            textAlign: 'center'
                          }}
                        >
                          {day}
                        </Text>
                      ))}
                    </Box>
                    
                    {[...Array(4)].map((_, week) => (
                      <Group key={week} spacing={3} mb={3} noWrap>
                        {[...Array(7)].map((_, day) => {
                          // Create a visually interesting pattern - like a real GitHub activity grid
                          const intensity = Math.max(0.1, Math.min(0.9, 
                            Math.abs(Math.sin((week * 7 + day) * 0.5) * 0.7 + Math.random() * 0.3))
                          );
                          const delay = (week * 7 + day) * 0.05;
                          return (
                            <Box
                              key={day}
                              sx={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '2px',
                                background: `rgba(0, 120, 240, ${intensity})`,
                                boxShadow: `0 0 ${3 + intensity * 8}px rgba(0, 120, 240, ${intensity * 0.6})`,
                                transition: 'all 0.3s ease',
                                animation: `${pulseGlow} ${3 + intensity * 4}s infinite alternate`,
                                animationDelay: `${delay}s`,
                                '&:hover': {
                                  transform: 'scale(1.2)',
                                  background: `rgba(0, 120, 240, ${Math.min(1, intensity + 0.2)})`,
                                }
                              }}
                            />
                          );
                        })}
                      </Group>
                    ))}
                    
                    <Group position="apart" mt="xs" sx={{ opacity: 0.7 }}>
                      <Text size="xs" sx={{ fontSize: '0.65rem' }}>Less</Text>
                      <Box sx={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                        {[0.2, 0.4, 0.6, 0.8].map((intensity, i) => (
                          <Box
                            key={i}
                            sx={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '1px',
                              background: `rgba(0, 120, 240, ${intensity})`,
                            }}
                          />
                        ))}
                      </Box>
                      <Text size="xs" sx={{ fontSize: '0.65rem' }}>More</Text>
                    </Group>
                  </Box>
                </Box>
              </motion.div>
            </Grid.Col>
          </Grid>
        </Container>
      </AppShellFooter>
    </AppShell>
  );
}