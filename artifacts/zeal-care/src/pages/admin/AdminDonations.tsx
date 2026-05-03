import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Loader2, Download } from "lucide-react";

type DonationRecord = {
  id: string;
  amount: number;
  donorName: string;
  donorEmail: string;
  method: string;
  childName?: string;
  message?: string;
  timestamp: string;
};

const METHOD_LABEL: Record<string, string> = {
  mobile: "Mobile Money",
  bank: "Bank Transfer",
  card: "Card",
  other: "Other",
};

const METHOD_COLOR: Record<string, string> = {
  mobile: "bg-green-100 text-green-700",
  bank: "bg-blue-100 text-blue-700",
  card: "bg-purple-100 text-purple-700",
  other: "bg-slate-100 text-slate-600",
};

export default function AdminDonations() {
  const { checked, authHeaders } = useAdminAuth();
  const [records, setRecords] = useState<DonationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!checked) return;
    fetch("/api/admin/donations", { headers: authHeaders })
      .then((r) => r.json())
      .then((data) => { setRecords(data as DonationRecord[]); setLoading(false); })
      .catch(() => setLoading(false));
  }, [checked]);

  const filtered = records.filter((r) =>
    !search ||
    r.donorName.toLowerCase().includes(search.toLowerCase()) ||
    r.donorEmail.toLowerCase().includes(search.toLowerCase()) ||
    (r.childName ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const total = filtered.reduce((sum, r) => sum + r.amount, 0);

  const exportCsv = () => {
    const rows = [
      ["Date", "Donor", "Email", "Amount", "Method", "Child", "Message"],
      ...filtered.map((r) => [
        new Date(r.timestamp).toLocaleDateString(),
        r.donorName || "Anonymous",
        r.donorEmail || "",
        `$${r.amount}`,
        METHOD_LABEL[r.method] ?? r.method,
        r.childName ?? "",
        r.message ?? "",
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zeal-care-donations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1">
            <h2 className="text-2xl font-black text-[#061A32]">Donation Log</h2>
            <p className="text-slate-400 text-sm">{records.length} total records</p>
          </div>
          <input
            placeholder="Search donor, email, child…"
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

        {/* Summary */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
              <p className="text-2xl font-black text-[#061A32]">{filtered.length}</p>
              <p className="text-xs text-slate-400 font-semibold">Donations</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
              <p className="text-2xl font-black text-[#1A44C0]">${total.toLocaleString()}</p>
              <p className="text-xs text-slate-400 font-semibold">Total Amount</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
              <p className="text-2xl font-black text-green-600">${filtered.length ? Math.round(total / filtered.length) : 0}</p>
              <p className="text-xs text-slate-400 font-semibold">Average</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-7 h-7 animate-spin text-[#1A44C0]" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
            {search ? "No results match your search." : "No donations recorded yet. They will appear here after donors complete the payment flow."}
          </div>
        ) : (
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
