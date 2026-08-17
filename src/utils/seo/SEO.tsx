import React from "react";
import { useStaticQuery, graphql } from "gatsby";

interface SEOProps {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  children?: React.ReactNode;
}

/**
 * Rendered from each page's `Head` export. Gatsby 5's Head API inserts the
 * returned JSX straight into <head> at build time, so this must return plain
 * elements.
 *
 * It previously wrapped all of this in react-helmet. Helmet applies its tags
 * as a client-side effect and needs gatsby-plugin-react-helmet to render
 * during SSR — which is not installed — so the built HTML shipped with no
 * <title> and no meta tags at all. Browsers looked fine (Helmet filled them in
 * after hydration) while crawlers and every social scraper, which do not run
 * JS, saw an empty head.
 */
export function SEO({
  title,
  description,
  pathname,
  image,
  children,
}: SEOProps) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          siteTitleAlt
          siteHeadline
          siteUrl
          siteDescription
          siteImage
          siteLanguage
          author
        }
      }
    }
  `);

  const {
    siteTitle,
    siteTitleAlt,
    siteUrl,
    siteDescription,
    siteImage,
    siteLanguage,
    author,
  } = site.siteMetadata;

  const seo = {
    title: title || siteTitleAlt,
    description: description || siteDescription,
    url: `${siteUrl}${pathname || ``}`,
    image: `${siteUrl}${image || siteImage}`,
  };

  // matches the old Helmet titleTemplate/defaultTitle behaviour
  const documentTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <>
      <html lang={siteLanguage} />
      <title>{documentTitle}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.url} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:alt" content={seo.title} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.title} />
      <meta name="twitter:creator" content={author} />
      {children}
    </>
  );
}
