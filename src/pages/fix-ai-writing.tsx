import React from "react";
import { Link, PageProps } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import ThreeDBackground from "../components/3d/3dBackground";
import WritingEditExample from "../components/resources/WritingEditExample";
import { SEO } from "../utils/seo/SEO";
import * as styles from "../components/resources/WritingResource.module.css";

const pdf = "/downloads/fix-ai-writing.pdf";

export default function FixAiWritingPage() {
  return (
    <BaseLayout>
      <ThreeDBackground />
      <article className={styles.page}>
        <header className={styles.hero}>
          <div>
            <p className={styles.meta}>A free editing guide by Roman Travnikov</p>
            <h1 className={styles.title}>Fix AI Writing</h1>
            <p className={styles.lead}>Keep the meaning. Give the draft a proper edit.</p>
            <p className={styles.description}>
              AI-generated text can sound fluent while saying very little. This guide gives you
              74 rules for cutting stock phrasing, with checks for factual accuracy throughout.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryLink} href={pdf} download="fix-ai-writing.pdf" type="application/pdf">
                Download the free PDF <span aria-hidden="true">↓</span>
              </a>
              <a className={styles.textLink} href={pdf} type="application/pdf">Read it first</a>
            </div>
            <p className={styles.small}>12 pages. No email address required.</p>
          </div>
          <figure className={styles.preview}>
            <a className={styles.previewLink} href={pdf} aria-label="Read Fix AI Writing as a PDF">
              <img
                src="/downloads/fix-ai-writing-preview.webp"
                alt="The first page of Fix AI Writing, showing its editing standard and Roman Travnikov's linked credit."
                width={703}
                height={994}
                fetchPriority="high"
              />
            </a>
            <figcaption>The opening page of the guide.</figcaption>
          </figure>
        </header>

        <section className={styles.exampleSection} aria-labelledby="example-title">
          <div>
            <h2 id="example-title" className={styles.sectionTitle}>Start with the sentence.</h2>
            <p className={styles.sectionCopy}>
              Remove the words that delay the point. Keep the cause of the delay exactly as stated.
              An edit should improve the wording without inventing a different story.
            </p>
          </div>
          <WritingEditExample />
        </section>

        <section className={styles.contents} aria-labelledby="contents-title">
          <h2 id="contents-title" className={styles.sectionTitle}>What the guide covers</h2>
          <ul className={styles.ruleList}>
            <li>
              <h3>Cut stock phrasing</h3>
              <p>Find empty introductions, inflated claims, and repeated sentence patterns. Replace them with the actual point.</p>
            </li>
            <li>
              <h3>Keep the author's meaning</h3>
              <p>Retain the intended voice. Preserve uncertainty when the evidence calls for it.</p>
            </li>
            <li>
              <h3>Check factual claims</h3>
              <p>Check that a citation supports its sentence. Keep genuine evidence separate from invented experience.</p>
            </li>
            <li>
              <h3>Review the finished draft</h3>
              <p>Check the full text after rewriting. The guide also explains the limits of AI-detector scores.</p>
            </li>
          </ul>
          <p className={styles.sectionCopy}>
            The PDF works as an editing reference or as instructions supplied alongside a draft.
            It includes examples of patterns to remove. Detector results depend on the checker and its input;
            this guide makes no promise of a particular score.
          </p>
          <div className={`${styles.actions} ${styles.closingActions}`}>
            <a className={styles.primaryLink} href={pdf} download="fix-ai-writing.pdf" type="application/pdf">
              Download Fix AI Writing <span aria-hidden="true">↓</span>
            </a>
            <Link className={styles.textLink} to="/blog/">Read my articles</Link>
          </div>
        </section>
      </article>
    </BaseLayout>
  );
}

export function Head({ location }: PageProps) {
  return (
    <SEO
      pathname={location.pathname}
      title="Fix AI Writing: Free PDF Editing Guide"
      description="Edit AI-generated text with Roman Travnikov's free 12-page guide. 74 rules for direct prose, factual accuracy, and source checking. No signup."
    />
  );
}
