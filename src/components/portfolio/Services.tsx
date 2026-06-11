import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Bot, Settings, LineChart, Globe, Mail } from "lucide-react";

const services = [
  {
    icon: <Bot className="h-8 w-8" />,
    title: "GoHighLevel Setup & Optimization",
    description: "Complete GHL funnel creation, email campaigns, and pipeline management to maximize your conversion rates."
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Workflow Automation",
    description: "Custom automation workflows using Make.com, Zapier, and n8n to streamline your business processes."
  },
  {
    icon: <Settings className="h-8 w-8" />,
    title: "CRM Integration",
    description: "Seamless integration between your CRM, email marketing, and communication tools for unified operations."
  },
  {
    icon: <LineChart className="h-8 w-8" />,
    title: "Lead Generation Systems",
    description: "LinkedIn outreach campaigns, lead scoring, and automated follow-up sequences that convert."
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "E-commerce Automation",
    description: "Abandoned cart sequences, inventory management, and customer communication automation for online stores."
  },
  {
    icon: <Mail className="h-8 w-8" />,
    title: "Email Marketing Campaigns",
    description: "Strategic email sequences, newsletters, and automated campaigns that engage and convert your audience."
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            What I Can Do
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive automation solutions to scale your business and streamline operations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="glass hover:scale-105 smooth-animation group">
              <CardHeader>
                <div className="text-primary group-hover:scale-110 smooth-animation">
                  {service.icon}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;