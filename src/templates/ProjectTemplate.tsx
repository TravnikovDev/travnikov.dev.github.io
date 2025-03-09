import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Image, Title, Text, Stack, Container, Group, Badge, Box } from '@mantine/core';
import BaseLayout from '../layouts/BaseLayout';
import { SEO } from '../utils/seo/SEO';

interface ProjectTemplateProps extends PageProps {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        description: string;
        url: string;
        category: string;
        tags: string[];
      };
      html: string;
    };
  };
}

export default function ProjectTemplate({ data }: ProjectTemplateProps) {
  const projectData = data.markdownRemark;

  return (
    <BaseLayout>
      <Container size="md" py="xl">
        <Stack style={{ gap: "var(--mantine-spacing-xl)" }}>
          <Title order={1}>{projectData.frontmatter.title}</Title>
          <Group>
            <Badge size="lg">{projectData.frontmatter.category}</Badge>
            {projectData.frontmatter.tags.map((tag, index) => (
              <Badge key={index} size="md" variant="outline">
                {tag}
              </Badge>
            ))}
          </Group>
          <Text size="lg">{projectData.frontmatter.description}</Text>
          {projectData.frontmatter.url && (
            <Text component="a" href={projectData.frontmatter.url} target="_blank" rel="noopener noreferrer">
              View Project →
            </Text>
          )}
          <div dangerouslySetInnerHTML={{ __html: projectData.html }} />
        </Stack>
      </Container>
    </BaseLayout>
  );
}

export function Head({ data }: ProjectTemplateProps) {
  const projectData = data.markdownRemark;
  
  return (
    <SEO
      title={projectData.frontmatter.title}
      description={projectData.frontmatter.description}
    />
  );
}

export const query = graphql`
  query ProjectQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        url
        category
        tags
      }
      html
    }
  }
`;
