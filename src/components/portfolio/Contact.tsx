import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin } from "lucide-react";
const Contact = () => {
  return <section id="contact" className="py-20 px-4 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            Let's Work Together
          </h2>
          <p className="text-xl text-muted-foreground">Ready to automate your business processes? Get in touch with me!</p>
        </div>
        
        <div className="flex justify-center">
          <div className="max-w-2xl text-center space-y-8">
            <div>
              
              
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <a href="https://www.upwork.com/freelancers/~018dab48b65b2c0233" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:opacity-80 transition-opacity justify-center sm:justify-start">
                <img src="/lovable-uploads/9f747b14-dd4b-4a75-a1c1-86eb6e38c503.png" alt="Upwork" className="h-6 w-6 object-contain" />
                <div className="text-left">
                  <div className="font-semibold">Upwork</div>
                  <div className="text-muted-foreground">View my Upwork profile</div>
                </div>
              </a>
              
              <a href="https://www.onlinejobs.ph/jobseekers/info/1611430" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:opacity-80 transition-opacity justify-center sm:justify-start">
                <img src="/lovable-uploads/aaf7be47-a9c5-4bf6-9986-5f137ce5cfb4.png" alt="OnlineJobs.ph" className="h-6 w-6 object-contain" />
                <div className="text-left">
                  <div className="font-semibold">OnlineJobs.ph</div>
                  <div className="text-muted-foreground">View my OnlineJobs.ph profile</div>
                </div>
              </a>
              
              <a href="https://www.linkedin.com/in/adrianryan-/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:opacity-80 transition-opacity justify-center sm:justify-start">
                <img src="/lovable-uploads/034df8e8-1c76-419e-9cc9-373df97b9259.png" alt="LinkedIn" className="h-6 w-6 object-contain" />
                <div className="text-left">
                  <div className="font-semibold">LinkedIn</div>
                  <div className="text-muted-foreground">Connect with me for opportunities</div>
                </div>
              </a>
              
              <a href="mailto:adrian@buildwithry.com" className="flex items-center gap-4 hover:opacity-80 transition-opacity justify-center sm:justify-start">
                <img src="/lovable-uploads/adcf350d-7554-4ebd-a80b-8287232b45ea.png" alt="Gmail" className="h-6 w-6 object-contain" />
                <div className="text-left">
                  <div className="font-semibold">Email</div>
                  <div className="text-muted-foreground">Send me an email</div>
                </div>
              </a>
            </div>
            
            <div className="flex justify-center mt-8">
              <a href="https://directory.gohighlevel.com/pila/certified-admins/adrian-agdan?from=badge" title="Find me on HighLevel Directory" target="_blank" className="hover:opacity-80 transition-opacity">
                
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;