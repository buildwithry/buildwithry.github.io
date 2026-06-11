import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Lightbulb } from "lucide-react";
import automationIcon from "@/assets/automation-icon.png";
import adrianPhoto from "/lovable-uploads/892fb2d8-1fb5-4b9c-9831-7db3e194f5e9.png";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <h1 className="font-ubuntu text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                I help businesses 
                <span className="text-gradient block">
                  automate workflows
                </span>
                and scale effortlessly
              </h1>
              
              <p className="font-colfax text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Specialist in <span className="font-semibold text-primary">GoHighLevel</span>, <span className="font-semibold text-primary">Zapier</span>, <span className="font-semibold text-primary">Make</span>, and <span className="font-semibold text-primary">n8n</span> — building AI-powered workflows that cut costs, eliminate errors, and drive revenue 24/7.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button size="lg" className="text-lg px-8 py-6 hover-lift bg-primary hover:bg-primary-hover text-primary-foreground font-semibold" onClick={() => {
              const element = document.querySelector("#contact");
              if (element) {
                element.scrollIntoView({
                  behavior: 'smooth'
                });
              }
            }}>
                Work With Me
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 hover-lift border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold" onClick={() => window.open('https://calendly.com/buildwithry/30min', '_blank')}>
                Book a Free Strategy Call
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-primary mb-1">500+</h3>
                <p className="text-muted-foreground font-medium">Hours Saved</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-primary mb-1">95%</h3>
                <p className="text-muted-foreground font-medium">Error Reduction</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-primary mb-1">$2M+</h3>
                <p className="text-muted-foreground font-medium">Revenue Generated</p>
              </div>
            </div>
          </div>
          
          {/* Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group cursor-pointer">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
              
              {/* Main photo container */}
              <div className="relative overflow-hidden rounded-2xl shadow-strong group-hover:shadow-xl transition-all duration-300 hover-lift">
                <img src={adrianPhoto} alt="Adrian - Automation Specialist" className="w-96 h-auto object-contain group-hover:scale-105 transition-transform duration-300" />
                
                {/* HighLevel Badge */}
                <div className="absolute top-4 left-4">
                  <a
                    href="https://directory.gohighlevel.com/pila/certified-admins/adrian-agdan?from=badge"
                    title="Find me on HighLevel Directory"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-background/90 backdrop-blur-sm border border-border px-3 py-1.5 shadow-md hover:scale-105 transition-transform duration-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-xs font-semibold text-foreground">HighLevel Certified Admin</span>
                  </a>
                </div>
                
                {/* AHA moment thinking icon */}
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  <div className="relative">
                    {/* Radiating lines */}
                    <div className="absolute inset-0 animate-pulse">
                    </div>
                    
                    {/* Main icon container */}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;