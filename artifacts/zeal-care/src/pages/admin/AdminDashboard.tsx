import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Users, Heart, DollarSign, TrendingUp, BookOpen, UserCheck } from "lucide-react";
import { Loader2 } from "lucide-react";

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

const METHOD_LABEL: Record<string, string> = {
  mobile: "Mobile Money",
  bank: "Bank Transfer",
  card: "Card",
  other: "Other",
};

export default function AdminDashboard() {
  const { checked, authHeaders } = useAdminAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!checked) return;
    fetch("/api/admin/stats", { headers: authHeaders })
      .then((r) => r.json())
      .then((data) => { setStats(data as Stats); setLoading(false); })
      .catch(() => setLoading(false));
  }, [checked]);

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
    <AdminLayout>
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
      </div>
    </AdminLayout>
  );
}
