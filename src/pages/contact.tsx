import React from "react";
import ServicePage from "../components/service/ServicePage";
import { SEO } from "../utils/seo/SEO";

// Same aura page + honest mailto composer as the service pages. The old
// standalone form only console.logged and showed a fake "Message Sent!".
export default function ContactPage() {
  return (
    <ServicePage
      eyebrow="Contact"
      title="Get in Touch"
      lead="Have a project in mind? Tell me what you are building and where it hurts — I reply to every message."
      form={{
        title: "Send a Message",
        subtitle:
          "This opens your mail client with the message pre-filled, addressed to roman@travnikov.dev.",
        thirdField: {
          name: "subject",
          label: "Subject",
          placeholder: "What is this about?",
        },
        textarea: {
          name: "message",
          label: "Message",
          placeholder: "Your message",
        },
        submitLabel: "Send message",
      }}
      related={[
        { label: "AI Automation", href: "/ai-automation-engineer" },
        { label: "Web Performance", href: "/react-performance-consulting" },
        { label: "Fractional CTO", href: "/fractional-cto" },
      ]}
    />
  );
}

export function Head() {
  return (
    <SEO
      title="Contact"
      description="Get in touch with Roman Travnikov for project inquiries or professional opportunities."
    />
  );
}
