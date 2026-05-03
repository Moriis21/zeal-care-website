import { type ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Users, Heart, Settings, LogOut,
  Menu, ChevronRight, Mail, MessageSquare, FileText,
} from "lucide-react";

type NavItem = { path: string; label: string; icon: React.FC<{ className?: string }> };

const NAV: NavItem[] = [
  { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/children", label: "Children", icon: Users },
  { path: "/admin/donations", label: "Donations", icon: Heart },
  { path: "/admin/messages", label: "Messages", icon: MessageSquare },
  { path: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { path: "/admin/content", label: "Page Content", icon: FileText },
  { path: "/admin/settings", label: "Email Settings", icon: Settings },
];

function logout() {
  localStorage.removeItem("zc_admin_token");
  window.location.href = "/admin";
}

interface AdminLayoutProps {
  children: ReactNode;
  unreadMessages?: number;
}

export function AdminLayout({ children, unreadMessages = 0 }: AdminLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeNav = NAV.find((n) => location === n.path || location.startsWith(n.path + "/"));

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#061A32] text-white flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Zeal Care"
              className="h-9 w-auto object-contain flex-shrink-0"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
                const fallback = el.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div
              className="w-9 h-9 rounded-full bg-[#F5C619] items-center justify-center font-black text-[#061A32] text-lg flex-shrink-0"
              style={{ display: "none" }}
            >
              Z
            </div>
            <div>
              <p className="font-black text-sm leading-tight">ZEAL CARE</p>
              <p className="text-white/40 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV.map(({ path, label, icon: Icon }) => {
            const active = location === path || location.startsWith(path + "/");
            const isMessages = path === "/admin/messages";
            return (
              <Link
                key={path}
                href={path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-[#1A44C0] text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {isMessages && unreadMessages > 0 && !active && (
                  <span className="bg-[#F5C619] text-[#061A32] text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {unreadMessages > 99 ? "99+" : unreadMessages}
                  </span>
                )}
                {active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all">
            <ChevronRight className="w-4 h-4 rotate-180" />
            View Website
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-black text-[#061A32] text-lg">
              {activeNav?.label ?? "Admin"}
            </h1>
          </div>
          {unreadMessages > 0 && (
            <Link href="/admin/messages" className="flex items-center gap-1.5 text-xs font-bold text-[#1A44C0] bg-[#1A44C0]/10 px-3 py-1.5 rounded-full hover:bg-[#1A44C0]/20 transition-colors">
              <MessageSquare className="w-3.5 h-3.5" />
              {unreadMessages} unread
            </Link>
          )}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            Admin
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
