import { useEffect, useState } from "react";
import { graphql } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import { SEO } from "../utils/seo/SEO";
import HeroSection from "../components/landing/HeroSection";
import {
  LandingSection,
  TimelineSection,
} from "../components/landing/TimelineSection";
import SectionPlaceholder from "../components/landing/SectionPlaceholder";
import ShowcaseGrid from "../components/landing/ShowcaseGrid";
import {
  FaRocket,
  FaBrain,
  FaBoxes,
  FaRobot,
  FaTools,
  FaMicrochip,
  FaCode,
  FaBriefcase,
  FaLaptopCode,
  FaBuilding,
} from "react-icons/fa";
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
          <LandingSection title="My projects">
            <ShowcaseGrid
              items={[
                {
                  id: "proj-1",
                  title: "Side project A",
                  icon: <FaRocket />,
                  description: "A small project demonstrating X and Y.",
                },
                {
                  id: "proj-2",
                  title: "Side project B",
                  icon: <FaBrain />,
                  description:
                    "Tooling and automation for developer workflows.",
                },
              ]}
            />
          </LandingSection>
        </section>

        <section className={styles.sectionRight}>
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
        </section>

        <section className={styles.sectionRight}>
          <LandingSection title="My libraries">
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
          <LandingSection title="My extensions">
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
          <LandingSection title="My Commercial Working History">
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

        <section className={styles.sectionRight}>
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
        </section>

        <section className={styles.sectionRight}>
          <LandingSection title="My skills">
            <ShowcaseGrid
              items={[
                { id: "skill-1", title: "TypeScript", icon: <FaMicrochip /> },
                { id: "skill-2", title: "React", icon: <FaRocket /> },
                { id: "skill-3", title: "Node.js", icon: <FaRobot /> },
              ]}
            />
          </LandingSection>
        </section>

        <section className={styles.sectionRight}>
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
        </section>

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
