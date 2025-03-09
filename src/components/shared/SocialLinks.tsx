import React from "react";
import { Group, ActionIcon, MantineSize } from "@mantine/core";
import SocialLinkIcon from "./SocialLinkIcon";

interface SocialLinksProps {
  size?: MantineSize;
}

export default function SocialLinks({ size = "md" }: SocialLinksProps) {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/TravnikovDev",
      icon: "🐙",
      hoverColor: "#3D7FFF"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/travnikov",
      icon: "💼",
      hoverColor: "#0077FF"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/TravnikovDev",
      icon: "🐦",
      hoverColor: "#00F0FF"
    }
  ];

  return (
    <Group gap={size === "sm" ? "xs" : "md"}>
      {socialLinks.map((link) => (
        <ActionIcon
          key={link.url}
          component="a"
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          variant="light"
          radius="xl"
          size={size}
          style={{
            backgroundColor: "rgba(61, 127, 255, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(61, 127, 255, 0.15)",
              transform: "translateY(-2px)"
            }
          }}
        >
          <SocialLinkIcon {...link} />
        </ActionIcon>
      ))}
    </Group>
  );
}
