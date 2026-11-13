import React from "react";
import { Link, PageProps } from "gatsby";
import BaseLayout from "../layouts/BaseLayout";
import ThreeDBackground from "../components/3d/3dBackground";
import WritingEditExample from "../components/resources/WritingEditExample";
import GuideActions, { GUIDE_URL } from "../components/resources/GuideActions";
import GuidePreview from "../components/resources/GuidePreview";
import { SEO } from "../utils/seo/SEO";
import * as styles from "../components/resources/WritingResource.module.css";

export default function FixAiWritingPage() {
  return (
    <BaseLayout>
      <ThreeDBackground />
      <article className={styles.page}>
        <header className={styles.hero}>
          <div>
            <p className={styles.meta}>Markdown instructions for your LLM</p>
            <h1 className={styles.title}>Fix AI Writing</h1>
            <p className={styles.lead}>Attach the guide. Add your draft. Ask for an edit.</p>
            <p className={styles.description}>
              The original writing guide: 74 editing rules, examples, and checks for factual accuracy.
              Download it as Markdown or copy the full text into your LLM tool.
            </p>
            <GuideActions />
            <p className={styles.small}>Original file with a website credit. No signup.</p>
            <p className={styles.author}>By <a href="https://travnikov.dev/">Roman Travnikov</a></p>
          </div>
          <GuidePreview />
        </header>

        <section className={styles.usage} aria-labelledby="usage-title">
          <h2 id="usage-title" className={styles.sectionTitle}>Use it with a draft</h2>
          <ol className={styles.steps}>
            <li>Download the Markdown file and attach it to your LLM conversation, or copy the guide into the conversation.</li>
            <li>Add your draft and give a specific editing request. For example:</li>
          </ol>
          <blockquote className={styles.usagePrompt}>Rewrite my draft using the attached writing guide. Preserve the meaning and factual qualifications. Return the revised text.</blockquote>
          <p className={styles.sectionCopy}>Review the result against your source. Check facts, citations, and any change in meaning before publishing.</p>
        </section>

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
            The Markdown file contains the full original guide, including examples of patterns to remove. Detector results depend on the checker and its input;
            this guide makes no promise of a particular score.
          </p>
          <div className={`${styles.actions} ${styles.closingActions}`}>
            <a className={styles.primaryLink} href={GUIDE_URL} download="fix-ai-writing.md">
              Download Markdown <span aria-hidden="true">↓</span>
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
      title="Fix AI Writing: Markdown Guide for LLMs"
      description="Download or copy Roman Travnikov's original writing guide for your LLM. 74 editing rules for direct prose and factual accuracy. No signup."
    />
  );
}
