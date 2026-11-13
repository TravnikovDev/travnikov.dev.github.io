import React from "react";
import { Link } from "gatsby";
import WritingEditExample from "./WritingEditExample";
import * as styles from "./WritingResource.module.css";

export default function FixAiWritingPromo() {
  return (
    <section className={styles.promo} aria-labelledby="writing-guide-title">
      <div>
        <p className={styles.meta}>A free editing guide by Roman Travnikov</p>
        <h2 id="writing-guide-title" className={styles.promoTitle}>Fix AI Writing</h2>
        <p className={styles.promoLead}>
          Give your AI draft a proper edit. Remove stock phrases without losing what you meant.
        </p>
        <Link to="/fix-ai-writing/" className={styles.primaryLink}>
          Get the free guide <span aria-hidden="true">↗</span>
        </Link>
        <p className={styles.small}>12-page PDF. 74 editing rules. No signup.</p>
      </div>
      <WritingEditExample />
    </section>
  );
}
