import React from "react";
import * as styles from "./WritingResource.module.css";

export default function WritingEditExample() {
  return (
    <figure className={styles.example}>
      <figcaption className={styles.exampleCaption}>An example edit</figcaption>
      <div className={styles.draft}>
        <span className={styles.exampleLabel}>Draft</span>
        <p>It is important to note that the release was delayed due to the fact that two tests failed.</p>
      </div>
      <div className={styles.edited}>
        <span className={styles.exampleLabel}>Edited</span>
        <p>Two failed tests delayed the release.</p>
      </div>
      <p className={styles.exampleNote}>The cause stays. The filler goes.</p>
    </figure>
  );
}
