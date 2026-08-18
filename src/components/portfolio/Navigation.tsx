import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#projects", label: "Case Studies" },
    { href: "#services", label: "Capabilities" },
    { href: "#skills", label: "Ecosystem" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-[#000d10]/90 backdrop-blur-md border-b border-[#d5d3d4]/60 dark:border-white/10 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group flex items-baseline tracking-tight font-bold text-xl sm:text-2xl text-[#000d10] dark:text-white"
        >
          <span>BUILD WITH RY</span>
          <span className="text-xs font-normal text-[#8e8e95] ml-1 group-hover:text-[#bc7155] transition-colors">®</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="text-[17px] font-medium text-[#8e8e95] hover:text-[#000d10] dark:hover:text-white transition-colors tracking-tight"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions Zone */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border border-[#d5d3d4] dark:border-white/20 flex items-center justify-center text-[#000d10] dark:text-white hover:bg-[#000d10] hover:text-white dark:hover:bg-white dark:hover:text-[#000d10] transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => window.open("https://calendly.com/buildwithry/30min", "_blank")}
            className="btn-pill-dark group text-sm sm:text-[16px] py-2.5 px-5"
          >
            <span>Book a Strategy Call</span>
            <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border border-[#d5d3d4] dark:border-white/20 flex items-center justify-center text-[#000d10] dark:text-white"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded-full bg-[#000d10] dark:bg-white text-white dark:text-[#000d10] flex items-center justify-center"
            aria-label="Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-[#d5d3d4] dark:border-white/10 bg-white dark:bg-[#000d10] px-6 py-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left text-lg font-medium text-[#000d10] dark:text-white py-2 border-b border-[#d5d3d4]/30 dark:border-white/5"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              window.open("https://calendly.com/buildwithry/30min", "_blank");
              setIsOpen(false);
            }}
            className="btn-pill-dark w-full py-3 mt-4 text-center justify-center"
          >
            <span>Book a Strategy Call</span>
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
    </header>
  );
};

export default Navigation;
