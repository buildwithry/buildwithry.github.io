import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";

gsap.registerPlugin(ScrollTrigger);

// ARCH — Adrian's own process framework: Audit -> Route -> Connect -> Handoff.
const steps = [
  {
    letter: "A",
    title: "Audit",
    description:
      "Map what's actually happening today: every manual step, every dropped lead, every tool that doesn't talk to the others. No build starts until the gaps are named.",
  },
  {
    letter: "R",
    title: "Route",
    description:
      "Design the actual pipeline: which triggers fire, which conditions branch, where the AI agent hands off to a human. This is the blueprint before a single workflow gets built.",
  },
  {
    letter: "C",
    title: "Connect",
    description:
      "Build it. GHL, VAPI, n8n, Make, wired together and tested against real edge cases, not just the happy path. Typically 2-4 weeks depending on complexity and tool stack.",
  },
  {
    letter: "H",
    title: "Handoff",
    description:
      "Documentation, training, and a working system your team can actually run without you. You own it, not me.",
  },
];

// Interaction pattern ported from the live xenith-design.webflow.io "Our Process" section
// (confirmed via runtime probe): each row is title-only at rest; clicking a row (or its
// +/- icon) expands it to reveal the description, with the active row filling solid red
// (#e50102, Xenith's own brand color, confirmed via live computed-style read) — used here
// specifically for this ARCH active-state per user request, as an intentional exception
// to the site's usual cream-only accent rule.
const Process = () => {
  const stepsRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Discrete fire-once reveal, same mechanism as Events.tsx (build-analysis.md effect #12
  // pattern: start: "top 80%", once: true) — per-row stagger, not scroll-scrubbed.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rows = stepsRef.current?.querySelectorAll<HTMLElement>("[data-process-step]");
    if (!rows || rows.length === 0) return;

    gsap.set(rows, { opacity: 0, y: 30 });

    const tween = gsap.to(rows, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: stepsRef.current,
        start: "top 80%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="process" className="py-20 sm:py-32 px-4 sm:px-8 bg-[#08090a] hairline-top">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-10 sm:mb-16">
            <span className="text-xs font-medium uppercase tracking-widest text-[#f1eadc] mb-2 block">
              How I Work
            </span>
            <SplitHeading className="text-heading mb-4">
              The ARCH Framework.
            </SplitHeading>
            <p className="text-base sm:text-[19px] text-[#8a8f98] max-w-2xl leading-[1.61]">
              Every engagement runs through the same four stages: Audit, Route, Connect, Handoff.
            </p>
          </div>
        </Reveal>

        {/* Layout follows the user's own sketch: A (wide, top-left), R (wide, top-right),
            C (narrower, bottom-left), H (wide, bottom-right) — the big letter is the
            dominant visual per card rather than a small badge next to the title. */}
        <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {steps.map((step, index) => {
            const isOpen = openIndex === index;
            // A: cols 1-3, R: cols 1-2 (of remaining), C: narrower, H: wide — approximated
            // with a 5-col grid: A=3, R=2 (row 1) / C=2, H=3 (row 2).
            const spanClass =
              index === 0 ? "sm:col-span-3" :
              index === 1 ? "sm:col-span-2" :
              index === 2 ? "sm:col-span-2" :
              "sm:col-span-3";
            return (
              <button
                key={step.letter}
                type="button"
                data-process-step
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={`process-panel-${index}`}
                className={`text-left rounded-xl border p-6 transition-colors duration-300 ${spanClass} ${
                  isOpen
                    ? "bg-[#e50102] border-[#e50102]"
                    : "bg-[#0f1011] border-[#23252a] hover:border-[#383b3f]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-4xl font-medium tracking-tight ${
                      isOpen ? "text-white" : "text-white"
                    }`}
                  >
                    {step.letter}
                  </span>
                  <span
                    className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full border transition-colors duration-300 ${
                      isOpen
                        ? "border-white/30 text-white"
                        : "border-[#23252a] text-[#8a8f98]"
                    }`}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </div>

                <h3
                  className={`text-sm font-medium uppercase tracking-wider mt-4 ${
                    isOpen ? "text-white/70" : "text-[#62666d]"
                  }`}
                >
                  {step.title}
                </h3>

                <div
                  id={`process-panel-${index}`}
                  aria-hidden={!isOpen}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`text-sm leading-relaxed pt-4 ${
                        isOpen ? "text-white/90" : "text-[#8a8f98]"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
