import React, { useEffect, useState } from "react";
import { Container, Box, Text, Anchor } from "@mantine/core";
import * as styles from "./Footer.module.css";

const ISTANBUL = {
  timeZone: "Europe/Istanbul",
  hour: "2-digit" as const,
  minute: "2-digit" as const,
};

const Footer: React.FC = () => {
  /**
   * Read after mount, never during render.
   *
   * Computing this inline meant the server baked one time into the HTML and
   * the browser produced another a moment later. React treats that as a text
   * mismatch (#425) and fails hydration for the whole tree (#418/#423), which
   * silently killed every useEffect on the site: the WebGL background never
   * initialised and the article engagement events never fired. A clock in the
   * footer was breaking the 3D on the homepage.
   *
   * The placeholder is the same on the server and on the first client render,
   * so hydration matches. It is also the same width as a real time, so filling
   * it in does not shift the layout.
   */
  const [localTime, setLocalTime] = useState("--:--");

  useEffect(() => {
    const tick = () =>
      setLocalTime(new Date().toLocaleTimeString("en-US", ISTANBUL));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

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
          <Text className={styles.meta}>Local time: {localTime}</Text>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
