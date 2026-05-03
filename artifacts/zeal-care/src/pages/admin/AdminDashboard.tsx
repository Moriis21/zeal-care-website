import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Users, Heart, DollarSign, TrendingUp, BookOpen, UserCheck, MessageSquare } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Link } from "wouter";

type Stats = {
  totalCount: number;
  totalAmount: number;
  childrenSponsored: number;
  totalChildren: number;
  availableChildren: number;
  recentDonations: {
    id: string;
    donorName: string;
    amount: number;
    method: string;
    childName?: string;
    timestamp: string;
  }[];
};

type Message = { id: string; read: boolean; name: string; email: string; subject?: string; timestamp: string };

const METHOD_LABEL: Record<string, string> = {
  mobile: "Mobile Money",
  bank: "Bank Transfer",
  card: "Card",
  other: "Other",
};

export default function AdminDashboard() {
  const { checked, authHeaders } = useAdminAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!checked) return;
    Promise.all([
      fetch("/api/admin/stats", { headers: authHeaders }).then((r) => r.json()),
      fetch("/api/admin/messages", { headers: authHeaders }).then((r) => r.json()),
    ]).then(([s, m]) => {
      setStats(s as Stats);
      setMessages(m as Message[]);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [checked]);

  const unreadCount = messages.filter((m) => !m.read).length;
  const recentUnread = messages.filter((m) => !m.read).slice(0, 3);

  if (!checked || loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#1A44C0]" />
        </div>
      </AdminLayout>
    );
  }

  const cards = [
    { label: "Total Donations", value: stats?.totalCount ?? 0, icon: Heart, color: "bg-rose-50 text-rose-600", suffix: "" },
    { label: "Amount Raised", value: stats?.totalAmount ?? 0, icon: DollarSign, color: "bg-green-50 text-green-600", prefix: "$" },
    { label: "Children Sponsored", value: stats?.childrenSponsored ?? 0, icon: UserCheck, color: "bg-blue-50 text-blue-600", suffix: "" },
    { label: "Profiles Available", value: stats?.availableChildren ?? 0, icon: Users, color: "bg-amber-50 text-amber-600", suffix: "" },
    { label: "Total Profiles", value: stats?.totalChildren ?? 0, icon: BookOpen, color: "bg-purple-50 text-purple-600", suffix: "" },
    { label: "Avg Donation", value: stats && stats.totalCount > 0 ? Math.round(stats.totalAmount / stats.totalCount) : 0, icon: TrendingUp, color: "bg-indigo-50 text-indigo-600", prefix: "$" },
  ];

  return (
    <AdminLayout unreadMessages={unreadCount}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-[#061A32] mb-1">Overview</h2>
          <p className="text-slate-500 text-sm">Live stats from the Zeal Care website</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div key={card.label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-black text-[#061A32]">
                {card.prefix}{card.value.toLocaleString()}{card.suffix}
              </p>
              <p className="text-slate-400 text-xs font-semibold mt-0.5">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Donations */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="font-black text-[#061A32]">Recent Donations</h3>
            </div>
            {!stats?.recentDonations.length ? (
              <div className="px-6 py-8 text-center text-slate-400 text-sm">No donations recorded yet.</div>
            ) : (
              <div className="divide-y divide-slate-50">
                {stats.recentDonations.map((d) => (
                  <div key={d.id} className="px-6 py-4 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#F5C619]/20 flex items-center justify-center font-black text-[#061A32] text-sm flex-shrink-0">
                      {(d.donorName || "A")[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-[#061A32] truncate">{d.donorName || "Anonymous"}</p>
                      <p className="text-xs text-slate-400">
                        {METHOD_LABEL[d.method] ?? d.method}
                        {d.childName ? ` · Sponsoring ${d.childName}` : ""}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-[#1A44C0]">${d.amount.toLocaleString()}</p>
                      <p className="text-xs text-slate-400">{new Date(d.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Unread Messages */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-[#061A32] flex items-center gap-2">
                Contact Messages
                {unreadCount > 0 && (
                  <span className="bg-[#1A44C0] text-white text-xs font-black px-2 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </h3>
              <Link href="/admin/messages" className="text-xs font-bold text-[#1A44C0] hover:underline">
                View all →
              </Link>
            </div>
            {messages.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <MessageSquare className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">No messages yet.</p>
                <p className="text-slate-300 text-xs mt-1">Messages from the contact form will appear here.</p>
              </div>
            ) : unreadCount === 0 ? (
              <div className="px-6 py-8 text-center">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-2">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-slate-500 text-sm font-semibold">All caught up!</p>
                <p className="text-slate-400 text-xs mt-1">{messages.length} message{messages.length !== 1 ? "s" : ""} total, all read.</p>
                <Link href="/admin/messages" className="inline-block mt-3 text-xs font-bold text-[#1A44C0] hover:underline">
                  View all messages →
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {recentUnread.map((m) => (
                  <Link key={m.id} href="/admin/messages">
                    <div className="px-6 py-4 flex items-center gap-3 hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="w-2 h-2 rounded-full bg-[#1A44C0] flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-sm text-[#061A32] truncate">{m.name}</p>
                        <p className="text-xs text-slate-400 truncate">{m.subject ?? m.email}</p>
                      </div>
                      <p className="text-xs text-slate-400 flex-shrink-0">
                        {new Date(m.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </div>
                  </Link>
                ))}
                {unreadCount > 3 && (
                  <div className="px-6 py-3 text-center">
                    <Link href="/admin/messages" className="text-xs font-bold text-[#1A44C0] hover:underline">
                      +{unreadCount - 3} more unread message{unreadCount - 3 !== 1 ? "s" : ""} →
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
