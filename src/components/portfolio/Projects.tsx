import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Github, Zap, Eye, Play } from "lucide-react";
import { useState } from "react";
import zapierCaseStudy from "/lovable-uploads/2f07a1c7-8827-4169-9c4d-6353aa824503.png";
import makeCaseStudy from "/lovable-uploads/833c006f-8a7a-4522-8686-83e73cd9afa2.png";
import n8nCaseStudy from "/lovable-uploads/7d1106cf-f77a-469f-9c81-5dbbcf6626a8.png";
import ghlCaseStudy from "/lovable-uploads/0382c638-b3db-4b63-806e-a772fbaeb008.png";
const vapiThumbnail = "/lovable-uploads/vapi-ai-receptionist.jpg";
const nousHermesThumbnail = "/lovable-uploads/project-nous-hermes.svg";
const aiJobHunterThumbnail = "/lovable-uploads/project-ai-job-hunter.svg";
const shopifyPlannerThumbnail = "/lovable-uploads/project-shopify-inventory.svg";
const projects = [{
  title: "AI-Powered Content Creation Workflow",
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
}, {
  title: "Client Onboarding Automation System", 
  description: "Professional Services: Streamlined client intake process connecting Google Forms to comprehensive onboarding workflow with automated task management.",
  technologies: ["Make.com", "Google Forms", "Google Sheets", "Gmail", "Telegram", "Tools Integration"],
  features: ["Complete onboarding automation", "Multi-step conditional workflows", "Automated client communication", "Task assignment and tracking"],
  category: "Client Management",
  client: "Consulting Firm",
  problem: "New client onboarding required manual coordination across multiple tools and team members.",
  solution: "Created Make.com automation: Google Forms → client database → automated email sequences → team notifications.",
  automationImage: makeCaseStudy,
  platform: "Make.com",
  detailedWorkflow: ["Client submits Google Form", "Tools integration creates client folder", "Information added to client tracking sheet", "Automated welcome email sent via Gmail", "Team notification sent through Telegram", "Router determines client type and workflow path", "Conditional branches trigger appropriate onboarding sequences", "Follow-up tasks automatically assigned to team members"]
}, {
  title: "Telegram Expense Reporting System",
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
}, {
  title: "GHL No-Show Workflow",
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
}, {
  title: "VAPI AI Receptionist",
  description: "Service Business: A voice AI receptionist that answers calls 24/7, qualifies leads, books appointments, and syncs everything into the CRM in real time.",
  technologies: ["GoHighLevel", "n8n", "VAPI", "Supabase", "Claude Code"],
  features: ["24/7 AI voice call handling", "Real-time lead capture into GHL", "Appointment booking via voice", "Conversation logs stored in Supabase"],
  category: "Voice AI",
  client: "Service Business",
  problem: "Missed calls outside business hours and slow lead response were costing the business qualified appointments and revenue.",
  solution: "Built a VAPI voice agent connected to n8n workflows, GoHighLevel CRM, and a Supabase backend — engineered with Claude Code — to handle inbound calls, qualify leads, and book appointments automatically.",
  automationImage: vapiThumbnail,
  platform: "VAPI + n8n + GHL + Supabase",
  videoUrl: "https://kommodo.ai/recordings/XxGUQuRANUup1LGh0Tg9",
  detailedWorkflow: ["Inbound call routed to VAPI AI receptionist", "AI greets caller and qualifies the inquiry", "n8n webhook triggered with structured call data", "Contact created or updated in GoHighLevel", "Appointment booked into GHL calendar via voice", "Conversation transcript stored in Supabase", "Follow-up SMS/email sequence triggered in GHL", "Claude Code used to build and refine prompts and integrations"]
}, {
  title: "Nous Hermes — Autonomous Job-Hunter Agent",
  description: "Personal R&D: An autonomous AI agent that runs 24/7 on a VPS, scrapes job boards twice daily, scores every new role against a target profile, and delivers the top matches to Telegram — remembering everything and improving over time.",
  technologies: ["Python", "Claude (Anthropic)", "Hermes Agent", "Telegram", "Docker", "VPS"],
  features: ["Runs autonomously 24/7 on a Hostinger VPS", "Scrapes 4 job boards twice daily", "AI-scores each role and pushes top matches to Telegram", "Persistent memory — never repeats a job"],
  category: "Agentic AI",
  client: "Personal R&D Project",
  problem: "Manually checking multiple job boards every day was slow, inconsistent, and easy to drop — and the best remote roles get filled fast.",
  solution: "Built an autonomous agent on the Nous Research Hermes framework that hunts jobs on a schedule, scores them with Claude, learns from feedback, and reports to Telegram — fully hands-off and deployed in Docker on a VPS.",
  automationImage: nousHermesThumbnail,
  platform: "Hermes Agent + Claude + Docker",
  detailedWorkflow: ["Scheduler fires twice daily (6PM + 1AM)", "Agent scrapes OnlineJobs.ph, LinkedIn, Jobicy, RemoteOK", "New jobs deduped against persistent memory", "Claude Haiku scores each role against the target profile", "Top 10 matches sent to Telegram, one per message with an apply angle", "Agent learns from reactions to improve future scoring", "Available on-demand via Telegram for ad-hoc questions"]
}, {
  title: "AI Job Hunter — n8n Tailoring Pipeline",
  description: "Personal R&D: A self-hosted n8n pipeline that fetches remote roles from multiple sources, AI-scores each for fit, and — only for strong matches — auto-tailors a resume and cover letter before alerting Slack and logging to a tracker.",
  technologies: ["n8n", "Gemini", "Claude Sonnet", "Apify", "Slack API", "Google Sheets"],
  features: ["Multi-source fetch with dedupe and pre-filtering", "Free-tier Gemini scoring across high volume", "Cost-gated Claude tailoring (only for matches ≥ 8/10)", "Per-match Slack alerts + Google Sheet tracker"],
  category: "AI Automation",
  client: "Personal R&D Project",
  problem: "The real bottleneck in job hunting isn't finding roles — it's writing a tailored application for each one, which is too slow to do at volume.",
  solution: "Built a self-hosted n8n workflow that fans out across job sources, scores every role with Gemini for free, and gates expensive Claude tailoring behind an 8/10 threshold — keeping spend under a hard monthly ceiling while automating the writing.",
  automationImage: aiJobHunterThumbnail,
  platform: "n8n + Gemini + Claude",
  detailedWorkflow: ["Scheduled trigger fans out to fetch nodes (Upwork, RemoteOK, OnlineJobs.ph, more)", "Results normalized, deduped, and pre-filtered", "Gemini Flash scores each role 0–10 for fit", "Branch: only roles scoring ≥ 8 advance", "Claude Sonnet tailors a resume + short cover letter", "Each strong match posts its own Slack message", "Every scored job logged to a Google Sheet tracker"]
}, {
  title: "Shopify Inventory Planner",
  description: "Ecommerce: A transparent demand-forecasting and reorder system that ingests Shopify exports and works out what to reorder, how much, and by when — output as an auditable Excel dashboard and a plain-language weekly update.",
  technologies: ["Python", "pandas", "openpyxl", "Excel", "Forecasting"],
  features: ["Recency-weighted sales velocity per SKU", "Safety stock + reorder points with lead-time variability", "Stock-out and order-by dates per product", "Color-coded REORDER / SOON / OK / OVERSTOCK status"],
  category: "Data & Forecasting",
  client: "Premium Ecommerce Brand",
  problem: "A growing brand was reordering on gut feel — leading to stock-outs on best-sellers and cash tied up in overstocked SKUs, with no clear signal of what to order or when.",
  solution: "Built a Python forecasting pipeline that turns raw Shopify exports into a per-SKU reorder model with live Excel formulas the owner can audit, plus a weekly 'order this / at risk / fine' summary that fits a 10-minute routine.",
  automationImage: shopifyPlannerThumbnail,
  platform: "Python + pandas + Excel",
  detailedWorkflow: ["Ingest Shopify product, order, inventory and lead-time exports", "Compute recency-weighted sales velocity (7/28/84-day windows)", "Calculate safety stock from demand and lead-time variability", "Derive reorder point, days of cover, and stock-out date", "Flag the last safe order-by date per SKU", "Apply flagged promos so reorder points rise before a campaign", "Output Excel dashboard with live formulas + weekly markdown update"]
}];
const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary))_0%,transparent_50%)] opacity-5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent))_0%,transparent_50%)] opacity-5"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with improved layout */}
        <div className="text-center mb-20">
          <h2 className="section-heading mb-6">
            Case Studies
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real automation solutions that transformed businesses
          </p>
          
          {/* Success metrics - horizontal layout */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 pt-8 border-t border-border/30">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">4+</div>
              <div className="text-muted-foreground font-medium text-sm md:text-base">Automation Platforms</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">100%</div>
              <div className="text-muted-foreground font-medium text-sm md:text-base">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">80%+</div>
              <div className="text-muted-foreground font-medium text-sm md:text-base">Time Saved</div>
            </div>
          </div>
        </div>
        
        {/* Project cards - alternating layout */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Image section */}
              <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 cursor-pointer">
                      <img 
                        src={project.automationImage} 
                        alt={`${project.title} workflow diagram`}
                        className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        {(project as any).videoUrl ? (
                          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                          </div>
                        ) : (
                          <Eye className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                      </div>
                      <div className="absolute top-6 left-6">
                        <Badge variant="secondary" className="bg-background/95 text-foreground backdrop-blur-sm">
                          {project.platform}
                        </Badge>
                      </div>
                      <div className="absolute bottom-6 right-6">
                        <Badge variant="outline" className="bg-background/95 backdrop-blur-sm">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-2">
                    <DialogHeader className="p-4">
                      <DialogTitle className="text-xl">{project.title}{(project as any).videoUrl ? "" : " - Workflow Diagram"}</DialogTitle>
                    </DialogHeader>
                    <div className="relative bg-muted/20 rounded-lg overflow-hidden">
                      {(project as any).videoUrl ? (
                        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                          <iframe
                            src={(project as any).videoUrl}
                            title={project.title}
                            className="absolute inset-0 w-full h-full"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <img 
                          src={project.automationImage} 
                          alt={`${project.title} full workflow diagram`}
                          className="w-full max-h-[70vh] object-contain"
                        />
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              
              {/* Content section */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-base mb-3 text-foreground/90">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex} 
                          variant="secondary" 
                          className="text-sm px-3 py-1 bg-muted/60 hover:bg-muted transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-base mb-3 text-foreground/90">Key Results</h4>
                    <ul className="space-y-2">
                      {project.features.slice(0, 3).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-muted-foreground">
                          <span className="text-primary mr-3 text-lg">•</span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="lg" className="mt-6 group">
                        <Eye className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        View Full Case Study
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                        <DialogDescription className="text-base">
                          {project.client} - {project.category}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-bold text-lg mb-2">Challenge</h4>
                            <p className="text-muted-foreground">{project.problem}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-bold text-lg mb-2">Solution</h4>
                            <p className="text-muted-foreground">{project.solution}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-bold text-lg mb-2">Results Achieved</h4>
                            <ul className="space-y-2">
                              {project.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start text-sm">
                                  <span className="text-primary mr-2">✓</span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-bold text-lg mb-2">Workflow Process</h4>
                            <ol className="space-y-2">
                              {project.detailedWorkflow.map((step, stepIndex) => (
                                <li key={stepIndex} className="flex items-start text-sm">
                                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                                    {stepIndex + 1}
                                  </span>
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                          
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <img 
                              src={project.automationImage} 
                              alt={`${project.title} workflow diagram`}
                              className="w-full rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;