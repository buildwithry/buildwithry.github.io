import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";
import ceceTanPhoto from "@/assets/HL EVENT/cece-tan-optimized.jpg";
import chrisDillonPhoto from "@/assets/HL EVENT/chris-dillon-optimized.jpg";
import mikeReimerPhoto from "@/assets/HL EVENT/mike-reimer-optimized.jpg";

gsap.registerPlugin(ScrollTrigger);

const eventPhotos = [
  {
    photo: ceceTanPhoto,
    name: "Cece Tan",
    role: "Founder of HL Accelerator",
    bio: "Celebrated as the first Filipina SaaS founder and a top HighLevel community leader in the APAC region.",
  },
  {
    photo: chrisDillonPhoto,
    name: "Chris Dillon",
    role: "Founder of The Marketing Autopilots",
    bio: "An expert on WhatsApp automation and conversational frameworks that help scale agencies to 7 figures.",
  },
  {
    photo: mikeReimerPhoto,
    name: "Mike Reimer",
    role: "Founder of CRM Pros",
    bio: "A prominent software entrepreneur known for proprietary commercial frameworks using AI voice agents.",
  },
];

// Not testimonials — people met at HighLevel/GHL conferences attended.
// Moved out of Experience.tsx into its own section per user request.
const Events = () => {
  const eventsRef = useRef<HTMLDivElement>(null);

  // Discrete fire-once reveal, ported from teardowns/2026-08-30-xenith-design-webflow-io
  // build-analysis.md effect #12 (paragraph reveal): `start: "top 80%", scrub: false` —
  // fires once when crossing the trigger point rather than scrubbing continuously with
  // scroll. Kept per-card stagger so cards still animate in one by one, just as a single
  // settled entrance instead of a value tied to live scroll position.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = eventsRef.current?.querySelectorAll<HTMLElement>("[data-event-card]");
    if (!cards || cards.length === 0) return;

    gsap.set(cards, { opacity: 0, y: 40 });

    const tween = gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: eventsRef.current,
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
    <section id="events" className="py-20 sm:py-32 px-4 sm:px-8 bg-[#08090a] hairline-top">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-10 sm:mb-16">
            <span className="text-xs font-medium uppercase tracking-widest text-[#f1eadc] mb-2 block">
              Community &amp; Events
            </span>
            <SplitHeading className="text-heading">
              Inside the HighLevel community.
            </SplitHeading>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-[#8a8f98] leading-[1.61]">
              Conversations and events that keep my client work close to the people shaping the HighLevel ecosystem.
            </p>
          </div>
        </Reveal>

        <div ref={eventsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {eventPhotos.map((person, index) => (
            <div key={index} data-event-card>
              <div className="aspect-[4/3] overflow-hidden rounded-lg border border-[#23252a] mb-4">
                <img
                  src={person.photo}
                  alt={`${person.name} — ${person.role}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-base font-medium text-white">{person.name}</h3>
              <div className="text-sm text-[#f1eadc] mb-2">{person.role}</div>
              <p className="text-sm text-[#8a8f98] leading-relaxed">{person.bio}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-[#62666d]">
          Photos from HighLevel community events. Appearances do not imply endorsement.
        </p>
      </div>
    </section>
  );
};

export default Events;
