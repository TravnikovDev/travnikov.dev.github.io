import React from "react";
import * as styles from "./WritingResource.module.css";

export default function WritingEditExample({ comparison = false }: { comparison?: boolean }) {
  return (
    <figure className={`${styles.example} ${comparison ? styles.comparison : ""}`}>
      <figcaption className={styles.exampleCaption}>An example edit</figcaption>
      <div className={styles.examplePair}>
        <div className={styles.draft}>
          <span className={styles.exampleLabel}>Before</span>
          <p><del>It is important to note that</del> the release was delayed <del>due to the fact that</del> two tests failed.</p>
        </div>
        <div className={styles.edited}>
          <span className={styles.exampleLabel}>After</span>
          <p>Two failed tests delayed the release.</p>
        </div>
      </div>
      <p className={styles.exampleNote}>Both versions give the same cause of the delay.</p>
    </figure>
  );
}
