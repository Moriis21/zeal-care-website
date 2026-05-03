import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about" },
    { name: "Why Empowerment", id: "why-empowerment" },
    { name: "Programs", id: "programs" },
    { name: "Stories", id: "stories" },
    { name: "Join Us", id: "join-us" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Utility Bar */}
      <div className={`bg-primary text-primary-foreground text-sm py-2 px-4 transition-all duration-300 ${isScrolled ? 'hidden' : 'block'}`}>
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <a href="mailto:info@zealcare.org" className="flex items-center gap-2 hover:text-secondary transition-colors" data-testid="link-email">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">info@zealcare.org</span>
            </a>
            <a href="tel:+231886727619" className="flex items-center gap-2 hover:text-secondary transition-colors" data-testid="link-phone">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">+231 886 727 619</span>
            </a>
          </div>
          <div className="flex items-center gap-2" data-testid="text-location">
            <MapPin className="w-4 h-4" />
            <span>Monrovia &bull; Liberia</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`transition-all duration-300 ${isScrolled ? 'bg-background shadow-md py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
            className={`text-2xl font-extrabold flex items-center gap-2 ${isScrolled ? 'text-primary' : 'text-primary-foreground'}`}
            data-testid="link-logo"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isScrolled ? 'bg-primary text-primary-foreground' : 'bg-secondary text-primary'}`}>
              Z
            </div>
            ZEAL CARE
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-medium hover:text-secondary transition-colors ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}
                data-testid={`link-nav-${link.id}`}
              >
                {link.name}
              </button>
            ))}
            <Button 
              className="bg-secondary text-primary hover:bg-secondary/90 rounded-full px-6 font-bold"
              data-testid="button-donate"
            >
              DONATE NOW
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`lg:hidden p-2 ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background shadow-lg border-t border-border p-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-left text-foreground font-medium py-2 border-b border-border/50"
                data-testid={`link-mobile-nav-${link.id}`}
              >
                {link.name}
              </button>
            ))}
            <Button 
              className="bg-secondary text-primary hover:bg-secondary/90 w-full rounded-full font-bold mt-2"
              data-testid="button-mobile-donate"
            >
              DONATE NOW
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}