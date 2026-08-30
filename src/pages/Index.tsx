import Preloader from "@/components/Preloader";
import Navigation from "@/components/portfolio/Navigation";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";
import Projects from "@/components/portfolio/Projects";
import Funnels from "@/components/portfolio/Funnels";
import Services from "@/components/portfolio/Services";
import Events from "@/components/portfolio/Events";
import Process from "@/components/portfolio/Process";
import FAQ from "@/components/portfolio/FAQ";
import Testimonials from "@/testimonials/Testimonials";
import Contact from "@/components/portfolio/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#000d10] text-[#000d10] dark:text-white transition-colors duration-300">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Preloader />
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        <ParallaxComponent />
        <Projects />
        <Services />
        <Process />
        <Testimonials />
        <Funnels />
        <Events />
        <FAQ />
      </main>
      <Contact />
    </div>
  );
};

export default Index;
