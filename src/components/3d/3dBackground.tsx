import React, { useEffect, useState } from 'react';
import * as styles from './3dBackground.module.css';

// The reading surface and static aura render on the server. Three.js is an
// enhancement, downloaded only after the page's initial resources have loaded.
function ThreeDBackground() {
  const [Canvas, setCanvas] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reducedMotion.matches || connection?.saveData) return;
    let cancelled = false;
    let idle = 0;
    let timer = 0;
    const load = () => {
      import('./AuraCanvas').then(module => {
        if (!cancelled) setCanvas(() => module.default);
      }).catch(() => {
        // The static aura remains usable if an enhancement chunk fails.
      });
    };
    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idle = window.requestIdleCallback(load, { timeout: 2000 });
      } else {
        timer = window.setTimeout(load, 1000);
      }
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', schedule);
      if (idle) window.cancelIdleCallback?.(idle);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className={styles.backgroundContainer} aria-hidden="true">
      {Canvas && <Canvas />}
    </div>
  );
}

export default React.memo(ThreeDBackground);
