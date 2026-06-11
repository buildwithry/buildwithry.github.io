import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X, Moon, Sun } from "lucide-react";
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
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "#services", label: "Services" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Case Studies" }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass py-2' : 'py-4'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <h1 className="font-anonymous text-xl font-bold text-foreground flex items-center gap-2 tracking-wider relative z-10 overflow-hidden whitespace-nowrap border-r-2 border-white/75 animate-typewriter">
                BUILD WITH RY
                <Zap className="h-6 w-6 text-primary animate-zap-glow cursor-pointer" />
              </h1>
              {/* Crack effects */}
              <div className="absolute inset-0 pointer-events-none animate-crack-flash">
                <div className="absolute top-1/2 left-1/4 w-px h-3 bg-primary/60 rotate-45 transform -translate-y-1/2"></div>
                <div className="absolute top-1/3 right-1/4 w-px h-4 bg-primary/40 -rotate-12 transform"></div>
                <div className="absolute bottom-1/3 left-1/3 w-px h-2 bg-primary/50 rotate-75 transform"></div>
                <div className="absolute top-2/3 right-1/3 w-px h-3 bg-primary/30 -rotate-45 transform"></div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="font-colfax text-muted-foreground hover:text-primary smooth-animation font-medium"
              >
                {item.label}
              </button>
            ))}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 lightning-btn relative overflow-hidden group"
              onClick={() => window.open('https://calendly.com/buildwithry/30min', '_blank')}
            >
              <span className="relative z-10">Book a Call</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left font-colfax text-muted-foreground hover:text-primary smooth-animation font-medium py-2"
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 w-full text-left font-colfax text-muted-foreground hover:text-primary smooth-animation font-medium py-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              {theme === "dark" ? 'Light Mode' : 'Dark Mode'}
            </button>
            
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full mt-4 lightning-btn relative overflow-hidden group"
              onClick={() => window.open('https://calendly.com/buildwithry/30min', '_blank')}
            >
              <span className="relative z-10">Book a Call</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;