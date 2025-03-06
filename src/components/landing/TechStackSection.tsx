import React, { useState } from "react";
import {
  SimpleGrid,
  Paper,
  Title,
  Text,
  Container,
  Center,
  Group,
  Box,
  Tooltip,
  Progress,
  useMantineTheme,
} from "@mantine/core";
import { keyframes } from "@emotion/react";

interface TechItem {
  name: string;
  icon: string;
  category: "frontend" | "tools" | "backend";
  proficiency: number; // 0-100
  color: string;
  description: string;
}

// Animation keyframes
const float = keyframes({
  "0%": { transform: "translateY(0px)" },
  "50%": { transform: "translateY(-10px)" },
  "100%": { transform: "translateY(0px)" },
});

const rotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const pulse = keyframes({
  "0%": { opacity: 0.6 },
  "50%": { opacity: 1 },
  "100%": { opacity: 0.6 },
});

// This would ideally come from Strapi CMS
const techStack: TechItem[] = [
  {
    name: "React",
    icon: "⚛️",
    category: "frontend",
    proficiency: 95,
    color: "#61DAFB",
    description:
      "Expert level with 7+ years of experience building complex applications and custom hooks.",
  },
  {
    name: "TypeScript",
    icon: "🔷",
    category: "frontend",
    proficiency: 90,
    color: "#3178C6",
    description:
      "Strong typing skills with experience in complex type definitions and generics.",
  },
  {
    name: "JavaScript",
    icon: "🟨",
    category: "frontend",
    proficiency: 98,
    color: "#F7DF1E",
    description:
      "Expert knowledge of ES6+ features, async patterns, and performance optimization.",
  },
  {
    name: "HTML5",
    icon: "🔶",
    category: "frontend",
    proficiency: 95,
    color: "#E34F26",
    description:
      "Semantic HTML expert with focus on accessibility and SEO best practices.",
  },
  {
    name: "CSS3",
    icon: "🔵",
    category: "frontend",
    proficiency: 92,
    color: "#1572B6",
    description:
      "Advanced CSS including animations, Grid, Flexbox, and CSS variables.",
  },
  {
    name: "Redux",
    icon: "🔄",
    category: "frontend",
    proficiency: 88,
    color: "#764ABC",
    description:
      "Extensive experience with Redux, Redux-Toolkit, and middleware patterns.",
  },
  {
    name: "Next.js",
    icon: "▲",
    category: "frontend",
    proficiency: 85,
    color: "#000000",
    description:
      "Built several production applications with SSR, ISR, and API routes.",
  },
  {
    name: "Gatsby",
    icon: "💜",
    category: "frontend",
    proficiency: 80,
    color: "#663399",
    description:
      "Created multiple high-performance static sites with GraphQL data layer.",
  },
  {
    name: "Git",
    icon: "📊",
    category: "tools",
    proficiency: 92,
    color: "#F05032",
    description:
      "Advanced knowledge of Git workflows, rebasing, and conflict resolution.",
  },
  {
    name: "Webpack",
    icon: "📦",
    category: "tools",
    proficiency: 85,
    color: "#8DD6F9",
    description:
      "Custom configurations for optimization, code splitting, and performance.",
  },
  {
    name: "Node.js",
    icon: "🟢",
    category: "backend",
    proficiency: 82,
    color: "#339933",
    description:
      "Created APIs, middleware, and server-side applications with Express.",
  },
  {
    name: "GraphQL",
    icon: "🔺",
    category: "backend",
    proficiency: 78,
    color: "#E10098",
    description:
      "Designed schemas, resolvers, and integrated with various data sources.",
  },
];

// Group tech stack by category
const frontendTech = techStack.filter((tech) => tech.category === "frontend");
const toolsTech = techStack.filter((tech) => tech.category === "tools");
const backendTech = techStack.filter((tech) => tech.category === "backend");

export default function TechStackSection() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const theme = useMantineTheme();

  return (
    <Box py="xl" my="xl">
      <Container size="lg">
        <Title
          order={2}
          align="center"
          mb="md"
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
          My Tech Stack
        </Title>

        <Text
          align="center"
          mb="xl"
          size="lg"
          sx={{
            maxWidth: "700px",
            margin: "0 auto 32px",
            lineHeight: 1.6,
          }}
        >
          Technologies and tools I've mastered over my 10+ year journey
        </Text>

        {/* Frontend Technologies */}
        <Title order={3} mb="md" mt="xl" color="#3E98C7">
          Frontend Development
        </Title>
        <SimpleGrid
          cols={{ base: 2, sm: 3, md: 4 }}
          spacing={{ base: "md", sm: "lg" }}
          mb="xl"
        >
          {frontendTech.map((tech, index) => (
            <Tooltip
              key={index}
              label={
                <Box p="xs">
                  <Text fw={700} mb={5}>
                    {tech.name}
                  </Text>
                  <Text size="sm" mb={10}>
                    {tech.description}
                  </Text>
                  <Progress
                    value={tech.proficiency}
                    color={tech.color}
                    size="sm"
                    radius="xl"
                    animate
                  />
                  <Text size="xs" align="right" mt={5}>
                    {tech.proficiency}% proficiency
                  </Text>
                </Box>
              }
              color="dark"
              width={250}
              position="top"
              withArrow
              transitionProps={{ duration: 200 }}
            >
              <Paper
                shadow="sm"
                p="md"
                withBorder
                radius="md"
                sx={(theme) => ({
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  background:
                    hoveredTech === tech.name
                      ? `linear-gradient(135deg, ${theme.fn.rgba(
                          tech.color,
                          0.2
                        )} 0%, ${theme.fn.rgba(tech.color, 0.1)} 100%)`
                      : theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.white,
                  borderColor:
                    hoveredTech === tech.name ? tech.color : undefined,
                  transform:
                    hoveredTech === tech.name
                      ? "translateY(-8px) scale(1.03)"
                      : "translateY(0)",
                  boxShadow:
                    hoveredTech === tech.name
                      ? `0 10px 20px ${theme.fn.rgba(tech.color, 0.2)}`
                      : theme.shadows.sm,
                  animation:
                    hoveredTech === tech.name
                      ? `${float} 3s ease infinite`
                      : "none",
                })}
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <Center>
                  <Group spacing="sm">
                    <Text
                      size="xl"
                      sx={{
                        fontSize: hoveredTech === tech.name ? "2rem" : "1.5rem",
                        transition: "all 0.3s ease",
                        animation:
                          hoveredTech === tech.name
                            ? `${rotate} 5s linear infinite`
                            : "none",
                        display: "inline-block",
                      }}
                    >
                      {tech.icon}
                    </Text>
                    <Text
                      size="lg"
                      fw={600}
                      sx={{
                        transition: "all 0.3s ease",
                        color:
                          hoveredTech === tech.name ? tech.color : undefined,
                      }}
                    >
                      {tech.name}
                    </Text>
                  </Group>
                </Center>

                {/* Show proficiency bar on hover */}
                {hoveredTech === tech.name && (
                  <Box mt="md">
                    <Progress
                      value={tech.proficiency}
                      color={tech.color}
                      size="sm"
                      radius="xl"
                      animate
                      label={`${tech.proficiency}%`}
                      sx={{ animation: `${pulse} 2s ease infinite` }}
                    />
                  </Box>
                )}
              </Paper>
            </Tooltip>
          ))}
        </SimpleGrid>

        {/* Tools & Backend Technologies */}
        <SimpleGrid cols={2} spacing="xl" mt="xl">
          <Box>
            <Title order={3} mb="md" color="#7A52C5">
              Development Tools
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              {toolsTech.map((tech, index) => (
                <Tooltip
                  key={index}
                  label={tech.description}
                  color="dark"
                  position="top"
                  withArrow
                >
                  <Paper
                    shadow="sm"
                    p="md"
                    withBorder
                    radius="md"
                    sx={{
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: theme.shadows.md,
                        borderColor: tech.color,
                      },
                    }}
                  >
                    <Group justify="space-between">
                      <Group>
                        <Text size="lg">{tech.icon}</Text>
                        <Text size="md" fw={500}>
                          {tech.name}
                        </Text>
                      </Group>
                      <Progress
                        value={tech.proficiency}
                        color={tech.color}
                        size="xs"
                        radius="xl"
                        style={{ width: 60 }}
                      />
                    </Group>
                  </Paper>
                </Tooltip>
              ))}
            </SimpleGrid>
          </Box>

          <Box>
            <Title order={3} mb="md" color="#3E98C7">
              Backend Knowledge
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              {backendTech.map((tech, index) => (
                <Tooltip
                  key={index}
                  label={tech.description}
                  color="dark"
                  position="top"
                  withArrow
                >
                  <Paper
                    shadow="sm"
                    p="md"
                    withBorder
                    radius="md"
                    sx={{
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: theme.shadows.md,
                        borderColor: tech.color,
                      },
                    }}
                  >
                    <Group justify="space-between">
                      <Group>
                        <Text size="lg">{tech.icon}</Text>
                        <Text size="md" fw={500}>
                          {tech.name}
                        </Text>
                      </Group>
                      <Progress
                        value={tech.proficiency}
                        color={tech.color}
                        size="xs"
                        radius="xl"
                        style={{ width: 60 }}
                      />
                    </Group>
                  </Paper>
                </Tooltip>
              ))}
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
