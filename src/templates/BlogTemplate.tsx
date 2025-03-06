import React from 'react';
import { PageProps } from 'gatsby';
import { Image, Title, Text, Stack, Container, Group, Badge, Box, Divider } from '@mantine/core';
import BaseLayout from '../layouts/BaseLayout';
import { SEO } from '../utils/seo/SEO';

// This component is a template for blog posts
// Currently it's not being used as we've removed Strapi integration
// It will be updated when we implement local markdown files

interface BlogTemplateProps extends PageProps {
  data?: {
    // Will be populated later when we implement local markdown files
  };
}

export default function BlogTemplate({ data, pageContext }: BlogTemplateProps) {
  // For now, we'll use placeholder data
  const articleData = {
    title: "Sample Blog Post",
    content: "<p>This is a placeholder for blog post content. This template will be updated to work with Markdown files.</p>",
    publishedAt: new Date().toISOString(),
    category: "Frontend",
    tags: ["React", "TypeScript", "Web Development"],
    author: {
      name: "Roman Travnikov"
    }
  };
  
  const date = new Date(articleData.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <BaseLayout>
      <Container size="md" py="xl">
        <Stack spacing="xl">
          <Title order={1}>{articleData.title}</Title>
          <Group>
            <Text size="sm" color="dimmed">
              By {articleData.author?.name || 'Roman Travnikov'} • {date}
            </Text>
            <Badge size="lg">{articleData.category}</Badge>
          </Group>
          <Divider />
          <div dangerouslySetInnerHTML={{ __html: articleData.content }} />
          <Divider my="xl" />
          <Group>
            {articleData.tags.map((tag, index) => (
              <Badge key={index} size="md" variant="outline">
                {tag}
              </Badge>
            ))}
          </Group>
        </Stack>
      </Container>
    </BaseLayout>
  );
}

export function Head() {
  const articleData = {
    title: "Sample Blog Post",
    content: "This is a placeholder for blog post content."
  };
  
  return (
    <SEO
      title={articleData.title}
      description={articleData.content.substring(0, 160)}
    />
  );
}

// Removed the Strapi GraphQL query
// Will be replaced with local markdown query later
/*
export const query = graphql`
  query ArticleQuery($id: String!) {
    strapiArticle(id: { eq: $id }) {
      title
      content
      image {
        publicURL
      }
      category
      tags
      publishedAt
      author {
        name
      }
    }
  }
`;
*/