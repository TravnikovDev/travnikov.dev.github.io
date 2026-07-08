import { useEffect, useRef } from "react";
import { graphql, Link, PageProps } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import { SEO } from "../utils/seo/SEO";
import HeroSection from "../components/landing/HeroSection";
import { LandingSection } from "../components/landing/TimelineSection";
import ShowcaseGrid from "../components/landing/ShowcaseGrid";
import { FaBoxes, FaRobot, FaTools, FaMicrochip } from "react-icons/fa";
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
import { Box, Text } from "@mantine/core";
import ThreeDBackground from "../components/3d/3dBackground";
import * as styles from "./index.module.css";

// Parallax divider with animation

interface IndexPageProps extends PageProps {
  data: {
    allBlogPosts: {
      nodes: {
        id: string;
        timeToRead: number;
        frontmatter: {
          title: string;
          date: string;
          slug: string;
        };
      }[];
    };
    allProjects: {
      nodes: {
        id: string;
        frontmatter: {
          title: string;
          slug: string;
          description: string;
          category: string;
        };
      }[];
    };
  };
}

// Career history as structured rows (period / role / summary) — rendered as
// an editorial list rather than a grid of identical cards
const experience = [
  {
    id: "work-super-dispatch",
    period: "2023 – 2024",
    role: "Frontend Engineer",
    company: "Super Dispatch · Remote (US)",
    summary:
      "Transportation/logistics platform in React and TypeScript; refined UI/UX and built scalable applications.",
  },
  {
    id: "work-flymeto",
    period: "2022",
    role: "Senior Frontend Developer",
    company: "Flymeto · Remote (Prague)",
    summary:
      "Flight ticketing service for high-traffic websites using React, Next.js, TypeScript and SCSS.",
  },
  {
    id: "work-omnetic",
    period: "2020 – 2022",
    role: "Senior Frontend Developer",
    company: "OMNETIC · Remote (Prague)",
    summary:
      "Dealership Management System for the Czech/EU market. React, Next.js, TypeScript, SCSS, Material UI, Redux, Cypress.",
  },
  {
    id: "work-realtrac",
    period: "2017 – 2020",
    role: "Senior Frontend Developer",
    company: "RealTrac Technologies · St. Petersburg",
    summary:
      "Industrial tracking and communication system; migrated the codebase to TypeScript, added a reports constructor, GIS maps and WebSocket events.",
  },
  {
    id: "work-miix",
    period: "2016 – 2017",
    role: "Frontend Web Developer",
    company: "MiiiX.org · St. Petersburg",
    summary:
      "E-commerce platform with real-time auctions and an admin panel using React, Redux and Webpack.",
  },
  {
    id: "work-programny",
    period: "2014 – 2015",
    role: "Frontend Web Developer",
    company: "Programny Produkt · Moscow / Remote",
    summary:
      "Portals for Russian ministries and companies (Finance Ministry, MFA, OTP Bank, Rostelecom) on IBM WebSphere, JavaScript and SCSS.",
  },
  {
    id: "work-altera",
    period: "2013 – 2014",
    role: "Junior Web Developer",
    company: "Altera Media · St. Petersburg",
    summary: "Websites and smaller client projects.",
  },
  {
    id: "work-fabricasaitov",
    period: "2012 – 2013",
    role: "Junior Web Developer",
    company: "Fabricasaitov.ru · St. Petersburg",
    summary: "Entry-level role building websites.",
  },
];

export default function IndexPage({ data }: IndexPageProps) {
  const insights = data?.allBlogPosts?.nodes ?? [];
  const caseStudies = data?.allProjects?.nodes ?? [];
  // Progress bar is updated via ref (no setState) so scrolling never
  // re-renders the page — keeps the 3D background/glyph canvases stable.
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress =
        totalHeight > 0
          ? Math.min(1, Math.max(0, window.scrollY / totalHeight))
          : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <BaseLayout>
      {/* Dynamic 3D background with parallax */}
      <ThreeDBackground />

      {/* Main content with scroll animations */}
      <Box className={styles.mainContent}>
        <section className={styles.heroSection}>
          <HeroSection />
        </section>

        {insights.length > 0 && (
        <section className={styles.sectionRight}>
          <LandingSection
            title="Recent Insights"
            description="Fresh thinking across automation, performance, and technical leadership."
          >
            <Box className={styles.insightsList}>
              {insights.map((insight) => (
                <Link
                  key={insight.id}
                  to={`/blog/${insight.frontmatter.slug}`}
                  className={styles.insightItem}
                >
                  <Box>
                    <Text size="sm" c="dimmed">
                      {insight.frontmatter.date}
                    </Text>
                    <Text className={styles.insightTitle}>
                      {insight.frontmatter.title}
                    </Text>
                  </Box>
                  <Text size="sm" c="dimmed">
                    {insight.timeToRead} min read
                  </Text>
                </Link>
              ))}
            </Box>
          </LandingSection>
        </section>
        )}

        {caseStudies.length > 0 && (
        <section className={styles.sectionRight}>
          {/* Landing subsections */}
          <LandingSection title="Selected Case Studies">
            <Box className={styles.caseStudiesList}>
              {caseStudies.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.frontmatter.slug}`}
                  className={styles.caseStudyItem}
                >
                  <Box>
                    <Text size="sm" c="dimmed">
                      {project.frontmatter.category}
                    </Text>
                    <Text className={styles.caseStudyTitle}>
                      {project.frontmatter.title}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {project.frontmatter.description}
                    </Text>
                  </Box>
                  <Text size="sm" className={styles.caseStudyCta}>
                    View case study
                  </Text>
                </Link>
              ))}
            </Box>
            <Link to="/projects" className={styles.caseStudiesLink}>
              View all case studies
            </Link>
          </LandingSection>
        </section>
        )}

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

        {/* <section className={styles.sectionRight}>
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
        </section> */}

        <section className={styles.sectionRight}>
          <LandingSection title="Professional Experience">
            <Box className={styles.experienceList}>
              {experience.map((job) => (
                <Box key={job.id} className={styles.experienceItem}>
                  <Text className={styles.experiencePeriod}>{job.period}</Text>
                  <Box>
                    <h3 className={styles.experienceRole}>
                      {job.role}{" "}
                      <span className={styles.experienceCompany}>
                        — {job.company}
                      </span>
                    </h3>
                    <p className={styles.experienceSummary}>{job.summary}</p>
                  </Box>
                </Box>
              ))}
            </Box>
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

        {/* <section className={styles.sectionRight}>
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
        </section> */}

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
          ref={progressRef}
          className={styles.scrollProgressIndicator}
          style={{ transform: "scaleX(0)" }}
        />
      </Box>
    </BaseLayout>
  );
}

export function Head() {
  return (
    <SEO
      title="AI Automation & Web Architecture for Startups"
      description="I engineer autonomous AI systems and high-performance React & Gatsby architecture for startups — plus fractional CTO leadership."
    />
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteTitle
      }
    }
    allBlogPosts: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "blog" } } }
      sort: { frontmatter: { date: DESC } }
      limit: 3
    ) {
      nodes {
        id
        timeToRead
        frontmatter {
          title
          date(formatString: "MMM D, YYYY")
          slug
        }
      }
    }
    allProjects: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "project" } } }
      sort: { frontmatter: { title: ASC } }
      limit: 2
    ) {
      nodes {
        id
        frontmatter {
          title
          slug
          description
          category
        }
      }
    }
  }
`;
