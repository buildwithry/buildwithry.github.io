import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Workflow, Database, Globe, Mic, Code2, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: JSX.Element;
  title: string;
  subhead: string;
  badge: string;
  bullets: string[];
}

const services: Service[] = [
  {
    icon: <Mic className="h-8 w-8 stroke-[1.5]" />,
    title: "AI Conversational Agents",
    subhead: "Voice and chat agents that qualify and book.",
    badge: "Answers every time",
    bullets: [
      "Voice agents that answer calls and book appointments 24/7",
      "Chat agents across SMS, Instagram, Messenger, and web",
      "Qualifies leads with real conversation, not a script",
      "Syncs every conversation straight into your CRM",
    ],
  },
  {
    icon: <Workflow className="h-8 w-8 stroke-[1.5]" />,
    title: "GHL Automation",
    subhead: "Workflows that run while you sleep.",
    badge: "Runs 24/7",
    bullets: [
      "Follow-ups that fire while you sleep",
      "Leads move themselves through the pipeline",
      "AI handles the busywork, you handle the calls",
      "One agency, many sub-accounts, one system",
    ],
  },
  {
    icon: <Database className="h-8 w-8 stroke-[1.5]" />,
    title: "CRM Setup",
    subhead: "A system your team will actually use.",
    badge: "Two clicks to anything",
    bullets: [
      "A sub-account your team operates without complaining",
      "Every contact tagged and findable in two clicks",
      "Pipelines that match how you actually sell",
      "New clients onboarded without a single dropped loop",
    ],
  },
  {
    icon: <Globe className="h-8 w-8 stroke-[1.5]" />,
    title: "Website",
    subhead: "Fast, custom, and built to convert.",
    badge: "Code you keep",
    bullets: [
      "Built fast in code, not slow in a builder",
      "Looks right on every device with no fiddling",
      "Talks to your GHL or runs on its own",
      "Code you can hand to a real developer",
    ],
  },
  {
    icon: <Code2 className="h-8 w-8 stroke-[1.5]" />,
    title: "Coded Funnels",
    subhead: "Custom-built pages that convert.",
    badge: "No template ceiling",
    bullets: [
      "Checkout flows that finish, not abandon",
      "No template ceiling on what you can ship",
      "Hosted on GHL or runs on its own",
      "Pixel control a page builder can't give you",
    ],
  },
];

const Services = () => {
  const [active, setActive] = useState(0);
  const count = services.length;
  const sectionRef = useRef<HTMLElement>(null);
  const manualRef = useRef(false);
  const activeRef = useRef(active);
  activeRef.current = active;

  const goTo = (index: number) => {
    manualRef.current = true;
    setActive(index);
  };
  const go = (delta: number) => goTo((activeRef.current + delta + count) % count);

  // Scroll-driven auto-advance: pin the section and step through cards as the
  // user scrolls, so the carousel opens on "AI Conversational Agents" (index 0)
  // and steps forward automatically instead of sitting static.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${(count - 1) * window.innerHeight * 0.6}`,
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const index = Math.min(count - 1, Math.round(self.progress * (count - 1)));
        if (manualRef.current) {
          // Resume auto-advance once scroll progress catches up to wherever a
          // manual click/dot selection left off, instead of locking forever.
          if (index === activeRef.current) manualRef.current = false;
          return;
        }
        setActive(index);
      },
    });

    return () => trigger.kill();
  }, [count]);

  return (
    <section ref={sectionRef} id="services" className="relative py-32 px-6 sm:px-8 bg-[#08090a] hairline-top overflow-x-hidden">
      <div className="max-w-[1200px] mx-auto relative text-center">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-widest text-[#f1eadc] mb-3 block">
            Core Competencies
          </span>
          <SplitHeading className="text-heading mb-4">
            One system, built around your bottleneck.
          </SplitHeading>
          <p className="text-lg sm:text-[19px] text-[#8a8f98] mb-16">
            Start with missed calls, slow follow-up, a messy CRM, or a funnel that underperforms. I map the gap and connect the right tools.
          </p>
        </Reveal>

        <div className="relative h-[460px] flex items-center justify-center overflow-visible">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous service"
            className="absolute left-0 sm:left-4 z-20 w-11 h-11 rounded-full bg-[#0f1011] border border-[#23252a] flex items-center justify-center text-white hover:border-[#383b3f] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next service"
            className="absolute right-0 sm:right-4 z-20 w-11 h-11 rounded-full bg-[#0f1011] border border-[#23252a] flex items-center justify-center text-white hover:border-[#383b3f] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Stacked cards: active card centered and solid, siblings fully visible beside it, faded */}
          {services.map((service, index) => {
            const offset = (index - active + count) % count;
            const signedOffset = offset > count / 2 ? offset - count : offset;
            const distance = Math.abs(signedOffset);
            const isActive = signedOffset === 0;

            if (distance > 1) return null;

            return (
              <div
                key={service.title}
                onClick={() => !isActive && goTo(index)}
                onKeyDown={(event) => {
                  if (!isActive && (event.key === "Enter" || event.key === " ")) {
                    event.preventDefault();
                    goTo(index);
                    window.requestAnimationFrame(() => {
                      document.getElementById(`service-title-${index}`)?.focus();
                    });
                  }
                }}
                role={isActive ? undefined : "button"}
                tabIndex={isActive ? -1 : 0}
                aria-label={isActive ? undefined : `Show ${service.title}`}
                className="absolute w-[380px] max-w-[80vw] rounded-2xl bg-[#0f1011] border border-[#23252a] transition-all duration-500 ease-out"
                style={{
                  transform: `translateX(${signedOffset * 300}px) scale(${isActive ? 1 : 0.92})`,
                  zIndex: 10 - distance,
                  opacity: isActive ? 1 : 0.45,
                  boxShadow: isActive
                    ? "0 24px 60px -20px rgba(228,242,34,0.12)"
                    : "0 12px 30px -14px rgba(0,0,0,0.4)",
                  cursor: isActive ? "default" : "pointer",
                }}
              >
                <div className="p-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#f1eadc]/10 flex items-center justify-center text-[#f1eadc] mb-5">
                    {service.icon}
                  </div>
                  <span className="text-xs font-medium text-[#f1eadc] tracking-wider mb-2">
                    0{index + 1} / 0{count}
                  </span>
                  <h3
                    id={`service-title-${index}`}
                    tabIndex={isActive ? -1 : undefined}
                    className="text-2xl font-medium tracking-tight text-white mb-3"
                  >
                    {service.title}
                  </h3>
                  <p className="text-[#8a8f98] mb-5">{service.subhead}</p>
                  <span className="inline-block text-xs font-medium uppercase tracking-wide text-[#f1eadc] bg-[#f1eadc]/10 rounded-full px-4 py-1.5 mb-6">
                    {service.badge}
                  </span>

                  <ul className="space-y-3 text-left w-full">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-sm text-[#d0d6e0]">
                        <Check className="w-4 h-4 text-[#f1eadc] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {services.map((service, index) => (
            <button
              key={service.title}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to ${service.title}`}
              className={`h-2 rounded-full transition-all ${
                index === active ? "w-6 bg-[#f1eadc]" : "w-2 bg-[#383b3f] hover:bg-[#62666d]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
