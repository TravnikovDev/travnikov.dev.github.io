import "react";
import type { CSSProperties } from "react";
import { Group, ActionIcon, MantineSize } from "@mantine/core";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import * as styles from "./SocialLinks.module.css";
import { auraColors } from "../../theme";

interface SocialLinksProps {
  size?: MantineSize;
}

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
};

export default function SocialLinks({ size = "md" }: SocialLinksProps) {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/TravnikovDev",
      icon: <FaGithub />,
      hoverColor: auraColors.mint,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/travnikov",
      icon: <FaLinkedin />,
      hoverColor: auraColors.warmSand,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/TravnikovDev",
      icon: <FaTwitter />,
      hoverColor: auraColors.tan,
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
          style={
            { "--hover-color-rgb": hexToRgb(link.hoverColor) } as CSSProperties
          }
        >
          {link.icon}
        </ActionIcon>
      ))}
    </Group>
  );
}
