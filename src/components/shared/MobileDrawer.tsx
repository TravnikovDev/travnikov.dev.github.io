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
          background: "rgba(10, 15, 36, 0.9)",
          backdropFilter: "blur(10px)"
        },
        inner: {
          background: "rgba(10, 15, 36, 0.95)",
          backdropFilter: "blur(10px)",
          fontSize: "20px", // Increased font size for better readability
          overflow: "auto"  // Ensure scrolling works properly
        },
        header: {
          padding: "20px", // More padding in header
          marginBottom: "15px",
          borderBottom: "1px solid rgba(61, 127, 255, 0.2)" // Visual separator
        },
        body: {
          padding: "24px" // More padding in body for better touch targets
        },
        close: {
          width: "44px", // Larger close button
          height: "44px", // Larger close button
          color: "#3D7FFF",
          '&:hover': {
            backgroundColor: "rgba(61, 127, 255, 0.15)"
          }
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

      <Stack gap={20} mb={50}>
        {[
          { title: "Projects", path: "/projects", icon: "📁" },
          { title: "Blog", path: "/blog", icon: "📝" },
          { title: "Experiments", path: "/experiments", icon: "🧪" },
          { title: "Contact", path: "/contact", icon: "📞" }
        ].map((item) => (
          <Paper
            key={item.path}
            shadow="md"
            radius="lg"
            p={20} // Increased padding
            styles={{
              root: {
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                transform: "translateZ(0)",
                border: item.path === "/contact" ? 
                  "3px solid rgba(166, 77, 255, 0.5)" : 
                  "3px solid rgba(61, 127, 255, 0.3)",
                marginBottom: 15,
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)", // More visible shadow
                "&:active": {
                  transform: "scale(0.98)",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
                }
              }
            }}
          >
            <Button
              component={Link}
              to={item.path}
              fullWidth
              size="xl"
              radius="lg"
              variant={item.path === "/contact" ? "gradient" : "filled"}
              gradient={{ from: "#3D7FFF", to: "#A64DFF", deg: 45 }}
              color={item.path === "/contact" ? undefined : "blue"}
              onClick={onClose}
              styles={{
                root: {
                  height: "5rem", // Even taller for better touch targets
                  fontSize: "1.6rem", // Larger text
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)"
                },
                inner: {
                  justifyContent: "flex-start", // Left-align content
                  gap: "15px" // More space between icon and text
                },
                label: {
                  display: "flex",
                  alignItems: "center"
                }
              }}
            >
              <span style={{ fontSize: "1.8rem", marginRight: "8px" }}>{item.icon}</span> {item.title}
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

      <Box 
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginBottom: "30px"
        }}
      >
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
                border: "2px solid rgba(61, 127, 255, 0.2)",
                boxShadow: "0 4px 20px rgba(61, 127, 255, 0.1)",
                height: "4.5rem", // Taller for better touch targets
                "&:active": {
                  backgroundColor: "rgba(61, 127, 255, 0.25)",
                  transform: "scale(0.98)",
                  boxShadow: "0 2px 10px rgba(61, 127, 255, 0.2)"
                }
              },
              inner: {
                justifyContent: "flex-start",
                paddingLeft: "15px"
              }
            }}
          >
            <Text styles={{ root: { fontSize: "1.8rem", fontWeight: 600 } }}>
              <span style={{ fontSize: "2rem", marginRight: "15px" }}>{item.icon}</span> {item.title}
            </Text>
          </Button>
        ))}
      </Box>
    </Drawer>
  );
}
