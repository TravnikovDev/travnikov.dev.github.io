import React, { useEffect } from "react";
import { AppShell } from "@mantine/core";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import * as styles from "./BaseLayout.module.css";

interface BaseLayoutProps {
  children: React.ReactNode;
}

/**
 * Pointer highlight for the glass sheets.
 *
 * One passive, rAF-throttled listener for the whole document — the sheets
 * only need to publish `--mx` / `--my`, which CSS turns into a faint radial
 * wash (see --sheet-glow in global.css). No per-component state, so it never
 * triggers a React render.
 *
 * Skipped entirely for reduced-motion and for coarse pointers: on touch there
 * is no hover, and a highlight stuck wherever the last tap landed looks broken.
 */
function useSheetPointerGlow() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let last: HTMLElement | null = null;

    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const target = event.target as HTMLElement | null;
        const sheet =
          target && typeof target.closest === "function"
            ? (target.closest("[data-sheet]") as HTMLElement | null)
            : null;

        if (sheet !== last && last) {
          // park the glow above the sheet again so it fades out on exit
          last.style.removeProperty("--mx");
          last.style.removeProperty("--my");
        }
        last = sheet;
        if (!sheet) return;

        const rect = sheet.getBoundingClientRect();
        sheet.style.setProperty(
          "--mx",
          `${((event.clientX - rect.left) / rect.width) * 100}%`
        );
        sheet.style.setProperty(
          "--my",
          `${((event.clientY - rect.top) / rect.height) * 100}%`
        );
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  useSheetPointerGlow();

  return (
    <AppShell padding={0} className={styles.container}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <Header />

      <AppShell.Main id="main-content" className={styles.main}>
        {children}
      </AppShell.Main>

      <Footer />
    </AppShell>
  );
}
