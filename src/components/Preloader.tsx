import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Preloader, ported from the mechanism observed on xenith-design.webflow.io: a
// full-screen flex-centered overlay (high z-index) with a static brand title that
// stays on screen the whole time, plus a second word beside it that fades/cycles
// through a short list before the page reveals. Title and cycling words are this
// site's own — Xenith's preloader text is that site's brand copy, not reused here,
// only the structure/timing (static name + fading secondary word).
const TITLE = "Build with Ry";
const CYCLE_WORDS = ["Automate", "Deploy", "Scale"];
const WORD_DURATION = 300; // ms each cycling word is shown

const Preloader = () => {
  const [visible, setVisible] = useState(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return !reducedMotion && sessionStorage.getItem("build-with-ry-preloader-seen") !== "true";
  });
  const [wordIndex, setWordIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const barTopRef = useRef<HTMLDivElement>(null);
  const barBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;

    if (wordIndex < CYCLE_WORDS.length - 1) {
      const t = setTimeout(() => setWordIndex((i) => i + 1), WORD_DURATION);
      return () => clearTimeout(t);
    }

    // Last word held briefly, then the whole overlay + top/bottom bars animate out.
    const exitDelay = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("build-with-ry-preloader-seen", "true");
          setVisible(false);
        },
      });

      tl.to([barTopRef.current, barBottomRef.current], {
        scaleX: 0,
        duration: 0.5,
        ease: "power3.inOut",
      }).to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.15"
      );
    }, 250);

    return () => clearTimeout(exitDelay);
  }, [visible, wordIndex]);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="fixed inset-0 z-[600] flex items-center justify-center bg-[#08090a] pointer-events-none"
    >
      <div ref={barTopRef} className="absolute top-0 left-0 right-0 h-px bg-[#23252a] origin-left" />
      <div ref={barBottomRef} className="absolute bottom-0 left-0 right-0 h-px bg-[#23252a] origin-right" />

      <div className="flex items-baseline gap-3">
        <span className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
          {TITLE}
        </span>
        <span
          key={wordIndex}
          className="text-2xl sm:text-3xl font-medium tracking-tight text-[#62666d] animate-[preloader-fade_0.75s_ease-in-out]"
        >
          {CYCLE_WORDS[wordIndex]}
        </span>
      </div>
    </div>
  );
};

export default Preloader;
