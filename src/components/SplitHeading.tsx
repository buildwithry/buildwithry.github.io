import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface SplitHeadingProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/**
 * Word-split scroll reveal, ported from teardowns/2026-08-30-xenith-design-webflow-io.
 * Source: source/js/webflow.schunk.a728c0101afcb770.beautified.js — getSplitElements(),
 * defaultSplitClass('word'). Runtime ScrollTrigger config (build-analysis.md, effects #7-11):
 * start: "clamp(top 70%)", end: "clamp(bottom top)", scrub: false (discrete, fires once).
 * GSAP's SplitText is a paid Club plugin; split-type (MIT) is the open substitute.
 */
const SplitHeading = ({ children, as: Tag = "h2", className }: SplitHeadingProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const split = new SplitType(el, { types: "words", wordClass: "split-word" });

    gsap.set(split.words, { opacity: 0, y: "0.4em" });

    const tween = gsap.to(split.words, {
      opacity: 1,
      y: "0em",
      duration: 0.6,
      stagger: 0.04,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 70%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default SplitHeading;
