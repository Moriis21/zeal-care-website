import { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Send, CheckCircle, Loader2 } from "lucide-react";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json() as { success?: boolean; alreadySubscribed?: boolean; error?: string };
      if (data.success) {
        setStatus("success");
        setMsg(data.alreadySubscribed ? "You're already on our list — thank you!" : "You're in! Watch your inbox for updates.");
        setEmail("");
      } else {
        setStatus("error");
        setMsg(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMsg("Could not connect. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 bg-[#F5C619]/10 border border-[#F5C619]/30 rounded-2xl px-5 py-4">
        <CheckCircle className="w-5 h-5 text-[#F5C619] flex-shrink-0" />
        <p className="text-sm text-white/80 font-semibold">{msg}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F5C619]/50 transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading" || !email}
          className="bg-[#F5C619] text-[#061A32] px-5 py-3 rounded-xl font-black text-sm hover:bg-[#F5C619]/90 transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          Subscribe
        </button>
      </div>
      {status === "error" && (
        <p className="text-red-400 text-xs font-semibold">{msg}</p>
      )}
    </form>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#041224] text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">

        {/* Newsletter bar */}
        <div className="bg-gradient-to-r from-[#1A44C0]/40 to-[#061A32] border border-white/10 rounded-3xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-black text-white mb-1">Stay in the Loop</h3>
              <p className="text-white/50 text-sm">Get monthly updates on our children's progress, new programs, and ways to get involved.</p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="text-2xl font-extrabold flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center">
                Z
              </div>
              ZEAL CARE
            </div>
            <p className="text-primary-foreground/70 mb-6 text-sm leading-relaxed">
              Igniting Potential, Inspiring Change. Empowering Africa's future leaders through education, mentorship, and technology.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all hover:scale-110" data-testid="link-social-facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all hover:scale-110" data-testid="link-social-twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all hover:scale-110" data-testid="link-social-instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all hover:scale-110" data-testid="link-social-linkedin">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-sm mb-6 uppercase tracking-widest text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                ["About Us", "/about"],
                ["Why Empowerment", "/why-empowerment"],
                ["Our Programs", "/what-we-do"],
                ["Impact Stories", "/igniting-potential"],
                ["Media", "/media"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-primary-foreground/60 hover:text-[#F5C619] transition-colors text-sm">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-black text-sm mb-6 uppercase tracking-widest text-white">Get Involved</h4>
            <ul className="space-y-3">
              {[
                ["Sponsor a Child", "#"],
                ["Make a Donation", "#"],
                ["Become a Partner", "#"],
                ["Volunteer with Us", "#"],
                ["Contact Us", "#contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-primary-foreground/60 hover:text-[#F5C619] transition-colors text-sm">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black text-sm mb-6 uppercase tracking-widest text-white">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-primary-foreground/60">
                <span className="mt-0.5">📍</span>
                <span>Monrovia, Liberia</span>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/60">
                <span className="mt-0.5">✉️</span>
                <a href="mailto:info@zealcare.org" className="hover:text-[#F5C619] transition-colors">info@zealcare.org</a>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/60">
                <span className="mt-0.5">📞</span>
                <a href="tel:+231886727619" className="hover:text-[#F5C619] transition-colors">+231 886 727 619</a>
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-primary-foreground/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-primary-foreground/40 text-sm">
          <p>
            &copy; {currentYear} Zeal Care. All rights reserved. Monrovia, Liberia.
            <a href="/admin" className="ml-1 text-primary-foreground/15 hover:text-primary-foreground/35 transition-colors select-none" title="Admin">·</a>
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-foreground/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground/70 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
