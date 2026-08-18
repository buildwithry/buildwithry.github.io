import Navigation from "@/components/portfolio/Navigation";
import Hero from "@/components/portfolio/Hero";
import Projects from "@/components/portfolio/Projects";
import Services from "@/components/portfolio/Services";
import Skills from "@/components/portfolio/Skills";
import Experience from "@/components/portfolio/Experience";
import Contact from "@/components/portfolio/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#000d10] text-[#000d10] dark:text-white transition-colors duration-300">
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <Services />
        <Skills />
        <Experience />
      </main>
      <Contact />
    </div>
  );
};

export default Index;
