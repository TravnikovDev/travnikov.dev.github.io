import React from "react";
import { graphql, PageProps } from "gatsby";
import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Badge,
  Group,
  Title,
  Container,
  Box,
  Code,
  Button,
} from "@mantine/core";
import BaseLayout from "../layouts/BaseLayout";
import { SEO } from "../utils/seo/SEO";

interface ExperimentsPageProps extends PageProps {
  data: {
    allMarkdownRemark: {
      nodes: {
        id: string;
        frontmatter: {
          title: string;
          slug: string;
          description: string;
          featuredImage: string;
          technologies: string[];
        };
        html: string;
      }[];
    };
  };
}

export default function ExperimentsPage({ data }: ExperimentsPageProps) {
  const experiments = data.allMarkdownRemark.nodes;

  return (
    <BaseLayout>
      <Container size="lg" py="xl">
        <Box mb="xl">
          <Title order={1} mb="md">
            Web Experiments
          </Title>
          <Text size="lg">
            A collection of fun and interactive frontend experiments showcasing
            creative techniques and concepts.
          </Text>
        </Box>

        {experiments.length > 0 ? (
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            {experiments.map((experiment) => (
              <Card
                key={experiment.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
              >
                {experiment.frontmatter.featuredImage && (
                  <Card.Section>
                    <Image
                      src={experiment.frontmatter.featuredImage}
                      height={200}
                      alt={experiment.frontmatter.title}
                    />
                  </Card.Section>
                )}
                <Title order={3} mt="md" mb="xs">
                  {experiment.frontmatter.title}
                </Title>
                <Group mb="md">
                  {experiment.frontmatter.technologies.map((tech, index) => (
                    <Badge key={index} color="blue" variant="light">
                      {tech}
                    </Badge>
                  ))}
                </Group>
                <Text mb="md">{experiment.frontmatter.description}</Text>
                <Box mb="md">
                  <Text fw={500} mb="xs">
                    Sample Code:
                  </Text>
                  <Code block>{experiment.html}</Code>
                </Box>
                <Button
                  component="a"
                  href={`/experiments/${experiment.frontmatter.slug}`}
                  fullWidth
                >
                  View Details
                </Button>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          // Placeholder content when no experiments exist yet
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Box h={200} bg="gray.2" />
                </Card.Section>
                <Title order={3} mt="md" mb="xs">
                  Experiment {i}
                </Title>
                <Group mb="md">
                  <Badge color="blue" variant="light">
                    React
                  </Badge>
                  <Badge color="green" variant="light">
                    Three.js
                  </Badge>
                </Group>
                <Text mb="md">
                  This is a placeholder for an experiment description.
                  Experiments will be loaded from Markdown files.
                </Text>
                <Box mb="md">
                  <Text fw={500} mb="xs">
                    Sample Code:
                  </Text>
                  <Code block>{`function ExampleComponent() {
  return <div>Hello World</div>;
}`}</Code>
                </Box>
                <Button fullWidth disabled>
                  View Live Demo
                </Button>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </BaseLayout>
  );
}

export function Head() {
  return (
    <SEO
      title="Web Experiments"
      description="Explore interactive web experiments and frontend demos created by Roman Travnikov using modern web technologies."
    />
  );
}

export const query = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { template: { eq: "experiment" } } }) {
      nodes {
        id
        frontmatter {
          title
          slug
          description
          featuredImage
          technologies
        }
        html
      }
    }
  }
`;
