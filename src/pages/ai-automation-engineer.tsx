import React from "react";
import ServicePage from "../components/service/ServicePage";
import { SEO } from "../utils/seo/SEO";

export default function AiAutomationEngineerPage() {
  return (
    <ServicePage
      eyebrow="AI Automation"
      title="AI Automation Engineer"
      lead="I replace manual operations with intelligent n8n workflows and AI agents that connect your data, tools, and teams."
      sectionTitle="The Automation Stack"
      sectionBody="n8n orchestration + OpenAI reasoning + Supabase persistence. The goal is a reliable, auditable system that saves hours every week."
      form={{
        title: "Book a Workflow Audit",
        subtitle:
          "Share a few details and I will propose the highest-impact automation opportunities.",
        thirdField: {
          name: "company",
          label: "Company",
          placeholder: "Company name",
        },
        textarea: {
          name: "process",
          label: "Process to automate",
          placeholder: "Describe the workflow, tools, and pain points.",
        },
        submitLabel: "Request audit",
      }}
      related={[
        { label: "Web Performance", href: "/react-performance-consulting" },
        { label: "Fractional CTO", href: "/fractional-cto" },
      ]}
    />
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
