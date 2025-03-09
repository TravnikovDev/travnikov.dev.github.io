import React, { useState } from "react";
import { AppShell, Box, Container, Burger } from "@mantine/core";
import DesktopNavigation from "../components/shared/DesktopNavigation";
import MobileDrawer from "../components/shared/MobileDrawer";
import Footer from "../components/shared/Footer";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{ width: 0, breakpoint: "sm" }}
      padding={0}
      style={{
        background: "transparent",
        minHeight: "100vh"
      }}
    >
      <AppShell.Header
        style={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          background: "rgba(10, 15, 36, 0.8)",
          backdropFilter: "blur(10px)",
          zIndex: 100
        }}
      >
        <Container size="lg" h="100%">
          <Box
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <DesktopNavigation />

            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              hiddenFrom="sm"
              style={{
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.1)"
                }
              }}
            />
          </Box>
        </Container>
      </AppShell.Header>

      <AppShell.Main
        style={{
          background: "transparent",
          width: "100%",
          minHeight: "100vh",
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0
        }}
      >
        {children}
      </AppShell.Main>

      <Footer />

      <MobileDrawer
        opened={opened}
        onClose={() => setOpened(false)}
      />
    </AppShell>
  );
}
