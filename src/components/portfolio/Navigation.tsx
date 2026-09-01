import { useState, useEffect, type MouseEvent } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#casestudies", label: "Case Studies" },
    { href: "#skills", label: "Skills" },
    { href: "#process", label: "Framework" },
    { href: "#contact", label: "Contact" },
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    window.history.pushState(null, "", href);
    window.scrollTo({
      top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - 88),
      behavior: "auto",
    });
    closeMenu();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08090a]/90 backdrop-blur-md border-b border-[#23252a] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "auto" });
          }}
          className="group flex items-baseline tracking-tight font-medium text-xl sm:text-2xl text-white"
        >
          <span>BUILD WITH RY</span>
          <span className="text-xs font-normal text-[#8a8f98] ml-1 group-hover:text-[#f1eadc] transition-colors">™</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => navigateToSection(event, item.href)}
              className="text-[15px] font-normal text-[#8a8f98] hover:text-white transition-colors tracking-tight"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions Zone */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://calendly.com/buildwithry/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group text-sm sm:text-[14px] py-2.5 px-5"
          >
            <span>Book a Strategy Call</span>
            <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn-icon-circle"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div id="mobile-navigation" className="lg:hidden border-b border-[#23252a] bg-[#08090a] px-6 py-6 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => navigateToSection(event, item.href)}
              className="block w-full text-left text-lg font-normal text-white py-2 border-b border-[#23252a]/50"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://calendly.com/buildwithry/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="btn-primary w-full py-3 mt-4 text-center justify-center"
          >
            <span>Book a Strategy Call</span>
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      )}
    </header>
  );
};

export default Navigation;
