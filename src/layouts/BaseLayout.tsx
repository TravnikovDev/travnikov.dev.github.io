import React, { useState, useEffect } from "react";
import {
  AppShell,
  AppShellMain,
} from "@mantine/core";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";

// Import components
import Header from "../components/shared/Header";
import MobileDrawer from "../components/shared/MobileDrawer";
import Footer from "../components/shared/Footer";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [scroll] = useWindowScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Update header style on scroll
  useEffect(() => {
    setIsScrolled(scroll.y > 20);
  }, [scroll.y]);

  return (
    <AppShell
      header={{ height: { base: 70, md: 80 } }}
      footer={{ height: { base: 100, md: 90 } }}
      padding="0" // Reduced padding to allow full-width sections
    >
      {/* Header component */}
      <Header 
        isScrolled={isScrolled}
        drawerOpened={drawerOpened}
        toggleDrawer={toggleDrawer}
      />
      
      {/* Mobile Navigation Drawer */}
      <MobileDrawer 
        opened={drawerOpened}
        onClose={closeDrawer}
      />
      
      <AppShellMain>
        {children}
      </AppShellMain>
      
      {/* Footer component */}
      <Footer />
    </AppShell>
  );
}