import React from "react";
import { Box, Title, Drawer, Stack, Button, Divider, Paper, Text } from "@mantine/core";
import { Link } from "gatsby";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";

interface MobileDrawerProps {
  opened: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ opened, onClose }: MobileDrawerProps) {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      size="100%"
      title={<Logo />}
      withOverlay
      styles={{
        overlay: {
          background: "rgba(10, 15, 36, 0.8)",
          backdropFilter: "blur(10px)"
        },
        inner: {
          background: "rgba(10, 15, 36, 0.95)",
          backdropFilter: "blur(10px)"
        }
      }}
    >
      <Title
        order={2}
        styles={{
          root: {
            background: "linear-gradient(45deg, #3D7FFF, #A64DFF)",
            backgroundSize: "200% 200%",
            animation: "gradient-shift 15s ease infinite",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "1.5rem",
            fontWeight: 900,
            letterSpacing: "-0.02em"
          }
        }}
      >
        Menu
      </Title>

      <Divider
        my="lg"
        labelPosition="center"
        styles={{
          root: {
            opacity: 0.5
          },
          label: {
            opacity: 0.7,
            color: "#E3E7F1"
          }
        }}
      />

      <Stack gap="sm" mb={40}>
        {[
          { title: "Projects", path: "/projects" },
          { title: "Blog", path: "/blog" },
          { title: "Experiments", path: "/experiments" }
        ].map((item) => (
          <Paper
            key={item.path}
            shadow="sm"
            radius="md"
            p={12}
            styles={{
              root: {
                overflow: "hidden",
                transition: "transform 0.3s ease",
                transform: "translateZ(0)"
              }
            }}
          >
            <Button
              component={Link}
              to={item.path}
              fullWidth
              size="xl"
              radius="md"
              variant={item.path === "/contact" ? "gradient" : "subtle"}
              gradient={{ from: "primary.4", to: "primary.6", deg: 45 }}
              onClick={onClose}
              styles={{
                root: {
                  height: "3rem",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em"
                }
              }}
            >
              {item.title}
            </Button>
          </Paper>
        ))}
      </Stack>

      <Divider
        my="xl"
        label="Let's Connect"
        labelPosition="center"
        size="sm"
        styles={{
          root: {
            opacity: 0.5
          },
          label: {
            opacity: 0.7,
            color: "#E3E7F1",
            fontSize: "0.875rem",
            fontWeight: 500
          }
        }}
      />

      <Stack gap="lg">
        {[
          { title: "GitHub", href: "https://github.com/TravnikovDev", icon: "🐙" },
          { title: "LinkedIn", href: "https://linkedin.com/in/travnikov", icon: "💼" },
          { title: "Twitter", href: "https://twitter.com/TravnikovDev", icon: "🐦" }
        ].map((item) => (
          <Button
            key={item.href}
            component="a"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            variant="light"
            size="lg"
            radius="xl"
            styles={{
              root: {
                transition: "all 0.3s ease",
                backgroundColor: "rgba(61, 127, 255, 0.1)",
                border: "1px solid rgba(61, 127, 255, 0.2)",
                boxShadow: "0 4px 20px rgba(61, 127, 255, 0.1)",
                height: "3.5rem",
                "&:hover": {
                  backgroundColor: "rgba(61, 127, 255, 0.15)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 30px rgba(61, 127, 255, 0.2)"
                }
              }
            }}
          >
            <Text styles={{ root: { fontSize: "1.5rem" } }}>
              {item.icon} {item.title}
            </Text>
          </Button>
        ))}
      </Stack>
    </Drawer>
  );
}
