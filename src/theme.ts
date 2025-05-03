import { MantineColorsTuple, MantineThemeOverride } from "@mantine/core";

// Vaporwave color palette
export const vaporwaveColors = {
  navy: "#141B41", // Dark navy blue background
  neonBlue: "#00F1FF",
  purple: "#281154", // Deep purple
  electricPurple: "#9D00FF",
  cyan: "#21E6C1", // Electric cyan
  neonCyan: "#00FFFF",
  pink: "#FF61A6", // Sunset pink
  synthPink: "#FF0080",
  hotPink: "#FF00FF",
  orange: "#FF7A00", // Orange neon
  neonOrange: "#FFA500", // Neon orange for mango
  neonGreen: "#39FF14",
  matrixGreen: "#00FF41", // Legacy matrix green - use sparingly
  neonYellow: "#FFFF00", // Neon yellow for lemon
};

const hex2rgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

const rgb2hex = (r: number, g: number, b: number) =>
  `#${Math.round(r).toString(16).padStart(2, "0")}${Math.round(g)
    .toString(16)
    .padStart(2, "0")}${Math.round(b).toString(16).padStart(2, "0")}`;

function generateColorShades(baseColor: string): MantineColorsTuple {
  const [r, g, b] = hex2rgb(baseColor);
  return [
    rgb2hex(r + (255 - r) * 0.9, g + (255 - g) * 0.9, b + (255 - b) * 0.9), // 90% white
    rgb2hex(r + (255 - r) * 0.7, g + (255 - g) * 0.7, b + (255 - b) * 0.7), // 70% white
    rgb2hex(r + (255 - r) * 0.5, g + (255 - g) * 0.5, b + (255 - b) * 0.5), // 50% white
    rgb2hex(r + (255 - r) * 0.25, g + (255 - g) * 0.25, b + (255 - b) * 0.25), // 25% white
    baseColor, // Base color
    rgb2hex(r * 0.8, g * 0.8, b * 0.8), // 80% brightness
    rgb2hex(r * 0.6, g * 0.6, b * 0.6), // 60% brightness
    rgb2hex(r * 0.45, g * 0.45, b * 0.45), // 45% brightness
    rgb2hex(r * 0.3, g * 0.3, b * 0.3), // 30% brightness
    rgb2hex(r * 0.15, g * 0.15, b * 0.15), // 15% brightness
  ];
}

export const theme: MantineThemeOverride = {
  // Updated breakpoints
  breakpoints: {
    xs: "30em", // 480px
    sm: "48em", // 768px
    md: "64em", // 1024px
    lg: "74em", // 1184px
    xl: "90em", // 1440px
  },

  // More reasonable heading sizes for better readability, especially mobile
  headings: {
    sizes: {
      h1: { fontSize: "2.5rem", lineHeight: "1.2" },
      h2: { fontSize: "2rem", lineHeight: "1.25" },
      h3: { fontSize: "1.75rem", lineHeight: "1.3" },
      h4: { fontSize: "1.5rem", lineHeight: "1.35" },
      h5: { fontSize: "1.25rem", lineHeight: "1.4" },
    },
  },

  // Updated font family with fallbacks
  fontFamily:
    '"JetBrains Mono", Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',

  // Base colors for the theme
  colors: {
    // Use the function for primary colors
    primary: generateColorShades(vaporwaveColors.cyan),
    // Update secondary colors based on electric purple
    secondary: generateColorShades(vaporwaveColors.electricPurple),
    // Define custom color scheme using vaporwaveColors
    vaporwave: [
      vaporwaveColors.neonYellow, // Brightest shade
      vaporwaveColors.neonGreen,
      vaporwaveColors.neonCyan,
      vaporwaveColors.neonBlue,
      vaporwaveColors.cyan,
      vaporwaveColors.pink,
      vaporwaveColors.hotPink,
      vaporwaveColors.electricPurple,
      vaporwaveColors.purple,
      vaporwaveColors.navy, // Darkest shade
    ],
  },

  // Component styling
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
      styles: (theme) => ({
        root: {
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: `0 0 15px ${vaporwaveColors.cyan}60`,
          },
          fontWeight: 600,
        },
      }),
    },

    Title: {
      styles: {
        root: {
          fontFamily:
            '"JetBrains Mono", Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
          fontWeight: 700,
          // Make headings more legible on dark backgrounds
          textShadow: "0 1px 2px rgba(0,0,0,0.3)",
        },
      },
    },

    Text: {
      styles: {
        root: {
          // Improve text readability
          letterSpacing: "0.01em",
          lineHeight: 1.6,
        },
      },
    },

    Container: {
      defaultProps: {
        // Make containers centered with 10/12 columns width
        size: "83.333%",
      },
    },
  },

  // Other theme properties
  primaryColor: "primary",
  primaryShade: 4,
};
