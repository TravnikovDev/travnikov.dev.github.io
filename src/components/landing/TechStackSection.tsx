import React, { useState } from "react";
import {
  Container,
  Title,
  Text,
  Grid,
  Paper,
  Progress,
  Group,
  Stack,
  Tooltip,
} from "@mantine/core";
import { motion } from "framer-motion";
import { theme } from "../../theme";
import { useColorScheme } from "@mantine/hooks";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

interface TechSkill {
  name: string;
  level: number;
  color: string;
  experience: string;
  projects: number;
}

interface TechCategory {
  name: string;
  color: string;
  skills: TechSkill[];
}

const techData: TechCategory[] = [
  {
    name: "Frontend Development",
    color: "#3E98C7",
    skills: [
      {
        name: "React/Next.js",
        level: 95,
        color: "#61DAFB",
        experience: "8+ years",
        projects: 50,
      },
      {
        name: "TypeScript",
        level: 90,
        color: "#3178C6",
        experience: "5+ years",
        projects: 40,
      },
      {
        name: "JavaScript",
        level: 95,
        color: "#F7DF1E",
        experience: "10+ years",
        projects: 100,
      },
      {
        name: "HTML/CSS",
        level: 90,
        color: "#E34F26",
        experience: "10+ years",
        projects: 100,
      },
    ],
  },
  {
    name: "Creative Development",
    color: "#7A52C5",
    skills: [
      {
        name: "Three.js",
        level: 85,
        color: "#049EF4",
        experience: "3+ years",
        projects: 15,
      },
      {
        name: "WebGL",
        level: 80,
        color: "#990000",
        experience: "3+ years",
        projects: 10,
      },
      {
        name: "GSAP",
        level: 85,
        color: "#88CE02",
        experience: "4+ years",
        projects: 20,
      },
      {
        name: "SVG Animation",
        level: 80,
        color: "#FFB13B",
        experience: "5+ years",
        projects: 25,
      },
    ],
  },
  {
    name: "Backend Development",
    color: "#3E98C7",
    skills: [
      {
        name: "Node.js",
        level: 85,
        color: "#339933",
        experience: "6+ years",
        projects: 30,
      },
      {
        name: "GraphQL",
        level: 80,
        color: "#E535AB",
        experience: "3+ years",
        projects: 15,
      },
      {
        name: "PostgreSQL",
        level: 75,
        color: "#336791",
        experience: "5+ years",
        projects: 20,
      },
      {
        name: "MongoDB",
        level: 80,
        color: "#47A248",
        experience: "4+ years",
        projects: 15,
      },
    ],
  },
];

export function TechStackSection() {
  const colorScheme = useColorScheme();
  return (
    <Container size="lg" py="6rem" style={{backgroundColor: "var(--mantine-color-dark-6)",
      color: "#fff"}}>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Stack align="center" gap="xl">
          <Title
            order={2}
            ta="center"
            mb="md"
            style={{ color: "#fff",}}
            styles={(theme) => ({
              root: {
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
                  background: `linear-gradient(90deg, ${theme.colors.blue[6]}, ${theme.colors.cyan[6]})`,
                },
              },
            })}
          >
            Technical Expertise
          </Title>

          <Text
            ta="center"
            mb="xl"
            size="lg"
            maw={800}
            style={{ color: "var(--mantine-color-dark-0)"}}
            styles={{
              root: {
                maxWidth: "800px",
                margin: "0 auto",
                lineHeight: 1.8,
              },
            }}
          >
            A comprehensive overview of my technical skills and proficiency levels.
            Each skill is backed by years of practical experience and numerous successful projects.
          </Text>

          <Grid gutter="xl">
            {techData.map((category, idx) => (
              <Grid.Col key={idx} span={{ base: 12, md: 12 }}>
                <Title
                  order={3}
                  mb="md"
                  c={category.color}
                  styles={{
                    root: {
                      fontSize: "1.8rem",
                      marginBottom: "1.5rem",
                    },
                  }}
                >
                  {category.name}
                </Title>

                <Grid gutter="xl">
                  {category.skills.map((skill, index) => (
                    <Grid.Col key={index} span={{ base: 12, sm: 6 }}>
                      <Tooltip
                        label={
                          <div>
                            <strong>Experience:</strong> {skill.experience}
                            <br />
                            <strong>Projects:</strong> {skill.projects}+
                          </div>
                        }
                        color="dark"
                        w={250}
                        position="top"
                        transitionProps={{ duration: 200 }}
                        withArrow
                      >
                        <Paper
                          shadow="sm"
                          p="md"
                          withBorder
                          radius="md"
                          styles={(theme) => ({
                            root: {
                              transition: "all 0.3s ease",
                              cursor: "pointer",
                              background:
                                colorScheme === "dark"
                                  ? theme.colors.dark[8]
                                  : theme.white,
                              borderColor:
                                colorScheme === "dark"
                                  ? theme.colors.dark[4]
                                  : theme.colors.gray[3],
                              transform: "translateY(0)",
                              boxShadow: theme.shadows.sm,
                              animation: "fadeIn 0.5s ease forwards",
                              "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: theme.shadows.lg,
                                borderColor: skill.color,
                              },
                            },
                          })}
                        >
                          <Group justify="space-between" mb={5}>
                            <Text
                              size="lg"
                              fw={700}
                              styles={{
                                root: {
                                  transition: "color 0.3s ease",
                                  color: skill.color,
                                },
                              }}
                            >
                              {skill.name}
                            </Text>
                          </Group>

                          <Progress
                            value={skill.level}
                            color={skill.color}
                            size="sm"
                            radius="xl"
                            animated
                            style={{animation: "slideIn 1s ease forwards"}}
                          />
                        </Paper>
                      </Tooltip>
                    </Grid.Col>
                  ))}
                </Grid>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </motion.div>
    </Container>
  );
}
