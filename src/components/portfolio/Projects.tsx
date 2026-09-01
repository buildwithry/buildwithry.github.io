import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Eye, Play, ArrowRight, Sparkles } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";

gsap.registerPlugin(ScrollTrigger);

import zapierCaseStudy from "/lovable-uploads/2f07a1c7-8827-4169-9c4d-6353aa824503.png";
import makeCaseStudy from "/lovable-uploads/833c006f-8a7a-4522-8686-83e73cd9afa2.png";
import n8nCaseStudy from "/lovable-uploads/7d1106cf-f77a-469f-9c81-5dbbcf6626a8.png";
import ghlCaseStudy from "/lovable-uploads/0382c638-b3db-4b63-806e-a772fbaeb008.png";

const vapiThumbnail = "/lovable-uploads/vapi-ai-receptionist.jpg";
const asmrThumbnail = "/lovable-uploads/asmr-ai-video-creator-thumbnail.png";
const metaReceptionistThumbnail = "/lovable-uploads/ai-meta-receptionist-v3.png";
const ghlConversationAiThumbnail = "/lovable-uploads/ghl-conversation-ai-ava.jpg";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  category: string;
  client: string;
  problem: string;
  solution: string;
  automationImage: string;
  platform: string;
  detailedWorkflow: string[];
  videoUrl?: string;
  videoFileUrl?: string;
  captionFileUrl?: string;
  sampleLinks?: { label: string; url: string }[];
  isFeatured?: boolean;
}

const CaseStudyVideo = ({ src, captions, poster, title }: { src: string; captions?: string; poster: string; title: string }) => (
  <video
    src={src}
    poster={poster}
    className="block w-full aspect-[640/285] bg-[#08090a] object-contain"
    controls
    playsInline
    autoPlay
    preload="metadata"
    aria-label={title}
    onLoadedMetadata={(event) => {
      event.currentTarget.defaultPlaybackRate = 1.5;
      event.currentTarget.playbackRate = 1.5;
      // The dialog opens from the card click, so this remains a user-initiated
      // playback request while avoiding an extra click on the video controls.
      void event.currentTarget.play().catch(() => undefined);
    }}
  >
    {captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
  </video>
);

const projects: ProjectItem[] = [
  {
    id: "vapi-receptionist",
    title: "VAPI AI Voice Receptionist",
    description: "Service Business: A voice AI receptionist that answers calls 24/7, qualifies leads, books appointments, and syncs everything into GoHighLevel in real time.",
    technologies: ["GoHighLevel", "n8n", "VAPI", "Supabase", "Claude Code"],
    features: ["24/7 AI voice call handling", "Real-time lead capture into GHL", "Appointment booking via voice", "Conversation logs stored in Supabase"],
    category: "Voice AI",
    client: "Service Business",
    problem: "Missed calls outside business hours and slow lead response were costing the business qualified appointments and revenue.",
    solution: "Built a VAPI voice agent connected to n8n workflows, GoHighLevel CRM, and a Supabase backend to handle inbound calls, qualify leads, and book appointments automatically.",
    automationImage: vapiThumbnail,
    platform: "VAPI + n8n + GHL + Supabase",
    videoUrl: "https://kommodo.ai/recordings/XxGUQuRANUup1LGh0Tg9?onlyRecording=1",
    videoFileUrl: "/videos/vapi-ai-receptionist-demo-web.mp4",
    captionFileUrl: "/videos/vapi-ai-receptionist-demo.vtt",
    detailedWorkflow: ["Inbound call routed to VAPI AI receptionist", "AI greets caller and qualifies the inquiry", "n8n webhook triggered with structured call data", "Contact created or updated in GoHighLevel", "Appointment booked into GHL calendar via voice", "Conversation transcript stored in Supabase", "Follow-up SMS/email sequence triggered in GHL", "Refined prompts and integrations for production reliability"],
    isFeatured: true,
  },
  {
    id: "meta-receptionist",
    title: "AI Meta Receptionist (IG & FB)",
    description: "Dermatology Fellowship: An AI receptionist for Instagram and Facebook that reads comments and DMs, replies like a human, extracts contact details, and pushes qualified leads into the GHL pipeline automatically.",
    technologies: ["GoHighLevel", "n8n", "Instagram Graph API", "Facebook Graph API", "OpenAI", "Slack"],
    features: ["Auto-detects IG/FB comment and DM leads", "Human-sounding personalized replies in 5–20 seconds", "Extracts phone/email even with typos", "Auto-moves leads through CRM pipeline stages"],
    category: "Social Media AI",
    client: "Dermatology Fellowship",
    problem: "Social media leads from Instagram and Facebook comments and DMs were slipping through the cracks. Coordinators had to manually read every message, chase contact details, and create CRM records by hand.",
    solution: "Built an AI social media receptionist on n8n and GoHighLevel that monitors Meta comments and messages, responds with tailored human-like replies, cleans and extracts contact info, creates opportunities, and escalates qualified leads through pipeline stages.",
    automationImage: metaReceptionistThumbnail,
    platform: "GHL + n8n + Meta APIs",
    videoUrl: "https://kommodo.ai/recordings/0n2i09stXxdQADTRfDgV?onlyRecording=1",
    videoFileUrl: "/videos/meta-receptionist-demo-web.mp4",
    captionFileUrl: "/videos/meta-receptionist-demo.vtt",
    detailedWorkflow: [
      "Monitors Instagram and Facebook comments and direct messages",
      "AI classifies intent and identifies interested leads",
      "Sends a tailored, human-sounding reply within 5–20 seconds",
      "Extracts phone numbers and emails, correcting common typos",
      "Creates or updates the contact and opportunity in GoHighLevel",
      "Moves qualified leads through the correct pipeline stage automatically",
      "Knowledge base of business context powers accurate AI answers",
      "Automation logs push real-time Slack alerts on errors or API limits"
    ]
  },
  {
    id: "ghl-agent-ava",
    title: "GHL Conversation AI \"Agent AVA\"",
    description: "Multi-Channel Business: HighLevel's native Conversation AI agent (Ava) deployed across SMS, Instagram, Messenger, and web chat to talk to every lead 24/7, qualify them, and book the appointment before they lose interest.",
    technologies: ["GoHighLevel", "Conversation AI", "SMS", "Instagram", "Messenger"],
    features: ["24/7 AI conversations across every channel", "Qualifies and engages leads with smart routing", "Books appointments automatically and instantly", "Higher conversion rate from faster response times"],
    category: "Conversational AI",
    client: "Multi-Channel Business",
    problem: "Leads messaging in through SMS, Instagram, or Messenger outside business hours went unanswered for hours, causing dropped conversions.",
    solution: "Configured GoHighLevel's Conversation AI agent (Ava) to automate, engage, and convert across every messaging channel: answering instantly, qualifying the lead, and booking directly on the calendar.",
    automationImage: ghlConversationAiThumbnail,
    platform: "GoHighLevel Conversation AI (Ava)",
    videoUrl: "https://kommodo.ai/recordings/xPGDgbjahr1RKd5XzECV?onlyRecording=1",
    videoFileUrl: "/videos/ghl-agent-ava-demo-web.mp4",
    captionFileUrl: "/videos/ghl-agent-ava-demo.vtt",
    detailedWorkflow: [
      "Lead messages in via SMS, Instagram, Messenger, or web chat",
      "Ava responds instantly with a natural, on-brand greeting",
      "AI qualifies the lead by asking the right follow-up questions",
      "Smart routing directs the conversation based on intent",
      "Ava books the appointment straight onto the calendar",
      "Conversation and contact details sync to the GHL CRM",
      "Follow-up sequences trigger automatically for unbooked leads"
    ]
  },
  {
    id: "asmr-video-creator",
    title: "ASMR AI Video Creator & Auto-Publisher",
    description: "Content Creator: Fully automated daily ASMR video generation and publishing pipeline that creates, renders, and posts videos to Facebook and YouTube with zero manual work.",
    technologies: ["n8n", "Google Gemini", "Google Veo", "Google Sheets", "Facebook Graph API", "YouTube API", "Gmail"],
    features: ["100% automated daily video generation", "AI-written prompts, titles, and captions", "Auto-publishing to Facebook and YouTube", "Safety filter and error handling with email alerts"],
    category: "AI Content Automation",
    client: "Content Creator",
    problem: "Producing and publishing daily ASMR video content across multiple platforms required hours of manual work.",
    solution: "Built an n8n workflow running daily: fetches pending prompts from Google Sheets, generates video assets with Gemini and Google Veo, then publishes directly to Facebook and YouTube with automated error alerts.",
    automationImage: asmrThumbnail,
    platform: "n8n + Gemini + Veo",
    detailedWorkflow: [
      "Schedule trigger fires every day at 12:00 AM",
      "Reads Google Sheet and gets all fruits with status = Pending",
      "Randomly selects one pending fruit (with style)",
      "Gemini generates Veo prompt, YouTube title, and description/caption",
      "Checks if Gemini returned an error, sends email alert and stops if so",
      "Builds JWT payload, signs it, and exchanges it for a Google access token",
      "Sends prompt to Google Veo to generate the video (returns operation ID)",
      "Waits, then polls Veo to check if the video is ready",
      "Handles safety-filter and error branches (stops workflow with notification)",
      "Converts the returned Base64 video into an MP4 file",
      "Uploads the video to Facebook via the Graph API with generated caption",
      "Uploads the video to YouTube with generated title and description",
      "Updates the Google Sheet row: status = Posted, posted_at = today"
    ],
    sampleLinks: [
      { label: "Facebook Reel sample", url: "https://www.facebook.com/reel/1245462175306768/?s=single_unit" },
      { label: "YouTube Shorts sample", url: "https://www.youtube.com/shorts/yudXdZTOQPM" }
    ]
  },
  {
    id: "ghl-no-show",
    title: "GHL No-Show Re-Engagement Engine",
    description: "Sales Team: Automated lead qualification and opportunity tracking system with conditional workflows based on appointment status.",
    technologies: ["GoHighLevel", "CRM Automation", "Conditional Logic", "Opportunity Management"],
    features: ["Automated opportunity creation", "Conditional workflow branching", "Lead status tracking", "Follow-up automation"],
    category: "Sales Automation",
    client: "Sales Organization",
    problem: "Inconsistent lead follow-up and manual opportunity management was causing lost deals.",
    solution: "Designed GHL workflow: Appointment triggers → conditional logic → automated opportunity management and follow-up.",
    automationImage: ghlCaseStudy,
    platform: "GoHighLevel",
    detailedWorkflow: ["Appointment status trigger activates workflow", "Conditional logic checks if tags include no show", "Branch A: Lost tag added for no-shows", "Branch B: Opportunity created for attended appointments", "Opportunity status updated automatically", "Follow-up sequences triggered based on outcome", "Date formatting applied for tracking", "Workflow ends with appropriate next actions"]
  },
  {
    id: "zapier-content-workflow",
    title: "AI Content Repurposing Pipeline",
    description: "Marketing Agency: Automated content creation pipeline that transforms Google Drive files into AI-generated content distributed across multiple social platforms.",
    technologies: ["Zapier", "Google Drive", "AI by Zapier", "LinkedIn", "Instagram", "Facebook"],
    features: ["Automated content generation from uploaded files", "Multi-platform distribution", "Content filtering and optimization", "Cross-platform scheduling"],
    category: "Content Marketing",
    client: "Digital Marketing Agency",
    problem: "Manual content creation and distribution across multiple social platforms was time-consuming and inconsistent.",
    solution: "Built Zapier workflow: Google Drive upload → AI content generation → automated posting to LinkedIn, Instagram, and Facebook.",
    automationImage: zapierCaseStudy,
    platform: "Zapier + AI",
    detailedWorkflow: ["File uploaded to Google Drive triggers workflow", "Zapier filters by file type (mp4 format)", "AI by Zapier transcribes video content", "Second AI step creates optimized social media posts", "Content splits into platform-specific paths", "LinkedIn post created with professional tone", "Instagram content formatted with hashtags", "Facebook page post published automatically"]
  },
  {
    id: "make-client-onboarding",
    title: "Client Onboarding & Intake System",
    description: "Professional Services: Streamlined client intake process connecting Google Forms to comprehensive onboarding workflow with automated task management.",
    technologies: ["Make.com", "Google Forms", "Google Sheets", "Gmail", "Telegram"],
    features: ["Complete onboarding automation", "Multi-step conditional workflows", "Automated client communication", "Task assignment and tracking"],
    category: "Client Management",
    client: "Consulting Firm",
    problem: "New client onboarding required manual coordination across multiple tools and team members.",
    solution: "Created Make.com automation: Google Forms → client database → automated email sequences → team notifications.",
    automationImage: makeCaseStudy,
    platform: "Make.com",
    detailedWorkflow: ["Client submits Google Form", "Tools integration creates client folder", "Information added to client tracking sheet", "Automated welcome email sent via Gmail", "Team notification sent through Telegram", "Router determines client type and workflow path", "Conditional branches trigger appropriate onboarding sequences", "Follow-up tasks automatically assigned to team members"]
  },
  {
    id: "n8n-expense-reporting",
    title: "Telegram Expense & Reporting System",
    description: "Small Business: Automated expense tracking through Telegram bot integration with Google Sheets for daily, weekly, and monthly reporting.",
    technologies: ["n8n", "Telegram", "Google Sheets", "Automated Reporting"],
    features: ["Daily expense logging via Telegram", "Automated report generation", "Multi-timeframe reporting", "Real-time expense tracking"],
    category: "Business Operations",
    client: "Small Business Owner",
    problem: "Manual expense tracking was leading to missed deductions and poor financial visibility.",
    solution: "Built n8n workflow: Telegram expense input → Google Sheets logging → automated daily/weekly/monthly reports.",
    automationImage: n8nCaseStudy,
    platform: "n8n + Telegram",
    detailedWorkflow: ["Expense submitted via Telegram message", "n8n extracts expense data and categorizes", "Data mapped and added to Google Sheets", "Daily expense summary generated at 8PM", "Weekly reports compiled every Sunday", "Monthly reports created on 1st of each month", "Automated Telegram notifications sent with summaries", "Budget alerts triggered when limits exceeded"]
  }
];

const categories = [
  "All",
  "Voice AI",
  "Social Media AI",
  "Conversational AI",
  "AI Content Automation",
  "Sales Automation",
  "Content Marketing",
  "Client Management",
  "Business Operations",
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLDivElement>(null);
  const railWrapperRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  // Lock the card rail to the viewport, then use normal vertical scrolling to scrub through the
  // full horizontal distance. The section releases only after the final card is fully in view.
  useLayoutEffect(() => {
    const rail = railRef.current;
    const railWrapper = railWrapperRef.current;
    if (!rail || !railWrapper) return;
    if (
      window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      gsap.set(rail, { x: 0 });
      return;
    }

    const getScrollDistance = () =>
      Math.max(0, rail.scrollWidth - railWrapper.clientWidth);

    gsap.set(rail, { x: 0 });
    if (getScrollDistance() <= 0) return;

    const tween = gsap.to(rail, {
      x: () => -getScrollDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: railWrapper,
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(rail, { clearProps: "transform" });
    };
  }, [activeCategory]);

  return (
    <section id="casestudies" ref={sectionRef} className="relative py-32 px-6 sm:px-8 bg-[#08090a] hairline-top overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative">
        {/* Section Header — wider vertical rhythm ported from Xenith's Work section
            (layout-manifest.json: y:6334, h:3800 — spacious grid, not dense) */}
        <Reveal>
          <div className="mb-20">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium uppercase tracking-widest text-[#f1eadc]">Selected Work</span>
            </div>
            <SplitHeading className="text-heading mb-4">
              Case Studies.
            </SplitHeading>
            <p className="text-lg sm:text-[19px] text-[#8a8f98] max-w-3xl leading-[1.61]">
              Architected voice agents, CRM automation pipelines, and autonomous workflows designed for operational resilience and verifiable conversion.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-sm font-medium px-4 py-2 rounded-full transition-all tracking-tight ${
                    activeCategory === cat
                      ? "bg-[#f1eadc] text-[#08090a]"
                      : "bg-transparent text-[#8a8f98] border border-[#23252a] hover:text-white hover:border-[#383b3f]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Horizontal rail — full-bleed, not constrained to max-w-[1200px], matching Xenith's
          full-viewport-width work-card row. Left padding aligns the first card near the
          left edge (matching the max-w-[1200px] container's own left margin) at rest,
          before the scroll-jack pin engages and starts sliding the rail left.
          Bug fix: the wrapper had no explicit height/vertical-centering, so once GSAP
          pinned it, the pinned scene sat flush at whatever position the card's natural
          height landed on — large empty gaps top/bottom instead of the cards being
          centered in the viewport. `min-h-screen flex items-center` centers the rail
          vertically within the full pinned viewport height.
          Wordmark moved from the outer section (where large section padding pushed it
          far below the cards) to sit relative to this wrapper instead, so it stays tight
          under the card row regardless of the section's own top/bottom padding — matching
          the reference where "OUR WORK" sits directly beneath the image row. */}
      <div
        ref={railWrapperRef}
        aria-label="Case studies"
        tabIndex={0}
        className="case-study-scroller relative -mx-6 sm:-mx-8 h-screen flex flex-col items-start justify-center overflow-x-auto overflow-y-hidden overscroll-x-contain snap-x snap-mandatory md:overflow-x-hidden md:snap-none"
      >
        <div
          ref={railRef}
          className="relative z-10 flex gap-6 w-max pl-[7.5vw] pr-[7.5vw] sm:pl-[max(24px,calc((100vw-1200px)/2))] sm:pr-[max(24px,calc((100vw-1200px)/2))]"
        >
          {filteredProjects.map((project, index) => {
            // Check if this project is the featured card
            if (project.isFeatured && activeCategory === "All") {
              return (
                <div key={project.id} data-project-card className="w-[85vw] max-w-[420px] sm:w-[520px] flex-shrink-0 snap-start">
                  {/* Same image-first hover pattern as the regular cards below, with a
                      Flagship Solution tag kept as this project's distinguishing marker. */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <div
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            event.currentTarget.click();
                          }
                        }}
                        className="relative group w-full cursor-pointer overflow-hidden rounded-lg bg-black text-left"
                      >
                        <div className="relative h-[320px] sm:h-[380px] overflow-hidden">
                          <img
                            src={project.automationImage}
                            alt={project.title}
                            fetchPriority="high"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />

                          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#f1eadc] text-[#08090a]">
                              <Sparkles className="w-3 h-3" />
                              Flagship Solution
                            </span>
                          </div>

                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f1eadc] text-[#08090a] text-sm font-medium">
                              <span>{project.videoUrl ? "Play Project Video" : "View Project Image"}</span>
                              {project.videoUrl ? (
                                <Play className="w-4 h-4 fill-current" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start justify-between pt-4 min-h-16">
                          <h3 className="text-lg font-medium tracking-tight text-white">
                            {project.title}
                          </h3>
                          <span className="text-xs font-medium text-[#8a8f98] uppercase tracking-wider">
                            {project.platform}
                          </span>
                        </div>
                      </div>
                    </DialogTrigger>

                    <DialogContent className="!flex !w-[calc(100%-2rem)] !max-w-4xl !max-h-[calc(100dvh-2rem)] !flex-col !overflow-hidden bg-[#0f1011] p-5 sm:p-6 text-[#d0d6e0] border border-[#23252a] rounded-xl">
                      <DialogHeader className="shrink-0 pr-10">
                        <DialogTitle className="text-2xl font-medium tracking-tight text-white">
                          {project.title}
                        </DialogTitle>
                        <DialogDescription className="text-[13px] leading-5 text-[#aeb7c3]">
                          {project.client} • {project.category} • {project.platform}
                        </DialogDescription>
                      </DialogHeader>

          <div
            className="case-study-dialog-scroll mt-4 min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain touch-pan-y pr-2 sm:pr-3"
            data-lenis-prevent
          >
                      <p className="text-[16px] leading-6 text-[#e2e7ee]">
                        {project.description}
                      </p>

                      {project.videoUrl ? (
                        <div className="relative w-full my-2 overflow-hidden rounded-md border border-[#2b3038] bg-[#08090a]">
                          {project.videoFileUrl ? (
                            <CaseStudyVideo src={project.videoFileUrl} captions={project.captionFileUrl} poster={project.automationImage} title={`${project.title} video demo`} />
                          ) : (
                            <iframe src={project.videoUrl.replace("https://kommodo.ai/recordings/", "https://kommodo.ai/embed/recordings/")} title={`${project.title} video demo`} className="block w-full aspect-[640/285] border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen />
                          )}
                        </div>
                      ) : (
                        <div className="my-2">
                          <img
                            src={project.automationImage}
                            alt={project.title}
                            className="w-full max-h-[60vh] object-contain border border-[#23252a] rounded-md"
                          />
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-6 mt-2 pt-4 hairline-top">
                        <div className="space-y-4">
                          <div>
                            <h4 className="mb-1 text-[13px] font-semibold uppercase leading-5 tracking-wider text-white">Challenge</h4>
                            <p className="text-[15px] leading-6 text-[#b8c0cc]">{project.problem}</p>
                          </div>
                          <div>
                            <h4 className="mb-1 text-[13px] font-semibold uppercase leading-5 tracking-wider text-white">Solution</h4>
                            <p className="text-[15px] leading-6 text-[#b8c0cc]">{project.solution}</p>
                          </div>
                          <div>
                          <h4 className="mb-1 text-[13px] font-semibold uppercase leading-5 tracking-wider text-white">What the system does</h4>
                            <ul className="space-y-1.5">
                              {project.features.map((feat, fIndex) => (
                                <li key={fIndex} className="flex items-start text-[15px] leading-6 text-[#b8c0cc]">
                                  <span className="text-[#f1eadc] mr-1.5">✓</span>
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h4 className="mb-2 text-[13px] font-semibold uppercase leading-5 tracking-wider text-white">Architecture Details</h4>
                          <ol className="space-y-2">
                            {project.detailedWorkflow.map((step, sIdx) => (
                              <li key={sIdx} className="flex items-start text-[15px] leading-6 text-[#b8c0cc]">
                                <span className="font-medium text-white mr-2 flex-shrink-0">{sIdx + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              );
            }

            return (
              <div
                key={project.id}
                data-project-card
                className="w-[85vw] max-w-[420px] sm:w-[520px] flex-shrink-0 snap-start"
              >
                {/* Image-dominant card, ported from Xenith's work-card pattern (confirmed via
                    live DOM read of xenith-design.webflow.io #work: <a> wrapping a full-bleed
                    image + a small discipline-tag overlay, subtle scale(1.002) on hover — no
                    body copy on the card itself; cards sit in a fixed-width horizontal rail,
                    694px each in the original, scaled here to fit this repo's content). Full
                    case-study text stays in the dialog below; a media-specific CTA is revealed on
                    hover instead of sitting on the page by default. */}
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          event.currentTarget.click();
                        }
                      }}
                      className="relative group w-full cursor-pointer overflow-hidden rounded-lg bg-black text-left"
                    >
                      <div className="relative h-[320px] sm:h-[380px] overflow-hidden">
                        <img
                          src={project.automationImage}
                          alt={`${project.title} diagram`}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Discipline / platform tag overlay */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          <span className="text-[11px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/50 backdrop-blur text-white">
                            {project.category}
                          </span>
                        </div>

                        {/* Hover overlay: the CTA states whether this opens a video or image case study. */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f1eadc] text-[#08090a] text-sm font-medium">
                            <span>{project.videoUrl ? "Play Project Video" : "View Project Image"}</span>
                            {project.videoUrl ? (
                              <Play className="w-4 h-4 fill-current" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Title beneath, no description/tags by default */}
                      <div className="flex items-start justify-between pt-4 min-h-16">
                        <h3 className="text-lg font-medium tracking-tight text-white">
                          {project.title}
                        </h3>
                        <span className="text-xs font-medium text-[#8a8f98] uppercase tracking-wider">
                          {project.platform}
                        </span>
                      </div>
                    </div>
                  </DialogTrigger>

                  <DialogContent className="!flex !w-[calc(100%-2rem)] !max-w-4xl !max-h-[calc(100dvh-2rem)] !flex-col !overflow-hidden bg-[#0f1011] p-5 sm:p-6 text-[#d0d6e0] border border-[#23252a] rounded-xl">
                    <DialogHeader className="shrink-0 pr-10">
                      <DialogTitle className="text-2xl font-medium tracking-tight text-white">
                        {project.title}
                      </DialogTitle>
                      <DialogDescription className="text-[13px] leading-5 text-[#aeb7c3]">
                        {project.client} • {project.category} • {project.platform}
                      </DialogDescription>
                    </DialogHeader>

          <div
            className="case-study-dialog-scroll mt-4 min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain touch-pan-y pr-2 sm:pr-3"
            data-lenis-prevent
          >
                    <p className="text-[16px] leading-6 text-[#e2e7ee]">
                      {project.description}
                    </p>

                    {project.videoUrl ? (
                      <div className="relative w-full my-2 overflow-hidden rounded-md border border-[#2b3038] bg-[#08090a]">
                        {project.videoFileUrl ? (
                          <CaseStudyVideo src={project.videoFileUrl} captions={project.captionFileUrl} poster={project.automationImage} title={`${project.title} video demo`} />
                        ) : (
                          <iframe src={project.videoUrl.replace("https://kommodo.ai/recordings/", "https://kommodo.ai/embed/recordings/")} title={`${project.title} video demo`} className="block w-full aspect-[640/285] border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen />
                        )}
                      </div>
                    ) : (
                      <div className="my-2">
                        <img
                          src={project.automationImage}
                          alt={`${project.title} full diagram`}
                          className="w-full max-h-[60vh] object-contain border border-[#23252a] rounded-md"
                        />
                      </div>
                    )}

                    {/* Tech stack pill tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, tIndex) => (
                        <span
                          key={tIndex}
                          className="rounded-full border border-[#23252a] bg-transparent px-3 py-1 text-[13px] font-medium text-[#d0d6e0]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-2 pt-4 hairline-top">
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-1 text-[13px] font-semibold uppercase leading-5 tracking-wider text-white">Challenge</h4>
                          <p className="text-[15px] leading-6 text-[#b8c0cc]">{project.problem}</p>
                        </div>
                        <div>
                          <h4 className="mb-1 text-[13px] font-semibold uppercase leading-5 tracking-wider text-white">Solution</h4>
                          <p className="text-[15px] leading-6 text-[#b8c0cc]">{project.solution}</p>
                        </div>
                        <div>
                          <h4 className="mb-1 text-[13px] font-semibold uppercase leading-5 tracking-wider text-white">What the system does</h4>
                          <ul className="space-y-1.5">
                            {project.features.map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-start text-[15px] leading-6 text-[#b8c0cc]">
                                <span className="text-[#f1eadc] mr-1.5">✓</span>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {project.sampleLinks && (
                          <div>
                            <h4 className="mb-1 text-[13px] font-semibold uppercase leading-5 tracking-wider text-white">Live Samples</h4>
                            <div className="space-y-1">
                              {project.sampleLinks.map((link, lIndex) => (
                                <a
                                  key={lIndex}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-[15px] leading-6 text-[#f1eadc] hover:underline"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  <span>{link.label}</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <h4 className="mb-2 text-[13px] font-semibold uppercase leading-5 tracking-wider text-white">Workflow Execution</h4>
                        <ol className="space-y-2">
                          {project.detailedWorkflow.map((step, sIndex) => (
                            <li key={sIndex} className="flex items-start text-[15px] leading-6 text-[#b8c0cc]">
                              <span className="font-medium text-white mr-2 flex-shrink-0">
                                {sIndex + 1}.
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            );
          })}
        </div>

        {/* Ghosted wordmark, ported from Xenith's .text-block (confirmed: 320px,
            rgba(255,255,255,0.08), sits directly beneath the work-card row) — moved
            here so it stays tight under the cards, not far down the whole section. */}
        <div aria-hidden className="pointer-events-none absolute z-0 left-1/2 bottom-[8%] w-max -translate-x-1/2 select-none">
          <span className="text-[clamp(3rem,14vw,15rem)] font-medium leading-none text-white/[0.08] whitespace-nowrap">
            CASE STUDIES
          </span>
        </div>
      </div>
    </section>
  );
};

export default Projects;
