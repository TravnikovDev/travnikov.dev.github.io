import React from "react";
import { createTheme, MantineProvider as Provider } from "@mantine/core";
import "@mantine/core/styles.css";

// Enhanced theme with bolder colors, better contrasts, and funky typography
const theme = createTheme({
  primaryColor: "primary",
  colors: {
    // Professional yet vibrant color palette for light theme with navy/blue accents
    primary: [
      "#EBF8FF", // 0 - Almost white with blue tint
      "#D1EFFF", // 1
      "#A7DCFF", // 2
      "#7CC4FF", // 3
      "#51ABFF", // 4
      "#2593FF", // 5
      "#0077FF", // 6: primary - Bright blue
      "#0062D6", // 7
      "#004EAD", // 8
      "#003A84", // 9 - Navy
    ],
    secondary: [
      "#F0F4FF", // 0
      "#DCE4FF", // 1
      "#B6C8FF", // 2
      "#91ACFF", // 3
      "#6B8FFF", // 4
      "#4673FF", // 5
      "#2050FF", // 6: secondary - Royal blue
      "#1A42D6", // 7
      "#1335AD", // 8
      "#0D2884", // 9 - Deep royal blue
    ],
    accent: [
      "#FFF8EB", // 0
      "#FFF1D7", // 1
      "#FFE4B0", // 2
      "#FFD788", // 3
      "#FFC961", // 4
      "#FFBC39", // 5
      "#FFAC00", // 6: accent - Gold
      "#D69000", // 7
      "#AD7400", // 8
      "#845800", // 9 - Deep gold
    ],
    gray: [
      "#F9FAFC", // 0 - Almost white
      "#F0F2F5", // 1
      "#E2E6ED", // 2
      "#D3DAE4", // 3
      "#C4CDDC", // 4
      "#A9B6CD", // 5
      "#8C9CB8", // 6 - Light slate
      "#6B7D9B", // 7
      "#50617D", // 8
      "#39485E", // 9 - Slate blue
    ],
  },
  // Extreme typography with maximum personality and impact
  fontFamily:
    '"Cabinet Grotesk", "Mona Sans", "Switzer", "Inter", system-ui, -apple-system, sans-serif',
  fontFamilyMonospace:
    '"JetBrains Mono", "Fira Code", "Cascadia Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  headings: {
    // Ultra-bold, ultra-dramatic typography
    fontFamily:
      '"Monument Extended", "Clash Display", "Druk Wide", "Chillax", "PP Neue Montreal", system-ui, sans-serif',
    fontWeight: "900", // Maximum boldness
    sizes: {
      h1: { fontSize: "7rem", lineHeight: "1", letterSpacing: "-0.04em" }, // GIGANTIC
      h2: { fontSize: "5rem", lineHeight: "1.05", letterSpacing: "-0.035em" }, // ENORMOUS
      h3: { fontSize: "3.2rem", lineHeight: "1.1", letterSpacing: "-0.03em" }, // HUGE
      h4: { fontSize: "2.2rem", lineHeight: "1.2", letterSpacing: "-0.02em" }, // Very large
      h5: { fontSize: "1.6rem", lineHeight: "1.25", letterSpacing: "-0.015em" }, // Large
    },
  },
  // Increased radius for more modern look
  defaultRadius: "lg",
  defaultGradient: { from: "primary", to: "secondary", deg: 45 },
  components: {
    Button: {
      defaultProps: {
        size: "lg",
        radius: "xl", // Rounder buttons
      },
      styles: {
        root: {
          fontWeight: 700, // Bolder text
          fontSize: "1.1rem", // Slightly larger
          letterSpacing: "-0.01em",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)", // Stronger shadow
          transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)", // More playful animation
          "&:hover": {
            transform: "translateY(-5px) scale(1.02)", // More dramatic hover effect
            boxShadow:
              "0 15px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 120, 240, 0.3)",
          },
        },
      },
    },
    Container: {
      defaultProps: {
        px: { base: "xl", sm: "2xl" }, // Increased padding
      },
    },
    Paper: {
      defaultProps: {
        p: "xl", // Increased padding
        radius: "lg", // Rounder corners
      },
      styles: {
        root: {
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
          transition:
            "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
    Title: {
      styles: {
        root: {
          // More dynamic line-height
          '&[data-order="1"]': { letterSpacing: "-0.03em" },
          '&[data-order="2"]': { letterSpacing: "-0.02em" },
        },
      },
    },
  },
  // Enhanced CSS variables for more vivid gradients and effects
  cssVariablesResolver: (theme) => ({
    variables: {
      // Professional yet vibrant gradients for light theme
      "--mantine-primary-gradient":
        "linear-gradient(45deg, var(--mantine-color-primary-6), var(--mantine-color-secondary-6))",
      "--mantine-secondary-gradient":
        "linear-gradient(45deg, var(--mantine-color-secondary-6), var(--mantine-color-accent-6))",
      "--mantine-tertiary-gradient":
        "linear-gradient(45deg, var(--mantine-color-accent-5), var(--mantine-color-primary-5))",

      // SUPER VIBRANT animated gradients for light theme
      "--mantine-animated-gradient":
        "linear-gradient(90deg, #0080FF, #00F0FF, #2050FF, #5F43FF, #FFAC00, #FF5E00, #0080FF)",
      "--mantine-blue-gradient":
        "linear-gradient(45deg, #00A1FF, #2050FF, #00E0FF, #51ABFF)",
      "--mantine-dramatic-gradient":
        "radial-gradient(circle at top left, #0077FF, #2050FF, #FFAC00)",
      "--mantine-shine-gradient":
        "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)",

      // Refined shadows and glows for light theme
      "--mantine-glow-shadow": "0 10px 30px rgba(0, 119, 255, 0.2)",
      "--mantine-royal-glow": "0 10px 30px rgba(32, 80, 255, 0.2)",
      "--mantine-gold-glow": "0 10px 30px rgba(255, 172, 0, 0.2)",
      "--mantine-soft-shadow": "0 20px 80px -20px rgba(57, 72, 94, 0.25)",
      "--mantine-card-shadow": "0 10px 40px -10px rgba(57, 72, 94, 0.3)",

      // Spacing variables for consistent layout
      "--mantine-section-spacing": "6rem",
      "--mantine-card-spacing": "2rem",

      // Ultra transparent page background to let 3D scene show through
      "--mantine-page-bg": "transparent",

      // Z-index layers
      "--mantine-z-navbar": "1000",
      "--mantine-z-overlay": "900",
      "--mantine-z-modal": "1100",
    },
    light: {},
    dark: {
      // Enhanced dark theme variables
      "--mantine-color-body": "#0F1015",
    },
  }),
  // Dramatically increased spacing for maximum breathing room
  spacing: {
    xs: "1rem", // +60%
    sm: "1.5rem", // +71%
    md: "2.5rem", // +100%
    lg: "3.5rem", // +100%
    xl: "5rem", // +100%
    "2xl": "7rem", // +100%
    "3xl": "10rem", // New ultra-large spacing
  },
});

interface MantineProviderProps {
  children: React.ReactNode;
}

export function MantineProvider({ children }: MantineProviderProps) {
  return (
    <Provider theme={theme} defaultColorScheme="light">
      {children}
    </Provider>
  );
}

// Enhanced font loading with more personality fonts
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="stylesheet"
      href="https://unpkg.com/@mantine/core@7.6.2/styles.css"
      key="mantine-styles"
    />,
    // Base Inter font
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
      key="google-fonts-inter"
    />,
    // EXTREME personality with ultra-dramatic fonts from multiple sources
    <link
      href="https://api.fontshare.com/v2/css?f[]=clash-display@700,800,900&f[]=cabinet-grotesk@700,800,900,500,400&f[]=chillax@600,700,800,900&f[]=switzer@600,700,800,900&f[]=satoshi@900,700&f[]=general-sans@700,900&display=swap"
      rel="stylesheet"
      key="fontshare-fonts-1"
    />,
    <link
      href="https://fonts.cdnfonts.com/css/monument-extended"
      rel="stylesheet"
      key="cdnfonts-monument"
    />,
    <link
      href="https://fonts.cdnfonts.com/css/druk-wide"
      rel="stylesheet"
      key="cdnfonts-druk"
    />,
    <link
      href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/plus-jakarta-display.min.css"
      rel="stylesheet"
      key="jakarta-display"
    />,
    <link
      href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/hk-grotesk.min.css"
      rel="stylesheet"
      key="hk-grotesk"
    />,
    // Monospace font for code
    <link
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
      rel="stylesheet"
      key="google-fonts-mono"
    />,
    // Global styles for animated backgrounds and increased whitespace
    <style
      key="global-styles"
      dangerouslySetInnerHTML={{
        __html: `
          body {
            background: transparent; /* Fully transparent background */
            overflow-x: hidden;
            color: #39485E; /* Dark blue-gray text for contrast */
            /* No background pattern to let 3D scene show through */
          }
          
          /* Increased whitespace and dramatically improved typography */
          p {
            line-height: 1.9;
            font-size: 1.2rem;
            letter-spacing: -0.01em;
            font-family: 'Cabinet Grotesk', sans-serif;
          }
          
          /* Sections spacing with enhanced margins */
          section {
            padding: var(--mantine-section-spacing) 0;
            position: relative;
          }
          
          /* SUPER-DRAMATIC animated background gradient */
          .animated-gradient-bg {
            background: var(--mantine-animated-gradient);
            background-size: 400% 400%;
            animation: gradient-shift 15s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            position: relative;
            overflow: hidden;
          }
          
          .animated-gradient-bg::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at center, rgba(255,255,255,0.25), transparent 60%);
            opacity: 0.7;
            z-index: 1;
            pointer-events: none;
            mix-blend-mode: overlay;
          }
          
          /* Shimmering effect for elements */
          .shimmer {
            position: relative;
            overflow: hidden;
          }
          
          .shimmer::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: var(--mantine-shine-gradient);
            animation: shimmer-animation 3s infinite;
            z-index: 2;
          }
          
          @keyframes shimmer-animation {
            0% { left: -100%; }
            40% { left: 100%; }
            100% { left: 100%; }
          }
          
          /* Card hover effect to use throughout the site */
          .hover-card {
            transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
            transform: translateY(0) scale(1);
            box-shadow: 0 10px 30px -15px rgba(0, 119, 255, 0.15);
          }
          
          .hover-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 40px -20px rgba(0, 119, 255, 0.25);
          }
          
          /* Fancy animated border */
          .animated-border {
            position: relative;
            z-index: 0;
            border-radius: 10px;
            overflow: hidden;
          }
          
          .animated-border::before {
            content: '';
            position: absolute;
            z-index: -2;
            left: -50%;
            top: -50%;
            width: 200%;
            height: 200%;
            background-color: transparent;
            background-repeat: no-repeat;
            background-size: 50% 50%, 50% 50%;
            background-position: 0 0, 100% 0, 100% 100%, 0 100%;
            background-image: 
              linear-gradient(#0077FF, #0077FF), 
              linear-gradient(#2050FF, #2050FF), 
              linear-gradient(#FFAC00, #FFAC00), 
              linear-gradient(#00E0FF, #00E0FF);
            animation: rotate 6s linear infinite;
          }
          
          .animated-border::after {
            content: '';
            position: absolute;
            z-index: -1;
            left: 3px;
            top: 3px;
            width: calc(100% - 6px);
            height: calc(100% - 6px);
            background: white;
            border-radius: 8px;
          }
          
          @keyframes rotate {
            100% { transform: rotate(1turn); }
          }
          
          @keyframes gradient-shift {
            0% { background-position: 0% 0% }
            25% { background-position: 100% 0% }
            50% { background-position: 100% 100% }
            75% { background-position: 0% 100% }
            100% { background-position: 0% 0% }
          }
          
          /* Professional glow effects for light theme */
          .glow-text {
            color: var(--mantine-color-primary-9);
            text-shadow: 0 2px 10px rgba(0, 77, 255, 0.15);
            position: relative;
          }
          
          .highlight-blue {
            color: #0077FF;
            font-weight: 700;
            position: relative;
            z-index: 1;
          }
          
          .highlight-blue::after {
            content: "";
            position: absolute;
            left: -2px;
            right: -2px;
            bottom: 0;
            height: 0.5em;
            background-color: rgba(0, 119, 255, 0.1);
            z-index: -1;
            transform: rotate(-1deg);
          }
          
          .highlight-royal {
            color: #2050FF;
            font-weight: 700;
            position: relative;
            z-index: 1;
          }
          
          .highlight-royal::after {
            content: "";
            position: absolute;
            left: -2px;
            right: -2px;
            bottom: 0;
            height: 0.5em;
            background-color: rgba(32, 80, 255, 0.1);
            z-index: -1;
            transform: rotate(-1deg);
          }
          
          .highlight-gold {
            color: #D69000;
            font-weight: 700;
            position: relative;
            z-index: 1;
          }
          
          .highlight-gold::after {
            content: "";
            position: absolute;
            left: -2px;
            right: -2px;
            bottom: 0;
            height: 0.5em;
            background-color: rgba(255, 172, 0, 0.15);
            z-index: -1;
            transform: rotate(-1deg);
          }
          
          /* Typography enhancements */
          h1, h2, h3, h4, h5, h6 {
            position: relative;
          }
          
          h1::after, h2::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100px;
            height: 4px;
            background: var(--mantine-primary-gradient);
            border-radius: 2px;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          h1:hover::after, h2:hover::after {
            transform: scaleX(1);
          }
          
          /* Floating animation for use throughout the site */
          .float {
            animation: float-animation 6s ease-in-out infinite;
          }
          
          @keyframes float-animation {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
          
          /* Parallax scrolling helper classes */
          .parallax-slow {
            will-change: transform;
            transform: translateZ(0);
            transition: transform 0.1s linear;
          }
          
          .parallax-medium {
            will-change: transform;
            transform: translateZ(0);
            transition: transform 0.06s linear;
          }
          
          .parallax-fast {
            will-change: transform;
            transform: translateZ(0);
            transition: transform 0.03s linear;
          }
          
          /* Dramatic text highlight effect */
          .highlight-text {
            display: inline-block;
            position: relative;
            color: white;
            padding: 0 5px;
            margin: 0 2px;
          }
          
          .highlight-text::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: var(--mantine-primary-gradient);
            transform: skewX(-10deg);
            z-index: -1;
            border-radius: 4px;
          }
          
          /* Remove webkit tap highlight on mobile */
          * {
            -webkit-tap-highlight-color: transparent;
          }
        `,
      }}
    />,
  ]);
};
