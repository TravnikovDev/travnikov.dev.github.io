import React from "react";
import {
  AppShellFooter,
  Container,
  Grid,
  Box,
  Text,
  Group,
} from "@mantine/core";
import { socialLinks } from "./NavItems";
import { gradientShift } from "./AnimationKeyframes";
import SocialLinkIcon from "./SocialLinkIcon";
import GitHubActivityFeed from "./GitHubActivityFeed";

const Footer: React.FC = () => {
  return (
    <AppShellFooter
      sx={{
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        background:
          "linear-gradient(180deg, rgba(15, 16, 21, 0) 0%, rgba(15, 16, 21, 0.9) 30%, rgba(15, 16, 21, 1) 100%)",
        backdropFilter: "blur(15px)",
        position: "relative",
        overflow: "hidden",

        // Depth lighting effect
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(0, 120, 240, 0.3), transparent)",
          filter: "blur(2px)",
          zIndex: 1,
        },

        // Bottom glow
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -20,
          left: "30%",
          right: "30%",
          height: "30px",
          background:
            "radial-gradient(ellipse at center, rgba(0, 120, 240, 0.15) 0%, transparent 70%)",
          filter: "blur(10px)",
          zIndex: 0,
        },
      }}
    >
      <Container size="xl">
        <Grid py="xl" align="center">
          {/* Copyright with enhanced styling */}
          <Grid.Col span={{ base: 12, md: 4 }} order={{ base: 3, md: 1 }}>
            <Box
              sx={{
                textAlign: { base: "center", md: "left" },
                marginTop: { base: "1rem", md: 0 },
              }}
            >
              <Text
                sx={{
                  fontSize: { base: "1rem", md: "1.1rem" },
                  fontWeight: 600,
                  fontFamily: '"Cabinet Grotesk", sans-serif',
                  letterSpacing: "-0.01em",
                  background: "var(--mantine-animated-gradient)",
                  backgroundSize: "300% 100%",
                  animation: `${gradientShift} 8s ease infinite`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 10px rgba(0, 120, 240, 0.2)",
                }}
              >
                © {new Date().getFullYear()} Roman Travnikov
              </Text>
              <Text
                size="sm"
                c="dimmed"
                mt={5}
                sx={{
                  fontFamily: '"Cabinet Grotesk", sans-serif',
                }}
              >
                Made with 🔥 and React
              </Text>
            </Box>
          </Grid.Col>

          {/* Social links with enhanced styling */}
          <Grid.Col span={{ base: 12, md: 4 }} order={{ base: 1, md: 2 }}>
            <Group justify="center" gap="xl">
              {socialLinks.map((link) => (
                <SocialLinkIcon key={link.name} link={link} />
              ))}
            </Group>
          </Grid.Col>

          {/* GitHub Activity Feed */}
          <Grid.Col span={{ base: 12, md: 4 }} order={{ base: 2, md: 3 }}>
            <GitHubActivityFeed />
          </Grid.Col>
        </Grid>
      </Container>
    </AppShellFooter>
  );
};

export default Footer;
