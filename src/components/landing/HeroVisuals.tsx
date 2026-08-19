import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { GlyphScene, GlyphKind } from "../3d/ServiceGlyphs";
import BrandSphere from "../3d/BrandSphere";
import * as styles from "./HeroSection.module.css";

// Split out of HeroSection so the whole R3F dependency graph — three.js,
// @react-three/fiber, the glyph scenes and the brand sphere — sits behind a
// dynamic import. The hero renders SVG and CSS stand-ins first and only pulls
// this in on devices that will benefit from it.

// Each glyph gets its own small canvas so it scrolls natively with the DOM.
// (A shared drei <View> re-scissors per frame and visibly lags during scroll.)
// To keep it cheap, each canvas pauses its render loop when scrolled off
// screen (IntersectionObserver) and stays static under reduced motion.
const GlyphCanvas = ({
  kind,
  phase,
  reducedMotion,
}: {
  kind: GlyphKind;
  phase: number;
  reducedMotion: boolean;
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    if (reducedMotion) return; // stays "demand" regardless of visibility
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "150px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  // never = paused (keeps last frame on the GPU); demand = one static frame
  const frameloop = reducedMotion ? "demand" : onScreen ? "always" : "never";

  return (
    <div ref={wrapRef} className={styles.glyphCanvasWrap}>
      <Canvas
        className={styles.glyphCanvas}
        dpr={[1, 2]}
        frameloop={frameloop}
        gl={{ antialias: true, alpha: true }}
      >
        <GlyphScene kind={kind} phase={phase} />
      </Canvas>
    </div>
  );
};

export { BrandSphere };

export default GlyphCanvas;
