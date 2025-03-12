import { MantineThemeOverride } from '@mantine/core';

// Vaporwave color palette
export const vaporwaveColors = {
  navy: '#141B41',     // Dark navy blue background
  neonBlue: "#00F1FF",
  purple: '#281154',   // Deep purple
  electricPurple: "#9D00FF",
  cyan: '#21E6C1',     // Electric cyan
  neonCyan: "#00FFFF",
  pink: '#FF61A6',     // Sunset pink
  synthPink: "#FF0080",
  hotPink: "#FF00FF",
  orange: '#FF7A00',   // Orange neon
  neonOrange: "#FFA500", // Neon orange for mango
  neonGreen: "#39FF14",
  matrixGreen: '#00FF41',  // Legacy matrix green - use sparingly
  neonYellow: "#FFFF00" // Neon yellow for lemon
};

export const theme: MantineThemeOverride = {
  // Updated breakpoints
  breakpoints: {
    xs: '30em',    // 480px
    sm: '48em',    // 768px
    md: '64em',    // 1024px
    lg: '74em',    // 1184px
    xl: '90em',    // 1440px
  },

  // More reasonable heading sizes for better readability, especially mobile
  headings: {
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.2' },
      h2: { fontSize: '2rem', lineHeight: '1.25' },
      h3: { fontSize: '1.75rem', lineHeight: '1.3' },
      h4: { fontSize: '1.5rem', lineHeight: '1.35' },
      h5: { fontSize: '1.25rem', lineHeight: '1.4' },
    },
  },

  // Updated font family with fallbacks
  fontFamily: '"JetBrains Mono", Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',

  // Base colors for the theme
  colors: {
    // Define custom color scheme
    vaporwave: [
      '#E0FBFC',  // Lightest shade
      '#C2DFE3',
      '#9ED8DB',
      '#21E6C1',  // Electric cyan
      '#FF61A6',  // Sunset pink  
      '#FF7A00',  // Orange neon
      '#281154',  // Deep purple
      '#141B41',  // Dark navy blue
      '#0A0A1A',  // Darkest shade
      '#050510'   // Almost black
    ],

    // Update primary and secondary colors
    primary: [
      '#E0FBFC',
      '#C2DFE3',
      '#9ED8DB',
      '#7ACFD3',
      '#21E6C1', // Primary color - Electric cyan
      '#1BC4A3',
      '#16A286',
      '#108069',
      '#0B604F',
      '#064035'
    ],

    secondary: [
      '#FFE2EF',
      '#FFD0E6',
      '#FFBDDC',
      '#FFA8D1',
      '#FF61A6', // Secondary color - Sunset pink
      '#D84E89',
      '#B33B6D',
      '#8F2A53',
      '#6A1A3B',
      '#460B24'
    ]
  },

  // Component styling
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: (theme) => ({
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 0 15px ${vaporwaveColors.cyan}60`,
          },
          fontWeight: 600,
        },
      }),
    },

    Title: {
      styles: {
        root: {
          fontFamily: '"JetBrains Mono", Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
          fontWeight: 700,
          // Make headings more legible on dark backgrounds
          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
        },
      },
    },

    Text: {
      styles: {
        root: {
          // Improve text readability
          letterSpacing: '0.01em',
          lineHeight: 1.6,
        },
      },
    },

    Container: {
      defaultProps: {
        // Make containers centered with 10/12 columns width
        size: '83.333%',
      }
    }
  },

  // Other theme properties
  primaryColor: 'primary',
  primaryShade: 4,
};