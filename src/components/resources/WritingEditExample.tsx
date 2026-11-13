import React from "react";
import * as styles from "./WritingResource.module.css";

export default function WritingEditExample({ variant = "release" }: { variant?: "release" | "uncertainty" }) {
  const uncertainty = variant === "uncertainty";
  return (
    <figure className={`${styles.example} ${styles.comparison}`}>
      <figcaption className={styles.exampleCaption}>{uncertainty ? "Preserve uncertainty" : "An example edit"}</figcaption>
      <div className={styles.examplePair}>
        <div className={styles.draft}>
          <span className={styles.exampleLabel}>Before</span>
          {uncertainty ? (
            <p>The onboarding change <del>has the potential to</del> reduce drop-off, although the sample is small.</p>
          ) : (
            <p><del>It is important to note that</del> the release was delayed <del>due to the fact that</del> two tests failed.</p>
          )}
        </div>
        <div className={styles.edited}>
          <span className={styles.exampleLabel}>After</span>
          <p>{uncertainty ? "The onboarding change may reduce drop-off, but the sample is small." : "Two failed tests delayed the release."}</p>
        </div>
      </div>
      <p className={styles.exampleNote}>{uncertainty ? "The possible benefit and the small sample both stay." : "Both versions give the same cause of the delay."}</p>
    </figure>
  );
}
