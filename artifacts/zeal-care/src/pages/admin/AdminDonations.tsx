import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Loader2, Download, Zap, Phone, User, Mail, Calendar, DollarSign } from "lucide-react";

type DonationRecord = {
  id: string;
  amount: number;
  donorName: string;
  donorEmail: string;
  method: string;
  momoPhone?: string;
  childName?: string;
  message?: string;
  timestamp: string;
};

const METHOD_LABEL: Record<string, string> = {
  mobile: "Mobile Money",
  momo: "MTN MoMo",
  bank: "Bank Transfer",
  card: "Card",
  other: "Other",
};

const METHOD_COLOR: Record<string, string> = {
  mobile: "bg-green-100 text-green-700",
  momo: "bg-yellow-100 text-yellow-800",
  bank: "bg-blue-100 text-blue-700",
  card: "bg-purple-100 text-purple-700",
  other: "bg-slate-100 text-slate-600",
};

type Tab = "all" | "momo";

export default function AdminDonations() {
  const { checked, authHeaders } = useAdminAuth();
  const [records, setRecords] = useState<DonationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("all");

  useEffect(() => {
    if (!checked) return;
    fetch("/api/admin/donations", { headers: authHeaders })
      .then((r) => r.json())
      .then((data) => { setRecords(data as DonationRecord[]); setLoading(false); })
      .catch(() => setLoading(false));
  }, [checked]);

  const momoInterests = records.filter((r) => r.method === "momo");
  const allDonations = records.filter((r) => r.method !== "momo");

  const filtered = (tab === "momo" ? momoInterests : allDonations).filter((r) =>
    !search ||
    r.donorName.toLowerCase().includes(search.toLowerCase()) ||
    r.donorEmail.toLowerCase().includes(search.toLowerCase()) ||
    (r.momoPhone ?? "").includes(search) ||
    (r.childName ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const total = filtered.reduce((sum, r) => sum + r.amount, 0);

  const exportCsv = () => {
    const isMomo = tab === "momo";
    const headers = isMomo
      ? ["Date", "Name", "Email", "MoMo Number", "Intended Amount", "Message"]
      : ["Date", "Donor", "Email", "Amount", "Method", "Child", "Message"];
    const rows = [
      headers,
      ...filtered.map((r) =>
        isMomo
          ? [
              new Date(r.timestamp).toLocaleDateString(),
              r.donorName || "Anonymous",
              r.donorEmail || "",
              r.momoPhone || "",
              `$${r.amount}`,
              r.message ?? "",
            ]
          : [
              new Date(r.timestamp).toLocaleDateString(),
              r.donorName || "Anonymous",
              r.donorEmail || "",
              `$${r.amount}`,
              METHOD_LABEL[r.method] ?? r.method,
              r.childName ?? "",
              r.message ?? "",
            ]
      ),
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isMomo
      ? `momo-interests-${new Date().toISOString().slice(0, 10)}.csv`
      : `zeal-care-donations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1">
            <h2 className="text-2xl font-black text-[#061A32]">Donation Log</h2>
            <p className="text-slate-400 text-sm">{records.length} total records</p>
          </div>
          <input
            placeholder="Search donor, email, phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A44C0] w-64"
          />
          <button
            onClick={exportCsv}
            className="flex items-center gap-2 bg-[#061A32] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1A44C0] transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-200">
          <button
            onClick={() => setTab("all")}
            className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors ${
              tab === "all"
                ? "border-[#1A44C0] text-[#1A44C0]"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            All Donations
            <span className="ml-2 bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">
              {allDonations.length}
            </span>
          </button>
          <button
            onClick={() => setTab("momo")}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold border-b-2 transition-colors ${
              tab === "momo"
                ? "border-yellow-500 text-yellow-700"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Zap className="w-4 h-4" />
            MTN MoMo Interests
            {momoInterests.length > 0 && (
              <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-0.5 rounded-full font-black">
                {momoInterests.length}
              </span>
            )}
          </button>
        </div>

        {/* MoMo tab banner */}
        {tab === "momo" && (
          <div className="bg-yellow-50 border border-yellow-300 rounded-2xl px-5 py-4 flex gap-3 items-start">
            <Zap className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-yellow-900 text-sm">MTN MoMo API — Pending Integration</p>
              <p className="text-yellow-800 text-xs mt-0.5 leading-relaxed">
                These donors registered their interest while the MTN MoMo API is being set up. Once your credentials are approved at{" "}
                <a href="https://momodeveloper.mtn.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                  momodeveloper.mtn.com
                </a>
                , you can notify them and send payment requests directly to their phones. Export the list below to reach out.
              </p>
            </div>
          </div>
        )}

        {/* Summary cards */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
              <p className="text-2xl font-black text-[#061A32]">{filtered.length}</p>
              <p className="text-xs text-slate-400 font-semibold">
                {tab === "momo" ? "Registered Interests" : "Donations"}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
              <p className="text-2xl font-black text-[#1A44C0]">${total.toLocaleString()}</p>
              <p className="text-xs text-slate-400 font-semibold">
                {tab === "momo" ? "Intended Amount" : "Total Amount"}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
              <p className="text-2xl font-black text-green-600">
                {tab === "momo"
                  ? `${momoInterests.filter((r) => r.momoPhone).length}`
                  : `$${filtered.length ? Math.round(total / filtered.length) : 0}`}
              </p>
              <p className="text-xs text-slate-400 font-semibold">
                {tab === "momo" ? "With Phone Numbers" : "Average"}
              </p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-7 h-7 animate-spin text-[#1A44C0]" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
            {search
              ? "No results match your search."
              : tab === "momo"
              ? "No MTN MoMo interests registered yet. They will appear here when donors select the MTN MoMo option in the donate modal."
              : "No donations recorded yet. They will appear here after donors complete the payment flow."}
          </div>
        ) : tab === "momo" ? (
          /* ---- MoMo Interests Card Grid ---- */
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {filtered.map((r) => (
              <div
                key={r.id}
                className="bg-white border border-yellow-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-yellow-700" />
                    </div>
                    <div>
                      <p className="font-black text-[#061A32] text-sm leading-tight">
                        {r.donorName || "Anonymous"}
                      </p>
                      <p className="text-xs text-slate-400">
                        {new Date(r.timestamp).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <span className="text-lg font-black text-yellow-700">${r.amount.toLocaleString()}</span>
                </div>

                {/* Details */}
                <div className="space-y-1.5">
                  {r.momoPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-yellow-600 flex-shrink-0" />
                      <span className="text-sm font-bold text-[#061A32]">{r.momoPhone}</span>
                      <a
                        href={`tel:${r.momoPhone}`}
                        className="ml-auto text-[10px] font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full hover:bg-yellow-200 transition-colors"
                      >
                        Call
                      </a>
                    </div>
                  )}
                  {r.donorEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <a
                        href={`mailto:${r.donorEmail}`}
                        className="text-xs text-slate-500 hover:text-[#1A44C0] transition-colors truncate"
                      >
                        {r.donorEmail}
                      </a>
                    </div>
                  )}
                  {!r.momoPhone && !r.donorEmail && (
                    <p className="text-xs text-slate-400 italic">No contact details provided</p>
                  )}
                </div>

                {/* Footer badge */}
                <div className="mt-3 pt-3 border-t border-yellow-100 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-yellow-500" />
                  <span className="text-[11px] text-yellow-700 font-semibold">
                    Awaiting MTN MoMo API activation
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ---- Standard Donations Table ---- */
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-5 py-3 font-bold text-slate-500 text-xs uppercase tracking-wide">Date</th>
                    <th className="text-left px-5 py-3 font-bold text-slate-500 text-xs uppercase tracking-wide">Donor</th>
                    <th className="text-left px-5 py-3 font-bold text-slate-500 text-xs uppercase tracking-wide">Amount</th>
                    <th className="text-left px-5 py-3 font-bold text-slate-500 text-xs uppercase tracking-wide">Method</th>
                    <th className="text-left px-5 py-3 font-bold text-slate-500 text-xs uppercase tracking-wide">Child</th>
                    <th className="text-left px-5 py-3 font-bold text-slate-500 text-xs uppercase tracking-wide">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">
                        {new Date(r.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-bold text-[#061A32]">{r.donorName || "Anonymous"}</p>
                        {r.donorEmail && <p className="text-xs text-slate-400">{r.donorEmail}</p>}
                      </td>
                      <td className="px-5 py-3.5 font-black text-[#1A44C0]">${r.amount.toLocaleString()}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${METHOD_COLOR[r.method] ?? "bg-slate-100 text-slate-600"}`}>
                          {METHOD_LABEL[r.method] ?? r.method}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">{r.childName ?? "—"}</td>
                      <td className="px-5 py-3.5 text-slate-400 max-w-[180px] truncate">{r.message ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
