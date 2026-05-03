import { Link, useLocation } from "wouter";
import { ChevronRight } from "lucide-react";
import { navConfig, type NavSection } from "@/lib/nav-config";
import { Footer } from "@/components/Footer";

type Props = {
  section: NavSection;
  children: React.ReactNode;
  pageTitle: string;
  breadcrumb?: string;
};

export function PageLayout({ section, children, pageTitle, breadcrumb }: Props) {
  const [location] = useLocation();

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-3">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={section.path} className="hover:text-secondary transition-colors">{section.label}</Link>
            {breadcrumb && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-secondary">{breadcrumb}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold">{pageTitle}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Sub-Nav */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-28">
              <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-primary px-5 py-3">
                  <p className="text-primary-foreground font-bold text-sm uppercase tracking-wider">{section.label}</p>
                </div>
                <nav className="py-2">
                  {section.items.map((item) => {
                    const isActive = location === item.path || location === item.path + "/";
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-200 border-l-4 ${
                          isActive
                            ? "border-secondary bg-secondary/10 text-primary font-bold"
                            : "border-transparent text-muted-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/30"
                        }`}
                      >
                        {isActive && <ChevronRight className="w-3 h-3 text-secondary flex-shrink-0" />}
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
