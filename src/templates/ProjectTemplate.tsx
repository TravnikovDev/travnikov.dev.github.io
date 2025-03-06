import React from 'react';
import { PageProps } from 'gatsby';
import { Image, Title, Text, Stack, Container, Group, Badge, Box } from '@mantine/core';
import BaseLayout from '../layouts/BaseLayout';
import { SEO } from '../utils/seo/SEO';

// This component is a template for project pages
// Currently it's not being used as we've removed Strapi integration
// It will be updated when we implement local markdown files

interface ProjectTemplateProps extends PageProps {
  data?: {
    // Will be populated later when we implement local markdown files
  };
}

export default function ProjectTemplate({ data, pageContext }: ProjectTemplateProps) {
  // For now, we'll use placeholder data
  const projectData = {
    title: "Sample Project",
    description: "This is a placeholder for project description content. This template will be updated to work with Markdown files.",
    url: "https://github.com/TravnikovDev",
    category: "Web App",
    tags: ["React", "TypeScript", "Gatsby"],
  };

  return (
    <BaseLayout>
      <Container size="md" py="xl">
        <Stack spacing="xl">
          <Title order={1}>{projectData.title}</Title>
          <Group>
            <Badge size="lg">{projectData.category}</Badge>
            {projectData.tags.map((tag, index) => (
              <Badge key={index} size="md" variant="outline">
                {tag}
              </Badge>
            ))}
          </Group>
          <Text size="lg">{projectData.description}</Text>
          {projectData.url && (
            <Text component="a" href={projectData.url} target="_blank" rel="noopener noreferrer">
              View Project →
            </Text>
          )}
        </Stack>
      </Container>
    </BaseLayout>
  );
}

export function Head() {
  const projectData = {
    title: "Sample Project",
    description: "This is a placeholder for project description."
  };
  
  return (
    <SEO
      title={projectData.title}
      description={projectData.description}
    />
  );
}

// Removed the Strapi GraphQL query
// Will be replaced with local markdown query later
/*
export const query = graphql`
  query ProjectQuery($id: String!) {
    strapiProject(id: { eq: $id }) {
      title
      description
      image {
        publicURL
      }
      url
      category
      tags
      publishedAt
    }
  }
`;
*/