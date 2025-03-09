import React, { useState } from "react";
import { AppShell } from "@mantine/core";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <AppShell
      padding={0}
      style={{
        background: "transparent",
        minHeight: "100vh"
      }}
    >
      <Header />
      
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
    </AppShell>
  );
}
