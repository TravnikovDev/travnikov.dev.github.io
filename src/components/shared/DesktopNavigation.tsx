import React, { useState, useEffect } from "react";
import { Group, UnstyledButton, Burger } from "@mantine/core";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (path: string) =>
    location.pathname.replace(/\/$/, "") === path;

  // lock body scroll while the mobile menu is open; close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <Group justify="space-between" className={styles.navigationGroup}>
      <Logo />

      {/* Desktop links */}
      <Group
        component="nav"
        aria-label="Main navigation"
        gap="xs"
        className={styles.navLinksGroup}
        visibleFrom="sm"
      >
        {navItems.map((link) => (
          <NavItem
            key={link.path}
            label={link.label}
            path={link.path}
            isActive={isActive(link.path)}
          />
        ))}
      </Group>

      {/* Mobile burger */}
      <Burger
        opened={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
        hiddenFrom="sm"
        size="sm"
        color="var(--ink)"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        className={styles.burger}
        style={{ zIndex: 1002 }}
      />

      {/* Mobile menu overlay */}
      {menuOpen && (
        <nav className={styles.mobileMenu} aria-label="Mobile navigation">
          <span className={styles.mobileMenuLabel}>Menu</span>
          {navItems.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`${styles.drawerLink} ${
                isActive(link.path) ? styles.drawerLinkActive : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </Group>
  );
}
