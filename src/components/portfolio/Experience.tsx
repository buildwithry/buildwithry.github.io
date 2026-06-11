import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "GHL Specialist & Automation Consultant",
    company: "Romea.AI",
    period: "Oct 2025 - Jan 2026",
    location: "Remote",
    type: "Full-Time",
    achievements: [
      "GHL onboarding setup and GHL workflow automations",
      "Conducted GHL training for clients needing to learn more about the CRM",
      "Webhook entry points automation in GHL",
      "Calendars and chat widget setup",
      "Pipeline setup and configuration"
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
      "Manual outreach on Facebook and LinkedIn",
      "Instantly cold email setup and management",
      "Automation via GoHighLevel"
    ],
    technologies: ["Facebook", "LinkedIn", "Instantly", "GoHighLevel"]
  },
  {
    title: "E-Commerce/GHL Admin",
    company: "Cookware Company",
    period: "Dec 2023 - Mar 2025",
    location: "Los Angeles, US",
    type: "Full-Time",
    achievements: [
      "Built and optimized HighLevel email campaigns and abandoned cart sequences",
      "Created and managed funnels, forms, and tagging systems for targeted marketing",
      "Set up and maintained pipelines and appointment calendars for sales teams",
      "Configured automation workflows to streamline order follow-ups and returns",
      "Ensured all assets were mobile-responsive and client-ready",
      "Managed inventory shipment coordination and customer order resolution"
    ],
    technologies: ["GoHighLevel", "Email Marketing", "Funnel Creation", "CRM Management"]
  },
  {
    title: "Lead Gen/Appointment VA",
    company: "AI Software",
    period: "2022 - 2023",
    location: "Singapore",
    type: "Virtual Assistant",
    achievements: [
      "Coordinated calendars and scheduled discovery calls, webinars, and coaching sessions",
      "Generated leads from LinkedIn Sales Navigator",
      "Set up and managed LinkedIn outreach campaigns",
      "Organized client materials, intake forms, and progress tracking documents",
      "Applied empathetic messaging strategies to improve connection rates",
      "Assisted in CRM migrations and tool integrations",
      "Supported social media content scheduling"
    ],
    technologies: ["LinkedIn Sales Navigator", "CRM Systems", "Social Media Management"]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            Work Experience
          </h2>
          <p className="text-xl text-muted-foreground">
            Building automation solutions across diverse industries
          </p>
        </div>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="glass hover:scale-[1.02] smooth-animation">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl md:text-2xl">{exp.title}</CardTitle>
                    <CardDescription className="text-lg font-semibold text-primary">
                      {exp.company}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant="secondary" className="w-fit">
                      {exp.type}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{achievement}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tech}
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

export default Experience;