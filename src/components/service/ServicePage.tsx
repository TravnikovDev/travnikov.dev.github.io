import React, { useRef, useState } from "react";
import { Link } from "gatsby";
import BaseLayout from "../../layouts/BaseLayout";
import ThreeDBackground from "../3d/3dBackground";
import * as styles from "./ServicePage.module.css";

export type ServicePageProps = {
  /** short mono eyebrow, e.g. "AI Automation" */
  eyebrow: string;
  title: string;
  lead: string;
  /** optional mid-page section between the hero and the form */
  sectionTitle?: string;
  sectionBody?: string;
  form: {
    title: string;
    subtitle: string;
    /** third text field after Name + Work Email */
    thirdField: { name: string; label: string; placeholder: string; type?: string };
    textarea: { name: string; label: string; placeholder: string };
    submitLabel: string;
  };
  /** the other two services, for cross-linking the funnel */
  related: { label: string; href: string }[];
};

export default function ServicePage({
  eyebrow,
  title,
  lead,
  sectionTitle,
  sectionBody,
  form,
  related,
}: ServicePageProps) {
  // Formspree for now: it captures leads today without waiting on n8n, and
  // the endpoint is public by design so there is nothing to hide in a secret.
  // Set GATSBY_LEAD_WEBHOOK to move to the n8n webhook later without touching
  // this file. If both are absent the form falls back to mailto, which is what
  // it used to do unconditionally — and which silently loses leads on mobile
  // and for webmail users.
  const ENDPOINT =
    process.env.GATSBY_LEAD_WEBHOOK || "https://formspree.io/f/mvzebyqy";
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const startedAt = useRef(Date.now());

  const mailtoFallback = (f: {
    name: string;
    email: string;
    third: string;
    message: string;
  }) => {
    const lines = [
      `Name: ${f.name}`,
      `Email: ${f.email}`,
      `${form.thirdField.label}: ${f.third}`,
      ``,
      `${form.textarea.label}:`,
      f.message,
    ];
    window.location.href = `mailto:roman@travnikov.dev?subject=${encodeURIComponent(
      `${title} inquiry`
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);

    // bots fill hidden fields and submit instantly; humans do neither
    if (data.get("company_website")) return;
    if (Date.now() - startedAt.current < 2000) return;

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const third = String(data.get(form.thirdField.name) ?? "");
    const message = String(data.get(form.textarea.name) ?? "");

    // keys double as labels in the notification email, so they are written
    // for a human reading it on a phone, not for a schema
    const payload: Record<string, string> = {
      name,
      email,
      [form.thirdField.label]: third,
      [form.textarea.label]: message,
      service: title,
      page: typeof window !== "undefined" ? window.location.pathname : "",
      submittedAt: new Date().toISOString(),
      _subject: `${title} enquiry from ${name || "the site"}`,
    };

    if (!ENDPOINT) {
      mailtoFallback({ name, email, third, message });
      return;
    }

    setState("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // without this Formspree answers with a redirect to its own
          // thank-you page instead of JSON, and the visitor leaves the site
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          body?.errors?.[0]?.message ?? `Request failed (${res.status})`
        );
      }

      setState("sent");
      formEl.reset();

      // a submitted form is the only conversion this site has; count it
      const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void })
        .gtag;
      gtag?.("event", "generate_lead", {
        service: title,
        page: window.location.pathname,
      });
    } catch {
      setState("error");
    }
  };

  return (
    <BaseLayout>
      <ThreeDBackground />

      <main className={styles.page} data-sheet>
        <header className={styles.hero}>
          <Link to="/" className={styles.back}>
            ← Home
          </Link>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lead}>{lead}</p>
        </header>

        {sectionTitle && sectionBody && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
            <p className={styles.sectionBody}>{sectionBody}</p>
          </section>
        )}

        <section className={styles.formSection}>
          <form className={styles.formCard} onSubmit={onSubmit}>
            <h2 className={styles.formTitle}>{form.title}</h2>
            <p className={styles.formSubtitle}>{form.subtitle}</p>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Name</span>
              <input
                className={styles.input}
                name="name"
                placeholder="Your name"
                required
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Work email</span>
              <input
                className={styles.input}
                name="email"
                type="email"
                placeholder="you@company.com"
                required
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>{form.thirdField.label}</span>
              <input
                className={styles.input}
                name={form.thirdField.name}
                type={form.thirdField.type ?? "text"}
                placeholder={form.thirdField.placeholder}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>{form.textarea.label}</span>
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                name={form.textarea.name}
                placeholder={form.textarea.placeholder}
                rows={4}
              />
            </label>

            {/* honeypot — hidden from people, irresistible to bots */}
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className={styles.honeypot}
            />

            <button
              type="submit"
              className={styles.submit}
              disabled={state === "sending" || state === "sent"}
            >
              {state === "sending"
                ? "Sending…"
                : state === "sent"
                ? "Sent"
                : form.submitLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M1 7h11M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {state === "sent" && (
              <p className={styles.formNote} role="status">
                Thanks — that reached me. I reply to everything within a working
                day.
              </p>
            )}
            {state === "error" && (
              <p className={styles.formNoteError} role="alert">
                That did not go through. Email{" "}
                <a href="mailto:roman@travnikov.dev">roman@travnikov.dev</a>{" "}
                directly and it will reach me just the same.
              </p>
            )}
          </form>
        </section>

        <nav className={styles.related} aria-label="Other services">
          <span className={styles.relatedLabel}>Explore</span>
          {related.map((r) => (
            <Link key={r.href} to={r.href} className={styles.relatedLink}>
              {r.label}
            </Link>
          ))}
        </nav>
      </main>
    </BaseLayout>
  );
}
