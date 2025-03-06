import { keyframes } from "@emotion/react";

// Enhanced animation keyframes
export const fadeInDown = keyframes({
  "0%": { opacity: 0, transform: "translateY(-10px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

export const glowPulse = keyframes({
  "0%": { boxShadow: "0 0 5px rgba(34, 144, 224, 0.2)" },
  "50%": { boxShadow: "0 0 15px rgba(34, 144, 224, 0.4)" },
  "100%": { boxShadow: "0 0 5px rgba(34, 144, 224, 0.2)" },
});

export const pulseGlow = keyframes({
  "0%": { boxShadow: "0 0 0 0 rgba(0, 120, 240, 0.4)" },
  "50%": { boxShadow: "0 0 15px 5px rgba(0, 120, 240, 0.2)" },
  "100%": { boxShadow: "0 0 0 0 rgba(0, 120, 240, 0.4)" },
});

export const gradientShift = keyframes({
  "0%": { backgroundPosition: "0% 50%" },
  "50%": { backgroundPosition: "100% 50%" },
  "100%": { backgroundPosition: "0% 50%" },
});
