import React from 'react';
import { createTheme, MantineProvider as Provider } from '@mantine/core';
import '@mantine/core/styles.css';

// Custom theme with vibrant colors and better contrast
const theme = createTheme({
  primaryColor: 'primary',
  colors: {
    // Custom vibrant color palette
    primary: [
      '#EAF5FF', // 0
      '#D5EBFF', // 1
      '#B5DBF8', // 2
      '#8ECBF3', // 3
      '#62B9F0', // 4
      '#3DA5EB', // 5
      '#2290E0', // 6: primary
      '#1A74C4', // 7
      '#155FA6', // 8
      '#104A85', // 9
    ],
    secondary: [
      '#F5EAFF', // 0
      '#EAD5FF', // 1
      '#D9B5F7', // 2
      '#C68DF3', // 3
      '#B162EF', // 4
      '#9B3DEA', // 5
      '#8422E0', // 6: secondary
      '#6D1AC3', // 7
      '#5A15A5', // 8
      '#461084', // 9
    ],
    accent: [
      '#FFE9EA', // 0
      '#FFD3D5', // 1
      '#FFB3B5', // 2
      '#FF8D8F', // 3
      '#FF5D61', // 4
      '#FF2D32', // 5
      '#F01F24', // 6: accent
      '#D0151A', // 7
      '#AE1015', // 8
      '#8C0C10', // 9
    ],
    dark: [
      '#C1C2C5', // 0
      '#A6A7AB', // 1
      '#909296', // 2
      '#5C5F66', // 3
      '#373A40', // 4
      '#2C2E33', // 5
      '#25262B', // 6
      '#1A1B1E', // 7
      '#141517', // 8
      '#101113', // 9
    ],
  },
  fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
  fontFamilyMonospace: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  headings: {
    fontFamily: '"Inter", system-ui, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: '3.5rem', lineHeight: '1.1' },
      h2: { fontSize: '2.5rem', lineHeight: '1.2' },
      h3: { fontSize: '1.75rem', lineHeight: '1.3' },
      h4: { fontSize: '1.3rem', lineHeight: '1.4' },
      h5: { fontSize: '1.1rem', lineHeight: '1.5' },
    },
  },
  defaultRadius: 'md',
  defaultGradient: { from: 'primary', to: 'secondary', deg: 45 },
  components: {
    Button: {
      defaultProps: {
        size: 'lg',
        radius: 'md',
      },
      styles: {
        root: {
          fontWeight: 600,
          fontSize: '1rem',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    Container: {
      defaultProps: {
        px: { base: 'md', sm: 'lg' },
      },
    },
  },
  // Add CSS variables directly to the theme
  cssVariablesResolver: theme => ({
    variables: {
      '--mantine-primary-gradient': 'linear-gradient(45deg, var(--mantine-color-primary-6), var(--mantine-color-secondary-6))',
      '--mantine-secondary-gradient': 'linear-gradient(45deg, var(--mantine-color-secondary-6), var(--mantine-color-accent-6))',
      '--mantine-glow-shadow': '0 0 20px rgba(57, 144, 255, 0.3)',
    },
    light: {},
    dark: {},
  }),
});

interface MantineProviderProps {
  children: React.ReactNode;
}

export function MantineProvider({ children }: MantineProviderProps) {
  return (
    <Provider theme={theme} defaultColorScheme="dark">
      {children}
    </Provider>
  );
}

// Add this to gatsby-browser.js or gatsby-ssr.js to include Mantine styles
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link 
      rel="stylesheet" 
      href="https://unpkg.com/@mantine/core@7.6.2/styles.css" 
      key="mantine-styles"
    />,
    <link 
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" 
      rel="stylesheet" 
      key="google-fonts"
    />
  ]);
};