import React from "react";
import { Container, AppShellFooter, Box, Text, Anchor } from "@mantine/core";
import { Link } from "gatsby";
import SocialLinks from "./SocialLinks";
import * as styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <>
      {/* Standard Footer */}
      <AppShellFooter p="md" className={styles.footer} visibleFrom="sm">
        <Container size="xl">
          <Box className={styles.footerContent}>
            <SocialLinks />
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
        >
          <Box className={styles.navIcon}>
            🏠
          </Box>
          <Text className={styles.navText}>Home</Text>
        </Anchor>
        
        {/* Projects */}
        <Anchor
          component={Link}
          to="/projects"
          className={styles.navItem}
        >
          <Box className={styles.navIcon}>
            📂
          </Box>
          <Text className={styles.navText}>Projects</Text>
        </Anchor>
        
        {/* Contact - Highlighted */}
        <Anchor
          component={Link}
          to="/contact"
          className={styles.navItemHighlighted}
        >
          <Box className={styles.navIconHighlighted}>
            📞
          </Box>
          <Text className={styles.navTextHighlighted}>Contact</Text>
        </Anchor>
        
        {/* Blog */}
        <Anchor
          component={Link}
          to="/blog"
          className={styles.navItem}
        >
          <Box className={styles.navIcon}>
            📝
          </Box>
          <Text className={styles.navText}>Blog</Text>
        </Anchor>
        
        {/* Experiments */}
        <Anchor
          component={Link}
          to="/experiments"
          className={styles.navItem}
        >
          <Box className={styles.navIcon}>
            🧪
          </Box>
          <Text className={styles.navText}>Experiments</Text>
        </Anchor>
      </Box>
    </>
  );
};

export default Footer;
