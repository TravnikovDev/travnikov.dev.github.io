import React from "react";
import { Container, AppShellFooter, Box, Text } from "@mantine/core";
import SocialLinks from "./SocialLinks";

const Footer: React.FC = () => {
  return (
    <AppShellFooter
      p="md"
      className="footer"
      style={{
        borderTop: "1px solid var(--mantine-color-dark-4)",
        background: "var(--mantine-color-dark-8)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container size="xl">
        <Box
          className="footer-content"
          style={{
            textAlign: "center",
            '@media (min-width: 768px)': {
              textAlign: "left",
              marginTop: 0,
            },
            marginTop: "1rem",
          }}
        >
          <SocialLinks />
          <Text
            c="dimmed"
            size="sm"
            style={{
              fontSize: "0.9rem",
              marginTop: "1rem",
            }}
          >
            © {new Date().getFullYear()} Roman Travnikov. All rights reserved.
          </Text>
        </Box>
      </Container>
    </AppShellFooter>
  );
};

export default Footer;
