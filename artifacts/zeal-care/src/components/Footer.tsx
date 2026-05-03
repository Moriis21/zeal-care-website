import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#041224] text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="text-2xl font-extrabold flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center">
                Z
              </div>
              ZEAL CARE
            </div>
            <p className="text-primary-foreground/70 mb-6">
              Igniting Potential, Inspiring Change. Empowering Africa's future leaders through education, mentorship, and technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors" data-testid="link-social-facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors" data-testid="link-social-twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors" data-testid="link-social-instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors" data-testid="link-social-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-primary-foreground/70 hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="#why-empowerment" className="text-primary-foreground/70 hover:text-secondary transition-colors">Why Empowerment</a></li>
              <li><a href="#programs" className="text-primary-foreground/70 hover:text-secondary transition-colors">Our Programs</a></li>
              <li><a href="#stories" className="text-primary-foreground/70 hover:text-secondary transition-colors">Impact Stories</a></li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Get Involved</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">Sponsor a Child</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">Become a Partner</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">Volunteer with Us</a></li>
              <li><a href="#contact" className="text-primary-foreground/70 hover:text-secondary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-4 text-primary-foreground/70">
              <li>Monrovia, Liberia</li>
              <li>info@zealcare.org</li>
              <li>+231 886 727 619</li>
            </ul>
          </div>

        </div>

        <hr className="border-primary-foreground/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-primary-foreground/50 text-sm">
          <p>&copy; {currentYear} Zeal Care. All rights reserved. Monrovia, Liberia.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}