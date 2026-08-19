import React, { Suspense, useEffect, useState } from "react";
import * as styles from "./3dBackground.module.css";

/**
 * The aura background, in two tiers.
 *
 * Tier 1 is a CSS gradient. It ships in the stylesheet, paints immediately,
 * costs nothing to animate because it does not animate, and is what mobile
 * gets.
 *
 * Tier 2 is the WebGL shader, `AuraScene`. It is behind a dynamic import so
 * the three.js bundle — 669KB raw, 165KB gzipped — is only fetched on devices
 * that will actually render it. Previously every page pulled it, including
 * article pages where the shader sits almost entirely behind an opaque sheet.
 *
 * The gate is "has a real pointer and a screen wide enough to see it". That is
 * a proxy for mains power and a discrete GPU rather than a phone on battery.
 * Relax the query below if you want tablets back.
 */
const DESKTOP_QUERY = "(min-width: 48em) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const AuraScene = React.lazy(() => import("./AuraScene"));

export default function ThreeDBackground() {
  const [useShader, setUseShader] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const desktop = window.matchMedia(DESKTOP_QUERY);
    const reduced = window.matchMedia(REDUCED_MOTION);
    const decide = () => setUseShader(desktop.matches && !reduced.matches);

    decide();
    desktop.addEventListener("change", decide);
    reduced.addEventListener("change", decide);
    return () => {
      desktop.removeEventListener("change", decide);
      reduced.removeEventListener("change", decide);
    };
  }, []);

  return (
    <div className={styles.backgroundContainer} aria-hidden="true">
      <div className={styles.staticAura} />
      {useShader && (
        <Suspense fallback={null}>
          <AuraScene />
        </Suspense>
      )}
    </div>
  );
}
