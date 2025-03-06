import React from "react";
import type { GatsbySSR } from "gatsby";
import { MantineProvider } from "./src/components/shared/MantineProvider";

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => {
  return React.createElement(MantineProvider, null, element);
};

// Add JSON-LD structured data for SEO
export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `en` });
  
  setHeadComponents([
    // Add Mantine styles
    React.createElement("link", {
      key: "mantine-styles",
      rel: "stylesheet",
      href: "https://unpkg.com/@mantine/core@7.6.2/styles.css"
    }),
    
    // Structured data for SEO
    React.createElement("script", {
      key: "structured-data",
      type: "application/ld+json",
      dangerouslySetInnerHTML: {
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Roman Travnikov",
          jobTitle: "Senior Frontend Developer",
          url: "https://travnikov.dev",
          sameAs: [
            "https://github.com/TravnikovDev",
            "https://www.linkedin.com/in/roman-travnikov/",
            "https://instagram.com/travnikov.dev"
          ],
          description: "Senior Frontend Developer with 10+ years of experience",
          image: "https://travnikov.dev/banner.jpg",
        })
      }
    })
  ]);
};
