import type { GatsbyConfig, PluginRef } from "gatsby"
import "dotenv/config"

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

const config: GatsbyConfig = {
  siteMetadata: {
    // You can overwrite values here that are used for the SEO component
    // You can also add new values here to query them like usual
    siteTitle: `Travnikov.dev`,
    siteTitleAlt: `Roman Travnikov - Senior Frontend Developer`,
    siteHeadline: `Roman Travnikov - Senior Frontend Developer with 10+ years of experience`,
    siteUrl: `https://Travnikov.dev`,
    siteDescription: `Personal website of Roman Travnikov, a senior frontend developer with 10+ years of experience. Explore projects, blog, and experiments.`,
    siteImage: `/banner.jpg`,
    siteLanguage: `en`,
    author: `Roman Travnikov`,
  },
  jsxRuntime: 'automatic',
  trailingSlash: `always`,
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    'gatsby-plugin-dts-css-modules',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/src/content/projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `experiments`,
        path: `${__dirname}/src/content/experiments`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Roman Travnikov - Senior Frontend Developer`,
        short_name: `Travnikov.dev`,
        description: `Personal website of Roman Travnikov, a senior frontend developer with 10+ years of experience.`,
        start_url: `/`,
        background_color: `#141821`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#f6ad55`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    // You can remove this plugin if you don't need it
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-statoscope`,
      options: {
        saveReportTo: `${__dirname}/public/.statoscope/_bundle.html`,
        saveStatsTo: `${__dirname}/public/.statoscope/_stats.json`,
        open: false,
      },
    },
  ].filter(Boolean) as Array<PluginRef>,
}

export default config
