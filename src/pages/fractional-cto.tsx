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

export default function FractionalCtoPage() {
  return (
    <BaseLayout>
      <Container size="lg" py="xl">
        <Stack gap="xl">
          <Box>
            <Title order={1} mb="sm">
              Fractional CTO
            </Title>
            <Text size="lg">
              I bridge business goals and engineering execution with clear
              strategy, hiring support, and technical leadership.
            </Text>
          </Box>

          <Divider />

          <Box>
            <Title order={2} mb="sm">
              My Philosophy
            </Title>
            <Text>
              Build small, validate fast, and scale only what proves its value.
              I focus on systems, teams, and the roadmap that keeps both
              aligned.
            </Text>
          </Box>

          <Paper withBorder radius="md" p="xl">
            <Stack gap="md">
              <Title order={3}>Discuss Your Vision</Title>
              <Text size="sm" c="dimmed">
                Share what you are building and where leadership gaps show up.
              </Text>
              <TextInput label="Name" placeholder="Your name" required />
              <TextInput
                label="Work Email"
                placeholder="you@company.com"
                type="email"
                required
              />
              <TextInput label="Company" placeholder="Company name" />
              <Textarea
                label="Current challenge"
                placeholder="Tell me about your team, product, and goals."
                minRows={4}
              />
              <Button type="submit">Start the conversation</Button>
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
      title="Fractional CTO"
      description="Fractional CTO services for startups. Strategy, mentorship, hiring, and delivery leadership aligned to business goals."
    />
  );
}
