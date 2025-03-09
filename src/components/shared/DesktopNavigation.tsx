import React from "react";
import { Box, Group, Text, Button } from "@mantine/core";
import { Link } from "gatsby";
import { useColorScheme } from "@mantine/hooks";
import Logo from "./Logo";

export default function DesktopNavigation() {
  const colorScheme = useColorScheme();

  return (
    <Group gap="xl" visibleFrom="sm">
      <Logo />
      <Group gap="lg">
        {[
          { label: "Projects", path: "/projects" },
          { label: "Blog", path: "/blog" },
          { label: "Experiments", path: "/experiments" },
          { label: "Contact", path: "/contact" },
        ].map((link) => (
          <Button
            key={link.path}
            component={Link}
            to={link.path}
            variant="subtle"
            styles={{
              root: {
                color: colorScheme === "dark" ? "#E3E7F1" : "#39485E",
                fontWeight: 700,
                fontSize: "1.1rem",
                padding: "10px 20px",
                transition: "all 0.2s ease",
                "&:hover": {
                  background: "rgba(61, 127, 255, 0.1)",
                  transform: "translateY(-2px)",
                },
              },
            }}
          >
            {link.label}
          </Button>
        ))}
      </Group>
    </Group>
  );
}
