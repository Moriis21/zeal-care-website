import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Loader2, Download, Mail, Search, Users } from "lucide-react";

type Subscriber = {
  email: string;
  name?: string;
  subscribedAt: string;
};

export default function AdminNewsletter() {
  const { checked, authHeaders } = useAdminAuth();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!checked) return;
    fetch("/api/admin/newsletter", { headers: authHeaders })
      .then((r) => r.json())
      .then((d) => { setSubscribers(d as Subscriber[]); setLoading(false); })
      .catch(() => setLoading(false));
  }, [checked]);

  const filtered = subscribers.filter(
    (s) =>
      !search ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const exportCsv = () => {
    const rows = [
      ["Name", "Email", "Subscribed Date"],
      ...filtered.map((s) => [
        s.name ?? "",
        s.email,
        new Date(s.subscribedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zeal-care-newsletter-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Group by month
  const byMonth: Record<string, Subscriber[]> = {};
  for (const s of filtered) {
    const key = new Date(s.subscribedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    if (!byMonth[key]) byMonth[key] = [];
    byMonth[key].push(s);
  }

  return (
    <AdminLayout>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1">
            <h2 className="text-2xl font-black text-[#061A32]">Newsletter Subscribers</h2>
            <p className="text-slate-400 text-sm">{subscribers.length} total subscribers</p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#0B5FA8] w-56"
            />
          </div>
          <button
            onClick={exportCsv}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 bg-[#061A32] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0B5FA8] transition-colors disabled:opacity-40"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#0B5FA8]/10 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-[#0B5FA8]" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#061A32]">{subscribers.length}</p>
              <p className="text-xs text-slate-400 font-semibold">Total Subscribers</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#061A32]">
                {subscribers.filter((s) => {
                  const d = new Date(s.subscribedAt);
                  const now = new Date();
                  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                }).length}
              </p>
              <p className="text-xs text-slate-400 font-semibold">This Month</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#061A32]">{Object.keys(byMonth).length}</p>
              <p className="text-xs text-slate-400 font-semibold">Active Months</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-7 h-7 animate-spin text-[#0B5FA8]" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-14 text-center">
            <Mail className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 font-semibold text-sm">
              {search ? "No subscribers match your search." : "No subscribers yet. The newsletter form is live on the website footer."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(byMonth).map(([month, list]) => (
              <div key={month} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <p className="font-black text-sm text-[#061A32]">{month}</p>
                  <span className="text-xs font-bold text-slate-400">{list.length} subscriber{list.length !== 1 ? "s" : ""}</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {list.map((s) => (
                    <div key={s.email} className="px-6 py-3.5 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm text-white flex-shrink-0"
                        style={{ backgroundColor: stringToColor(s.email) }}
                      >
                        {(s.name ?? s.email)[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        {s.name && <p className="font-bold text-sm text-[#061A32] truncate">{s.name}</p>}
                        <p className={`text-sm truncate ${s.name ? "text-slate-400" : "font-bold text-[#061A32]"}`}>{s.email}</p>
                      </div>
                      <p className="text-xs text-slate-400 whitespace-nowrap">
                        {new Date(s.subscribedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function stringToColor(str: string): string {
  const colors = ["#0B5FA8", "#7C3AED", "#059669", "#DC2626", "#D97706", "#DB2777", "#0891B2", "#EA580C"];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}
