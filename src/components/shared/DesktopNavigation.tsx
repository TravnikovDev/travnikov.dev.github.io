import React, { useState, useRef, useEffect } from "react";
import { Box, Group, Text, Button, UnstyledButton, Badge } from "@mantine/core";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import { useColorScheme } from "@mantine/hooks";
import Logo from "./Logo";
import { keyframes } from "@emotion/react";

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
      style={{
        position: 'relative',
        transform: `scale(${hovered ? 1.05 : 1})`,
        transition: 'transform 0.3s ease'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <UnstyledButton
        component={Link}
        to={path}
        style={{
          position: 'relative',
          color: '#fff',
          padding: '8px 16px',
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: 500,
          letterSpacing: '0.5px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          zIndex: 2,
        }}
      >
        <div
          ref={textRef}
          style={{
            transform: `translateY(${hovered ? -3 : 0}px)`,
            transition: 'transform 0.3s ease'
          }}
        >
          {label}
        </div>
      </UnstyledButton>

      <div
        ref={underlineRef}
        style={{
          position: 'absolute',
          bottom: '-2px',
          left: isActive ? '0%' : hovered ? '5%' : '50%',
          width: isActive ? '100%' : hovered ? '90%' : '0%',
          height: '2px',
          opacity: isActive || hovered ? 1 : 0,
          background: isActive 
            ? 'linear-gradient(90deg, #3D7FFF, #A64DFF)'
            : 'currentColor',
          boxShadow: isActive 
            ? '0 0 15px rgba(61, 127, 255, 0.8), 0 0 30px rgba(166, 77, 255, 0.5)'
            : 'none',
          transition: 'all 0.4s ease'
        }}
      />

      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120%',
          height: '130%',
          background: 'radial-gradient(ellipse at center, rgba(61, 127, 255, 0.2) 0%, transparent 70%)',
          opacity: hovered ? 0.8 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 1
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
          style={{
            background: "rgba(10, 15, 36, 0.7)",
            backdropFilter: "blur(15px)",
            borderRadius: "16px", 
            padding: "8px 12px",
            border: "2px solid rgba(61, 127, 255, 0.3)",
            animation: `${panelGlow} 3s infinite ease-in-out`,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(61, 127, 255, 0.3)",
            position: "relative",
            overflow: "hidden",
            
            // Add glowing line effect
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "linear-gradient(90deg, transparent, rgba(61, 127, 255, 0.8), transparent)",
              animation: "slideRight 4s infinite ease-in-out",
            },
            
            // Add bottom glowing line
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "linear-gradient(90deg, transparent, rgba(166, 77, 255, 0.8), transparent)",
              animation: "slideLeft 4s infinite ease-in-out",
            },
            
            "@keyframes slideRight": {
              "0%": { transform: "translateX(-100%)" },
              "100%": { transform: "translateX(100%)" },
            },
            
            "@keyframes slideLeft": {
              "0%": { transform: "translateX(100%)" },
              "100%": { transform: "translateX(-100%)" },
            }
          }}
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
