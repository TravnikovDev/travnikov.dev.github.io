import React from "react";
import type { GatsbyBrowser } from "gatsby";
import { MantineProvider } from "./src/components/shared/MantineProvider";
import '@mantine/core/styles.css';
import './src/global.css'; // Import our global CSS

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => {
  return React.createElement(MantineProvider, null, element);
};

// Skip the initial loading when resources are requested before page navigation
export const onServiceWorkerUpdateReady = () => {
  window.location.reload();
};

// Clear the cache when route changes to ensure we have fresh resources
export const onRouteUpdate = () => {
  if (process.env.NODE_ENV !== 'development' && typeof window !== 'undefined' && window.location.pathname === '/') {
    // Clear page resources cache for the homepage
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          if (cacheName.includes('gatsby-page-resources')) {
            caches.delete(cacheName);
          }
        });
      });
    }
  }
};