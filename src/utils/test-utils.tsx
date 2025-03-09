import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { MantineProvider, AppShell } from '@mantine/core';

function render(ui: React.ReactElement, options = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MantineProvider theme={{ colorScheme: 'dark', defaultColorScheme: 'dark' }}>
        <AppShell>
          {children}
        </AppShell>
      </MantineProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };