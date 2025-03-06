import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import {
  Card,
  Image,
  Text,
  Group,
  Title,
  Container,
  Box,
  Stack,
  Divider,
} from "@mantine/core";
import BaseLayout from "../layouts/BaseLayout";
import { SEO } from "../utils/seo/SEO";

interface BlogPageProps extends PageProps {
  data: {
    // We'll use local content instead of Strapi for now
    // Fallback already included in component
  };
}

export default function BlogPage({ data }: BlogPageProps) {
  // Since we're not using Strapi currently, we'll default to placeholder content
  const articles: any[] = [];

  return (
    <BaseLayout>
      <Container size="lg" py="xl">
        <Box mb="xl">
          <Title order={1} mb="md">
            Blog
          </Title>
          <Text size="lg">
            Thoughts, insights, and experiences from my journey as a frontend
            developer.
          </Text>
        </Box>

        <Stack spacing="xl">
          {articles.length > 0
            ? articles.map((article) => {
                const date = new Date(article.publishedAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                );

                return (
                  <Link
                    key={article.id}
                    to={`/blog/${article.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                      <Group align="flex-start" gap="xl">
                        {article.image && (
                          <Image
                            src={article.image.publicURL}
                            width={200}
                            height={150}
                            alt={article.title}
                            radius="md"
                          />
                        )}
                        <Box>
                          <Text size="sm" c="dimmed" mb="xs">
                            {date}
                          </Text>
                          <Title order={3} mb="sm">
                            {article.title}
                          </Title>
                          <Text lineClamp={3}>{article.excerpt}</Text>
                        </Box>
                      </Group>
                    </Card>
                  </Link>
                );
              })
            : // Placeholder content when no articles exist yet
              [1, 2, 3, 4].map((i) => (
                <Card key={i} shadow="sm" padding="lg" radius="md" withBorder>
                  <Group align="flex-start" gap="xl">
                    <Box w={200} h={150} bg="gray.2" radius="md" />
                    <Box>
                      <Text size="sm" c="dimmed" mb="xs">
                        January 1, 2023
                      </Text>
                      <Title order={3} mb="sm">
                        Blog Post {i}
                      </Title>
                      <Text>
                        This is a placeholder for a blog post excerpt. Blog
                        posts will be loaded from Markdown files.
                      </Text>
                    </Box>
                  </Group>
                </Card>
              ))}
        </Stack>
      </Container>
    </BaseLayout>
  );
}

export function Head() {
  return (
    <SEO
      title="Blog"
      description="Read Roman Travnikov's blog posts about frontend development, technology trends, and software engineering best practices."
    />
  );
}

// Removed the Strapi query that was causing errors
// We can add a query for local markdown files later if needed
/*
export const query = graphql`
  query {
    allStrapiArticle {
      nodes {
        id
        title
        excerpt
        slug
        publishedAt
        image {
          publicURL
        }
      }
    }
  }
`;
*/
