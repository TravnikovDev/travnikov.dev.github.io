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

export default function AiAutomationEngineerPage() {
  return (
    <BaseLayout>
      <Container size="lg" py="xl">
        <Stack gap="xl">
          <Box>
            <Title order={1} mb="sm">
              AI Automation Engineer
            </Title>
            <Text size="lg">
              I replace manual operations with intelligent n8n workflows and AI
              agents that connect your data, tools, and teams.
            </Text>
          </Box>

          <Divider />

          <Box>
            <Title order={2} mb="sm">
              The Automation Stack
            </Title>
            <Text>
              n8n orchestration + OpenAI reasoning + Supabase persistence. The
              goal is a reliable, auditable system that saves hours every week.
            </Text>
          </Box>

          <Paper withBorder radius="md" p="xl">
            <Stack gap="md">
              <Title order={3}>Book a Workflow Audit</Title>
              <Text size="sm" c="dimmed">
                Share a few details and I will propose the highest-impact
                automation opportunities.
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
                label="Process to automate"
                placeholder="Describe the workflow, tools, and pain points."
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
      title="AI Automation Engineer"
      description="AI automation services for startups. Replace manual operations with n8n workflows, AI agents, and reliable data pipelines."
    />
  );
}
