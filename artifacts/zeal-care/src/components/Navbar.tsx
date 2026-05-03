import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Mail, Phone, MapPin, ChevronDown, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navConfig } from "@/lib/nav-config";
import { useDonate } from "@/context/DonateContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileSection(null);
    setOpenSection(null);
  }, [location]);

  const handleMouseEnter = (label: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenSection(label);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setOpenSection(null), 120);
  };

  const { openDonate } = useDonate();
  const isHomePage = location === "/" || location === "";
  const navBg = isScrolled ? "bg-white shadow-md" : isHomePage ? "bg-transparent" : "bg-primary";
  const textColor = isScrolled ? "text-primary" : "text-white";
  const hoverColor = "hover:text-secondary";

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Utility Bar */}
      {!isScrolled && (
        <div className="bg-primary/90 backdrop-blur-sm text-white text-xs py-2 px-4 border-b border-white/10">
          <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-5">
              <a href="mailto:info@zealcare.org" className="flex items-center gap-1.5 hover:text-secondary transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">info@zealcare.org</span>
              </a>
              <a href="tel:+231886727619" className="flex items-center gap-1.5 hover:text-secondary transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">+231 886 727 619</span>
              </a>
              <span className="hidden md:flex items-center gap-1.5 text-white/70">
                <MapPin className="w-3.5 h-3.5" />
                Monrovia, Liberia
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/profile.php?id=61561063778243" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-secondary transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
              <a href="https://www.instagram.com/zealcare2024" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-secondary transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
              <a href="https://www.linkedin.com/company/zeal-care" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-secondary transition-colors"><Linkedin className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        </div>
      )}

      {/* Main Nav */}
      <nav className={`transition-all duration-300 ${navBg} ${isScrolled ? "py-3" : "py-4"}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className={`flex items-center gap-2.5 font-extrabold text-xl ${textColor} hover:opacity-90 transition-opacity`} data-testid="link-logo">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-lg ${isScrolled ? "bg-primary text-white" : "bg-secondary text-primary"}`}>Z</div>
            <span>ZEAL CARE</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-1">
            {navConfig.map((section) => {
              const isActive = location.startsWith(section.path);
              return (
                <div
                  key={section.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(section.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={section.path}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${textColor} ${hoverColor} ${isActive ? "text-secondary" : ""}`}
                  >
                    {section.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openSection === section.label ? "rotate-180" : ""}`} />
                  </Link>

                  {/* Dropdown Panel */}
                  {openSection === section.label && (
                    <div
                      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                      onMouseEnter={() => handleMouseEnter(section.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="bg-primary px-4 py-2.5">
                        <p className="text-white text-xs font-bold uppercase tracking-widest">{section.label}</p>
                      </div>
                      <div className="py-1.5">
                        {section.items.map((item) => {
                          const itemActive = location === item.path;
                          return (
                            <Link
                              key={item.path}
                              href={item.path}
                              className={`flex items-center px-4 py-2.5 text-sm transition-all duration-150 ${itemActive ? "bg-primary/5 text-primary font-bold border-l-4 border-secondary" : "text-gray-700 hover:bg-primary/5 hover:text-primary font-medium border-l-4 border-transparent"}`}
                            >
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <Button
              onClick={() => openDonate()}
              className="ml-2 bg-secondary text-primary hover:bg-secondary/90 rounded-full px-5 text-sm font-bold"
              data-testid="button-donate"
            >
              DONATE NOW
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`xl:hidden p-2 rounded-lg transition-colors ${isScrolled ? "text-primary hover:bg-primary/10" : "text-white hover:bg-white/10"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-gray-100 shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="container mx-auto px-4 py-3 space-y-1">
              {navConfig.map((section) => (
                <div key={section.label}>
                  <button
                    onClick={() => setOpenMobileSection(openMobileSection === section.label ? null : section.label)}
                    className="w-full flex items-center justify-between px-3 py-3 text-sm font-semibold text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    {section.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${openMobileSection === section.label ? "rotate-180" : ""}`} />
                  </button>
                  {openMobileSection === section.label && (
                    <div className="ml-4 mb-2 border-l-2 border-secondary/30 pl-3 space-y-0.5">
                      {section.items.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors font-medium"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 pb-2">
                <Button
                  onClick={() => { setIsMobileMenuOpen(false); openDonate(); }}
                  className="w-full bg-secondary text-primary hover:bg-secondary/90 rounded-full font-bold"
                >
                  DONATE NOW
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
