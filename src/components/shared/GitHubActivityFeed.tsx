import React from "react";
import { Box, Text, Stack, ActionIcon, Group } from "@mantine/core";
import { FaGithub } from 'react-icons/fa';

interface Contribution {
  count: number;
  date: string;
  level: number;
}

interface ContributionWeek {
  contributions: Contribution[];
  firstDay: string;
}

const mockData: ContributionWeek[] = [
  {
    firstDay: "2023-01-01",
    contributions: Array(7).fill({ count: Math.floor(Math.random() * 10), date: "", level: Math.floor(Math.random() * 4) })
  },
  {
    firstDay: "2023-01-08",
    contributions: Array(7).fill({ count: Math.floor(Math.random() * 10), date: "", level: Math.floor(Math.random() * 4) })
  }
];

const levelColors = {
  0: "rgba(255, 255, 255, 0.1)",
  1: "rgba(61, 127, 255, 0.3)",
  2: "rgba(61, 127, 255, 0.5)",
  3: "rgba(61, 127, 255, 0.7)",
  4: "rgba(61, 127, 255, 0.9)"
};

export function GitHubActivityFeed() {
  return (
    <Box
      style={{
        background: "rgba(10, 15, 36, 0.8)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "24px",
        boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        transform: "translateY(0)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 40px rgba(31, 38, 135, 0.25)"
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
          zIndex: 1
        }
      }}
    >
      <Group justify="space-between" mb="md" style={{ position: "relative", zIndex: 1 }}>
        <Text
          size="sm"
          style={{
            fontFamily: "Cabinet Grotesk, sans-serif",
            color: "#E3E7F1",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: 700
          }}
        >
          <Box
            component="span"
            style={{
              fontSize: "1.2rem",
              background: "rgba(61, 127, 255, 0.1)",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(61, 127, 255, 0.2)"
            }}
          >
            <FaGithub size={20} />
          </Box>
          GitHub Activity
        </Text>

        <ActionIcon
          component="a"
          href="https://github.com/TravnikovDev"
          target="_blank"
          variant="subtle"
          size="sm"
          style={{
            color: "#E3E7F1",
            "&:hover": {
              color: "#3D7FFF",
              background: "rgba(61, 127, 255, 0.1)"
            }
          }}
        >
          <FaGithub size={20} />
        </ActionIcon>
      </Group>

      <Box style={{ position: "relative", zIndex: 1 }}>
        <Box style={{ display: "flex", gap: "3px", marginBottom: "6px" }}>
          {["M", "W", "F"].map((day) => (
            <Text
              key={day}
              size="xs"
              style={{
                color: "#E3E7F1",
                width: "14px",
                fontSize: "0.65rem",
                textAlign: "center"
              }}
            >
              {day}
            </Text>
          ))}
        </Box>

        <Stack gap={3}>
          {mockData.map((week, i) => (
            <Group key={i} gap={3} mb={3} wrap="nowrap">
              {week.contributions.map((day, j) => (
                <Box
                  key={j}
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "2px",
                    background: levelColors[day.level as keyof typeof levelColors],
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.2s ease",
                    animation: "fadeIn 0.5s ease forwards",
                    animationDelay: `${(i * 7 + j) * 0.02}s`,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      background: levelColors[Math.min(day.level + 1, 4) as keyof typeof levelColors]
                    }
                  }}
                />
              ))}
            </Group>
          ))}
        </Stack>

        <Group justify="space-between" mt="xs" style={{ opacity: 0.7 }}>
          <Text size="xs" style={{ fontSize: "0.65rem" }}>
            Less
          </Text>
          <Box style={{ display: "flex", gap: "3px", alignItems: "center" }}>
            {[0, 1, 2, 3, 4].map((level) => (
              <Box
                key={level}
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "2px",
                  background: levelColors[level as keyof typeof levelColors]
                }}
              />
            ))}
          </Box>
          <Text size="xs" style={{ fontSize: "0.65rem" }}>
            More
          </Text>
        </Group>
      </Box>
    </Box>
  );
}
