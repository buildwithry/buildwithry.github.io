import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "Do I own the automation after you build it?",
    answer: "Yes. Everything is built inside your own GHL, n8n, or Make account. You get full access and ownership from day one — nothing is locked behind me.",
  },
  {
    question: "What if I already have a CRM set up?",
    answer: "That's the most common starting point. I audit what's already there, keep what works, and route around or replace what's causing the bottleneck instead of rebuilding from scratch.",
  },
  {
    question: "How long does a typical build take?",
    answer: "Typically 2–4 weeks depending on complexity and tool stack — a single voice agent moves faster than a multi-channel pipeline with several integrations.",
  },
  {
    question: "What happens if something breaks after handoff?",
    answer: "I document everything during handoff so your team can troubleshoot common issues. For anything deeper, I offer ongoing support if you want it — not required.",
  },
  {
    question: "Do you offer ongoing support or maintenance?",
    answer: "Yes, on request. Some clients want a one-time build and handoff; others want me monitoring and iterating on the system monthly. Both are fine — we scope it up front.",
  },
];

const FAQ = () => {
  const listRef = useRef<HTMLDivElement>(null);

  // Discrete fire-once reveal, same mechanism as Events.tsx / Process.tsx.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-faq-item]");
    if (!items || items.length === 0) return;

    gsap.set(items, { opacity: 0, y: 30 });

    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: listRef.current,
        start: "top 80%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="faq" className="py-32 px-6 sm:px-8 bg-[#08090a] hairline-top">
      <div className="max-w-[800px] mx-auto">
        <Reveal>
          <div className="mb-16 text-center">
            <span className="text-xs font-medium uppercase tracking-widest text-[#f1eadc] mb-2 block">
              Questions
            </span>
            <SplitHeading className="text-heading">
              Frequently asked.
            </SplitHeading>
          </div>
        </Reveal>

        <div ref={listRef} className="rounded-xl border border-[#23252a] bg-[#0f1011] overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                data-faq-item
                className="border-[#23252a] last:border-b-0 px-6"
              >
                <AccordionTrigger className="text-left text-base font-medium text-white hover:no-underline hover:text-[#f1eadc] py-5 [&>svg]:text-[#62666d] [&[data-state=open]>svg]:text-[#f1eadc]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#8a8f98] leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
