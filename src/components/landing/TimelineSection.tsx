import React, { useState, useEffect, useRef } from "react";
import {
  Timeline,
  Text,
  Title,
  Container,
  Box,
  Paper,
  Badge,
  Transition,
} from "@mantine/core";
import { keyframes } from "@emotion/react";

interface CareerItem {
  year: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
  index: number;
}

// This would ideally come from Strapi CMS
const careerData: CareerItem[] = [
  {
    year: "2023-Present",
    title: "Senior Frontend Developer",
    company: "Example Company",
    description:
      "Leading the frontend development team, implementing advanced React patterns and optimizing performance. Introduced micro-frontend architecture and improved core web vitals by 40%.",
    skills: [
      "React",
      "TypeScript",
      "Micro-Frontends",
      "Performance Optimization",
    ],
    index: 0,
  },
  {
    year: "2020-2023",
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    description:
      "Worked on large-scale web applications using React, TypeScript, and modern state management. Developed reusable component libraries and implemented CI/CD pipelines.",
    skills: ["React", "TypeScript", "Redux", "Component Libraries"],
    index: 1,
  },
  {
    year: "2018-2020",
    title: "Web Developer",
    company: "Digital Agency",
    description:
      "Developed responsive websites and interactive UIs for clients across various industries. Collaborated with designers to create pixel-perfect implementations.",
    skills: ["JavaScript", "HTML/CSS", "UI/UX", "Responsive Design"],
    index: 2,
  },
  {
    year: "2015-2018",
    title: "Junior Developer",
    company: "Startup Ventures",
    description:
      "Started my journey as a web developer, focusing on HTML, CSS, and JavaScript fundamentals. Built and maintained various client websites.",
    skills: ["HTML", "CSS", "JavaScript", "jQuery"],
    index: 3,
  },
];

// Animation keyframes
const fadeInRight = keyframes({
  "0%": { opacity: 0, transform: "translateX(20px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const fadeInScale = keyframes({
  "0%": { opacity: 0, transform: "scale(0.9)" },
  "100%": { opacity: 1, transform: "scale(1)" },
});

export default function TimelineSection() {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Check if an element is in viewport
  const isInViewport = (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // Handle scroll events to check if timeline is in view
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current && isInViewport(timelineRef.current)) {
        // Start animation sequence for timeline items
        const animationInterval = setInterval(() => {
          setActiveItem((prevActive) => {
            const nextActive = prevActive === null ? 0 : prevActive + 1;
            if (nextActive >= careerData.length) {
              clearInterval(animationInterval);
              return prevActive;
            }
            return nextActive;
          });
        }, 800);

        // Cleanup interval
        return () => clearInterval(animationInterval);
      }
    };

    // Initial check and add scroll listener
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box py="xl" my="xl" ref={timelineRef}>
      <Container size="lg">
        <Title
          order={2}
          align="center"
          mb="xl"
          sx={(theme) => ({
            position: "relative",
            display: "inline-block",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -10,
              left: "30%",
              right: "30%",
              height: 4,
              borderRadius: 2,
              background: "linear-gradient(90deg, #3E98C7 0%, #7A52C5 100%)",
            },
          })}
        >
          My Career Journey
        </Title>

        <Timeline active={careerData.length - 1} bulletSize={28} lineWidth={3}>
          {careerData.map((item, index) => (
            <Timeline.Item
              key={index}
              title={
                <Transition
                  mounted={activeItem !== null && activeItem >= item.index}
                  transition="slide-right"
                  duration={500}
                  timingFunction="ease"
                >
                  {(styles) => (
                    <Title
                      order={4}
                      style={styles}
                      sx={{
                        fontWeight: 700,
                        color: "#3E98C7",
                      }}
                    >
                      {item.title}
                    </Title>
                  )}
                </Transition>
              }
              bullet={
                <Box
                  sx={(theme) => ({
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background:
                      activeItem !== null && activeItem >= item.index
                        ? "linear-gradient(90deg, #3E98C7 0%, #7A52C5 100%)"
                        : theme.colors.gray[4],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    transform:
                      activeItem !== null && activeItem >= item.index
                        ? "scale(1.2)"
                        : "scale(1)",
                    boxShadow:
                      activeItem !== null && activeItem >= item.index
                        ? "0 0 10px rgba(62, 152, 199, 0.5)"
                        : "none",
                  })}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "#fff",
                    }}
                  />
                </Box>
              }
              lineVariant={
                activeItem !== null && activeItem >= item.index
                  ? "solid"
                  : "dashed"
              }
            >
              <Transition
                mounted={activeItem !== null && activeItem >= item.index}
                transition="fade"
                duration={600}
                timingFunction="ease"
              >
                {(styles) => (
                  <Paper
                    p="md"
                    radius="md"
                    shadow="sm"
                    withBorder
                    style={{
                      ...styles,
                      animation: `${fadeInScale} 0.5s ease forwards`,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Text fw={600} color="dimmed" mb={4} size="sm">
                      {item.year} • {item.company}
                    </Text>
                    <Text mb="md">{item.description}</Text>
                    <Box>
                      {item.skills.map((skill, i) => (
                        <Badge
                          key={i}
                          mr={6}
                          mb={6}
                          variant="light"
                          color={i % 2 === 0 ? "blue" : "violet"}
                          sx={{
                            animation: `${fadeInRight} 0.3s ease forwards`,
                            animationDelay: `${i * 0.1 + 0.3}s`,
                            opacity: 0,
                          }}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </Box>
                  </Paper>
                )}
              </Transition>
            </Timeline.Item>
          ))}
        </Timeline>
      </Container>
    </Box>
  );
}
