import React from "react";
import { Link } from "gatsby";
import { LandingSection } from "../landing/TimelineSection";
import WritingEditExample from "./WritingEditExample";
import * as styles from "./WritingResource.module.css";

export default function FixAiWritingPromo() {
  return (
    <LandingSection
      title={<span id="writing-guide-title">Fix AI Writing</span>}
      description="Give your AI draft a proper edit. Remove stock phrases without losing what you meant."
    >
      <div className={styles.promo}>
        <div>
          <p className={styles.promoLead}>A free editing guide by Roman Travnikov.</p>
          <Link to="/fix-ai-writing/" className={styles.promoLink}>
            Get the free guide <span aria-hidden="true">↗</span>
          </Link>
          <p className={styles.small}>12-page PDF. 74 editing rules. No signup.</p>
        </div>
        <WritingEditExample />
      </div>
    </LandingSection>
  );
}
