import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Loader2, Plus, Pencil, Trash2, X, CheckCircle, Users,
  HeartHandshake, UserCheck, UserX,
} from "lucide-react";

type Child = {
  id: string;
  name: string;
  age: number;
  grade: string;
  school: string;
  location: string;
  story: string;
  needs: string[];
  isSponsored: boolean;
  sponsorName?: string;
  sponsorDate?: string;
  sponsorAmount?: number;
  joinedYear: number;
  avatarColor: string;
};

const AVATAR_COLORS = [
  "#1A44C0", "#7C3AED", "#059669", "#DC2626",
  "#D97706", "#DB2777", "#0891B2", "#16A34A", "#EA580C", "#BE185D",
];

const EMPTY: Omit<Child, "id"> = {
  name: "", age: 10, grade: "", school: "", location: "Monrovia, Liberia",
  story: "", needs: [], isSponsored: false, joinedYear: new Date().getFullYear(), avatarColor: "#1A44C0",
};

type Tab = "all" | "available" | "sponsored";

function ChildModal({
  child, onClose, onSave,
}: {
  child: Partial<Child> | null;
  onClose: () => void;
  onSave: (data: Partial<Child>) => Promise<void>;
}) {
  const [form, setForm] = useState<Partial<Child>>(child ?? EMPTY);
  const [needsInput, setNeedsInput] = useState((child?.needs ?? []).join(", "));
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "sponsorship">("profile");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave({ ...form, needs: needsInput.split(",").map((s) => s.trim()).filter(Boolean) });
    setSaving(false);
  };

  const inp = (label: string, key: keyof Child, type = "text", placeholder = "") => (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1">{label}</label>
      <input
        type={type}
        value={String(form[key] ?? "")}
        onChange={(e) =>
          setForm((f) => ({ ...f, [key]: type === "number" ? Number(e.target.value) : e.target.value }))
        }
        placeholder={placeholder}
        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1A44C0]"
        required={key === "name"}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-black text-[#061A32]">{child?.id ? `Edit — ${child.name}` : "Add New Child"}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 px-6">
          {(["profile", "sponsorship"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTab(t)}
              className={`py-3 px-4 text-sm font-bold border-b-2 transition-colors capitalize ${
                activeTab === t
                  ? "border-[#1A44C0] text-[#1A44C0]"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              {t === "sponsorship" ? "Sponsorship" : "Profile"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {activeTab === "profile" ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                {inp("Full Name *", "name")}
                {inp("Age", "age", "number")}
                {inp("Grade", "grade", "text", "e.g. Grade 5")}
                {inp("School", "school")}
                {inp("Location", "location")}
                {inp("Joined Year", "joinedYear", "number")}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Story</label>
                <textarea
                  rows={3}
                  value={form.story ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, story: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1A44C0] resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Needs (comma-separated)</label>
                <input
                  value={needsInput}
                  onChange={(e) => setNeedsInput(e.target.value)}
                  placeholder="e.g. School Fees, Books, Uniform"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1A44C0]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">Avatar Color</label>
                <div className="flex gap-2 flex-wrap">
                  {AVATAR_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, avatarColor: c }))}
                      className={`w-8 h-8 rounded-full transition-all ${
                        form.avatarColor === c ? "ring-2 ring-offset-2 ring-[#061A32] scale-110" : ""
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Sponsorship tab */}
              <div className="bg-slate-50 rounded-2xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-[#061A32]">Sponsorship Status</p>
                    <p className="text-xs text-slate-400">Toggle whether this child has a sponsor</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, isSponsored: !f.isSponsored }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      form.isSponsored ? "bg-green-500" : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                        form.isSponsored ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold ${
                  form.isSponsored
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-50 text-amber-600"
                }`}>
                  {form.isSponsored
                    ? <><CheckCircle className="w-4 h-4" /> This child has an active sponsor</>
                    : <><HeartHandshake className="w-4 h-4" /> Available for sponsorship</>
                  }
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Sponsor Name</label>
                  <input
                    value={form.sponsorName ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, sponsorName: e.target.value }))}
                    placeholder="e.g. John & Mary Smith"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1A44C0]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Sponsor Date</label>
                    <input
                      type="date"
                      value={form.sponsorDate ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, sponsorDate: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1A44C0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Amount (USD/yr)</label>
                    <input
                      type="number"
                      value={form.sponsorAmount ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, sponsorAmount: Number(e.target.value) }))}
                      placeholder="150"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1A44C0]"
                    />
                  </div>
                </div>
              </div>

              {form.isSponsored && !form.sponsorName && (
                <p className="text-xs text-amber-600 bg-amber-50 rounded-xl px-3 py-2">
                  Tip: Add the sponsor's name and date so you can track who sponsors each child.
                </p>
              )}
            </>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-slate-200 rounded-xl py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-[2] bg-[#F5C619] text-[#061A32] rounded-xl py-2.5 text-sm font-black hover:bg-[#F5C619]/90 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {child?.id ? "Save Changes" : "Add Child"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminChildren() {
  const { checked, authHeaders } = useAdminAuth();
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<Partial<Child> | null | false>(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("all");

  const reload = () =>
    fetch("/api/admin/children", { headers: authHeaders })
      .then((r) => r.json())
      .then((d) => setChildren(d as Child[]));

  useEffect(() => {
    if (!checked) return;
    reload().finally(() => setLoading(false));
  }, [checked]);

  const handleSave = async (data: Partial<Child>) => {
    if (modal && (modal as Child).id) {
      await fetch(`/api/admin/children/${(modal as Child).id}`, {
        method: "PUT", headers: authHeaders, body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/admin/children", {
        method: "POST", headers: authHeaders, body: JSON.stringify(data),
      });
    }
    await reload();
    setModal(false);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/children/${id}`, { method: "DELETE", headers: authHeaders });
    await reload();
    setDeleteConfirm(null);
  };

  const handleToggleSponsored = async (child: Child) => {
    await fetch(`/api/admin/children/${child.id}`, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify({ isSponsored: !child.isSponsored }),
    });
    await reload();
  };

  const sponsored = children.filter((c) => c.isSponsored).length;
  const available = children.length - sponsored;

  const tabFiltered = children.filter((c) => {
    if (tab === "sponsored") return c.isSponsored;
    if (tab === "available") return !c.isSponsored;
    return true;
  });

  const filtered = tabFiltered.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.school.toLowerCase().includes(search.toLowerCase()) ||
      (c.sponsorName ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const TABS: { key: Tab; label: string; count: number; icon: typeof Users }[] = [
    { key: "all", label: "All", count: children.length, icon: Users },
    { key: "available", label: "Available", count: available, icon: HeartHandshake },
    { key: "sponsored", label: "Sponsored", count: sponsored, icon: UserCheck },
  ];

  return (
    <AdminLayout>
      {modal !== false && (
        <ChildModal child={modal} onClose={() => setModal(false)} onSave={handleSave} />
      )}

      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1">
            <h2 className="text-2xl font-black text-[#061A32]">Children Profiles</h2>
            <p className="text-slate-400 text-sm">
              {children.length} total · {sponsored} sponsored · {available} available
            </p>
          </div>
          <input
            placeholder="Search by name, school, sponsor…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A44C0] w-56"
          />
          <button
            onClick={() => setModal(EMPTY)}
            className="flex items-center gap-2 bg-[#F5C619] text-[#061A32] px-4 py-2.5 rounded-xl text-sm font-black hover:bg-[#F5C619]/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Child
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {TABS.map(({ key, label, count, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === key
                  ? "bg-[#061A32] text-white"
                  : "bg-white border border-slate-200 text-slate-500 hover:border-[#1A44C0] hover:text-[#1A44C0]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-black ${
                  tab === key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-7 h-7 animate-spin text-[#1A44C0]" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Users className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 font-semibold">
              {search ? "No matches found." : tab === "sponsored" ? "No sponsored children yet." : "No children profiles yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((child) => (
              <div
                key={child.id}
                className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${
                  child.isSponsored ? "border-green-200" : "border-slate-200"
                }`}
              >
                {/* Card header */}
                <div
                  className="h-20 flex items-center px-5 gap-4"
                  style={{ background: `linear-gradient(135deg,${child.avatarColor}22,${child.avatarColor}55)` }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-black text-2xl text-white flex-shrink-0"
                    style={{ backgroundColor: child.avatarColor }}
                  >
                    {child.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-black text-[#061A32] truncate">{child.name}</p>
                    <p className="text-xs text-slate-500">{child.grade} · Age {child.age}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {child.isSponsored ? (
                      <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        <CheckCircle className="w-3.5 h-3.5" /> Sponsored
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        <HeartHandshake className="w-3.5 h-3.5" /> Available
                      </span>
                    )}
                  </div>
                </div>

                {/* Card body */}
                <div className="px-5 py-4">
                  <p className="text-xs text-slate-400 font-medium mb-1">{child.school}</p>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-2">{child.story}</p>

                  {/* Sponsor info */}
                  {child.isSponsored && child.sponsorName && (
                    <div className="bg-green-50 rounded-xl px-3 py-2 mb-3 text-xs text-green-700 font-semibold flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">
                        {child.sponsorName}
                        {child.sponsorDate ? ` · ${new Date(child.sponsorDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}` : ""}
                        {child.sponsorAmount ? ` · $${child.sponsorAmount}/yr` : ""}
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setModal(child)}
                      className="flex items-center gap-1.5 border border-slate-200 text-slate-600 px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors flex-1 justify-center"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleSponsored(child)}
                      title={child.isSponsored ? "Mark as available" : "Mark as sponsored"}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                        child.isSponsored
                          ? "border border-slate-200 text-slate-500 hover:bg-slate-50"
                          : "border border-green-200 text-green-600 hover:bg-green-50"
                      }`}
                    >
                      {child.isSponsored ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                    </button>
                    {deleteConfirm === child.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleDelete(child.id)}
                          className="bg-red-500 text-white px-3 py-2 rounded-xl text-xs font-bold"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="bg-slate-100 text-slate-600 px-3 py-2 rounded-xl text-xs font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(child.id)}
                        className="flex items-center gap-1.5 border border-red-200 text-red-500 px-3 py-2 rounded-xl text-xs font-bold hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
