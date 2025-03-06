import React from "react";
import type { GatsbyBrowser } from "gatsby";
import { MantineProvider } from "./src/components/shared/MantineProvider";
import '@mantine/core/styles.css';

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => {
  return React.createElement(MantineProvider, null, element);
};