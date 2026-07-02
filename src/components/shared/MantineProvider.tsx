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
    "--mantine-page-bg": colors.canvas,
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
