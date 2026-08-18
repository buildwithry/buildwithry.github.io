import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Eye, Play, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

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
  sampleLinks?: { label: string; url: string }[];
  isFeatured?: boolean;
}

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

const categories = ["All", "Voice AI", "Social Media AI", "Conversational AI", "AI Content Automation", "Sales Automation"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-6 sm:px-8 bg-white dark:bg-[#000d10] border-t border-[#d5d3d4] dark:border-white/10">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#bc7155]">Selected Work</span>
          </div>
          <h2 className="section-headline mb-4">
            Case Studies.
          </h2>
          <p className="text-lg sm:text-[19px] text-[#8e8e95] max-w-3xl leading-[1.61]">
            Architected voice agents, CRM automation pipelines, and autonomous workflows designed for operational resilience and verifiable conversion.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm font-semibold px-4 py-2 rounded-full transition-all tracking-tight ${
                  activeCategory === cat
                    ? "bg-[#000d10] text-white dark:bg-white dark:text-[#000d10]"
                    : "bg-transparent text-[#8e8e95] border border-[#d5d3d4] dark:border-white/15 hover:text-[#000d10] dark:hover:text-white hover:border-[#000d10] dark:hover:border-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-16">
          {filteredProjects.map((project, index) => {
            // Check if this project is the featured Clay Card
            if (project.isFeatured && activeCategory === "All") {
              return (
                <div key={project.id} className="featured-clay-card">
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-6 space-y-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        Flagship Solution
                      </div>

                      <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                        {project.title}
                      </h3>

                      <p className="text-lg leading-[1.61] text-white/90">
                        {project.description}
                      </p>

                      <div className="space-y-3 pt-2">
                        <div className="text-xs uppercase tracking-widest text-white/80 font-bold">Key Capabilities</div>
                        <ul className="space-y-2">
                          {project.features.map((feat, fIndex) => (
                            <li key={fIndex} className="flex items-start text-white text-sm sm:text-base">
                              <span className="mr-2 text-white font-bold">•</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="btn-pill-dark bg-white text-[#000d10] hover:bg-white/90">
                              <Play className="w-4 h-4 fill-current mr-1" />
                              <span>Watch Demo Video</span>
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl p-2 bg-[#000d10] text-white border border-white/20 rounded-none">
                            <DialogHeader className="p-4">
                              <DialogTitle className="text-xl text-white">{project.title}</DialogTitle>
                              <DialogDescription className="text-[#8e8e95]">
                                {project.client} • {project.platform}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="relative w-full border border-white/10 overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                              <iframe
                                src={project.videoUrl}
                                title={project.title}
                                className="absolute inset-0 w-full h-full border-0 overflow-hidden"
                                allow="autoplay; fullscreen"
                                allowFullScreen
                                scrolling="no"
                              />
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="btn-pill-ghost border-white/60 text-white hover:bg-white hover:text-[#bc7155]">
                              <Eye className="w-4 h-4 mr-1" />
                              <span>View Workflow Architecture</span>
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-white dark:bg-[#151623] p-6 rounded-none border border-[#d5d3d4] dark:border-white/15">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
                              <DialogDescription className="text-base text-[#8e8e95]">
                                {project.client} — {project.category}
                              </DialogDescription>
                            </DialogHeader>

                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-bold text-base mb-1">Challenge</h4>
                                  <p className="text-sm text-[#8e8e95]">{project.problem}</p>
                                </div>
                                <div>
                                  <h4 className="font-bold text-base mb-1">Solution</h4>
                                  <p className="text-sm text-[#8e8e95]">{project.solution}</p>
                                </div>
                                <div>
                                  <h4 className="font-bold text-base mb-1">Architecture Details</h4>
                                  <ol className="space-y-1.5 text-xs text-[#8e8e95]">
                                    {project.detailedWorkflow.map((step, sIdx) => (
                                      <li key={sIdx} className="flex items-start">
                                        <span className="font-bold mr-1.5 text-[#000d10] dark:text-white">{sIdx + 1}.</span>
                                        <span>{step}</span>
                                      </li>
                                    ))}
                                  </ol>
                                </div>
                              </div>
                              <div>
                                <img
                                  src={project.automationImage}
                                  alt={project.title}
                                  className="w-full h-auto object-cover border border-[#d5d3d4] dark:border-white/10"
                                />
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <div className="lg:col-span-6">
                      <div className="relative border border-white/30 p-2 bg-black/20">
                        <img
                          src={project.automationImage}
                          alt={project.title}
                          className="w-full h-72 lg:h-96 object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={project.id}
                className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-12 hairline-top"
              >
                {/* Media Image / Video Preview (6 cols) */}
                <div className={`lg:col-span-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative group cursor-pointer border border-[#d5d3d4] dark:border-white/10 p-2 bg-[#f8fafc] dark:bg-[#151623] hover:border-[#000d10] dark:hover:border-white transition-colors">
                        <div className="relative h-72 sm:h-80 overflow-hidden bg-black">
                          <img
                            src={project.automationImage}
                            alt={`${project.title} diagram`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-[#000d10]/20 group-hover:bg-[#000d10]/40 transition-colors flex items-center justify-center">
                            {project.videoUrl ? (
                              <div className="w-14 h-14 bg-white text-[#000d10] flex items-center justify-center shadow-lg border border-black/10 group-hover:scale-110 transition-transform">
                                <Play className="w-6 h-6 ml-0.5 fill-current" />
                              </div>
                            ) : (
                              <div className="w-14 h-14 bg-white text-[#000d10] flex items-center justify-center shadow-lg border border-black/10 group-hover:scale-110 transition-transform">
                                <Eye className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex items-center justify-between pt-2 px-1 text-xs">
                          <span className="font-semibold text-[#000d10] dark:text-white uppercase tracking-wider text-[11px]">
                            {project.platform}
                          </span>
                          <span className="text-[#8e8e95] font-medium">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </DialogTrigger>

                    <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-white dark:bg-[#151623] p-6 border border-[#d5d3d4] dark:border-white/15 rounded-none">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold tracking-tight text-[#000d10] dark:text-white">
                          {project.title}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-[#8e8e95]">
                          {project.client} • {project.category} • {project.platform}
                        </DialogDescription>
                      </DialogHeader>

                      {project.videoUrl ? (
                        <div className="relative w-full my-4 border border-[#d5d3d4] dark:border-white/10 overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                          <iframe
                            src={project.videoUrl}
                            title={project.title}
                            className="absolute inset-0 w-full h-full border-0 overflow-hidden"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            scrolling="no"
                          />
                        </div>
                      ) : (
                        <div className="my-4">
                          <img
                            src={project.automationImage}
                            alt={`${project.title} full diagram`}
                            className="w-full max-h-[60vh] object-contain border border-[#d5d3d4] dark:border-white/10"
                          />
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-6 mt-4 pt-4 border-t border-[#d5d3d4] dark:border-white/10">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-bold text-sm text-[#000d10] dark:text-white uppercase tracking-wider mb-1">Challenge</h4>
                            <p className="text-sm text-[#8e8e95] leading-relaxed">{project.problem}</p>
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-[#000d10] dark:text-white uppercase tracking-wider mb-1">Solution</h4>
                            <p className="text-sm text-[#8e8e95] leading-relaxed">{project.solution}</p>
                          </div>
                          {project.sampleLinks && (
                            <div>
                              <h4 className="font-bold text-sm text-[#000d10] dark:text-white uppercase tracking-wider mb-1">Live Samples</h4>
                              <div className="space-y-1">
                                {project.sampleLinks.map((link, lIndex) => (
                                  <a
                                    key={lIndex}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs text-[#bc7155] hover:underline"
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
                          <h4 className="font-bold text-sm text-[#000d10] dark:text-white uppercase tracking-wider mb-2">Workflow Execution</h4>
                          <ol className="space-y-2">
                            {project.detailedWorkflow.map((step, sIndex) => (
                              <li key={sIndex} className="text-xs text-[#8e8e95] flex items-start">
                                <span className="font-bold text-[#000d10] dark:text-white mr-2 flex-shrink-0">
                                  {sIndex + 1}.
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Narrative & Details (6 cols) */}
                <div className={`lg:col-span-6 space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#000d10] dark:text-white leading-snug mb-3">
                      {project.title}
                    </h3>
                    <p className="text-base sm:text-lg text-[#8e8e95] leading-[1.61]">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack pill tags */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#8e8e95] mb-2.5">
                      Integrated Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, tIndex) => (
                        <span
                          key={tIndex}
                          className="text-xs font-semibold px-3 py-1 rounded-full border border-[#d5d3d4] dark:border-white/15 text-[#000d10] dark:text-white bg-transparent"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#8e8e95] mb-2.5">
                      Key Results &amp; Features
                    </div>
                    <ul className="space-y-2">
                      {project.features.slice(0, 3).map((feat, fIndex) => (
                        <li key={fIndex} className="flex items-start text-sm text-[#000d10] dark:text-white">
                          <span className="mr-2 text-[#bc7155] font-bold">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="btn-pill-ghost group text-sm py-2.5 px-5">
                          <span>View Full Architecture Case Study</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-white dark:bg-[#151623] p-6 border border-[#d5d3d4] dark:border-white/15 rounded-none">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold tracking-tight text-[#000d10] dark:text-white">
                            {project.title}
                          </DialogTitle>
                          <DialogDescription className="text-sm text-[#8e8e95]">
                            {project.client} • {project.category}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-bold text-sm text-[#000d10] dark:text-white uppercase tracking-wider mb-1">Challenge</h4>
                              <p className="text-sm text-[#8e8e95] leading-relaxed">{project.problem}</p>
                            </div>
                            <div>
                              <h4 className="font-bold text-sm text-[#000d10] dark:text-white uppercase tracking-wider mb-1">Solution</h4>
                              <p className="text-sm text-[#8e8e95] leading-relaxed">{project.solution}</p>
                            </div>
                            <div>
                              <h4 className="font-bold text-sm text-[#000d10] dark:text-white uppercase tracking-wider mb-1">Results Achieved</h4>
                              <ul className="space-y-1.5">
                                {project.features.map((feat, fIdx) => (
                                  <li key={fIdx} className="text-xs text-[#8e8e95] flex items-start">
                                    <span className="text-[#bc7155] mr-1.5 font-bold">✓</span>
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {project.sampleLinks && (
                              <div>
                                <h4 className="font-bold text-sm text-[#000d10] dark:text-white uppercase tracking-wider mb-1">Sample Links</h4>
                                <div className="space-y-1">
                                  {project.sampleLinks.map((link, lIndex) => (
                                    <a
                                      key={lIndex}
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-xs text-[#bc7155] hover:underline"
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
                            <h4 className="font-bold text-sm text-[#000d10] dark:text-white uppercase tracking-wider mb-2">Workflow Process</h4>
                            <ol className="space-y-2 mb-4">
                              {project.detailedWorkflow.map((step, sIndex) => (
                                <li key={sIndex} className="text-xs text-[#8e8e95] flex items-start">
                                  <span className="font-bold text-[#000d10] dark:text-white mr-2 flex-shrink-0">
                                    {sIndex + 1}.
                                  </span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                            <img
                              src={project.automationImage}
                              alt={project.title}
                              className="w-full h-auto object-cover border border-[#d5d3d4] dark:border-white/10"
                            />
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
