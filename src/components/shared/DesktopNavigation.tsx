import React from "react";
import { Group, UnstyledButton } from "@mantine/core";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import Logo from "./Logo";
import * as styles from "./DesktopNavigation.module.css";

const navItems = [
  { label: "AI Automation", path: "/ai-automation-engineer" },
  { label: "Web Performance", path: "/react-performance-consulting" },
  { label: "Fractional CTO", path: "/fractional-cto" },
  { label: "Insights", path: "/blog" },
];

const NavItem = ({
  label,
  path,
  isActive,
}: {
  label: string;
  path: string;
  isActive: boolean;
}) => (
  <UnstyledButton
    component={Link}
    to={path}
    className={`${styles.navButton} ${isActive ? styles.navButtonActive : ""}`}
  >
    {label}
  </UnstyledButton>
);

export default function DesktopNavigation() {
  const location = useLocation();

  return (
    <Group justify="space-between" className={styles.navigationGroup}>
      <Logo />
      <Group gap="xs" className={styles.navLinksGroup}>
        {navItems.map((link) => (
          <NavItem
            key={link.path}
            label={link.label}
            path={link.path}
            isActive={location.pathname.replace(/\/$/, "") === link.path}
          />
        ))}
      </Group>
    </Group>
  );
}
