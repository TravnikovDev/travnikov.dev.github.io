import React from "react";
import { Link } from "gatsby";
import { LandingSection } from "../landing/TimelineSection";
import GuideActions from "./GuideActions";
import WritingEditExample from "./WritingEditExample";
import * as styles from "./WritingResource.module.css";

export default function FixAiWritingPromo() {
  return (
    <LandingSection
      title={<span id="writing-guide-title">Fix AI Writing</span>}
      description="Give AI drafts a proper edit without losing what you meant."
    >
      <div className={styles.promoContainer}>
        <WritingEditExample comparison />
        <div className={styles.promoActions}>
          <p className={styles.promoLead}>Add the guide to your LLM conversation alongside your draft.</p>
          <GuideActions />
          <div className={styles.promoDetails}>
            <p>74 editing rules. No signup.</p>
            <Link to="/fix-ai-writing/" className={styles.textLink}>How to use it <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>
    </LandingSection>
  );
}
