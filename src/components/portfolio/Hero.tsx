import { ArrowRight, Calendar, ShieldCheck, CheckCircle2 } from "lucide-react";
import adrianPhoto from "/lovable-uploads/892fb2d8-1fb5-4b9c-9831-7db3e194f5e9.png";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 px-6 sm:px-8 bg-gradient-to-b from-[#f2f5f9] via-[#f7f9fc] to-white dark:from-[#0b0c16] dark:via-[#0f0f1c] dark:to-[#0f0f1c] flex items-center">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Top Eyebrow */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#000d10] dark:bg-white text-white dark:text-[#000d10] text-xs font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bc7155]" />
            HighLevel Certified Admin
          </span>
          <span className="text-sm font-medium text-[#8e8e95]">
            AI Voice Architecture • CRM Automation • Lead Systems
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Main Statement (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="display-hero text-[#000d10] dark:text-white">
              I build AI voice agents &amp; CRM automation that qualify, book, and never sleep.
            </h1>

            <p className="text-lg sm:text-[19px] leading-[1.65] text-[#8e8e95] dark:text-[#a5a5b0] max-w-2xl">
              HighLevel Certified Admin specializing in <strong className="text-[#000d10] dark:text-white font-semibold">AI voice agents (VAPI, Retell)</strong>, <strong className="text-[#000d10] dark:text-white font-semibold">GoHighLevel</strong>, and <strong className="text-[#000d10] dark:text-white font-semibold">n8n / Make</strong> to capture leads, book appointments, and sync your CRM 24/7.
            </p>

            {/* CTAs Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const element = document.querySelector("#contact");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="btn-pill-clay group"
              >
                <span>Work With Me</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => window.open("https://calendly.com/buildwithry/30min", "_blank")}
                className="btn-pill-ghost group"
              >
                <Calendar className="w-4 h-4 text-[#8e8e95] group-hover:text-current transition-colors" />
                <span>Book Strategy Call</span>
              </button>
            </div>

            {/* Performance Metrics with Hairline Dividers */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-[#d5d3d4] dark:border-white/10">
              <div>
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#000d10] dark:text-white">
                  500+
                </div>
                <div className="text-sm font-medium text-[#8e8e95] mt-1">
                  Hours Saved
                </div>
              </div>
              <div className="border-l border-[#d5d3d4] dark:border-white/10 pl-6">
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#000d10] dark:text-white">
                  95%
                </div>
                <div className="text-sm font-medium text-[#8e8e95] mt-1">
                  Error Reduction
                </div>
              </div>
              <div className="border-l border-[#d5d3d4] dark:border-white/10 pl-6">
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#000d10] dark:text-white">
                  $2M+
                </div>
                <div className="text-sm font-medium text-[#8e8e95] mt-1">
                  Revenue Impact
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px]">
              {/* Image Frame with Architectural 0px Corners & 1px Hairline */}
              <div className="relative bg-white dark:bg-[#151623] border border-[#d5d3d4] dark:border-white/15 p-3">
                <div className="overflow-hidden bg-[#edf1f7] dark:bg-[#000d10]">
                  <img
                    src={adrianPhoto}
                    alt="Adrian Agdan - Automation Specialist"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* HighLevel Certified Directory Badge */}
                <div className="mt-3 pt-3 border-t border-[#d5d3d4] dark:border-white/10 flex items-center justify-between">
                  <a
                    href="https://directory.gohighlevel.com/pila/certified-admins/adrian-agdan?from=badge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#000d10] dark:text-white hover:text-[#bc7155] dark:hover:text-[#bc7155] transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#bc7155]" />
                    <span>Verified HighLevel Admin</span>
                  </a>
                  <span className="text-[11px] font-mono text-[#8e8e95] uppercase">
                    ID #PILA-CERTIFIED
                  </span>
                </div>
              </div>

              {/* Sub-status Strip */}
              <div className="mt-3 py-2 px-4 bg-[#000d10] dark:bg-white text-white dark:text-[#000d10] flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#bc7155]" />
                  Available for Enterprise &amp; Agency Projects
                </span>
                <span className="font-mono text-[10px] text-[#8e8e95]">2026 ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
