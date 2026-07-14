import React from "react";
import ServicePage from "../components/service/ServicePage";
import { SEO } from "../utils/seo/SEO";

export default function ReactPerformanceConsultingPage() {
  return (
    <ServicePage
      eyebrow="Web Performance"
      title="React Performance Consulting"
      lead="I build scalable, sub-second React applications and Gatsby systems that convert faster and rank higher."
      sectionTitle="Performance Metrics"
      sectionBody="Core Web Vitals, Lighthouse, and real-user monitoring. I translate speed into measurable business outcomes."
      form={{
        title: "Audit My Architecture",
        subtitle:
          "Send the basics and I will outline quick wins plus the longer performance roadmap.",
        thirdField: {
          name: "website",
          label: "Website",
          placeholder: "https://example.com",
          type: "url",
        },
        textarea: {
          name: "goals",
          label: "Performance goals",
          placeholder: "Tell me where speed or SEO is hurting.",
        },
        submitLabel: "Request audit",
      }}
      related={[
        { label: "AI Automation", href: "/ai-automation-engineer" },
        { label: "Fractional CTO", href: "/fractional-cto" },
      ]}
    />
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
