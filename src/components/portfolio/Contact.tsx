import { useEffect, useRef } from "react";
import { ArrowUpRight, Calendar, Mail, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  // Scrub-linked reveal, ported from teardowns/2026-08-30-xenith-design-webflow-io
  // build-analysis.md — same scrub pattern as effects #3/#5/#6 (scrub: 0.8, tied directly to scroll)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ctaRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 1, y: 60 });

    const tween = gsap.to(el, {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 100%",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  // Double independent scrub, ported from Xenith's About section (build-analysis.md
  // effects #5/#6): two separate ScrollTrigger tweens on the same scroll range, each
  // driving a different child at its own rate — heading and subtext move independently
  // rather than as one locked block, off the same scroll span as the CTA reveal above.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heading = headingRef.current;
    const subtext = subtextRef.current;
    if (!heading || !subtext) return;

    const headingTween = gsap.to(heading, {
      y: -24,
      ease: "none",
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 100%",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    const subtextTween = gsap.to(subtext, {
      y: -8,
      ease: "none",
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 100%",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    return () => {
      headingTween.scrollTrigger?.kill();
      headingTween.kill();
      subtextTween.scrollTrigger?.kill();
      subtextTween.kill();
    };
  }, []);

  return (
    <footer id="contact" className="bg-[#08090a] text-white pt-20 sm:pt-32 pb-10 sm:pb-12 px-4 sm:px-8 hairline-top">
      <div className="max-w-[1200px] mx-auto">
        {/* Main CTA Block — wider vertical rhythm ported from Xenith's Contact/CTA section
            (layout-manifest.json: y:15461, h:990 — split CTA/details layout, already matched structurally) */}
        <div ref={ctaRef} className="grid lg:grid-cols-12 gap-10 sm:gap-12 pb-16 sm:pb-24 border-b border-[#23252a] items-start">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-medium uppercase tracking-widest text-[#f1eadc] block">
                Start a conversation
              </span>
              <div ref={headingRef}>
                <SplitHeading className="text-heading">
                  Let&apos;s stop leads from slipping through.
                </SplitHeading>
              </div>
              <p ref={subtextRef} className="text-base sm:text-xl text-[#8a8f98] leading-[1.61] max-w-xl">
                Tell me where leads stall or work gets repeated. I&apos;ll map the next step and recommend the smallest useful build.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4">
                <a
                  href="https://calendly.com/buildwithry/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full sm:w-auto text-base py-3.5 px-5 sm:px-7 group"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a 30-minute fit call</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="mailto:buildwithry@gmail.com"
                  className="btn-ghost w-full sm:w-auto text-base py-3.5 px-4 sm:px-6"
                >
                  <Mail className="w-4 h-4 mr-1.5" />
                  <span>buildwithry@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Direct Verification & Channels Grid (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="card-surface p-6">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="w-5 h-5 text-[#f1eadc]" />
                  <span className="font-medium text-sm tracking-tight text-white">
                    HighLevel Certified Administrator
                  </span>
                </div>
                <p className="text-xs text-[#8a8f98] leading-relaxed mb-4">
                  Officially certified for HighLevel CRM architecture, custom funnel development, and sub-account optimization.
                </p>
                <a
                  href="https://directory.gohighlevel.com/pila/certified-admins/adrian-agdan?from=badge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#f1eadc] hover:underline"
                >
                  <span>View HighLevel Directory Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Direct Social / Platform Channels */}
              <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-3 pt-2">
                <a
                  href="https://www.upwork.com/freelancers/~018dab48b65b2c0233"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-md border border-[#23252a] bg-[#0f1011] hover:border-[#383b3f] transition-colors flex items-center gap-3 group"
                >
                  <img
                    src="/lovable-uploads/9f747b14-dd4b-4a75-a1c1-86eb6e38c503.png"
                    alt="Upwork"
                    className="h-6 w-6 object-contain"
                  />
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-[#f1eadc] transition-colors">Upwork</div>
                    <div className="text-[11px] text-[#8a8f98]">Top Rated</div>
                  </div>
                </a>

                <a
                  href="https://www.onlinejobs.ph/jobseekers/info/1611430"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-md border border-[#23252a] bg-[#0f1011] hover:border-[#383b3f] transition-colors flex items-center gap-3 group"
                >
                  <img
                    src="/lovable-uploads/aaf7be47-a9c5-4bf6-9986-5f137ce5cfb4.png"
                    alt="OnlineJobs.ph"
                    className="h-6 w-6 object-contain"
                  />
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-[#f1eadc] transition-colors">OnlineJobs</div>
                    <div className="text-[11px] text-[#8a8f98]">Verified ID</div>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/adrianryan-/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-md border border-[#23252a] bg-[#0f1011] hover:border-[#383b3f] transition-colors flex items-center gap-3 group"
                >
                  <img
                    src="/lovable-uploads/034df8e8-1c76-419e-9cc9-373df97b9259.png"
                    alt="LinkedIn"
                    className="h-6 w-6 object-contain"
                  />
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-[#f1eadc] transition-colors">LinkedIn</div>
                    <div className="text-[11px] text-[#8a8f98]">Connect</div>
                  </div>
                </a>

                <a
                  href="mailto:buildwithry@gmail.com"
                  className="p-4 rounded-md border border-[#23252a] bg-[#0f1011] hover:border-[#383b3f] transition-colors flex items-center gap-3 group"
                >
                  <img
                    src="/lovable-uploads/adcf350d-7554-4ebd-a80b-8287232b45ea.png"
                    alt="Email"
                    className="h-6 w-6 object-contain"
                  />
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-[#f1eadc] transition-colors">Direct Mail</div>
                    <div className="text-[11px] text-[#8a8f98]">buildwithry@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>
        </div>

        {/* Footer Terminal Row */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8a8f98]">
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-white tracking-wider text-sm">BUILD WITH RY</span>
            <span>• Adrian Agdan Portfolio</span>
          </div>

          <div>
            <span>© {new Date().getFullYear()} Build with RY. AI automation and CRM systems.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
