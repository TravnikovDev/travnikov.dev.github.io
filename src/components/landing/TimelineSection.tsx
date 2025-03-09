import React from "react";
import { Container, Title, Timeline, Text, Box } from "@mantine/core";
import { motion } from "framer-motion";

interface TimelineItem {
  date: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
  color: "blue" | "violet";
}

const timelineData: TimelineItem[] = [
  {
    date: "2020 - Present",
    title: "Senior Frontend Developer",
    company: "Tech Company",
    description: "Leading development of scalable web applications using React, TypeScript, and Three.js",
    skills: ["React", "TypeScript", "Three.js", "WebGL", "Node.js"],
    color: "blue"
  },
  {
    date: "2018 - 2020",
    title: "Frontend Developer",
    company: "Digital Agency",
    description: "Developed interactive web experiences and performant user interfaces",
    skills: ["React", "JavaScript", "CSS3", "WebGL"],
    color: "violet"
  },
  {
    date: "2015 - 2018",
    title: "Full Stack Developer",
    company: "Startup",
    description: "Built full-stack applications using modern web technologies",
    skills: ["Node.js", "React", "MongoDB", "Express"],
    color: "blue"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export function TimelineSection() {
  return (
    <Container size="lg" py="6rem">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Title
          order={2}
          ta="center"
          mb="xl"
          style={{
            position: "relative",
            display: "inline-block",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -10,
              left: "25%",
              right: "25%",
              height: 4,
              borderRadius: 2,
              background: "var(--mantine-primary-gradient)"
            }
          }}
        >
          Career Journey
        </Title>

        <Timeline active={timelineData.length - 1} bulletSize={24} lineWidth={2}>
          {timelineData.map((item, index) => (
            <Timeline.Item
              key={index}
              bullet={
                <Box
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "var(--mantine-primary-gradient)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.3s ease",
                    transform: "scale(1)",
                    boxShadow: "var(--mantine-shadow-sm)",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: "var(--mantine-shadow-md)"
                    }
                  }}
                >
                  <Text c="white" size="xl">
                    🚀
                  </Text>
                </Box>
              }
              title={
                <Box
                  style={{
                    width: "fit-content",
                    padding: "1rem 1.5rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "1rem",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 40px rgba(0, 0, 0, 0.15)"
                    }
                  }}
                >
                  <Title order={4} style={{ fontWeight: 700, color: item.color === "blue" ? "#3D7FFF" : "#A64DFF" }}>
                    {item.title}
                  </Title>
                  <Text size="sm" c="dimmed">{item.date}</Text>
                </Box>
              }
            >
              <Box pl="md">
                <Text size="lg" mb="xs">
                  {item.company}
                </Text>
                <Text size="md" c="dimmed" mb="md">
                  {item.description}
                </Text>
                <Box>
                  {item.skills.map((skill, i) => (
                    <Box
                      key={i}
                      component="span"
                      mr={8}
                      mb={8}
                      variant="light"
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        backgroundColor: item.color === "blue" ? "rgba(61, 127, 255, 0.1)" : "rgba(166, 77, 255, 0.1)",
                        color: item.color === "blue" ? "#3D7FFF" : "#A64DFF",
                        border: `1px solid ${item.color === "blue" ? "rgba(61, 127, 255, 0.2)" : "rgba(166, 77, 255, 0.2)"}`,
                        animation: "fadeIn 0.5s ease forwards",
                        animationDelay: `${i * 0.1}s`,
                        opacity: 0
                      }}
                    >
                      {skill}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Timeline.Item>
          ))}
        </Timeline>
      </motion.div>
    </Container>
  );
}
