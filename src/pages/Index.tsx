import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const { pathname } = useLocation();

  useEffect(() => {
    const sectionIdByPath: Record<string, string> = {
      "/case-studies": "casestudies",
      "/skills": "skills",
      "/framework": "process",
      "/contact": "contact",
    };
    const sectionId = sectionIdByPath[pathname];

    if (!sectionId) return;

    const frame = window.requestAnimationFrame(() => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      window.scrollTo({
        top: Math.max(0, section.getBoundingClientRect().top + window.scrollY - 88),
        behavior: "auto",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

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
