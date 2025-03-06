import React from "react";
import { graphql, Link, PageProps } from "gatsby";
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
} from "@mantine/core";
import BaseLayout from "../layouts/BaseLayout";
import { SEO } from "../utils/seo/SEO";

interface ProjectsPageProps extends PageProps {
  data: {
    // We'll use local content instead of Strapi for now
    // Fallback already included in component
  };
}

export default function ProjectsPage({ data }: ProjectsPageProps) {
  // Since we're not using Strapi currently, we'll default to placeholder content
  const projects: any[] = [];

  return (
    <BaseLayout>
      <Container size="lg" py="xl">
        <Box mb="xl">
          <Title order={1} mb="md">
            Projects
          </Title>
          <Text size="lg">
            A showcase of my work as a senior frontend developer, including
            indie projects, browser extensions, and professional work.
          </Text>
        </Box>

        {projects.length > 0 ? (
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3 }}
            spacing={{ base: "md", sm: "lg" }}
          >
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  {project.image && (
                    <Card.Section>
                      <Image
                        src={project.image.publicURL}
                        height={160}
                        alt={project.title}
                      />
                    </Card.Section>
                  )}
                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>{project.title}</Text>
                    <Badge color="blue">{project.category}</Badge>
                  </Group>
                  <Text size="sm" color="dimmed" lineClamp={3}>
                    {project.description}
                  </Text>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        ) : (
          // Placeholder content when no projects exist yet
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3 }}
            spacing={{ base: "md", sm: "lg" }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Box h={160} bg="gray.2" />
                </Card.Section>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Project {i}</Text>
                  <Badge color="blue">Web App</Badge>
                </Group>
                <Text size="sm" color="dimmed">
                  This is a placeholder for a project description. Projects will
                  be loaded from Markdown files.
                </Text>
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
      title="Projects"
      description="Browse through Roman Travnikov's portfolio of frontend development projects including web applications, browser extensions, and more."
    />
  );
}

// Removed the Strapi query that was causing errors
// We can add a query for local markdown files later if needed
/*
export const query = graphql`
  query {
    allStrapiProject {
      nodes {
        id
        title
        description
        slug
        category
        tags
        image {
          publicURL
        }
      }
    }
  }
`;
*/
