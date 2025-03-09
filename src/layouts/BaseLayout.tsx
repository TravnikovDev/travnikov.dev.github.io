import React, { useState } from "react";
import { AppShell } from "@mantine/core";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import styles from './BaseLayout.module.css';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <AppShell
      padding={0}
      className={styles.appShell}
    >
      <Header />
      
      <AppShell.Main className={styles.main}>
        {children}
      </AppShell.Main>

      <Footer />
    </AppShell>
  );
}
