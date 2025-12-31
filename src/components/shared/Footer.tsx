import React from "react";
import { Container, Box, Text, Anchor } from "@mantine/core";
import * as styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const localTime = new Date().toLocaleTimeString("en-US", {
    timeZone: "Europe/Istanbul",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <footer className={styles.footer}>
      <Container size="xl" className={styles.footerInner}>
        <Box className={styles.topRow}>
          <Box className={styles.brandBlock}>
            <Text className={styles.brand}>Roman Travnikov</Text>
            <Text className={styles.meta}>© {new Date().getFullYear()}</Text>
          </Box>

          <Box className={styles.linkColumns}>
            <Box className={styles.linkGroup}>
              <Text className={styles.linkTitle}>Socials</Text>
              <Anchor
                href="https://linkedin.com/in/travnikov"
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

            <Box className={styles.linkGroup}>
              <Text className={styles.linkTitle}>Legal</Text>
              <Anchor href="/privacy" className={styles.link}>
                Privacy
              </Anchor>
              <Anchor href="/terms" className={styles.link}>
                Terms
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
          <Text className={styles.meta}>Local time: {localTime}</Text>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
