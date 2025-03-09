import React, { useState } from "react";
import { Box, Group, Text, Button, UnstyledButton, Badge } from "@mantine/core";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import { useColorScheme } from "@mantine/hooks";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { keyframes } from "@emotion/react";

// Custom keyframes for nav items
const glitchEffect = keyframes({
  "0%": { 
    textShadow: "0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em 0.05em 0 rgba(0, 0, 255, 0.75)" 
  },
  "14%": { 
    textShadow: "0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em 0.05em 0 rgba(0, 0, 255, 0.75)" 
  },
  "15%": { 
    textShadow: "-0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75), -0.05em -0.05em 0 rgba(0, 0, 255, 0.75)" 
  },
  "49%": { 
    textShadow: "-0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75), -0.05em -0.05em 0 rgba(0, 0, 255, 0.75)" 
  },
  "50%": { 
    textShadow: "0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75)" 
  },
  "99%": { 
    textShadow: "0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75)" 
  },
  "100%": { 
    textShadow: "-0.025em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em -0.05em 0 rgba(0, 0, 255, 0.75)" 
  }
});

const panelGlow = keyframes({
  "0%": { boxShadow: "0 0 5px rgba(61, 127, 255, 0.2), 0 0 10px rgba(61, 127, 255, 0.1), 0 0 15px rgba(61, 127, 255, 0.05)" },
  "50%": { boxShadow: "0 0 10px rgba(61, 127, 255, 0.3), 0 0 20px rgba(61, 127, 255, 0.15), 0 0 30px rgba(61, 127, 255, 0.1)" },
  "100%": { boxShadow: "0 0 5px rgba(61, 127, 255, 0.2), 0 0 10px rgba(61, 127, 255, 0.1), 0 0 15px rgba(61, 127, 255, 0.05)" }
});

const NavItem = ({ label, path, isActive }) => {
  const [hovered, setHovered] = useState(false);
  
  // Framer Motion variants for hover effects
  const itemVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };
  
  const underlineVariants = {
    initial: { width: 0, opacity: 0, x: "50%" },
    hover: { 
      width: "80%", 
      opacity: 1, 
      x: "10%",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    active: {
      width: "100%",
      opacity: 1,
      x: "0%",
      background: "linear-gradient(90deg, #3D7FFF, #A64DFF)",
      height: "3px"
    }
  };

  const textVariants = {
    initial: { y: 0 },
    hover: { 
      y: -3,
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }
  };
  
  const glowVariants = {
    initial: { opacity: 0 },
    hover: { 
      opacity: 0.8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      animate={isActive ? "active" : "initial"}
      style={{ position: "relative" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <UnstyledButton
        component={Link}
        to={path}
        style={{
          position: "relative",
          padding: "10px 24px",
          borderRadius: "8px",
          zIndex: 2,
          background: isActive ? "rgba(61, 127, 255, 0.1)" : "transparent",
          overflow: "hidden",
          border: isActive ? "1px solid rgba(61, 127, 255, 0.3)" : "1px solid transparent",
          transition: "all 0.3s ease"
        }}
      >
        {/* Glow effect behind text */}
        <motion.div 
          variants={glowVariants}
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at center, rgba(61, 127, 255, 0.15), transparent 70%)",
            zIndex: -1
          }}
        />
        
        {/* Main text */}
        <motion.div variants={textVariants}>
          <Text
            style={{
              color: isActive ? "#3D7FFF" : "#E3E7F1",
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: "0.02em",
              fontFamily: '"Cabinet Grotesk", sans-serif',
              animation: hovered ? `${glitchEffect} 1.5s infinite` : "none",
              textShadow: isActive ? "0 0 8px rgba(61, 127, 255, 0.5)" : "none",
            }}
          >
            {label}
          </Text>
        </motion.div>
        
        {/* Animated underline */}
        <motion.div
          variants={underlineVariants}
          style={{
            position: "absolute",
            bottom: "6px",
            left: "0",
            height: "2px",
            background: "linear-gradient(90deg, #3D7FFF, transparent)",
            borderRadius: "4px",
            zIndex: 1
          }}
        />
      </UnstyledButton>
      
      {/* Notification badge for active items */}
      {isActive && (
        <Badge 
          color="primary" 
          size="xs" 
          variant="filled"
          radius="xl"
          style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            zIndex: 3,
            animation: `${panelGlow} 2s infinite ease-in-out`,
            border: "1px solid rgba(61, 127, 255, 0.5)"
          }}
        >
          •
        </Badge>
      )}
    </motion.div>
  );
};

export default function DesktopNavigation() {
  const colorScheme = useColorScheme();
  const location = useLocation();
  
  const navItems = [
    { label: "Projects", path: "/projects" },
    { label: "Blog", path: "/blog" },
    { label: "Experiments", path: "/experiments" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <Group gap="md" visibleFrom="sm">
      <Logo />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        <Box
          style={{
            background: "rgba(10, 15, 36, 0.6)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px", 
            padding: "5px",
            border: "1px solid rgba(61, 127, 255, 0.1)",
            animation: `${panelGlow} 3s infinite ease-in-out`
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
      </motion.div>
    </Group>
  );
}
