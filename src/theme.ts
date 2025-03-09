import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  headings: {
    sizes: {
      h1: { fontSize: '7rem', lineHeight: '1' },
      h2: { fontSize: '5rem', lineHeight: '1.05' },
      h3: { fontSize: '3.2rem', lineHeight: '1.1' },
      h4: { fontSize: '2.2rem', lineHeight: '1.2' },
      h5: { fontSize: '1.6rem', lineHeight: '1.25' },
    },
  },
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  components: {
    Button: {
      defaultProps: {
        radius: 'xl',
      },
      styles: {
        root: {
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    Title: {
      styles: {
        root: {
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
          fontWeight: 800,
        },
      },
    },
  },
};