import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Loader2, Plus, Pencil, Trash2, X, CheckCircle, Users } from "lucide-react";

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
  joinedYear: number;
  avatarColor: string;
};

const AVATAR_COLORS = ["#1A44C0", "#7C3AED", "#059669", "#DC2626", "#D97706", "#DB2777", "#0891B2", "#16A34A", "#EA580C", "#BE185D"];

const EMPTY: Omit<Child, "id"> = {
  name: "", age: 10, grade: "", school: "", location: "Monrovia, Liberia",
  story: "", needs: [], isSponsored: false, joinedYear: new Date().getFullYear(), avatarColor: "#1A44C0",
};

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave({ ...form, needs: needsInput.split(",").map((s) => s.trim()).filter(Boolean) });
    setSaving(false);
  };

  const inp = (label: string, key: keyof Child, type = "text") => (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1">{label}</label>
      <input
        type={type}
        value={String(form[key] ?? "")}
        onChange={(e) => setForm((f) => ({ ...f, [key]: type === "number" ? Number(e.target.value) : e.target.value }))}
        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1A44C0]"
        required={key === "name"}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-black text-[#061A32]">{child?.id ? "Edit Child" : "Add New Child"}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {inp("Full Name *", "name")}
            {inp("Age", "age", "number")}
            {inp("Grade", "grade")}
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
                  className={`w-8 h-8 rounded-full transition-all ${form.avatarColor === c ? "ring-2 ring-offset-2 ring-[#061A32] scale-110" : ""}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, isSponsored: !f.isSponsored }))}
              className={`relative w-10 h-5 rounded-full transition-colors ${form.isSponsored ? "bg-green-500" : "bg-slate-200"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.isSponsored ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
            <span className="text-sm font-semibold text-slate-600">Already Sponsored</span>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-slate-200 rounded-xl py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={saving} className="flex-[2] bg-[#F5C619] text-[#061A32] rounded-xl py-2.5 text-sm font-black hover:bg-[#F5C619]/90 flex items-center justify-center gap-2 disabled:opacity-60">
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

  const filtered = children.filter(
    (c) => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.school.toLowerCase().includes(search.toLowerCase())
  );
  const sponsored = children.filter((c) => c.isSponsored).length;

  return (
    <AdminLayout>
      {modal !== false && (
        <ChildModal child={modal} onClose={() => setModal(false)} onSave={handleSave} />
      )}

      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1">
            <h2 className="text-2xl font-black text-[#061A32]">Children Profiles</h2>
            <p className="text-slate-400 text-sm">{children.length} total · {sponsored} sponsored · {children.length - sponsored} available</p>
          </div>
          <input
            placeholder="Search by name or school…"
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

        {loading ? (
          <div className="flex items-center justify-center h-48"><Loader2 className="w-7 h-7 animate-spin text-[#1A44C0]" /></div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Users className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 font-semibold">{search ? "No matches found." : "No children profiles yet."}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((child) => (
              <div key={child.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="h-20 flex items-center px-5 gap-4" style={{ background: `linear-gradient(135deg,${child.avatarColor}22,${child.avatarColor}55)` }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-2xl text-white flex-shrink-0" style={{ backgroundColor: child.avatarColor }}>
                    {child.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-[#061A32] truncate">{child.name}</p>
                    <p className="text-xs text-slate-500">{child.grade} · Age {child.age}</p>
                  </div>
                  {child.isSponsored && (
                    <CheckCircle className="w-5 h-5 text-green-500 ml-auto flex-shrink-0" />
                  )}
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs text-slate-400 font-medium mb-1">{child.school}</p>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">{child.story}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setModal(child)}
                      className="flex items-center gap-1.5 border border-slate-200 text-slate-600 px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors flex-1 justify-center"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    {deleteConfirm === child.id ? (
                      <div className="flex gap-1 flex-1">
                        <button onClick={() => handleDelete(child.id)} className="flex-1 bg-red-500 text-white px-3 py-2 rounded-xl text-xs font-bold">Confirm</button>
                        <button onClick={() => setDeleteConfirm(null)} className="flex-1 bg-slate-100 text-slate-600 px-3 py-2 rounded-xl text-xs font-bold">Cancel</button>
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
