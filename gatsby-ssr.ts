import React from "react";
import type { GatsbySSR } from "gatsby";
import { MantineProvider } from "./src/components/shared/MantineProvider";

const SITE = "https://travnikov.dev";

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => {
  return React.createElement(MantineProvider, null, element);
};

// Site-wide structured data. Page-specific types (BlogPosting, Service,
// BreadcrumbList) are added per page through the SEO component's children.
export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHtmlAttributes,
  setHeadComponents,
}) => {
  setHtmlAttributes({ lang: `en` });

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE}/#person`,
    name: "Roman Travnikov",
    jobTitle: "AI Automation & Web Architecture Consultant",
    url: SITE,
    // the portrait, not the brand banner — this is what Google may show
    // beside the entity
    image: `${SITE}/portrait/portrait.jpg`,
    // kept in step with the footer — search engines and visitors should see
    // the same set of profiles
    sameAs: [
      "https://www.linkedin.com/in/roman-travnikov/",
      "https://github.com/TravnikovDev",
      "https://twitter.com/TravnikovDev",
    ],
    description:
      "Engineers autonomous AI systems and high-performance web architecture for startups; fractional CTO services.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Istanbul",
      addressCountry: "TR",
    },
    knowsAbout: [
      "AI automation",
      "n8n",
      "React",
      "Next.js",
      "TypeScript",
      "Web performance",
      "Technical leadership",
    ],
  };

  const head: React.ReactNode[] = [
    React.createElement("script", {
      key: "ld-person",
      type: "application/ld+json",
      dangerouslySetInnerHTML: { __html: JSON.stringify(person) },
    }),
  ];

  if (GA_ID) {
    head.push(
      React.createElement("script", {
        key: "ga-src",
        async: true,
        src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
      }),
      React.createElement("script", {
        key: "ga-init",
        dangerouslySetInnerHTML: {
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${GA_ID}',{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});`,
        },
      })
    );
  }

  if (CF_TOKEN) {
    head.push(
      React.createElement("script", {
        key: "cf-beacon",
        defer: true,
        src: "https://static.cloudflareinsights.com/beacon.min.js",
        "data-cf-beacon": JSON.stringify({ token: CF_TOKEN }),
      } as React.ScriptHTMLAttributes<HTMLScriptElement>)
    );
  }

  setHeadComponents(head);
};

// Analytics. Both are opt-in via env: nothing is injected unless the value is
// set, so local and preview builds stay clean and no IDs live in the repo.
//
// Cloudflare Web Analytics is cookieless and needs no consent banner.
// Google Analytics does set cookies — see docs/ANALYTICS.md for the consent
// question before pointing EU traffic at it.
const GA_ID = process.env.GA_MEASUREMENT_ID;
const CF_TOKEN = process.env.CF_BEACON_TOKEN;

// Gatsby injects <meta name="generator" content="Gatsby x.y.z">. It tells
// visitors what the site is built with, which is not what is being sold here.
export const onPreRenderHTML: GatsbySSR["onPreRenderHTML"] = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const head = (getHeadComponents() as React.ReactElement[]).filter(
    (el) =>
      !(
        el &&
        typeof el === "object" &&
        el.type === "meta" &&
        (el.props as { name?: string })?.name === "generator"
      )
  );
  replaceHeadComponents(head);
};
