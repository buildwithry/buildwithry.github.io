import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Marcus Thompson",
    role: "Marketing Director",
    company: "Digital Marketing Agency",
    content: "Adrian built our AI content creation system using Zapier that completely transformed our workflow. We went from spending hours manually creating social media content to having everything automated across LinkedIn, Instagram, and Facebook. The AI-generated content is consistently high-quality and perfectly formatted for each platform.",
    avatar: "MT",
    rating: 5
  },
  {
    name: "Lisa Rodriguez",
    role: "Managing Partner", 
    company: "Consulting Firm",
    content: "The client onboarding automation Adrian created with Make.com has been a game changer for our business. What used to be a chaotic manual process is now completely streamlined. From the moment a client submits our Google Form, everything flows automatically - database updates, welcome emails, team notifications via Telegram. It's saved us countless hours.",
    avatar: "LR",
    rating: 5
  },
  {
    name: "David Kim",
    role: "Business Owner",
    company: "Small Business",
    content: "Adrian's n8n expense tracking system through Telegram has given me complete visibility into my business expenses. I simply send a message to the bot and get automated daily, weekly, and monthly reports in Google Sheets. No more lost receipts or missed deductions. The ROI was immediate.",
    avatar: "DK",
    rating: 5
  },
  {
    name: "Rachel Foster",
    role: "Sales Manager",
    company: "Sales Organization", 
    content: "The GoHighLevel opportunity management system Adrian designed has dramatically improved our sales process. The conditional workflows automatically handle appointment no-shows and create opportunities for qualified prospects. Our conversion rates have increased significantly since implementation.",
    avatar: "RF",
    rating: 5
  }
];

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null);
  
  // Double the testimonials for seamless loop
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-muted-foreground">
            What my clients say about working with me
          </p>
        </div>
        
        <div 
          className="relative overflow-hidden"
          onMouseEnter={(e) => {
            const slider = e.currentTarget.querySelector('.testimonials-slider') as HTMLElement;
            if (slider && selectedTestimonial === null) {
              slider.style.animationPlayState = 'paused';
            }
          }}
          onMouseLeave={(e) => {
            const slider = e.currentTarget.querySelector('.testimonials-slider') as HTMLElement;
            if (slider && selectedTestimonial === null) {
              slider.style.animationPlayState = 'running';
            }
          }}
        >
          <div className="testimonials-slider flex gap-8 animate-[scroll-right_30s_linear_infinite]">
            {doubledTestimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className={`glass min-w-[400px] max-w-[400px] cursor-pointer transition-all duration-500 ${
                  selectedTestimonial === index 
                    ? 'scale-110 z-10 shadow-2xl' 
                    : 'hover:scale-[1.02]'
                }`}
                onClick={() => {
                  if (selectedTestimonial === index) {
                    setSelectedTestimonial(null);
                    const slider = document.querySelector('.testimonials-slider') as HTMLElement;
                    if (slider) slider.style.animationPlayState = 'running';
                  } else {
                    setSelectedTestimonial(index);
                    const slider = document.querySelector('.testimonials-slider') as HTMLElement;
                    if (slider) slider.style.animationPlayState = 'paused';
                  }
                }}
              >
                <CardContent className="p-6 h-full flex flex-col">
                  <Quote className="h-8 w-8 text-primary/20 mb-4 flex-shrink-0" />
                  <blockquote className="text-muted-foreground leading-relaxed mb-6 flex-grow text-sm">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarImage src="" alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-foreground truncate">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground truncate">{testimonial.role}</div>
                      <div className="text-sm text-primary truncate">{testimonial.company}</div>
                    </div>
                  </div>
                  
                  <div className="flex mt-4 flex-shrink-0">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;