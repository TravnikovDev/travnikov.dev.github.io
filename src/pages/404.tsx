import * as React from "react";
import { HeadFC, Link, PageProps } from "gatsby";
import { Box, Title, Text, Button, Center, Stack } from "@mantine/core";
import BaseLayout from "../layouts/BaseLayout";
import { SEO } from "../utils/seo/SEO";

const NotFound = (_props: PageProps) => (
  <BaseLayout>
    <Center h="60vh">
      <Stack align="center" style={{ gap: "var(--mantine-spacing-md)" }}>
        <Title order={1} size="3rem">
          404: Page Not Found
        </Title>
        <Text
          size="lg"
          style={{ textAlign: "center", maxWidth: "500px" }}
        >
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </Text>
        <Box mt="md">
          <Button component={Link} to="/" size="lg">
            Go back home
          </Button>
        </Box>
      </Stack>
    </Center>
  </BaseLayout>
);

export default NotFound;

export const Head: HeadFC = () => <SEO title="404: Not Found" />;
