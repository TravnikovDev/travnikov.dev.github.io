import React from "react";
import { Group, ActionIcon, Tooltip } from "@mantine/core";

// In a real implementation, these would be actual icon components from a library
const socialLinks = [
  {
    name: "GitHub",
    icon: "📂",
    url: "https://github.com/TravnikovDev",
    color: "#333",
  },
  {
    name: "LinkedIn",
    icon: "🔗",
    url: "https://www.linkedin.com/in/roman-travnikov/",
    color: "#0077B5",
  },
  {
    name: "Instagram",
    icon: "📷",
    url: "https://instagram.com/travnikov.dev",
    color: "#E1306C",
  },
  {
    name: "Email",
    icon: "📧",
    url: "mailto:roman@travnikov.dev",
    color: "#D44638",
  },
];

interface SocialLinksProps {
  size?: "sm" | "md" | "lg" | "xl";
}

export default function SocialLinks({ size = "md" }: SocialLinksProps) {
  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  }[size];

  return (
    <Group spacing={size}>
      {socialLinks.map((link) => (
        <Tooltip key={link.name} label={link.name} position="top">
          <ActionIcon
            component="a"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            variant="light"
            radius="xl"
            size={size}
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            <span style={{ fontSize: iconSize }}>{link.icon}</span>
          </ActionIcon>
        </Tooltip>
      ))}
    </Group>
  );
}
