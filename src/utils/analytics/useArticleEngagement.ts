import { useEffect, useRef } from "react";

type Gtag = (...args: unknown[]) => void;

const track = (event: string, params: Record<string, unknown>) => {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", event, params);
};

/**
 * Reading engagement for a single article.
 *
 * A page view says the article was opened, which says almost nothing about
 * whether it was worth writing. These do say something:
 *
 * - article_50 / article_complete: did anyone actually read it
 * - source_click: did the research carry enough weight to follow
 *
 * Each fires at most once per page view. Everything is a no-op while gtag is
 * absent, so this costs nothing until analytics is switched on, and the
 * scroll listener is passive and rAF-throttled so it cannot jank a scroll.
 */
export function useArticleEngagement(slug: string) {
  const fired = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const once = (name: string) => {
      if (fired.current.has(name)) return;
      fired.current.add(name);
      track(name, { slug });
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        if (scrollable <= 0) return;
        const pct = (window.scrollY / scrollable) * 100;
        if (pct >= 50) once("article_50");
        // 90 rather than 100: the footer and the read-next block mean the true
        // bottom often goes unreached even by someone who finished the piece
        if (pct >= 90) once("article_complete");
      });
    };

    // a source click is an outbound link followed from inside the article
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("a");
      if (!el) return;
      const href = el.getAttribute("href") ?? "";
      if (!/^https?:\/\//i.test(href)) return;
      if (href.includes("travnikov.dev")) return;
      track("source_click", { slug, href });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, [slug]);
}
