import React from "react";
import { Container, AppShellFooter, Box, Text, Anchor } from "@mantine/core";
import { Link } from "gatsby";
import SocialLinks from "./SocialLinks";
import * as styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <>
      {/* Standard Footer */}
      <AppShellFooter p="md" className={styles.footer} visibleFrom="sm">
        <Container size="xl">
          <Box className={styles.footerContent}>
            <SocialLinks />
            <Box className={styles.footerLinks}>
              <Anchor component={Link} to="/" className={styles.footerLink}>
                Home
              </Anchor>
              <Anchor
                component={Link}
                to="/projects"
                className={styles.footerLink}
              >
                Case Studies
              </Anchor>
              <Anchor
                component={Link}
                to="/contact"
                className={styles.footerLink}
              >
                Contact
              </Anchor>
              <Anchor
                component={Link}
                to="/experiments"
                className={styles.footerLink}
              >
                Experiments
              </Anchor>
            </Box>
            <Text className={styles.footerText}>
              © {new Date().getFullYear()} Roman Travnikov. All rights reserved.
            </Text>
          </Box>
        </Container>
      </AppShellFooter>

      {/* Mobile-only Fixed Bottom Navigation - hidden on sm and up screens */}
      <Box className={styles.mobileNav} hiddenFrom="sm">
        {/* Home */}
        <Anchor
          component={Link}
          to="/"
          className={styles.navItem}
          onClick={(e) => e.preventDefault()}
        >
          <Box className={styles.navIcon}>🏠</Box>
          <Text className={styles.navText}>Home</Text>
        </Anchor>

        {/* AI Automation */}
        <Anchor
          component={Link}
          to="/ai-automation-engineer"
          className={styles.navItem}
          onClick={(e) => e.preventDefault()}
        >
          <Box className={styles.navIcon}>🤖</Box>
          <Text className={styles.navText}>Automation</Text>
        </Anchor>

        {/* Web Performance - Highlighted */}
        <Anchor
          component={Link}
          to="/react-performance-consulting"
          className={styles.navItemHighlighted}
          onClick={(e) => e.preventDefault()}
        >
          <Box className={styles.navIconHighlighted}>⚡</Box>
          <Text className={styles.navTextHighlighted}>Performance</Text>
        </Anchor>

        {/* Fractional CTO */}
        <Anchor
          component={Link}
          to="/fractional-cto"
          className={styles.navItem}
          onClick={(e) => e.preventDefault()}
        >
          <Box className={styles.navIcon}>🧭</Box>
          <Text className={styles.navText}>CTO</Text>
        </Anchor>

        {/* Insights */}
        <Anchor
          component={Link}
          to="/blog"
          className={styles.navItem}
          onClick={(e) => e.preventDefault()}
        >
          <Box className={styles.navIcon}>📝</Box>
          <Text className={styles.navText}>Insights</Text>
        </Anchor>
      </Box>
    </>
  );
};

export default Footer;
