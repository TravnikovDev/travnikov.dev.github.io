import React from "react";
import { Group, Button } from "@mantine/core";
import { motion } from "framer-motion";
import { Link } from "gatsby";
import { isActive } from "./utils";
import { glowPulse } from "./AnimationKeyframes";
import { navItems } from "./NavItems";
import { useColorScheme } from "@mantine/hooks";
import { theme } from "../../theme";

const DesktopNavigation: React.FC = () => {
  const colorScheme = useColorScheme();
  return (
    <Group gap="lg" visibleFrom="md">
      {navItems.map((item, index) => (
        <motion.div
          key={item.path}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3 + index * 0.1,
            duration: 0.5,
            type: "spring",
            stiffness: 100,
          }}
        >
          <Button
            component={Link}
            to={item.path}
            variant={isActive(item.path) ? "light" : "subtle"}
            size="md"
            style={{
              position: "relative",
              color: isActive(item.path)
                ? `var(--mantine-color-${item.color}-5)`
                : colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
              fontWeight: 700, // Bolder
              fontSize: "1.1rem", // Larger
              padding: "10px 20px", // More padding
              letterSpacing: "-0.01em",
              fontFamily: '"Cabinet Grotesk", sans-serif', // Quirky font
              backdropFilter: isActive(item.path) ? "blur(10px)" : "none",
              backgroundColor: isActive(item.path)
                ? "rgba(255, 255, 255, 0.07)"
                : "transparent",
              boxShadow: isActive(item.path)
                ? `0 8px 20px rgba(0, 0, 0, 0.1), 0 0 10px var(--mantine-color-${item.color}-6)`
                : "none",
              borderRadius: theme.radius.xl,
              border: isActive(item.path)
                ? `1px solid rgba(var(--mantine-color-${item.color}-6-rgb), 0.3)`
                : "1px solid transparent",
              transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
              transform: isActive(item.path)
                ? "translateY(-2px)"
                : "translateY(0)",

              // Glowing underline with improved effect
              "&::after": {
                content: '""',
                position: "absolute",
                left: "10%",
                right: "10%",
                bottom: 6,
                height: 3,
                borderRadius: 4,
                background: `var(--mantine-color-${item.color}-6)`,
                opacity: isActive(item.path) ? 0.9 : 0,
                transform: isActive(item.path) ? "scaleX(1)" : "scaleX(0)",
                transition:
                  "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease",
                filter: `blur(1px) drop-shadow(0 0 5px var(--mantine-color-${item.color}-6))`,
              },

              // Improved hover effects
              "&:hover": {
                background: "rgba(255, 255, 255, 0.07)",
                transform: "translateY(-3px)",
                boxShadow: `0 10px 25px rgba(0, 0, 0, 0.1), 0 0 10px var(--mantine-color-${item.color}-6)`,
              },
              "&:hover::after": {
                opacity: 0.7,
                transform: "scaleX(1)",
              },
            }}
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
          type: "spring",
          stiffness: 100,
        }}
        whileHover={{
          y: -5,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          transition: { duration: 0.2 },
        }}
      >
        <Button
          component={Link}
          to="/contact"
          variant="gradient"
          gradient={{ from: "primary", to: "secondary", deg: 45 }}
          radius="xl"
          size="md"
          px={30} // More horizontal padding
          style={{
            height: 48, // Taller
            fontSize: "1.1rem", // Larger text
            fontWeight: 700, // Bolder
            letterSpacing: "-0.01em",
            fontFamily: '"Cabinet Grotesk", sans-serif', // Quirky font
            boxShadow:
              "0 8px 25px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 120, 240, 0.3)", // Enhanced glow
            border: "2px solid rgba(255, 255, 255, 0.2)", // More visible border
            transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
            animation: `${glowPulse} 4s infinite cubic-bezier(0.4, 0, 0.6, 1)`, // Smoother animation
            position: "relative",
            overflow: "hidden",

            // Shine effect overlay
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: -100,
              width: "70px",
              height: "100%",
              background: "rgba(255, 255, 255, 0.3)",
              transform: "skewX(-30deg)",
              filter: "blur(10px)",
              animation: "shine 5s infinite",
            },

            // Enhanced hover state
            "&:hover": {
              transform: "translateY(-5px) scale(1.03)",
              boxShadow:
                "0 15px 30px rgba(0, 0, 0, 0.2), 0 0 30px rgba(0, 120, 240, 0.5)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
            },

            // Active/pressed state
            "&:active": {
              transform: "translateY(3px)",
              boxShadow:
                "0 5px 15px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 120, 240, 0.4)",
              transition: "all 0.1s cubic-bezier(0.2, 0.8, 0.2, 1)",
            },

            "@keyframes shine": {
              "0%": { left: "-100px" },
              "20%": { left: "100%" },
              "100%": { left: "100%" },
            },
          }}
        >
          Contact
        </Button>
      </motion.div>
    </Group>
  );
};

export default DesktopNavigation;
