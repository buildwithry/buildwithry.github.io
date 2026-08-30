import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Play } from "lucide-react";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";

const Testimonials = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section id="testimonials" className="py-24 px-6 sm:px-8 bg-[#08090a] hairline-top overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-widest text-[#f1eadc] mb-2 block">
              Client Feedback
            </span>
            <SplitHeading className="text-heading mb-4">
              Testimonials.
            </SplitHeading>
            <p className="text-lg sm:text-[19px] text-[#8a8f98]">
              A client walkthrough of a system in use.
            </p>
          </div>
        </Reveal>

        {/* Video testimonial — same play-button hover reveal as the Case Study cards
            (Projects.tsx), rather than sitting in the auto-scroll slider. */}
        <Reveal delay={0.05}>
          <div className="mb-16 flex justify-center">
            <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
              <button
                onClick={() => setVideoOpen(true)}
                className="group relative w-full max-w-[280px] overflow-hidden rounded-lg cursor-pointer"
              >
                <div className="relative aspect-[9/16] overflow-hidden bg-black">
                  <img
                    src="/videos/ghl-wizard-testimonial-poster.jpg"
                    alt="Client video testimonial"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 bg-[#f1eadc] text-[#08090a] flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 ml-0.5 fill-current" />
                    </div>
                  </div>
                </div>
                <div className="pt-2 text-xs font-medium text-[#8a8f98] uppercase tracking-wider">
                  Video Testimonial
                </div>
              </button>

              <DialogContent className="max-w-md p-2 bg-[#08090a] border border-[#23252a]">
                <DialogTitle className="sr-only">Client video testimonial</DialogTitle>
                <video
                  src="/videos/ghl-wizard-testimonial.mp4"
                  poster="/videos/ghl-wizard-testimonial-poster.jpg"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="w-full h-auto rounded-md"
                />
              </DialogContent>
            </Dialog>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonials;
