const skillCategories = [
  {
    category: "Voice & Conversational AI",
    skills: ["VAPI", "Retell AI", "GoHighLevel Conversation AI (Ava)", "OpenAI GPT-4o", "Claude 3.5 Sonnet", "Google Gemini Flash", "Webhooks & Tool Calling"]
  },
  {
    category: "Automation & Orchestration",
    skills: ["GoHighLevel Workflows", "n8n (Self-Hosted)", "Make.com (Integromat)", "Zapier", "Python / FastAPI", "Docker", "Cron / Cloud Functions"]
  },
  {
    category: "CRM & Pipeline Infrastructure",
    skills: ["GoHighLevel Certified Admin", "Custom Fields & Tags", "Opportunity Stages", "Smart Lists", "Calendar Routing", "Twilio & LC Phone", "Mailgun / SendGrid"]
  },
  {
    category: "Data, Backend & APIs",
    skills: ["Supabase / PostgreSQL", "Google Sheets API", "Meta Graph APIs (IG & FB)", "Telegram Bot API", "Slack API", "REST / GraphQL", "pandas / openpyxl"]
  },
  {
    category: "E-Commerce & Operations",
    skills: ["Shopify Integration", "Stripe Billing", "Inventory Demand Forecasting", "Order Webhooks", "Fulfil.io", "Airtable Systems"]
  },
  {
    category: "Lead Acquisition & Outreach",
    skills: ["LinkedIn Sales Navigator", "Instantly.ai", "Domain Warming & DNS", "Lead Scoring Logic", "Multi-Channel Follow-up"]
  }
];

const uploadAsset = (fileName: string) => `${import.meta.env.BASE_URL}lovable-uploads/${fileName}`;

const toolLogos = [
  { name: "GoHighLevel", logo: uploadAsset("0340a356-7341-4d91-862e-5c9c3cab01a6.png") },
  { name: "n8n", logo: uploadAsset("c63b961b-4b50-4cb6-b67f-81379d4ddf08.png") },
  { name: "Make.com", logo: uploadAsset("f15c7435-1271-49b9-bdad-f8a3d32a0d96.png") },
  { name: "Zapier", logo: uploadAsset("30c27be1-6af6-4eab-90b2-91c98060f650.png") },
  { name: "Supabase", logo: uploadAsset("9350b8c6-c661-4b02-83e9-104503868b53.png") },
  { name: "Shopify", logo: uploadAsset("1ff04e66-8787-43cc-8330-a31015e5fb5f.png") },
  { name: "Stripe", logo: uploadAsset("b5921b0a-1425-4503-9614-12d902642cf8.png") },
  { name: "Twilio", logo: uploadAsset("5e34f1ab-63df-40f7-a73c-06850eeaefc7.png") },
  { name: "Airtable", logo: uploadAsset("07fe4fb3-fe96-49d0-b139-0661d025aac4.png") },
  { name: "Slack", logo: uploadAsset("729b14df-7b5c-478f-a162-f79980da1ac1.png") },
  { name: "Asana", logo: uploadAsset("0430b2e9-867b-484e-b727-9f05b427238a.png") },
  { name: "Canva", logo: uploadAsset("b69b54a6-4046-48ad-b1c8-1709499985e7.png") }
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 sm:px-8 bg-white dark:bg-[#000d10] border-t border-[#d5d3d4] dark:border-white/10">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#bc7155] mb-2 block">
            Tools &amp; Technologies
          </span>
          <h2 className="section-headline mb-4">
            Ecosystem &amp; Stack.
          </h2>
          <p className="text-lg sm:text-[19px] text-[#8e8e95] max-w-2xl leading-[1.61]">
            Verified tools and production environments deployed across enterprise CRM automation, voice systems, and backend pipelines.
          </p>
        </div>

        {/* Endless Scroll Tools Logo Bar */}
        <div className="mb-20 py-8 border-y border-[#d5d3d4] dark:border-white/10 overflow-hidden relative">
          <div className="flex animate-tools-scroll space-x-12 w-max items-center">
            {[...toolLogos, ...toolLogos, ...toolLogos].map((tool, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-5 py-3 rounded-full border border-[#d5d3d4] dark:border-white/10 bg-white dark:bg-[#151623] hover:border-[#000d10] dark:hover:border-white transition-colors cursor-default select-none shadow-sm"
              >
                <img
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  className="h-6 w-6 object-contain transition-all"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <span className="text-sm font-bold text-[#000d10] dark:text-white tracking-tight">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Categorized Skills 2-Column Architectural Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillCategories.map((group, index) => (
            <div key={index} className="pt-6 hairline-top space-y-4">
              <h3 className="text-lg font-bold tracking-tight text-[#000d10] dark:text-white flex items-center justify-between">
                <span>{group.category}</span>
                <span className="text-xs font-mono text-[#8e8e95]">0{index + 1}</span>
              </h3>

              <div className="flex flex-wrap gap-2 pt-1">
                {group.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-medium px-3.5 py-1.5 rounded-full border border-[#d5d3d4] dark:border-white/15 text-[#000d10] dark:text-white bg-transparent hover:border-[#000d10] dark:hover:border-white transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
