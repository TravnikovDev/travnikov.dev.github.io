import React, { useEffect, useState } from "react";
import { AppShellHeader, Container, Group } from "@mantine/core";
import { useLocation } from "@reach/router";
import DesktopNavigation from "./DesktopNavigation";
import * as styles from "./Header.module.css";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname.replace(/\/$/, "") === "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The hero owns the brand on the homepage, so the header wordmark only
  // fades in there once scrolled. On every other page it's always shown.
  const showWordmark = scrolled || !isHome;

  return (
    <AppShellHeader
      className={`${styles.appShellHeader} ${scrolled ? styles.scrolled : ""} ${
        showWordmark ? styles.wordmark : ""
      }`}
    >
      <Container size="xl" className={styles.container}>
        <Group justify="space-between" h="100%" className={styles.headerGroup}>
          <DesktopNavigation />
        </Group>
      </Container>
    </AppShellHeader>
  );
};

export default Header;
