import React, { useRef, useEffect, useState } from "react";
import { AppShellHeader, Container, Group, Box } from "@mantine/core";
import DesktopNavigation from "./DesktopNavigation";
import { keyframes } from "@emotion/react";

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
      style={{
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 1000,
        pointerEvents: "auto",
        transform: "translateZ(0)",
      }}
    >
      <AppShellHeader
        style={{
          border: "none",
          background: "rgba(10, 15, 36, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 25px rgba(0, 0, 0, 0.25), 0 2px 5px rgba(61, 127, 255, 0.2)",
          overflow: "visible",
          height: "auto",
          minHeight: "60px",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid rgba(61, 127, 255, 0.2)",
        }}
      >
        <Box 
          style={{
            position: "absolute",
            inset: "8px",
            background: "rgba(10, 15, 36, 0.3)",
            backdropFilter: `blur(${blurStrength}px) saturate(180%)`,
            borderRadius: "16px",
            border: "1px solid rgba(61, 127, 255, 0.1)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2), 0 0 15px rgba(61, 127, 255, 0.15)",
            overflow: "hidden",
            zIndex: -1,
          }}
        >
          <div
            ref={gradientRef}
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at var(--x) var(--y), rgba(61, 127, 255, 0.15), transparent 70%)",
              backgroundSize: "120% 120%",
              opacity: 0.8,
              zIndex: -1,
              "--x": "50%",
              "--y": "50%",
            } as any}
          />
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(61, 127, 255, 0.8), transparent)",
              opacity: borderOpacity,
            }}
          />
          <Box
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(61, 127, 255, 0.5), transparent)",
              opacity: borderOpacity,
            }}
          />
          <div
            ref={highlightRef}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "100px",
              background: "linear-gradient(90deg, transparent, rgba(61, 127, 255, 0.1), transparent)",
              transform: "translateX(0)",
              filter: "blur(5px)",
              opacity: 0.5,
            }}
          />
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "20px",
              background: "linear-gradient(180deg, rgba(61, 127, 255, 0.05), transparent)",
              opacity: 0.3,
              zIndex: 2,
              animation: `${scanlineEffect} 8s linear infinite`,
              filter: "blur(1px)",
            }}
          />
        </Box>
        <Container size="xl" style={{ position: "relative", zIndex: 3 }}>
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
