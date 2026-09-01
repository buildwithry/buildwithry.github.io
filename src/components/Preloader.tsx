import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Preloader, ported from the mechanism observed on xenith-design.webflow.io: a
// full-screen flex-centered overlay (high z-index) with a static brand title that
// stays on screen the whole time, plus a second word beside it that fades/cycles
// through a short list before the page reveals. Title and cycling words are this
// site's own — Xenith's preloader text is that site's brand copy, not reused here,
// only the structure/timing (static name + fading secondary word).
export const PRELOADER_DONE_EVENT = "preloader:done";

const TITLE = "Build with Ry";
const CYCLE_WORDS = ["Automate", "Deploy", "Scale"];
const WORD_DURATION = 700; // ms each cycling word is shown
const FINAL_WORD_DELAY = 350; // aligns Scale's visible hold with the earlier words

const Preloader = () => {
  const [visible, setVisible] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const barTopRef = useRef<HTMLDivElement>(null);
  const barBottomRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
          setVisible(false);
        },
      });

      // Drawer exit, ported from xenith-design.webflow.io's .preloader: the
      // content (text + hairlines) fades first, then the whole solid panel
      // slides up past the top edge — translate3d(0, -150%, 0) there, so it
      // fully clears rather than stopping flush at -100%.
      tl.to([barTopRef.current, contentRef.current], {
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
      })
        // The bottom hairline stays lit and brightens — it becomes the drawer's
        // leading edge, the only thing that reads against an equally dark page.
        .to(
          barBottomRef.current,
          { backgroundColor: "#f1eadc", opacity: 1, duration: 0.3, ease: "power2.out" },
          0
        )
        .to(
          overlayRef.current,
          {
            yPercent: -150,
            duration: 1.6,
            ease: "power2.inOut",
          },
          "-=0.1"
        )
        // Hero letters fire when the panel has visually LEFT the screen, not when
        // the tween formally ends. The slide travels to -150% but clears the
        // viewport at -100% — with power2.inOut that is ~59% through, so the last
        // ~0.65s is the panel already off-screen still easing out. Waiting for
        // onComplete is what read as a long dead beat before the title appeared.
        .call(
          () => window.dispatchEvent(new Event(PRELOADER_DONE_EVENT)),
          undefined,
          "-=0.65"
        );
    }, FINAL_WORD_DELAY);

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
      <div ref={barBottomRef} className="absolute bottom-0 left-0 right-0 h-px bg-[#23252a]" />

      <div ref={contentRef} className="flex items-baseline gap-3">
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
