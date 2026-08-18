import { Bot, Zap, Settings, LineChart, Globe, Mail, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: <Bot className="h-6 w-6 stroke-[1.5]" />,
    title: "GoHighLevel Architecture & Setup",
    description: "End-to-end GHL sub-account provisioning, custom pipeline engineering, calendar routing, and automated onboarding sequences tailored for high-ticket conversion."
  },
  {
    icon: <Zap className="h-6 w-6 stroke-[1.5]" />,
    title: "AI Voice Agents (VAPI & Retell)",
    description: "Custom conversational voice agents trained on business context to answer inbound calls, qualify leads, dynamically check calendar availability, and book appointments 24/7."
  },
  {
    icon: <Settings className="h-6 w-6 stroke-[1.5]" />,
    title: "n8n & Make.com Middleware Automation",
    description: "Complex multi-branch webhook pipelines connecting CRMs, databases, AI models, payment processors, and messaging channels with error logging and auto-retry logic."
  },
  {
    icon: <LineChart className="h-6 w-6 stroke-[1.5]" />,
    title: "Lead Qualification & Re-Engagement",
    description: "Automated speed-to-lead systems that trigger SMS, WhatsApp, and email within seconds of inquiry, escalating qualified prospects directly into sales rep calendars."
  },
  {
    icon: <Globe className="h-6 w-6 stroke-[1.5]" />,
    title: "E-commerce & Inventory Operations",
    description: "Shopify and ERP workflow integrations, abandoned recovery funnels, reorder demand forecasting, and real-time fulfillment webhook synchronization."
  },
  {
    icon: <Mail className="h-6 w-6 stroke-[1.5]" />,
    title: "Cold Email & Multi-Channel Outreach",
    description: "Infrastructure setup with Instantly/Mailgun, deliverability warming, DNS verification (SPF/DKIM/DMARC), and automated response routing to CRM pipelines."
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 px-6 sm:px-8 bg-white dark:bg-[#000d10] border-t border-[#d5d3d4] dark:border-white/10">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-widest text-[#bc7155] mb-2 block">
              Core Competencies
            </span>
            <h2 className="section-headline">
              Capabilities.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg sm:text-[19px] text-[#8e8e95] leading-[1.61]">
              Architectural systems designed to eliminate manual bottlenecks, capture every qualified lead, and run unattended.
            </p>
          </div>
        </div>

        {/* 2-Column Editorial Grid with 1px Hairlines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="pt-6 hairline-top flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-full border border-[#d5d3d4] dark:border-white/20 flex items-center justify-center text-[#000d10] dark:text-white mb-6 group-hover:bg-[#000d10] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-[#000d10] transition-colors">
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold tracking-tight text-[#000d10] dark:text-white mb-3 leading-snug">
                  {service.title}
                </h3>

                <p className="text-base text-[#8e8e95] leading-[1.61]">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#d5d3d4]/40 dark:border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-[#8e8e95] uppercase">
                  CAPABILITY // 0{index + 1}
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#8e8e95] group-hover:text-[#bc7155] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
