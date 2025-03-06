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
          borderBottom: isScrolled ? `1px solid rgba(255, 255, 255, 0.05)` : 'none',
          background: isScrolled ? 'rgba(20, 21, 26, 0.85)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(15px)' : 'none',
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.15)' : 'none',
          transition: 'all 0.4s ease',
          zIndex: 1000,
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
                    {/* Enhanced logo with glow effect */}
                    <Box
                      sx={{
                        background: 'var(--mantine-primary-gradient)',
                        backgroundSize: '200% 200%',
                        animation: `${gradientShift} 5s ease infinite`,
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '18px',
                        color: 'white',
                        transition: 'all 0.3s ease',
                        boxShadow: logoHovered ? '0 0 15px rgba(34, 144, 224, 0.6)' : '0 0 5px rgba(34, 144, 224, 0.2)',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      RT
                    </Box>
                    <Title 
                      order={3}
                      sx={{
                        background: 'var(--mantine-primary-gradient)',
                        backgroundSize: '200% 200%',
                        animation: `${gradientShift} 5s ease infinite`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: { base: '1.25rem', md: '1.5rem' },
                        fontWeight: 700,
                        letterSpacing: '-0.5px'
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
                      variant="subtle"
                      size="md"
                      sx={(theme) => ({
                        position: 'relative',
                        color: isActive(item.path) 
                          ? `var(--mantine-color-${item.color}-6)` 
                          : theme.colorScheme === 'dark' 
                            ? theme.colors.dark[0] 
                            : theme.colors.gray[7],
                        fontWeight: 600,
                        fontSize: '1rem',
                        padding: '8px 16px',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          left: '15%',
                          right: '15%',
                          bottom: 5,
                          height: 3,
                          borderRadius: 2,
                          background: `var(--mantine-color-${item.color}-6)`,
                          opacity: isActive(item.path) ? 0.9 : 0,
                          transform: isActive(item.path) ? 'scaleX(1)' : 'scaleX(0)',
                          transition: 'transform 0.3s ease, opacity 0.3s ease',
                        },
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.05)',
                        },
                        '&:hover::after': {
                          opacity: 0.5,
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
                    px={25}
                    sx={{
                      height: 42,
                      fontSize: '1rem',
                      fontWeight: 600,
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      animation: `${glowPulse} 3s infinite`,
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
      
      {/* Enhanced Footer */}
      <AppShellFooter
        sx={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          background: 'linear-gradient(180deg, rgba(20, 21, 26, 0) 0%, rgba(20, 21, 26, 0.95) 50%, rgba(20, 21, 26, 1) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container size="xl">
          <Group justify="space-between" h="100%" py="md" gap="xl">
            <Box>
              <Text
                sx={{
                  fontSize: { base: '0.9rem', md: '1rem' },
                  opacity: 0.8,
                  fontWeight: 500,
                  backgroundImage: 'var(--mantine-primary-gradient)',
                  backgroundSize: '100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                © {new Date().getFullYear()} Roman Travnikov • Made with 🔥 and React
              </Text>
            </Box>
            
            <Group spacing={{ base: 'md', md: 'xl' }}>
              {socialLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <Link 
                    to={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      textDecoration: 'none', 
                      color: 'var(--mantine-color-primary-5)',
                      transition: 'color 0.2s ease',
                      fontWeight: 500,
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </Group>
          </Group>
        </Container>
      </AppShellFooter>
    </AppShell>
  );
}