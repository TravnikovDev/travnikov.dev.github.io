import React from "react";
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
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `${form.thirdField.label}: ${data.get(form.thirdField.name) || ""}`,
      ``,
      `${form.textarea.label}:`,
      `${data.get(form.textarea.name) || ""}`,
    ];
    window.location.href = `mailto:roman@travnikov.dev?subject=${encodeURIComponent(
      `${title} — inquiry`
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <BaseLayout>
      <ThreeDBackground />

      <main className={styles.page}>
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

            <button type="submit" className={styles.submit}>
              {form.submitLabel}
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
