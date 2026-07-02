import React from "react";
import { AppShellHeader, Container, Group } from "@mantine/core";
import DesktopNavigation from "./DesktopNavigation";
import * as styles from "./Header.module.css";

const Header: React.FC = () => (
  <AppShellHeader className={styles.appShellHeader} visibleFrom="sm">
    <Container size="xl" className={styles.container}>
      <Group justify="space-between" h="100%" className={styles.headerGroup}>
        <DesktopNavigation />
      </Group>
    </Container>
  </AppShellHeader>
);

export default Header;
