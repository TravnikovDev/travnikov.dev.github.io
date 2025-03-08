import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Image, Title, Text, Stack, Container, Group, Badge, Box, Divider } from '@mantine/core';
import BaseLayout from '../layouts/BaseLayout';
import { SEO } from '../utils/seo/SEO';

interface BlogTemplateProps extends PageProps {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        date: string;
        category: string;
        tags: string[];
        author: string;
      };
      html: string;
    };
  };
}

export default function BlogTemplate({ data }: BlogTemplateProps) {
  const articleData = data.markdownRemark;
  const date = new Date(articleData.frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <BaseLayout>
      <Container size="md" py="xl">
        <Stack spacing="xl">
          <Title order={1}>{articleData.frontmatter.title}</Title>
          <Group>
            <Text size="sm" color="dimmed">
              By {articleData.frontmatter.author} • {date}
            </Text>
            <Badge size="lg">{articleData.frontmatter.category}</Badge>
          </Group>
          <Divider />
          <div dangerouslySetInnerHTML={{ __html: articleData.html }} />
          <Divider my="xl" />
          <Group>
            {articleData.frontmatter.tags.map((tag, index) => (
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

export function Head({ data }: BlogTemplateProps) {
  const articleData = data.markdownRemark;
  
  return (
    <SEO
      title={articleData.frontmatter.title}
      description={articleData.html.substring(0, 160)}
    />
  );
}

export const query = graphql`
  query BlogPostQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        date
        category
        tags
        author
      }
      html
    }
  }
`;
