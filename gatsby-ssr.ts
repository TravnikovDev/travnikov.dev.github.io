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
    // Structured data for SEO
    React.createElement("script", {
      key: "structured-data",
      type: "application/ld+json",
      dangerouslySetInnerHTML: {
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Roman Travnikov",
          jobTitle: "AI Automation & Web Architecture Consultant",
          url: "https://travnikov.dev",
          sameAs: [
            "https://github.com/TravnikovDev",
            "https://www.linkedin.com/in/roman-travnikov/",
            "https://instagram.com/travnikov.dev"
          ],
          description:
            "Engineers autonomous AI systems and high-performance web architecture for startups; fractional CTO services.",
          image: "https://travnikov.dev/banner.jpg",
        })
      }
    })
  ]);
};
