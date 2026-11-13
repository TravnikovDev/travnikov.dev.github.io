import React, { useEffect, useRef, useState } from "react";
import * as styles from "./WritingResource.module.css";

export const GUIDE_URL = "/downloads/fix-ai-writing.md";
let guideRequest: Promise<string> | undefined;

function loadGuide() {
  if (!guideRequest) {
    guideRequest = fetch(GUIDE_URL)
      .then(response => {
        if (!response.ok) throw new Error("Guide download failed");
        return response.text();
      })
      .catch(error => {
        guideRequest = undefined;
        throw error;
      });
  }
  return guideRequest;
}

export function useGuideText() {
  const [text, setText] = useState<string>();
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    loadGuide().then(
      value => { if (active) setText(value); },
      () => { if (active) setFailed(true); }
    );
    return () => { active = false; };
  }, []);
  return { text, failed };
}

export default function GuideActions() {
  const { text, failed } = useGuideText();
  const [copied, setCopied] = useState(false);
  const [manualCopy, setManualCopy] = useState(false);
  const selection = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (manualCopy && selection.current) {
      selection.current.focus();
      selection.current.select();
    }
  }, [manualCopy]);

  const copy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setManualCopy(false);
    } catch {
      setManualCopy(true);
      setCopied(false);
    }
  };

  return (
    <div className={styles.guideActions}>
      <div className={styles.actionRow}>
        <a className={styles.primaryLink} href={GUIDE_URL} download="fix-ai-writing.md">
          Download Markdown <span aria-hidden="true">↓</span>
        </a>
        <button className={styles.copyButton} type="button" onClick={copy} disabled={!text}>
          {copied ? "Copied" : "Copy guide"}
        </button>
      </div>
      <p className={styles.copyStatus} role="status" aria-live="polite">
        {copied ? "Full guide copied, including the website credit." :
          failed ? "Could not load the text to copy. Use the download link to try again." : ""}
      </p>
      {manualCopy && (
        <div className={styles.manualCopy}>
          <p>Your browser blocked clipboard access. Copy the selected guide below.</p>
          <textarea ref={selection} aria-label="Guide text to copy" readOnly value={text} rows={8} />
        </div>
      )}
    </div>
  );
}
