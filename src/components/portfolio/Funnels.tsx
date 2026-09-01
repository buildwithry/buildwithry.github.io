import { Suspense, lazy, useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";
import type { FunnelSample } from "@/components/portfolio/FunnelBarrel";

const FunnelBarrel = lazy(() => import("@/components/portfolio/FunnelBarrel"));

const funnels: FunnelSample[] = [
  {
    file: "sample-real-estate-B-tech-luxury-scroll.html",
    label: "Luxury Real Estate",
    tag: "Website",
    desc: "A tech-luxury property site with cinematic scroll choreography, parallax reveals, and an editorial type system.",
  },
  {
    file: "sample-moving-company-D-coastal-team.html",
    label: "Coastal Movers",
    tag: "Website",
    desc: "A warm, team-forward moving company site - process steps, crew photos, and a fast estimate request.",
  },
  {
    file: "sample-lawfirm-D-lora-gold-small-town-solo.html",
    label: "Solo Law Firm",
    tag: "Website",
    desc: "A small-town solo attorney site in gold + serif - trust, credentials, and a clear consultation CTA.",
  },
  {
    file: "sample-barbershop-E-brand-store.html",
    label: "Barbershop Brand",
    tag: "Website",
    desc: "A barbershop with a brand-store feel - bookings, product grid, and a confident street aesthetic.",
  },
  {
    file: "sample-auto-repair-B-european-import.html",
    label: "European Auto Import",
    tag: "Website",
    desc: "A specialist import garage - marque badges, service menu, and a precise, engineered visual language.",
  },
  {
    file: "sample-auto-repair-E-performance-tuning.html",
    label: "Performance Tuning",
    tag: "Website",
    desc: "A performance tuning shop - dyno numbers, build gallery, and an aggressive motorsport layout.",
  },
  {
    file: "sample-marketing-agency-C-brand-studio.html",
    label: "Brand Studio",
    tag: "Website",
    desc: "A marketing agency as a brand studio - case studies, a services rail, and bold editorial motion.",
  },
  {
    file: "sample-physical-therapy-E-cash-pay.html",
    label: "Cash-Pay Physical Therapy",
    tag: "Website",
    desc: "A cash-pay PT clinic - plain-English pricing, outcomes, and a low-friction first-visit booking.",
  },
  {
    file: "sample-solar-helios.html",
    label: "Commercial Solar",
    tag: "Website",
    desc: "A commercial solar developer - deployed megawatts, asset stats, and a site-survey request flow.",
  },
  {
    file: "sample-vacation-rental-management.html",
    label: "Vacation Rental Management",
    tag: "Website",
    desc: "A short-term rental manager - multi-step slider, owner earnings, and a property-onboarding CTA.",
  },
  {
    file: "sample-plastic-surgery-clinic.html",
    label: "Plastic Surgery Clinic",
    tag: "Website",
    desc: "A refined aesthetic clinic - consult-first messaging, procedure pathways, and a calm booking experience.",
  },
  {
    file: "sample-utility-contractor.html",
    label: "Utility Contractor",
    tag: "Website",
    desc: "A heavy utility contractor - divisions, safety record, and a request-for-proposal entry point.",
  },
];

const Funnels = () => {
  const barrelStageRef = useRef<HTMLDivElement>(null);
  const [shouldLoadBarrel, setShouldLoadBarrel] = useState(false);

  useEffect(() => {
    const stage = barrelStageRef.current;
    if (!stage || !("IntersectionObserver" in window)) {
      setShouldLoadBarrel(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoadBarrel(true);
        observer.disconnect();
      },
      { rootMargin: "500px 0px" }
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const handleOpen = (funnel: FunnelSample) => {
    window.open(`/funnels/${funnel.file}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="funnels" className="relative py-20 sm:py-32 px-4 sm:px-8 bg-[#08090a] hairline-top">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-10 sm:mb-16">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium uppercase tracking-widest text-[#f1eadc]">Live Funnels</span>
            </div>
            <SplitHeading className="text-heading mb-4">
              Funnel systems and landing pages.
            </SplitHeading>
            <p className="text-base sm:text-[19px] text-[#8a8f98] max-w-3xl leading-[1.61]">
              Full websites and complete funnel builds. Drag the reel and open any page live.
            </p>
          </div>
        </Reveal>

        <div ref={barrelStageRef} className="min-h-[440px] sm:min-h-[560px]">
          {shouldLoadBarrel ? (
            <Suspense
              fallback={
                <div className="flex min-h-[440px] items-center justify-center rounded-lg border border-[#23252a] text-sm text-[#8a8f98]">
                  Loading interactive funnel preview…
                </div>
              }
            >
              <FunnelBarrel funnels={funnels} onOpen={handleOpen} />
            </Suspense>
          ) : (
            <div className="flex min-h-[440px] items-center justify-center rounded-lg border border-[#23252a] text-sm text-[#8a8f98]">
              Interactive funnel preview loads as you approach it.
            </div>
          )}
        </div>

        <details className="mt-6 rounded-lg border border-[#23252a] bg-[#0f1011] px-5 py-4">
          <summary className="cursor-pointer text-sm font-medium text-[#d0d6e0]">
            Browse funnel demos as a list
          </summary>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {funnels.map((funnel) => (
              <li key={funnel.file}>
                <a
                  href={`/funnels/${funnel.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-md border border-[#23252a] px-3 py-2 text-sm text-[#d0d6e0] hover:border-[#383b3f] hover:text-white"
                >
                  <span>{funnel.label}</span>
                  <span className="text-xs text-[#8a8f98]">{funnel.tag}</span>
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
};

export default Funnels;
