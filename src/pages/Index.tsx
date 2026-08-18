import { useState } from "react";

const projects = [
  { title: "AI Job Hunter", year: "2024", category: "AUTOMATION", image: "/portfolio/lovable-uploads/project-ai-job-hunter.svg" },
  { title: "Hermes", year: "2024", category: "INTELLIGENCE", image: "/portfolio/lovable-uploads/project-nous-hermes.svg" },
  { title: "Inventory OS", year: "2023", category: "COMMERCE", image: "/portfolio/lovable-uploads/project-shopify-inventory.svg" },
  { title: "Ava Receptionist", year: "2023", category: "VOICE SYSTEMS", image: "/portfolio/lovable-uploads/vapi-ai-receptionist.jpg" },
  { title: "GHL Conversation AI", year: "2023", category: "CONVERSATIONAL", image: "/portfolio/lovable-uploads/ghl-conversation-ai-ava.jpg" },
  { title: "ASMR Video Creator", year: "2022", category: "GENERATIVE MEDIA", image: "/portfolio/lovable-uploads/asmr-ai-video-creator-thumbnail.png" },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="portfolio-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Build with RY home">buildwithry</a>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
          <a href="#archive" onClick={() => setMenuOpen(false)}>WORK</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a>
          <a href="mailto:hello@buildwithry.com" className="nav-cta">GET IN TOUCH</a>
        </nav>
        <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <p className="micro-label hero-index">US / WW <span>—</span> 2025</p>
        <h1 id="hero-title" className="hero-title"><span>BUILD</span><span>WITH RY</span></h1>
        <div className="hero-object" aria-hidden="true">
          <div className="object-ring" />
          <div className="object-core">RY</div>
        </div>
        <div className="hero-caption">
          <p>INDEPENDENT DIGITAL DESIGNER &amp; BUILDER.<br />AUTOMATION, INTELLIGENCE, AND USEFUL THINGS.</p>
          <p className="micro-label">SCROLL TO EXPLORE</p>
        </div>
      </section>

      <section className="intro" id="about">
        <p className="micro-label">ABOUT / 001</p>
        <p className="intro-copy">I DESIGN AND BUILD SYSTEMS THAT TURN COMPLEX IDEAS INTO SIMPLE, WORKING EXPERIENCES. FROM AI PRODUCTS TO AUTOMATED OPERATIONS, EACH PROJECT IS AN EXERCISE IN MAKING THE FUTURE FEEL USEFUL.</p>
        <span className="intro-mark">RY®</span>
      </section>

      <section className="archive" id="archive" aria-labelledby="archive-title">
        <div className="archive-header">
          <p className="micro-label">ARCHIVE / SELECTED WORK</p>
          <p className="micro-label">06 PROJECTS</p>
        </div>
        <h2 id="archive-title" className="sr-only">Selected work</h2>
        <div className="project-list">
          {projects.map((project, index) => (
            <a className="project-row" href={project.image} target="_blank" rel="noreferrer" key={project.title}>
              <span className="project-number">0{index + 1}</span>
              <span className="project-title">{project.title}</span>
              <span className="project-year">{project.year}</span>
              <span className="project-category">{project.category}</span>
              <span className="project-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <p className="micro-label">CONTACT / 002</p>
        <a className="contact-link" href="mailto:hello@buildwithry.com">LET&apos;S MAKE<br />SOMETHING.</a>
        <div className="contact-meta"><span>BUILDWITHRY</span><a href="mailto:hello@buildwithry.com">HELLO@BUILDWITHRY.COM</a><span>© 2025</span></div>
      </section>
    </main>
  );
};

export default Index;
