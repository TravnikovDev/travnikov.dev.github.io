import React from "react";
import { Group, ActionIcon, MantineSize } from "@mantine/core";
import SocialLinkIcon from "./SocialLinkIcon";
import * as styles from './SocialLinks.module.css';

interface SocialLinksProps {
  size?: MantineSize;
}

export default function SocialLinks({ size = "md" }: SocialLinksProps) {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/TravnikovDev",
      icon: "🐙",
      hoverColor: "#21E6C1" // Electric cyan - vaporwave
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/travnikov",
      icon: "💼",
      hoverColor: "#FF61A6" // Sunset pink - vaporwave
    },
    {
      name: "Twitter",
      url: "https://twitter.com/TravnikovDev",
      icon: "🐦",
      hoverColor: "#FF7A00" // Orange neon - vaporwave
    }
  ];

  return (
    <Group gap={size === "sm" ? "xs" : "md"} className={styles.socialLinks}>
      {socialLinks.map((link) => (
        <ActionIcon
          key={link.url}
          component="a"
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          variant="transparent"
          radius="xl"
          size={size}
          className={styles.actionIcon}
        >
          <SocialLinkIcon {...link} />
        </ActionIcon>
      ))}
    </Group>
  );
}
