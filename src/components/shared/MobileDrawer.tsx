import React from "react";
import { Box, Title, Drawer, Stack, Button, Divider, Paper, Text } from "@mantine/core";
import { Link } from "gatsby";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import * as styles from './MobileDrawer.module.css';

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
      className={styles.drawer}
    >
      <Title
        order={2}
        className={styles.menuTitle}
      >
        Menu
      </Title>

      <Divider
        my="lg"
        labelPosition="center"
        className={styles.divider}
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
            p={20}
            className={styles.paper}
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
              className={styles.button}
            >
              <span className={styles.icon}>{item.icon}</span> {item.title}
            </Button>
          </Paper>
        ))}
      </Stack>

      <Divider
        my="xl"
        label="Let's Connect"
        labelPosition="center"
        size="sm"
        className={styles.divider}
      />

      <Box className={styles.socialLinks}>
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
            className={styles.socialButton}
          >
            <Text className={styles.socialButtonText}>
              <span className={styles.socialIcon}>{item.icon}</span> {item.title}
            </Text>
          </Button>
        ))}
      </Box>
    </Drawer>
  );
}
