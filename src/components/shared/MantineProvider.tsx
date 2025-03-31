import { ReactNode } from "react";
  import { MantineProvider as Provider, createTheme, CSSVariablesResolver } from "@mantine/core";
import "@mantine/core/styles.css";
import { theme as customTheme, vaporwaveColors } from "../../theme";

// Helper function to convert hex to RGB
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Create the final theme by merging our custom theme with the base theme
const theme = createTheme({
  ...customTheme
});

// Vaporwave color palette for consistent use
const colors = vaporwaveColors;

// Convert main colors to RGB format
const primaryRgb = hexToRgb(colors.cyan);
const secondaryRgb = hexToRgb(colors.pink);
const vaporwave7Rgb = hexToRgb(colors.navy);

// TypeScript fix: Define the cssVariablesResolver separately with correct typing
const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    // RGB values for colors to use in rgba()
    "--mantine-color-primary-4-rgb": primaryRgb ? `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}` : "33, 230, 193",
    "--mantine-color-secondary-4-rgb": secondaryRgb ? `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}` : "255, 97, 166",
    "--mantine-color-vaporwave-7-rgb": vaporwave7Rgb ? `${vaporwave7Rgb.r}, ${vaporwave7Rgb.g}, ${vaporwave7Rgb.b}` : "20, 27, 65",
    
    // Gradients using vaporwave colors
    "--mantine-primary-gradient": `linear-gradient(45deg, ${colors.cyan}, ${colors.pink})`,
    "--mantine-secondary-gradient": `linear-gradient(45deg, ${colors.pink}, ${colors.orange})`,
    "--mantine-animated-gradient": `linear-gradient(90deg, ${colors.navy}, ${colors.purple}, ${colors.navy})`,
    "--mantine-cyan-pink-gradient": `linear-gradient(45deg, ${colors.cyan}, ${colors.pink})`,
    
    // Vaporwave-inspired glows and shadows
    "--mantine-glow-shadow": `0 10px 30px rgba(33, 230, 193, 0.2)`,
    "--mantine-pink-glow": `0 10px 30px rgba(255, 97, 166, 0.2)`,
    "--mantine-soft-shadow": `0 20px 80px -20px rgba(17, 16, 36, 0.4)`,
    "--mantine-card-shadow": `0 10px 40px -10px rgba(17, 16, 36, 0.45)`,
    
    // Spacing variables for consistent layout
    "--mantine-section-spacing": "5rem",
    "--mantine-card-spacing": "1.5rem",
    
    // Background
    "--mantine-page-bg": `linear-gradient(to bottom, ${colors.navy}, ${colors.purple}, rgba(10, 10, 26, 1))`,
  },
  light: {},
  dark: {
    // Enhanced dark theme variables with vaporwave colors
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
    <Provider theme={finalTheme} defaultColorScheme="dark">
      {children}
    </Provider>
  );
}

// Enhanced font loading for vaporwave aesthetic
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
    
    // Global styles for vaporwave aesthetic and improved readability
    <style
      key="global-styles"
      dangerouslySetInnerHTML={{
        __html: `
          body {
            background: var(--mantine-page-bg);
            overflow-x: hidden;
            color: rgba(255, 255, 255, 0.9);
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
          
          /* Subtle vaporwave grid background */
          .vaporwave-grid {
            background-image: 
              linear-gradient(rgba(33, 230, 193, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(33, 230, 193, 0.03) 1px, transparent 1px);
            background-size: 20px 20px;
            position: relative;
          }
          
          /* Card styling */
          .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            background: rgba(20, 27, 65, 0.4);
            border: 1px solid rgba(255, 97, 166, 0.1);
            border-radius: 8px;
            padding: 1.5rem;
            backdrop-filter: blur(5px);
          }
          
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(33, 230, 193, 0.15);
          }
          
          /* Typography enhancements */
          h1, h2, h3, h4, h5, h6 {
            margin-bottom: 1rem;
            font-weight: 600;
          }
          
          /* Text effects - use these classes sparingly */
          .text-neon-pink {
            color: ${colors.pink};
            text-shadow: 0 0 8px rgba(255, 97, 166, 0.7);
          }
          
          .text-neon-cyan {
            color: ${colors.cyan};
            text-shadow: 0 0 8px rgba(33, 230, 193, 0.7);
          }
          
          /* Remove webkit tap highlight on mobile */
          * {
            -webkit-tap-highlight-color: transparent;
          }
          
          /* Improved scrollbar for vaporwave theme */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: ${colors.navy};
          }
          
          ::-webkit-scrollbar-thumb {
            background: ${colors.cyan};
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: ${colors.pink};
          }
          
          /* Text selection style */
          ::selection {
            background: rgba(33, 230, 193, 0.3);
            color: #FFFFFF;
            text-shadow: 0 0 8px rgba(33, 230, 193, 0.5);
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
            background: ${colors.cyan};
            color: #000;
            border: none;
            cursor: pointer;
          }
          
          .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(33, 230, 193, 0.4);
          }
          
          .btn-secondary {
            background: ${colors.pink};
          }
          
          .btn-secondary:hover {
            box-shadow: 0 5px 15px rgba(255, 97, 166, 0.4);
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
