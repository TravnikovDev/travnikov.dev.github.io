import React from "react";
import type { GatsbyBrowser } from "gatsby";
import { MantineProvider } from "./src/components/shared/MantineProvider";
import '@mantine/core/styles.css';
import './src/global.css'; // Import our global CSS

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => {
  return React.createElement(MantineProvider, null, element);
};