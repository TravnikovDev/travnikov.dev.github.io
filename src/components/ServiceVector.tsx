import React from "react";
import { Link } from "gatsby";
import { Card, Text, Title, Box } from "@mantine/core";
import { LandingSection } from "./landing/TimelineSection";
import * as styles from "./ServiceVector.module.css";

const vectors = [
  {
    id: "vector-a",
    label: "Vector A",
    title: "AI Automation",
    href: "/ai-automation-engineer",
    hook: "I replace manual operations with intelligent n8n workflows and AI agents.",
  },
  {
    id: "vector-b",
    label: "Vector B",
    title: "Web Architecture",
    href: "/react-performance-consulting",
    hook: "I build scalable, sub-second React applications and Gatsby systems.",
  },
  {
    id: "vector-c",
    label: "Vector C",
    title: "Strategic Consulting",
    href: "/fractional-cto",
    hook: "Fractional CTO services to bridge the gap between business goals and tech stacks.",
  },
];

export default function ServiceVector() {
  return (
    <LandingSection
      title="Services"
      description="Pick the pathway that matches your highest leverage problem."
    >
      <Box className={styles.grid}>
        {vectors.map((vector) => (
          <Card
            key={vector.id}
            component={Link}
            to={vector.href}
            className={styles.card}
            radius="md"
            withBorder
            padding="lg"
          >
            <Text className={styles.label}>{vector.label}</Text>
            <Title order={3} className={styles.title}>
              {vector.title}
            </Title>
            <Text size="sm" className={styles.hook}>
              {vector.hook}
            </Text>
            <Text size="sm" className={styles.cta}>
              Explore service
            </Text>
          </Card>
        ))}
      </Box>
    </LandingSection>
  );
}
