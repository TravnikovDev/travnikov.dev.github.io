import { ReactNode } from "react";
import {
  MantineProvider as Provider,
  createTheme,
  CSSVariablesResolver,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { theme as customTheme, auraColors } from "../../theme";

// Helper function to convert hex to RGB
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Create the final theme by merging our custom theme with the base theme
const theme = createTheme({
  ...customTheme,
});

// Aura color palette for consistent use
const colors = auraColors;

// Convert main colors to RGB format
const primaryRgb = hexToRgb(colors.paleAqua);
const secondaryRgb = hexToRgb(colors.mutedTeal);
const aura7Rgb = hexToRgb(colors.charcoal);
const aura0Rgb = hexToRgb(colors.pearl);
const aura9Rgb = hexToRgb(colors.slate);
const aura1Rgb = hexToRgb(colors.ivory);

// TypeScript fix: Define the cssVariablesResolver separately with correct typing
const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    // RGB values for colors to use in rgba()
    "--mantine-color-primary-4-rgb": primaryRgb
      ? `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`
      : "212, 238, 233",
    "--mantine-color-secondary-4-rgb": secondaryRgb
      ? `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}`
      : "126, 165, 161",
    "--mantine-color-aura-7-rgb": aura7Rgb
      ? `${aura7Rgb.r}, ${aura7Rgb.g}, ${aura7Rgb.b}`
      : "31, 35, 38",
    "--mantine-color-aura-0-rgb": aura0Rgb
      ? `${aura0Rgb.r}, ${aura0Rgb.g}, ${aura0Rgb.b}`
      : "244, 239, 230",
    "--mantine-color-aura-1-rgb": aura1Rgb
      ? `${aura1Rgb.r}, ${aura1Rgb.g}, ${aura1Rgb.b}`
      : "239, 226, 204",
    "--mantine-color-aura-9-rgb": aura9Rgb
      ? `${aura9Rgb.r}, ${aura9Rgb.g}, ${aura9Rgb.b}`
      : "74, 89, 100",

    // Gradients using aura colors
    "--mantine-primary-gradient": `linear-gradient(45deg, ${colors.paleAqua}, ${colors.mutedTeal})`,
    "--mantine-secondary-gradient": `linear-gradient(45deg, ${colors.warmSand}, ${colors.tan})`,
    "--mantine-animated-gradient": `linear-gradient(90deg, ${colors.charcoal}, ${colors.slate}, ${colors.charcoal})`,
    "--mantine-mint-warmSand-gradient": `linear-gradient(45deg, ${colors.mint}, ${colors.warmSand})`,

    // Aura-inspired glows and shadows
    "--mantine-glow-shadow": `0 10px 30px rgba(var(--mantine-color-primary-4-rgb), 0.2)`,
    "--mantine-warmSand-glow": `0 10px 30px rgba(var(--mantine-color-secondary-4-rgb), 0.2)`,
    "--mantine-soft-shadow": `0 20px 80px -20px rgba(17, 16, 36, 0.4)`,
    "--mantine-card-shadow": `0 10px 40px -10px rgba(17, 16, 36, 0.45)`,

    // Spacing variables for consistent layout
    "--mantine-section-spacing": "5rem",
    "--mantine-card-spacing": "1.5rem",

    // Background
    "--mantine-page-bg": colors.ivory,
  },
  light: {},
  dark: {
    // Enhanced dark theme variables with aura colors
    "--mantine-color-body": "#0A0A1A",
  },
});

// Create the final theme with all our customizations
const finalTheme = {
  ...theme,
  cssVariablesResolver,
};

interface MantineProviderProps {
  children: ReactNode;
}

export function MantineProvider({ children }: MantineProviderProps) {
  return (
    <Provider theme={finalTheme} defaultColorScheme="light">
      {children}
    </Provider>
  );
}

// Enhanced font loading for aura aesthetic
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="stylesheet"
      href="https://unpkg.com/@mantine/core@7.6.2/styles.css"
      key="mantine-styles"
    />,

    // Primary font - JetBrains Mono for clean readability
    <link
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
      rel="stylesheet"
      key="google-fonts-jetbrains"
    />,

    // Regular Inter font as a backup/alternate
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
      key="google-fonts-inter"
    />,

    <link
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap"
      rel="stylesheet"
      key="google-fonts-playfair"
    />,

    // Global styles for aura aesthetic and improved readability
    <style
      key="global-styles"
      dangerouslySetInnerHTML={{
        __html: `
          body {
            background: var(--mantine-page-bg);
            overflow-x: hidden;
            color: ${colors.charcoal};
          }
          
          /* Improved paragraph readability */
          p {
            line-height: 1.7;
            font-size: 1rem;
            letter-spacing: 0.01em;
            margin-bottom: 1.5rem;
            font-family: "JetBrains Mono", "Inter", sans-serif;
            font-weight: 400;
          }
          
          /* Sections spacing */
          section {
            padding: 3rem 0;
            position: relative;
            width: 83.333%; /* 10/12 columns */
            margin: 0 auto;
          }
          
          @media (max-width: 48em) {
            section {
              width: 100%;
              padding: 2rem 1rem;
            }
          }
          
          /* Subtle aura grid background */
          .aura-grid {
            background-image: 
              linear-gradient(rgba(var(--mantine-color-primary-4-rgb), 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--mantine-color-primary-4-rgb), 0.03) 1px, transparent 1px);
            background-size: 20px 20px;
            position: relative;
          }
          
          /* Card styling */
          .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            background: rgba(20, 27, 65, 0.4);
            border: 1px solid rgba(var(--mantine-color-secondary-4-rgb), 0.1);
            border-radius: 8px;
            padding: 1.5rem;
            backdrop-filter: blur(5px);
          }
          
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(var(--mantine-color-primary-4-rgb), 0.15);
          }
          
          /* Typography enhancements */
          h1, h2, h3, h4, h5, h6 {
            margin-bottom: 1rem;
            font-weight: 600;
            color: ${colors.charcoal};
          }
          
          /* Text effects - use these classes sparingly */
          .text-neon-warmSand {
            color: ${colors.warmSand};
            text-shadow: 0 0 8px rgba(var(--mantine-color-secondary-4-rgb), 0.7);
          }
          
          .text-neon-mint {
            color: ${colors.mint};
            text-shadow: 0 0 8px rgba(var(--mantine-color-primary-4-rgb), 0.7);
          }
          
          /* Remove webkit tap highlight on mobile */
          * {
            -webkit-tap-highlight-color: transparent;
          }
          
          /* Improved scrollbar for aura theme */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: ${colors.charcoal};
          }
          
          ::-webkit-scrollbar-thumb {
            background: ${colors.mint};
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: ${colors.warmSand};
          }
          
          /* Text selection style */
          ::selection {
            background: rgba(var(--mantine-color-primary-4-rgb), 0.3);
            color: #FFFFFF;
            text-shadow: 0 0 8px rgba(var(--mantine-color-primary-4-rgb), 0.5);
          }
          
          /* Buttons and interactive elements */
          .btn {
            padding: 0.6rem 1.5rem;
            border-radius: 6px;
            font-weight: 600;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 0.9rem;
            background: ${colors.mint};
            color: #000;
            border: none;
            cursor: pointer;
          }
          
          .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(var(--mantine-color-primary-4-rgb), 0.4);
          }
          
          .btn-secondary {
            background: ${colors.warmSand};
          }
          
          .btn-secondary:hover {
            box-shadow: 0 5px 15px rgba(var(--mantine-color-secondary-4-rgb), 0.4);
          }
          
          /* Responsive font size adjustments */
          @media (max-width: 48em) {
            h1 { font-size: 2rem; }
            h2 { font-size: 1.75rem; }
            h3 { font-size: 1.5rem; }
            p { font-size: 1rem; }
          }
          
          @media (max-width: 30em) {
            h1 { font-size: 1.75rem; }
            h2 { font-size: 1.5rem; }
            h3 { font-size: 1.25rem; }
            p { font-size: 1rem; line-height: 1.6; }
          }
        `,
      }}
    />,
  ]);
};
