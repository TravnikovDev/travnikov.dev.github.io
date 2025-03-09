import React, { useRef, useEffect, useState } from "react";
import { AppShellHeader, Container, Group, Box } from "@mantine/core";
import DesktopNavigation from "./DesktopNavigation";
import { keyframes } from "@emotion/react";
import styles from './Header.module.css';

interface HeaderProps {}

const glowPulse = keyframes({
  "0%": { boxShadow: "0 0 10px rgba(61, 127, 255, 0.2), 0 0 20px rgba(61, 127, 255, 0.1)" },
  "50%": { boxShadow: "0 0 15px rgba(61, 127, 255, 0.3), 0 0 30px rgba(61, 127, 255, 0.15)" },
  "100%": { boxShadow: "0 0 10px rgba(61, 127, 255, 0.2), 0 0 20px rgba(61, 127, 255, 0.1)" }
});

const scanlineEffect = keyframes({
  "0%": { transform: "translateY(-100%)" },
  "100%": { transform: "translateY(100%)" }
});

const Header: React.FC<HeaderProps> = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  
  // State to track mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const blurStrength = 15;
  const borderOpacity = 0.2;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!headerRef.current) return;
      const rect = headerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
      
      // Update gradient position using CSS variables
      if (gradientRef.current) {
        gradientRef.current.style.setProperty('--x', `${x * 100}%`);
        gradientRef.current.style.setProperty('--y', `${y * 100}%`);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation for the navigation on mount
  useEffect(() => {
    if (headerRef.current && highlightRef.current && navRef.current) {
      // Initial styles
      highlightRef.current.style.opacity = '0';
      navRef.current.style.opacity = '0';
      navRef.current.style.transform = 'translateY(-20px)';

      // Trigger animations after mount
      requestAnimationFrame(() => {
        if (highlightRef.current) {
          highlightRef.current.style.transition = 'opacity 0.5s ease';
          highlightRef.current.style.opacity = '1';
        }

        if (navRef.current) {
          navRef.current.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          navRef.current.style.opacity = '1';
          navRef.current.style.transform = 'translateY(0)';
        }
      });
    }
  }, []);
  
  return (
    <div
      ref={headerRef}
      className={styles.header}
    >
      <AppShellHeader
        className={styles.appShellHeader}
      >
        <Box 
          className={styles.box}
        >
          <div
            ref={gradientRef}
            className={styles.gradient}
          />
          <Box
            className={styles.topBorder}
          />
          <Box
            className={styles.bottomBorder}
          />
          <div
            ref={highlightRef}
            className={styles.highlight}
          />
          <Box
            className={styles.scanline}
          />
        </Box>
        <Container size="xl" className={styles.container}>
          <div ref={navRef}>
            <Group justify="space-between" h="100%" py={15}>
              <Group>
                {/* Burger menu removed since we don't have drawer props */}
              </Group>
              <DesktopNavigation />
            </Group>
          </div>
        </Container>
      </AppShellHeader>
    </div>
  );
};

export default Header;
