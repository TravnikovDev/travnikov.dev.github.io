import "react";
import type { CSSProperties } from "react";
import { Group, ActionIcon, MantineSize } from "@mantine/core";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import * as styles from "./SocialLinks.module.css";

interface SocialLinksProps {
  size?: MantineSize;
}

export default function SocialLinks({ size = "md" }: SocialLinksProps) {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/TravnikovDev",
      icon: <FaGithub />,
      hoverColor: "#21E6C1", // Electric cyan - vaporwave
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/travnikov",
      icon: <FaLinkedin />,
      hoverColor: "#FF61A6", // Sunset pink - vaporwave
    },
    {
      name: "Twitter",
      url: "https://twitter.com/TravnikovDev",
      icon: <FaTwitter />,
      hoverColor: "#FF7A00", // Orange neon - vaporwave
    },
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
          aria-label={link.name}
          title={link.name}
          style={{ "--hover-color": link.hoverColor } as CSSProperties}
        >
          {link.icon}
        </ActionIcon>
      ))}
    </Group>
  );
}
