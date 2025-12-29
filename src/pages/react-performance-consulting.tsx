import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import BaseLayout from "../layouts/BaseLayout";
import { SEO } from "../utils/seo/SEO";

export default function ReactPerformanceConsultingPage() {
  return (
    <BaseLayout>
      <Container size="lg" py="xl">
        <Stack gap="xl">
          <Box>
            <Title order={1} mb="sm">
              React Performance Consulting
            </Title>
            <Text size="lg">
              I build scalable, sub-second React applications and Gatsby systems
              that convert faster and rank higher.
            </Text>
          </Box>

          <Divider />

          <Box>
            <Title order={2} mb="sm">
              Performance Metrics
            </Title>
            <Text>
              Core Web Vitals, Lighthouse, and real-user monitoring. We
              translate speed into measurable business outcomes.
            </Text>
          </Box>

          <Paper withBorder radius="md" p="xl">
            <Stack gap="md">
              <Title order={3}>Audit My Architecture</Title>
              <Text size="sm" c="dimmed">
                Send the basics and I will outline quick wins plus the longer
                performance roadmap.
              </Text>
              <TextInput label="Name" placeholder="Your name" required />
              <TextInput
                label="Work Email"
                placeholder="you@company.com"
                type="email"
                required
              />
              <TextInput label="Website" placeholder="https://example.com" />
              <Textarea
                label="Performance goals"
                placeholder="Tell me where speed or SEO is hurting."
                minRows={4}
              />
              <Button type="submit">Request audit</Button>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </BaseLayout>
  );
}

export function Head() {
  return (
    <SEO
      title="React Performance Consulting"
      description="Web performance consulting for React and Gatsby. Improve Core Web Vitals, Lighthouse scores, and conversion speed."
    />
  );
}
