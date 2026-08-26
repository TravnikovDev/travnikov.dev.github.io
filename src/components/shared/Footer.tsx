import React from "react";
import { Container, Box, Text, Anchor } from "@mantine/core";
import * as styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Container size="xl" className={styles.footerInner}>
        <Box className={styles.topRow}>
          <Box className={styles.brandBlock}>
            <Text className={styles.brand}>Roman Travnikov</Text>
            {/* The year is baked at build time and re-evaluated in the browser,
                so a page cached across New Year would render two different
                values and fail hydration — the same way the old footer clock
                did. The year is not worth a mismatch, so allow it to differ. */}
            <Text className={styles.meta} suppressHydrationWarning>
              © {new Date().getFullYear()}
            </Text>
          </Box>

          <Box className={styles.linkColumns}>
            <Box className={styles.linkGroup}>
              <Text className={styles.linkTitle}>Socials</Text>
              <Anchor
                href="https://www.linkedin.com/in/roman-travnikov/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                LinkedIn
              </Anchor>
              <Anchor
                href="https://twitter.com/TravnikovDev"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Twitter / X
              </Anchor>
              <Anchor
                href="https://github.com/TravnikovDev"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                GitHub
              </Anchor>
            </Box>
          </Box>
        </Box>

        <div className={styles.divider} />

        <Box className={styles.heroBlock}>
          <Text className={styles.heroOutline}>Build the</Text>
          <Text className={styles.heroTitle}>Future</Text>
          <Anchor
            href="mailto:roman@travnikov.dev"
            className={styles.email}
          >
            roman@travnikov.dev
          </Anchor>
        </Box>

        <Box className={styles.bottomRow}>
          <Text className={styles.meta}>Based in Istanbul, Turkey</Text>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
