import { useEffect, useState } from "react";
import { graphql } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import { SEO } from "../utils/seo/SEO";
import HeroSection from "../components/landing/HeroSection";
import { LandingSection } from "../components/landing/TimelineSection";
import ShowcaseGrid from "../components/landing/ShowcaseGrid";
import {
  FaBoxes,
  FaRobot,
  FaTools,
  FaMicrochip,
  FaCode,
  FaBriefcase,
  FaLaptopCode,
  FaBuilding,
} from "react-icons/fa";
import {
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiRedux,
  SiNextdotjs,
  SiGraphql,
  SiMui,
  SiJavascript,
  SiCss3,
  SiHtml5,
} from "react-icons/si";
import { BiLogoEtsy } from "react-icons/bi";
import { Box } from "@mantine/core";
import ThreeDBackground from "../components/3d/3dBackground";
import * as styles from "./index.module.css";

// Parallax divider with animation

export default function IndexPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll events for progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <BaseLayout>
      {/* Dynamic 3D background with parallax */}
      <ThreeDBackground />

      {/* Main content with scroll animations */}
      <Box className={styles.mainContent}>
        <section>
          <HeroSection />
        </section>

        <section className={styles.sectionRight}>
          {/* Landing subsections */}
          <LandingSection title="Projects">
            <ShowcaseGrid
              items={[
                {
                  id: "proj-1",
                  title: "NeuroFashion — shop on Etsy",
                  icon: <BiLogoEtsy />,
                  url: "https://neurofashion.etsy.com/",
                },
              ]}
            />
          </LandingSection>
        </section>

        {/* <section className={styles.sectionRight}>
          <LandingSection title="My apps">
            <ShowcaseGrid
              items={[
                {
                  id: "app-1",
                  title: "App One",
                  icon: <FaBoxes />,
                  description: "Consumer-facing app for ...",
                },
              ]}
            />
          </LandingSection>
        </section> */}

        <section className={styles.sectionRight}>
          <LandingSection title="Open Source">
            <ShowcaseGrid
              items={[
                {
                  id: "lib-vibe-janitor",
                  title: "vibe-janitor",
                  icon: <FaRobot />,
                  url: "https://www.npmjs.com/package/vibe-janitor",
                  description:
                    "vibe-janitor — utility library published on npm.",
                },
                {
                  id: "lib-ffmpegslideshow",
                  title: "ffmpegslideshow",
                  icon: <FaTools />,
                  url: "https://www.npmjs.com/package/ffmpegslideshow",
                  description:
                    "ffmpegslideshow — npm package for creating slideshows with ffmpeg.",
                },
              ]}
            />
          </LandingSection>
        </section>

        <section className={styles.sectionRight}>
          <LandingSection title="Chrome extensions">
            <ShowcaseGrid
              items={[
                {
                  id: "ext-chatgpt-image-saver",
                  title: "ChatGPT Image Saver",
                  icon: <FaMicrochip />,
                  url: "https://chrome.google.com/webstore/detail/pidbeaifkcbphmlmlnglddbfackeeiah",
                  description: "ChatGPT Image Saver — Chrome extension.",
                },
              ]}
            />
          </LandingSection>
        </section>

        <section className={styles.sectionRight}>
          <LandingSection title="Professional Experience">
            <ShowcaseGrid
              items={[
                {
                  id: "work-super-dispatch",
                  title: "Frontend Engineer — Super Dispatch",
                  icon: <FaLaptopCode />,
                  description:
                    "Jul 2023 – Feb 2024 — Remote (US). Worked on a transportation/logistics platform using React and TypeScript; refined UI/UX and built scalable applications.",
                },
                {
                  id: "work-flymeto",
                  title: "Senior Frontend Developer — Flymeto",
                  icon: <FaBriefcase />,
                  description:
                    "Feb 2022 – Aug 2022 — Remote (Prague). Developed a flight ticketing service for high-traffic websites using React, Next.js, TypeScript and SCSS.",
                },
                {
                  id: "work-omnetic",
                  title: "Senior Frontend Developer — OMNETIC",
                  icon: <FaBuilding />,
                  description:
                    "Jul 2020 – Feb 2022 — Remote (Prague). Built a Dealership Management System for Czech/EU market. Tech: React, Next.js, TypeScript, SCSS, Material UI, Redux, Cypress.",
                },
                {
                  id: "work-realtrac",
                  title: "Senior Frontend Developer — RealTrac Technologies",
                  icon: <FaCode />,
                  description:
                    "Dec 2017 – Jun 2020 — St. Petersburg. Developed tracking/communication system; migrated codebase to TypeScript, improved performance, added reports constructor, GIS maps and WebSocket events.",
                },
                {
                  id: "work-miix",
                  title: "Frontend Web Developer — MiiiX.org",
                  icon: <FaBoxes />,
                  description:
                    "Mar 2016 – Dec 2017 — St. Petersburg. Worked on an e-commerce platform with real-time auctions and admin panel using React, Redux and Webpack.",
                },
                {
                  id: "work-programny",
                  title: "Frontend Web Developer — Programny Produkt",
                  icon: <FaBriefcase />,
                  description:
                    "May 2014 – Nov 2015 — Moscow/Remote. Developed portals for Russian ministries and companies (Finance Ministry, MFA, OTP Bank, Rostelecom). Used IBM WebSphere, JavaScript and SCSS.",
                },
                {
                  id: "work-altera",
                  title: "Junior Web Developer — Altera Media",
                  icon: <FaRobot />,
                  description:
                    "Apr 2013 – May 2014 — St. Petersburg. Worked on websites and smaller projects.",
                },
                {
                  id: "work-fabricasaitov",
                  title: "Junior Web Developer — Fabricasaitov.ru",
                  icon: <FaMicrochip />,
                  description:
                    "Dec 2012 – Jan 2013 — St. Petersburg. Entry-level role building websites.",
                },
              ]}
            />
          </LandingSection>
        </section>

        {/*         <section className={styles.sectionRight}>
          <LandingSection title="YouTube widget">
            <ShowcaseGrid
              items={[
                {
                  id: "yt-1",
                  title: "YouTube",
                  icon: <FaRocket />,
                  description: "Latest videos and playlists",
                },
              ]}
            />
          </LandingSection>
        </section> */}

        <section className={styles.sectionRight}>
          <LandingSection title="Skills">
            <ShowcaseGrid
              items={[
                { id: "skill-1", title: "TypeScript", icon: <SiTypescript /> },
                { id: "skill-2", title: "React", icon: <SiReact /> },
                { id: "skill-3", title: "Node.js", icon: <SiNodedotjs /> },
                { id: "skill-4", title: "Redux", icon: <SiRedux /> },
                { id: "skill-5", title: "Next.js", icon: <SiNextdotjs /> },
                { id: "skill-6", title: "GraphQL", icon: <SiGraphql /> },
                { id: "skill-9", title: "Material UI", icon: <SiMui /> },
                { id: "skill-10", title: "JavaScript", icon: <SiJavascript /> },
                { id: "skill-11", title: "CSS", icon: <SiCss3 /> },
                { id: "skill-12", title: "HTML", icon: <SiHtml5 /> },
              ]}
            />
          </LandingSection>
        </section>

        {/*         <section className={styles.sectionRight}>
          <LandingSection title="What I can help you with">
            <ShowcaseGrid
              items={[
                {
                  id: "help-1",
                  title: "Consulting",
                  icon: <FaBrain />,
                  description: "Product and engineering consulting",
                },
                {
                  id: "help-2",
                  title: "Code Reviews",
                  icon: <FaTools />,
                  description: "Practical, actionable reviews",
                },
              ]}
            />
          </LandingSection>
        </section> */}

        <div
          className={styles.scrollProgressIndicator}
          style={{
            transform: `scaleX(${scrollProgress})`,
          }}
        />
      </Box>
    </BaseLayout>
  );
}

export function Head() {
  return <SEO />;
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteTitle
      }
    }
  }
`;
