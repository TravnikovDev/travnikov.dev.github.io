import React, { useState, useRef, useEffect } from "react";
import { Box, Group, Text, Button, UnstyledButton, Badge } from "@mantine/core";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import { useColorScheme } from "@mantine/hooks";
import Logo from "./Logo";
import { keyframes } from "@emotion/react";
import styles from './DesktopNavigation.module.css';

// Custom keyframes for nav items with more pronounced effect
const glitchEffect = keyframes({
  "0%": { 
    textShadow: "0.1em 0 0 rgba(255, 0, 0, 0.95), -0.1em -0.05em 0 rgba(0, 255, 0, 0.95), -0.05em 0.1em 0 rgba(0, 0, 255, 0.95)",
    transform: "translate3d(0.03em, -0.04em, 0)",
    opacity: 0.8
  },
  "14%": { 
    textShadow: "0.1em 0 0 rgba(255, 0, 0, 0.95), -0.1em -0.05em 0 rgba(0, 255, 0, 0.95), -0.05em 0.1em 0 rgba(0, 0, 255, 0.95)",
    transform: "translate3d(0, 0, 0)",
    opacity: 1
  },
  "15%": { 
    textShadow: "-0.1em -0.05em 0 rgba(255, 0, 0, 0.95), 0.05em 0.05em 0 rgba(0, 255, 0, 0.95), -0.1em -0.1em 0 rgba(0, 0, 255, 0.95)",
    transform: "translate3d(-0.05em, 0.05em, 0)",
    opacity: 0.9
  },
  "35%": {
    textShadow: "-0.1em -0.05em 0 rgba(255, 0, 0, 0.95), 0.05em 0.05em 0 rgba(0, 255, 0, 0.95), -0.1em -0.1em 0 rgba(0, 0, 255, 0.95)",
    transform: "translate3d(0.08em, -0.03em, 0)",
    opacity: 1
  },
  "40%": {
    textShadow: "-0.1em -0.05em 0 rgba(255, 0, 0, 0.95), 0.05em 0.05em 0 rgba(0, 255, 0, 0.95), -0.1em -0.1em 0 rgba(0, 0, 255, 0.95)",
    transform: "translate3d(0, 0, 0)",
    opacity: 0.8
  },
  "49%": { 
    textShadow: "-0.1em -0.05em 0 rgba(255, 0, 0, 0.95), 0.05em 0.05em 0 rgba(0, 255, 0, 0.95), -0.1em -0.1em 0 rgba(0, 0, 255, 0.95)",
    transform: "translate3d(-0.04em, 0, 0)",
    opacity: 1
  },
  "50%": { 
    textShadow: "0.05em 0.1em 0 rgba(255, 0, 0, 0.95), 0.1em 0 0 rgba(0, 255, 0, 0.95), 0 -0.1em 0 rgba(0, 0, 255, 0.95)",
    transform: "translate3d(0.04em, 0, 0)",
    opacity: 0.9
  },
  "70%": {
    textShadow: "0.05em 0.1em 0 rgba(255, 0, 0, 0.95), 0.1em 0 0 rgba(0, 255, 0, 0.95), 0 -0.1em 0 rgba(0, 0, 255, 0.95)",
    transform: "translate3d(0, -0.06em, 0)",
    opacity: 1
  },
  "75%": {
    textShadow: "0.05em 0.1em 0 rgba(255, 0, 0, 0.95), 0.1em 0 0 rgba(0, 255, 0, 0.95), 0 -0.1em 0 rgba(0, 0, 255, 0.95)",
    transform: "translate3d(0, 0, 0)",
    opacity: 0.8
  },
  "99%": { 
    textShadow: "0.05em 0.1em 0 rgba(255, 0, 0, 0.95), 0.1em 0 0 rgba(0, 255, 0, 0.95), 0 -0.1em 0 rgba(0, 0, 255, 0.95)",
    transform: "translate3d(-0.05em, 0, 0)",
    opacity: 1
  },
  "100%": { 
    textShadow: "-0.05em 0 0 rgba(255, 0, 0, 0.95), -0.05em -0.05em 0 rgba(0, 255, 0, 0.95), -0.05em -0.1em 0 rgba(0, 0, 255, 0.95)",
    transform: "translate3d(0, 0, 0)",
    opacity: 0.9
  }
});

const panelGlow = keyframes({
  "0%": { boxShadow: "0 0 5px rgba(61, 127, 255, 0.2), 0 0 10px rgba(61, 127, 255, 0.1), 0 0 15px rgba(61, 127, 255, 0.05)" },
  "50%": { boxShadow: "0 0 10px rgba(61, 127, 255, 0.3), 0 0 20px rgba(61, 127, 255, 0.15), 0 0 30px rgba(61, 127, 255, 0.1)" },
  "100%": { boxShadow: "0 0 5px rgba(61, 127, 255, 0.2), 0 0 10px rgba(61, 127, 255, 0.1), 0 0 15px rgba(61, 127, 255, 0.05)" }
});

const NavItem = ({ label, path, isActive }) => {
  const [hovered, setHovered] = useState(false);
  const itemRef = useRef(null);
  const underlineRef = useRef(null);
  const textRef = useRef(null);
  const glowRef = useRef(null);
  
  return (
    <div
      ref={itemRef}
      className={styles.navItem}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <UnstyledButton
        component={Link}
        to={path}
        className={styles.navButton}
      >
        <div
          ref={textRef}
          className={styles.navText}
        >
          {label}
        </div>
      </UnstyledButton>

      <div
        ref={underlineRef}
        className={styles.navUnderline}
        style={{
          left: isActive ? '0%' : hovered ? '5%' : '50%',
          width: isActive ? '100%' : hovered ? '90%' : '0%',
          opacity: isActive || hovered ? 1 : 0,
          background: isActive 
            ? 'linear-gradient(90deg, #3D7FFF, #A64DFF)'
            : 'currentColor',
          boxShadow: isActive 
            ? '0 0 15px rgba(61, 127, 255, 0.8), 0 0 30px rgba(166, 77, 255, 0.5)'
            : 'none',
        }}
      />

      <div
        ref={glowRef}
        className={styles.navGlow}
        style={{
          opacity: hovered ? 0.8 : 0,
        }}
      />
    </div>
  );
};

export default function DesktopNavigation() {
  const colorScheme = useColorScheme();
  const location = useLocation();
  const navigationRef = useRef(null);
  
  const navItems = [
    { label: "Projects", path: "/projects" },
    { label: "Blog", path: "/blog" },
    { label: "Experiments", path: "/experiments" },
    { label: "Contact", path: "/contact" },
  ];

  // Animate navigation on mount
  useEffect(() => {
    if (navigationRef.current) {
      navigationRef.current.style.opacity = '0';
      navigationRef.current.style.transform = 'translateY(-20px)';
      
      // Trigger animation after mount
      requestAnimationFrame(() => {
        if (navigationRef.current) {
          navigationRef.current.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          navigationRef.current.style.opacity = '1';
          navigationRef.current.style.transform = 'translateY(0)';
        }
      });
    }
  }, []);
  
  return (
    <Group gap="md" visibleFrom="sm">
      <Logo />
      <div ref={navigationRef}>
        <Box
          className={styles.navBox}
        >
          <Group gap="xs">
            {navItems.map((link) => (
              <NavItem 
                key={link.path} 
                label={link.label} 
                path={link.path} 
                isActive={location.pathname === link.path}
              />
            ))}
          </Group>
        </Box>
      </div>
    </Group>
  );
}
