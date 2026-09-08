import claudeLogo from "@/assets/marquee-icons/claude.svg";
import dockerLogo from "@/assets/marquee-icons/docker.svg";
import highLevelLogo from "@/assets/highlevel-icon.png";
import makeLogo from "@/assets/marquee-icons/make.svg";
import n8nLogo from "@/assets/marquee-icons/n8n.svg";
import openAiLogo from "@/assets/marquee-transparent/openai.png";
import postgresLogo from "@/assets/marquee-icons/postgresql.svg";
import postmanLogo from "@/assets/marquee-icons/postman.svg";
import stripeLogo from "@/assets/marquee-icons/stripe.svg";
import supabaseLogo from "@/assets/marquee-icons/supabase.svg";
import vapiLogo from "@/assets/marquee-transparent/vapi.png";
import vsCodeLogo from "@/assets/marquee-transparent/vscode.png";
import zapierLogo from "@/assets/marquee-icons/zapier.svg";

type ToolLogo = {
  name: string;
  src: string;
  light?: boolean;
};

const toolLogos: ToolLogo[] = [
  { name: "GoHighLevel", src: highLevelLogo },
  { name: "n8n", src: n8nLogo },
  { name: "Make", src: makeLogo },
  { name: "Zapier", src: zapierLogo },
  { name: "Vapi", src: vapiLogo },
  { name: "OpenAI", src: openAiLogo, light: true },
  { name: "Claude", src: claudeLogo },
  { name: "Supabase", src: supabaseLogo },
  { name: "PostgreSQL", src: postgresLogo },
  { name: "Stripe", src: stripeLogo },
  { name: "Docker", src: dockerLogo },
  { name: "Postman", src: postmanLogo },
  { name: "VS Code", src: vsCodeLogo },
];

const copies = [0, 1, 2];

export default function SteppedLogoMarquee() {
  return (
    <section aria-label="Tools I build with" className="overflow-hidden border-b border-[#23252a] bg-[#08090a] py-3 sm:py-4">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
        <div className="relative mx-auto w-[640px] max-w-full overflow-hidden py-2 md:w-[860px]">
          <div className="stepped-tool-marquee-track relative left-1/2 flex w-max items-center gap-3">
            {copies.map((copy) => (
              <div key={copy} aria-hidden={copy !== 1} className="flex items-center gap-3">
                {toolLogos.map((tool) => (
                  <div key={`${copy}-${tool.name}`} className="flex size-28 shrink-0 items-center justify-center">
                    <img
                      src={tool.src}
                      alt={copy === 1 ? `${tool.name} logo` : ""}
                      aria-hidden={copy !== 1}
                      className={`h-24 w-24 max-w-full object-contain ${tool.light ? "brightness-0 invert" : ""}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes stepped-tool-marquee-step {
          0%, 4% { transform: translateX(-1732px); }
          7.69%, 11.69% { transform: translateX(-1608px); }
          15.38%, 19.38% { transform: translateX(-1484px); }
          23.07%, 27.07% { transform: translateX(-1360px); }
          30.76%, 34.76% { transform: translateX(-1236px); }
          38.45%, 42.45% { transform: translateX(-1112px); }
          46.14%, 50.14% { transform: translateX(-988px); }
          53.83%, 57.83% { transform: translateX(-864px); }
          61.52%, 65.52% { transform: translateX(-740px); }
          69.21%, 73.21% { transform: translateX(-616px); }
          76.9%, 80.9% { transform: translateX(-492px); }
          84.59%, 88.59% { transform: translateX(-368px); }
          92.28%, 96.28% { transform: translateX(-244px); }
          100% { transform: translateX(-120px); }
        }

        .stepped-tool-marquee-track {
          animation: stepped-tool-marquee-step 36s ease-in-out infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .stepped-tool-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
