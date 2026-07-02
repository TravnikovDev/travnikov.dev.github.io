import React, { useEffect, useState } from "react";
import { AppShellHeader, Container, Group } from "@mantine/core";
import DesktopNavigation from "./DesktopNavigation";
import * as styles from "./Header.module.css";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AppShellHeader
      className={`${styles.appShellHeader} ${scrolled ? styles.scrolled : ""}`}
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
