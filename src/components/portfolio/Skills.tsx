import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const skillCategories = [
  {
    category: "Automation Platforms",
    skills: ["GoHighLevel", "Make.com", "Zapier", "n8n", "ActiveCampaign"]
  },
  {
    category: "CRM & Marketing",
    skills: ["Kajabi", "MyCRMsim", "Mailgun", "Instantly.ai", "Email Marketing"]
  },
  {
    category: "Communication & Support",
    skills: ["Twilio", "Slack", "Google Suite", "Customer Support"]
  },
  {
    category: "E-commerce & Analytics",
    skills: ["Shopify", "Stripe", "Fulfil.io", "Inventory Management"]
  },
  {
    category: "Design & Productivity",
    skills: ["Canva", "Airtable", "Miro", "Social Media Management"]
  },
  {
    category: "Lead Generation",
    skills: ["LinkedIn Sales Navigator", "Lead Scoring", "Outreach Campaigns"]
  }
];

const uploadAsset = (fileName: string) => `${import.meta.env.BASE_URL}lovable-uploads/${fileName}`;

const toolLogos: Array<{ name: string; logo: string; isImage?: boolean; color?: string }> = [
  { name: "Make", logo: uploadAsset("f15c7435-1271-49b9-bdad-f8a3d32a0d96.png"), isImage: true },
  { name: "Zapier", logo: uploadAsset("30c27be1-6af6-4eab-90b2-91c98060f650.png"), isImage: true },
  { name: "GoHighLevel", logo: uploadAsset("0340a356-7341-4d91-862e-5c9c3cab01a6.png"), isImage: true },
  { name: "n8n", logo: uploadAsset("c63b961b-4b50-4cb6-b67f-81379d4ddf08.png"), isImage: true },
  { name: "Supabase", logo: uploadAsset("9350b8c6-c661-4b02-83e9-104503868b53.png"), isImage: true },
  { name: "Airtable", logo: uploadAsset("07fe4fb3-fe96-49d0-b139-0661d025aac4.png"), isImage: true },
  { name: "Shopify", logo: uploadAsset("1ff04e66-8787-43cc-8330-a31015e5fb5f.png"), isImage: true },
  { name: "Stripe", logo: uploadAsset("b5921b0a-1425-4503-9614-12d902642cf8.png"), isImage: true },
  { name: "Twilio", logo: uploadAsset("5e34f1ab-63df-40f7-a73c-06850eeaefc7.png"), isImage: true },
  { name: "Canva", logo: uploadAsset("b69b54a6-4046-48ad-b1c8-1709499985e7.png"), isImage: true },
  { name: "Slack", logo: uploadAsset("729b14df-7b5c-478f-a162-f79980da1ac1.png"), isImage: true },
  { name: "Asana", logo: uploadAsset("0430b2e9-867b-484e-b727-9f05b427238a.png"), isImage: true }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            Skills and Tools
          </h2>
          <p className="text-xl text-muted-foreground">
            Tools and platforms I use to deliver exceptional automation solutions
          </p>
        </div>

        {/* Animated Tools Logos */}
        <div className="mb-16">
          <div className="relative overflow-hidden py-8">
            <div className="flex animate-scroll-right space-x-6 w-max">
              {[...toolLogos, ...toolLogos].map((tool, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 group cursor-pointer"
                  title={tool.name}
                >
                  <div className="bg-white rounded-2xl p-4 hover:shadow-xl smooth-animation hover:scale-110 border border-border/60 flex flex-col items-center justify-center gap-2 w-32 h-32">
                    <div className="flex-1 flex items-center justify-center w-full">
                      <img
                        src={tool.logo}
                        alt={`${tool.name} logo`}
                        loading="lazy"
                        className="max-h-14 max-w-[80%] object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 truncate max-w-full">
                      {tool.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="glass hover:scale-105 smooth-animation">
              <CardHeader>
                <CardTitle className="text-lg text-primary">{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <Badge 
                      key={idx} 
                      variant="secondary" 
                      className="hover:bg-primary hover:text-primary-foreground smooth-animation cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;