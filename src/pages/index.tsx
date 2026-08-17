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
    allBlogPost: {
      nodes: {
        id: string;
        timeToRead: number;
        title: string;
        date: string;
        slug: string;
        coverUrl: string | null;
      }[];
    };
    allCaseStudy: {
      nodes: {
        id: string;
        title: string;
        slug: string;
        description: string;
        category: string;
      }[];
    };
  };
}

// Career history as structured rows (period / role / summary) — rendered as
// an editorial list rather than a grid of identical cards
const experience = [
  {
    id: "work-outlier",
    period: "2024-now",
    role: "Senior Reviewer & Squad Lead",
    company: "Outlier (Scale AI) · United States",
    summary:
      "Reviewing frontier-model output across reasoning, coding and image interpretation, and contributing to the datasets those models train on. Led a squad of 10+ reviewers for ten months; recognised as a top performer and assigned to the high-difficulty tracks.",
  },
  {
    id: "work-freelance",
    period: "2024-now",
    role: "Independent Consultant",
    company: "Self-employed · Remote",
    summary:
      "Frontend and automation for international clients in SaaS, crypto and e-commerce. Sanity CMS with Algolia for real-time search; an Etsy storefront scaled on an SVG pipeline automated with Node.js and AI.",
  },
  {
    id: "work-super-dispatch",
    period: "2023-2024",
    role: "Senior Frontend Developer",
    company: "Super Dispatch · United States",
    summary:
      "Logistics platform for carriers, brokers and shippers. Introduced reusable component patterns and stricter typing, added Jest and Playwright coverage, and cut load times by 20%.",
  },
  {
    id: "work-flymeto",
    period: "2022",
    role: "Senior Frontend Developer",
    company: "Flymeto · Czech Republic",
    summary:
      "Flight booking platform for desktop, tablet and mobile. Next.js with server-side rendering, Redux Toolkit and Ant Design; UI tests in Jest and Playwright, with performance budgets held against Core Web Vitals.",
  },
  {
    id: "work-omnetic",
    period: "2020-2022",
    role: "Senior Frontend Developer",
    company: "OMNETIC · Czech Republic",
    summary:
      "Dealership management system used across EU clients. Component standardisation and a Jest and Cypress testing approach for multi-device reliability.",
  },
  {
    id: "work-realtrac",
    period: "2017-2020",
    role: "Senior Frontend Developer",
    company: "RealTrac Technologies",
    summary:
      "Tracking platform for people and vehicles in mining and industrial settings. Led the migration to TypeScript and React 16, built GIS modules handling thousands of concurrent map markers, added SIP/VoIP calling and a reports system, and fixed memory leaks that were capping capacity under load.",
  },
  {
    id: "work-early",
    period: "2012-2017",
    role: "Frontend Developer, early roles",
    company: "MiiiX.org, Programmny Produkt (ppr.ru), Altera Media",
    summary:
      "E-commerce with real-time auctions and an admin panel at MiiiX.org. Before that, large government and enterprise portals on IBM WebSphere — ministries, OTP Bank and Rostelecom — then agency and small-business work.",
  },
];

export default function IndexPage({ data }: IndexPageProps) {
  const insights = data?.allBlogPost?.nodes ?? [];
  const caseStudies = data?.allCaseStudy?.nodes ?? [];
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

        {/* Full-bleed "book": sections become facing pages, two to a spread on
            desktop, single column below. */}
        <Box className={styles.book}>
        {insights.length > 0 && (
        <section className={styles.sectionRight} data-sheet>
          <LandingSection
            title="Recent Insights"
            description="Fresh thinking across automation, performance, and technical leadership."
          >
            <Box className={styles.insightsList}>
              {insights.map((insight) => (
                <Link
                  key={insight.id}
                  to={`/blog/${insight.slug}`}
                  className={styles.insightItem}
                >
                  {insight.coverUrl && (
                    /* decorative: the row's anchor text is already the title,
                       so a described thumbnail would only pad it */
                    <img
                      className={styles.insightCover}
                      src={insight.coverUrl}
                      alt=""
                      loading="lazy"
                      width={1400}
                      height={700}
                    />
                  )}
                  <Box>
                    <Text size="sm" c="dimmed">
                      {insight.date}
                    </Text>
                    <Text className={styles.insightTitle}>
                      {insight.title}
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
        <section className={styles.sectionRight} data-sheet>
          {/* Landing subsections */}
          <LandingSection title="Selected Case Studies">
            <Box className={styles.caseStudiesList}>
              {caseStudies.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.slug}`}
                  className={styles.caseStudyItem}
                >
                  <Box>
                    <Text size="sm" c="dimmed">
                      {project.category}
                    </Text>
                    <Text className={styles.caseStudyTitle}>
                      {project.title}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {project.description}
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

        {/* <section className={styles.sectionRight} data-sheet>
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

        <section className={styles.sectionRight} data-sheet>
          <LandingSection title="Open Source">
            <ShowcaseGrid
              items={[
                {
                  id: "lib-vibe-janitor",
                  title: "vibe-janitor",
                  icon: <FaRobot />,
                  url: "https://www.npmjs.com/package/vibe-janitor",
                  description:
                    "vibe-janitor, a utility library published on npm.",
                },
                {
                  id: "lib-ffmpegslideshow",
                  title: "ffmpegslideshow",
                  icon: <FaTools />,
                  url: "https://www.npmjs.com/package/ffmpegslideshow",
                  description:
                    "ffmpegslideshow, an npm package for creating slideshows with ffmpeg.",
                },
              ]}
            />
          </LandingSection>
        </section>

        {/* <section className={styles.sectionRight} data-sheet>
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

        <section className={styles.sectionRight} data-sheet>
          <LandingSection title="Professional Experience">
            <Box className={styles.experienceList}>
              {experience.map((job) => (
                <Box key={job.id} className={styles.experienceItem}>
                  <Text className={styles.experiencePeriod}>{job.period}</Text>
                  <Box>
                    <h3 className={styles.experienceRole}>
                      {job.role}
                      <span className={styles.experienceCompany}>
                        {job.company}
                      </span>
                    </h3>
                    <p className={styles.experienceSummary}>{job.summary}</p>
                  </Box>
                </Box>
              ))}
            </Box>
          </LandingSection>
        </section>

        {/*         <section className={styles.sectionRight} data-sheet>
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

        <section className={styles.sectionRight} data-sheet>
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

        {/* Closing spread — the last thing before the footer, so it is the
            conversion point: the three service lines, each with the offer its
            own page actually opens with, then a route out for everyone else. */}
        <section className={styles.sectionRight} data-sheet>
          <LandingSection
            title="What I can help you with"
            description="Three ways teams bring me in. Start with whichever matches the bottleneck."
          >
            <Box className={styles.serviceList}>
              {[
                {
                  to: "/ai-automation-engineer",
                  name: "AI Automation",
                  blurb:
                    "Replace manual operations with n8n workflows and AI agents that connect your data, tools and teams.",
                  cta: "Book a workflow audit",
                },
                {
                  to: "/react-performance-consulting",
                  name: "Web Performance",
                  blurb:
                    "Scalable, sub-second React and Next.js systems that convert faster and rank higher.",
                  cta: "Audit my architecture",
                },
                {
                  to: "/fractional-cto",
                  name: "Fractional CTO",
                  blurb:
                    "Strategy, hiring support and technical leadership that keeps engineering aligned to business goals.",
                  cta: "Discuss your vision",
                },
              ].map((service) => (
                <Link
                  key={service.to}
                  to={service.to}
                  className={styles.serviceItem}
                  aria-label={service.name}
                >
                  <h3 className={styles.serviceName}>{service.name}</h3>
                  <p className={styles.serviceBlurb}>{service.blurb}</p>
                  <span className={styles.serviceCta}>{service.cta} →</span>
                </Link>
              ))}
            </Box>

            <Box className={styles.serviceFooter}>
              <Text className={styles.serviceFooterText}>
                Not sure which one it is? Describe what is slowing you down and
                I will tell you straight whether I am the right person.
              </Text>
              <Link to="/contact" className={styles.serviceFooterCta}>
                Get in touch
              </Link>
            </Box>
          </LandingSection>
        </section>
        </Box>

        <div
          ref={progressRef}
          className={styles.scrollProgressIndicator}
          style={{ transform: "scaleX(0)" }}
        />
      </Box>
    </BaseLayout>
  );
}

export function Head({ location }: { location: { pathname: string } }) {
  return (
    <SEO pathname={location.pathname}
      title="AI Automation & Web Architecture for Startups"
      description="I engineer autonomous AI systems and high-performance React architecture for startups, plus fractional CTO leadership."
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
    allBlogPost(sort: { date: DESC }, limit: 3) {
      nodes {
        id
        timeToRead
        title
        date(formatString: "MMM D, YYYY")
        slug
        coverUrl
      }
    }
    allCaseStudy(sort: { title: ASC }, limit: 2) {
      nodes {
        id
        title
        slug
        description
        category
      }
    }
  }
`;
