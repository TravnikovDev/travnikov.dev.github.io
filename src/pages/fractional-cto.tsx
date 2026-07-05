import React from "react";
import ServicePage from "../components/service/ServicePage";
import { SEO } from "../utils/seo/SEO";

export default function FractionalCtoPage() {
  return (
    <ServicePage
      eyebrow="Fractional CTO"
      title="Fractional CTO"
      lead="I bridge business goals and engineering execution with clear strategy, hiring support, and technical leadership."
      sectionTitle="My Philosophy"
      sectionBody="Build small, validate fast, and scale only what proves its value. I focus on systems, teams, and the roadmap that keeps both aligned."
      form={{
        title: "Discuss Your Vision",
        subtitle:
          "Share what you are building and where leadership gaps show up.",
        thirdField: {
          name: "company",
          label: "Company",
          placeholder: "Company name",
        },
        textarea: {
          name: "challenge",
          label: "Current challenge",
          placeholder: "Tell me about your team, product, and goals.",
        },
        submitLabel: "Start the conversation",
      }}
      related={[
        { label: "AI Automation", href: "/ai-automation-engineer" },
        { label: "Web Performance", href: "/react-performance-consulting" },
      ]}
    />
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
