import React, { useRef, useEffect, useState } from "react";
import { AppShellHeader, Container, Group, Box, useMantineTheme } from "@mantine/core";
import DesktopNavigation from "./DesktopNavigation";
import { useMediaQuery } from '@mantine/hooks';
import * as styles from './Header.module.css';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Animation for the navigation on mount
  useEffect(() => {
    if (headerRef.current && highlightRef.current && navRef.current) {
      // Initial styles
      highlightRef.current.style.opacity = '0';
      navRef.current.style.opacity = '0';
      navRef.current.style.transform = 'translateY(-10px)';
      
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
    <AppShellHeader className={styles.appShellHeader} ref={headerRef} visibleFrom="sm">
      <Box className={styles.box}>
        <div
          ref={gradientRef}
          className={styles.gradient}
        />
        <Box className={styles.topBorder} />
        <Box className={styles.bottomBorder} />
        <div
          ref={highlightRef}
          className={styles.highlight}
        />
        <Box className={styles.scanline + ' mantine-hidden-from-sm'} />
      </Box>
      <Container size="xl" className={styles.container}>
        <div ref={navRef}>
          <Group justify="space-between" h="100%" className={styles.headerGroup}>
            <DesktopNavigation />
          </Group>
        </div>
      </Container>
    </AppShellHeader>
  );
};

export default Header;
