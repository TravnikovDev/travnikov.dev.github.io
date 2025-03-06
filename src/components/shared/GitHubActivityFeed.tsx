import React from "react";
import { Box, Group, Text, ActionIcon } from "@mantine/core";
import { motion } from "framer-motion";
import { pulseGlow } from "./AnimationKeyframes";

const GitHubActivityFeed: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
    >
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.03)",
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          padding: "16px",
          boxShadow:
            "0 15px 30px rgba(0, 0, 0, 0.15), 0 0 15px rgba(0, 120, 240, 0.1)",
          height: "130px",
          position: "relative",
          overflow: "hidden",
          transform: "translateZ(0)",
          transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",

          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow:
              "0 20px 40px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 120, 240, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          },

          // Enhanced glow effect
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at bottom right, rgba(0, 120, 240, 0.15), transparent 70%), radial-gradient(circle at top left, rgba(112, 0, 224, 0.1), transparent 60%)",
            zIndex: 0,
          },
        }}
      >
        <Group
          position="apart"
          mb="md"
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Text
            size="sm"
            weight={700}
            sx={{
              fontFamily: '"Clash Display", sans-serif',
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Box
              component="span"
              sx={{
                fontSize: "1.2rem",
                background: "linear-gradient(135deg, #0078F0, #0D8FFF)",
                borderRadius: "50%",
                width: "22px",
                height: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 10px rgba(0, 120, 240, 0.5)",
              }}
            >
              🐙
            </Box>
            GitHub Activity
          </Text>
          <ActionIcon
            component="a"
            href="https://github.com/TravnikovDev"
            target="_blank"
            variant="subtle"
            size="sm"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                color: "#fff",
                background: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <Text size="xs">View Profile</Text>
          </ActionIcon>
        </Group>

        {/* Contribution grid - much more visually impressive */}
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", gap: "3px", marginBottom: "6px" }}>
            {["M", "W", "F"].map((day, i) => (
              <Text
                key={i}
                size="xs"
                sx={{
                  color: "rgba(255, 255, 255, 0.4)",
                  width: "12px",
                  fontSize: "0.6rem",
                  textAlign: "center",
                }}
              >
                {day}
              </Text>
            ))}
          </Box>

          {[...Array(4)].map((_, week) => (
            <Group key={week} spacing={3} mb={3} noWrap>
              {[...Array(7)].map((_, day) => {
                // Create a visually interesting pattern - like a real GitHub activity grid
                const intensity = Math.max(
                  0.1,
                  Math.min(
                    0.9,
                    Math.abs(
                      Math.sin((week * 7 + day) * 0.5) * 0.7 +
                        Math.random() * 0.3
                    )
                  )
                );
                const delay = (week * 7 + day) * 0.05;
                return (
                  <Box
                    key={day}
                    sx={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "2px",
                      background: `rgba(0, 120, 240, ${intensity})`,
                      boxShadow: `0 0 ${
                        3 + intensity * 8
                      }px rgba(0, 120, 240, ${intensity * 0.6})`,
                      transition: "all 0.3s ease",
                      animation: `${pulseGlow} ${
                        3 + intensity * 4
                      }s infinite alternate`,
                      animationDelay: `${delay}s`,
                      "&:hover": {
                        transform: "scale(1.2)",
                        background: `rgba(0, 120, 240, ${Math.min(
                          1,
                          intensity + 0.2
                        )})`,
                      },
                    }}
                  />
                );
              })}
            </Group>
          ))}

          <Group position="apart" mt="xs" sx={{ opacity: 0.7 }}>
            <Text size="xs" sx={{ fontSize: "0.65rem" }}>
              Less
            </Text>
            <Box sx={{ display: "flex", gap: "3px", alignItems: "center" }}>
              {[0.2, 0.4, 0.6, 0.8].map((intensity, i) => (
                <Box
                  key={i}
                  sx={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "1px",
                    background: `rgba(0, 120, 240, ${intensity})`,
                  }}
                />
              ))}
            </Box>
            <Text size="xs" sx={{ fontSize: "0.65rem" }}>
              More
            </Text>
          </Group>
        </Box>
      </Box>
    </motion.div>
  );
};

export default GitHubActivityFeed;
