import React from "react";
import { GUIDE_URL, useGuideText } from "./GuideActions";
import * as styles from "./WritingResource.module.css";

export default function GuidePreview() {
  const { text, failed } = useGuideText();
  let excerpt: string | undefined;
  if (text) {
    const blocks = text.trim().split(/\r?\n\s*\r?\n/);
    const core = blocks.findIndex(block => block === "## Core standard");
    excerpt = [blocks[0], blocks[core], blocks[core + 1]].join("\n\n");
  }

  return (
    <figure className={styles.filePreview}>
      <figcaption className={styles.fileHeader}>
        <span>fix-ai-writing.md</span>
        <span className={styles.fileType}>Markdown</span>
      </figcaption>
      <pre className={styles.fileContent} aria-label="Excerpt from the original guide">
        <code>{excerpt || (failed ? "Open the original Markdown using the link below." : "Loading the guide excerpt...")}</code>
      </pre>
      <a className={styles.fileLink} href={GUIDE_URL}>Read the full Markdown <span aria-hidden="true">↗</span></a>
    </figure>
  );
}
