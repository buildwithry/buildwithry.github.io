import { Calendar, MapPin, Briefcase } from "lucide-react";

const experiences = [
  {
    title: "GHL Specialist & Automation Consultant",
    company: "Romea.AI",
    period: "Oct 2025 - Jan 2026",
    location: "Remote",
    type: "Full-Time",
    achievements: [
      "Engineered HighLevel onboarding workflows and multi-branch automation architectures for high-ticket clients.",
      "Conducted client CRM trainings and tailored sub-account setups to maximize adoption and lead retention.",
      "Built custom webhook entry points connecting external lead ads to GHL custom fields and opportunity pipelines.",
      "Configured multi-calendar routing, round-robin distribution, and interactive live chat widgets.",
      "Architected sales pipeline stages with automated stage-trigger actions and opportunity notifications."
    ],
    technologies: ["GoHighLevel", "Webhooks", "CRM Training", "Workflow Automation"]
  },
  {
    title: "Outreach & Automation Specialist",
    company: "DPX AI Solutions",
    period: "Mar 2025 - Dec 2025",
    location: "Remote",
    type: "Part-Time",
    achievements: [
      "Managed targeted outbound outreach pipelines across LinkedIn and Facebook.",
      "Configured Instantly.ai cold email engines, inbox rotation, and deliverability monitoring.",
      "Automated prospect response ingestion and CRM synchronization via GoHighLevel workflows."
    ],
    technologies: ["Facebook", "LinkedIn", "Instantly", "GoHighLevel"]
  },
  {
    title: "E-Commerce / HighLevel Admin",
    company: "Cookware Company",
    period: "Dec 2023 - Mar 2025",
    location: "Los Angeles, US",
    type: "Full-Time",
    achievements: [
      "Built and scaled HighLevel email funnels, re-engagement campaigns, and abandoned checkout sequences.",
      "Designed and managed funnels, intake forms, and dynamic tagging systems for hyper-targeted customer segmentation.",
      "Configured automated order tracking pipelines, customer return workflows, and appointment booking systems.",
      "Coordinated inventory demand projections and fulfillment data synchronizations."
    ],
    technologies: ["GoHighLevel", "Email Marketing", "Funnel Creation", "CRM Management"]
  },
  {
    title: "Lead Gen & Appointment Specialist",
    company: "AI Software",
    period: "2022 - 2023",
    location: "Singapore",
    type: "Virtual Specialist",
    achievements: [
      "Managed calendar scheduling, qualification calls, and webinar booking operations.",
      "Sourced verified B2B prospects from LinkedIn Sales Navigator and conducted targeted outreach.",
      "Supported CRM migration projects and customer tool integrations."
    ],
    technologies: ["LinkedIn Sales Navigator", "CRM Systems", "Social Media Operations"]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 sm:px-8 bg-[#0f0f1c] text-white border-t border-white/10">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-widest text-[#bc7155] mb-2 block">
              Professional Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Experience.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg text-[#8e8e95] leading-[1.61]">
              Proven track record implementing scalable automation solutions across software startups, enterprise brands, and agencies.
            </p>
          </div>
        </div>

        {/* Chronological Editorial Timeline */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="pt-8 border-t border-white/15 grid lg:grid-cols-12 gap-6 lg:gap-12"
            >
              {/* Left Column: Metadata & Role Header (4 cols) */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#bc7155]">
                    // 0{index + 1}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full border border-white/20 text-white/90">
                    {exp.type}
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-white leading-tight">
                  {exp.title}
                </h3>

                <div className="text-lg font-semibold text-[#8e8e95]">
                  {exp.company}
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-[#8e8e95] pt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-white/60" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-white/60" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Right Column: Key Achievements & Tech Stack (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <ul className="space-y-2.5">
                  {exp.achievements.map((item, iIdx) => (
                    <li key={iIdx} className="text-base sm:text-[17px] text-[#8e8e95] flex items-start leading-[1.61]">
                      <span className="text-[#bc7155] mr-3 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-semibold px-3 py-1 rounded-full bg-[#151623] border border-white/10 text-white/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
