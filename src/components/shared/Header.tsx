import React from "react";
import { AppShellHeader, Container, Group, Burger } from "@mantine/core";
import { motion } from "framer-motion";
import Logo from "./Logo";
import DesktopNavigation from "./DesktopNavigation";
import { gradientShift } from "./AnimationKeyframes";

interface HeaderProps {
  isScrolled: boolean;
  drawerOpened: boolean;
  toggleDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isScrolled,
  drawerOpened,
  toggleDrawer,
}) => {
  // Navbar animation variants
  const navVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
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
    <AppShellHeader
      style={{
        borderBottom: isScrolled
          ? `1px solid rgba(255, 255, 255, 0.1)`
          : "none",
        background: isScrolled ? "rgba(12, 12, 18, 0.5)" : "transparent", // Even more transparent
        backdropFilter: isScrolled ? "blur(25px) saturate(200%)" : "none", // Enhanced blur
        boxShadow: isScrolled
          ? "0 15px 40px rgba(0, 0, 0, 0.25), 0 0 20px rgba(0, 120, 240, 0.15)"
          : "none", // More dramatic glow
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)", // More dynamic transition
        zIndex: "var(--mantine-z-navbar)",
        transform: isScrolled ? "translateY(0)" : "translateY(-100%)", // Slide-in effect on scroll
        opacity: isScrolled ? 1 : 0, // Fade in on scroll
        position: "fixed",
        width: "100%",
        top: 0,
        // Add gradient highlight
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(0, 120, 240, 0.5), transparent)",
          opacity: isScrolled ? 1 : 0,
          transition: "opacity 0.6s ease",
        },
        // Add animated gradient
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(135deg, rgba(0, 120, 240, 0.03), transparent 20%, rgba(112, 0, 224, 0.03), transparent 70%, rgba(0, 120, 240, 0.03))",
          backgroundSize: "400% 400%",
          animation: "gradientAnimation 15s ease infinite",
          zIndex: -1,
          opacity: isScrolled ? 1 : 0,
          transition: "opacity 0.6s ease",
        },
        "@keyframes gradientAnimation": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      <Container size="xl">
        <motion.div initial="hidden" animate="visible" variants={navVariants}>
          <Group justify="space-between" h="100%" py={10}>
            <Group>
              <Burger
                opened={drawerOpened}
                onClick={toggleDrawer}
                hiddenFrom="md"
                size="sm"
                color="var(--mantine-color-primary-6)"
              />
              <Logo />
            </Group>

            {/* Desktop Navigation */}
            <DesktopNavigation />
          </Group>
        </motion.div>
      </Container>
    </AppShellHeader>
  );
};

export default Header;
