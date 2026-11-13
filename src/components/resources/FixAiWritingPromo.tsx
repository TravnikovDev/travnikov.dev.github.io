import React from "react";
import { Link } from "gatsby";
import { LandingSection } from "../landing/TimelineSection";
import GuideActions from "./GuideActions";
import GuidePreview from "./GuidePreview";
import * as styles from "./WritingResource.module.css";

export default function FixAiWritingPromo() {
  return (
    <div className={styles.promoContainer}>
      <LandingSection
        title={<span id="writing-guide-title">Fix AI Writing</span>}
        description="Editing instructions for the LLM you already use."
        compact
        align="left"
      >
        <div className={styles.promo}>
          <div>
            <p className={styles.promoLead}>Attach this guide alongside your draft and ask the model to apply its rules.</p>
            <GuideActions />
            <p className={styles.small}>74 editing rules. Free Markdown file.</p>
            <p className={styles.author}>By <a href="https://travnikov.dev/">Roman Travnikov</a></p>
            <Link to="/fix-ai-writing/" className={styles.textLink}>How to use it <span aria-hidden="true">↗</span></Link>
          </div>
          <GuidePreview />
        </div>
      </LandingSection>
    </div>
  );
}
