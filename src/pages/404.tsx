import * as React from "react"
import { HeadFC, Link, PageProps } from "gatsby"
import { Box, Title, Text, Button, Center, Stack } from "@mantine/core"
import BaseLayout from "../layouts/BaseLayout"
import { SEO } from "../utils/seo/SEO"

const NotFound = (_props: PageProps) => (
  <BaseLayout>
    <Center h="60vh">
      <Stack align="center" spacing="md">
        <Title order={1} size="h1">404</Title>
        <Title order={2} size="h3">Page Not Found</Title>
        <Text size="lg" align="center" maw={500}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </Text>
        <Box mt="md">
          <Button component={Link} to="/" size="lg">
            Back to Home
          </Button>
        </Box>
      </Stack>
    </Center>
  </BaseLayout>
)

export default NotFound

export const Head: HeadFC = () => <SEO title="404: Not Found" />
