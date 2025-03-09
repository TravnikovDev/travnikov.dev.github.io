import React, { useRef, useEffect } from "react";
import { AppShellHeader, Container, Group, Box } from "@mantine/core";
import { motion, useTransform, useMotionValue } from "framer-motion";
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const blurStrength = useMotionValue(15);
  const borderOpacity = useMotionValue(0.2);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!headerRef.current) return;
      const rect = headerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const gradientX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const gradientY = useTransform(mouseY, [0, 1], ["0%", "100%"]);
  const highlightX = useTransform(mouseX, [0, 1], ["-50%", "150%"]);
  
  const navVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  return (
    <motion.div
      style={{
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 1000,
        y: 0,
        opacity: 1,
        pointerEvents: "auto",
        transform: "translateZ(0)",
      }}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      className="always-visible-header"
      transition={{ 
        y: { type: "spring", stiffness: 500, damping: 40 },
        opacity: { duration: 0.2 }
      }}
      ref={headerRef}
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
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at var(--x) var(--y), rgba(61, 127, 255, 0.15), transparent 70%)",
              backgroundSize: "120% 120%",
              opacity: 0.8,
              zIndex: -1,
              "--x": gradientX,
              "--y": gradientY,
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
              opacity: borderOpacity.get(),
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
              opacity: borderOpacity.get(),
            }}
          />
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "100px",
              background: "linear-gradient(90deg, transparent, rgba(61, 127, 255, 0.1), transparent)",
              x: highlightX,
              filter: "blur(5px)",
              opacity: 0.5,
            }}
            transition={{
              duration: 1.5,
              ease: "linear"
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
          <motion.div initial="hidden" animate="visible" variants={navVariants}>
            <Group justify="space-between" h="100%" py={15}>
              <Group>
                {/* Burger menu removed since we don't have drawer props */}
              </Group>
              <DesktopNavigation />
            </Group>
          </motion.div>
        </Container>
      </AppShellHeader>
    </motion.div>
  );
};

export default Header;
