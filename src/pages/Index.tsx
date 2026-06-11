import Navigation from "@/components/portfolio/Navigation";
import Hero from "@/components/portfolio/Hero";
import Services from "@/components/portfolio/Services";
import Experience from "@/components/portfolio/Experience";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Contact from "@/components/portfolio/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 Build with RY. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
