import { ArrowUpRight, Calendar, Mail, ShieldCheck } from "lucide-react";

const Contact = () => {
  return (
    <footer id="contact" className="bg-[#000d10] text-white pt-24 pb-12 px-6 sm:px-8 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto">
        {/* Main CTA Block */}
        <div className="grid lg:grid-cols-12 gap-12 pb-20 border-b border-white/15 items-start">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#bc7155] block">
              Initiate Project
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Let&apos;s Build Together.
            </h2>
            <p className="text-lg sm:text-xl text-[#8e8e95] leading-[1.61] max-w-xl">
              Ready to deploy resilient AI voice agents, streamline GoHighLevel operations, or automate multi-channel pipelines?
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => window.open("https://calendly.com/buildwithry/30min", "_blank")}
                className="btn-pill-clay text-base py-3.5 px-7 group"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule a 30-Min Strategy Call</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <a
                href="mailto:buildwithry@gmail.com"
                className="btn-pill-ghost border-white/30 text-white hover:bg-white hover:text-[#000d10] text-base py-3.5 px-6"
              >
                <Mail className="w-4 h-4 mr-1.5" />
                <span>buildwithry@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Direct Verification & Channels Grid (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 border border-white/15 bg-[#151623]">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-5 h-5 text-[#bc7155]" />
                <span className="font-bold text-sm tracking-tight text-white">
                  HighLevel Certified Administrator
                </span>
              </div>
              <p className="text-xs text-[#8e8e95] leading-relaxed mb-4">
                Officially certified for HighLevel CRM architecture, custom funnel development, and sub-account optimization.
              </p>
              <a
                href="https://directory.gohighlevel.com/pila/certified-admins/adrian-agdan?from=badge"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#bc7155] hover:underline"
              >
                <span>View HighLevel Directory Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Direct Social / Platform Channels */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href="https://www.upwork.com/freelancers/~018dab48b65b2c0233"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-white/10 bg-[#0f0f1c] hover:border-white/40 transition-colors flex items-center gap-3 group"
              >
                <img
                  src="/lovable-uploads/9f747b14-dd4b-4a75-a1c1-86eb6e38c503.png"
                  alt="Upwork"
                  className="h-6 w-6 object-contain"
                />
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-[#bc7155] transition-colors">Upwork</div>
                  <div className="text-[11px] text-[#8e8e95]">Top Rated</div>
                </div>
              </a>

              <a
                href="https://www.onlinejobs.ph/jobseekers/info/1611430"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-white/10 bg-[#0f0f1c] hover:border-white/40 transition-colors flex items-center gap-3 group"
              >
                <img
                  src="/lovable-uploads/aaf7be47-a9c5-4bf6-9986-5f137ce5cfb4.png"
                  alt="OnlineJobs.ph"
                  className="h-6 w-6 object-contain"
                />
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-[#bc7155] transition-colors">OnlineJobs</div>
                  <div className="text-[11px] text-[#8e8e95]">Verified ID</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/adrianryan-/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-white/10 bg-[#0f0f1c] hover:border-white/40 transition-colors flex items-center gap-3 group"
              >
                <img
                  src="/lovable-uploads/034df8e8-1c76-419e-9cc9-373df97b9259.png"
                  alt="LinkedIn"
                  className="h-6 w-6 object-contain"
                />
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-[#bc7155] transition-colors">LinkedIn</div>
                  <div className="text-[11px] text-[#8e8e95]">Connect</div>
                </div>
              </a>

              <a
                href="mailto:buildwithry@gmail.com"
                className="p-4 border border-white/10 bg-[#0f0f1c] hover:border-white/40 transition-colors flex items-center gap-3 group"
              >
                <img
                  src="/lovable-uploads/adcf350d-7554-4ebd-a80b-8287232b45ea.png"
                  alt="Email"
                  className="h-6 w-6 object-contain"
                />
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-[#bc7155] transition-colors">Direct Mail</div>
                  <div className="text-[11px] text-[#8e8e95]">buildwithry@</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Terminal Row */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8e8e95]">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-white tracking-wider text-sm">BUILD WITH RY</span>
            <span>• Adrian Agdan Portfolio</span>
          </div>

          <div>
            <span>© {new Date().getFullYear()} All rights reserved. Precision Automation &amp; AI Systems.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
