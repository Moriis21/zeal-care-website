import { useEffect, useRef, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Loader2, Plus, Pencil, Trash2, X, CheckCircle, Users,
  HeartHandshake, UserCheck, UserX, Upload, Camera,
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
  photo?: string;
};

const AVATAR_COLORS = [
  "#0B5FA8", "#7C3AED", "#059669", "#DC2626",
  "#D97706", "#DB2777", "#0891B2", "#16A34A", "#EA580C", "#BE185D",
];

const EMPTY: Omit<Child, "id"> = {
  name: "", age: 10, grade: "", school: "", location: "Monrovia, Liberia",
  story: "", needs: [], isSponsored: false, joinedYear: new Date().getFullYear(),
  avatarColor: "#0B5FA8", photo: "",
};

type Tab = "all" | "available" | "sponsored";

const inputCls = "w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B5FA8]";

function PhotoUploader({ url, onChange, token }: {
  url: string;
  onChange: (url: string) => void;
  token: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("photo", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json() as { url?: string };
      if (data.url) onChange(data.url);
    } catch {
      /* silent */
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-2">Profile Photo</label>
      <div className="flex items-start gap-3">
        {/* Preview */}
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200 flex-shrink-0 relative">
          {url ? (
            <img src={url} alt="Preview" className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-1">
              <Camera className="w-6 h-6" />
              <span className="text-xs">No photo</span>
            </div>
          )}
        </div>
        {/* Controls */}
        <div className="flex-1 space-y-2">
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center justify-center gap-1.5 w-full bg-[#0B5FA8] text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-[#0B5FA8]/90 transition-colors disabled:opacity-60"
          >
            {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
            {uploading ? "Uploading…" : "Upload Photo"}
          </button>
          <input
            className={inputCls}
            placeholder="Or paste a photo URL"
            value={url}
            onChange={(e) => onChange(e.target.value)}
          />
          {url && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs text-red-400 hover:text-red-600 font-semibold"
            >
              Remove photo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ChildModal({
  child, onClose, onSave, token,
}: {
  child: Partial<Child> | null;
  onClose: () => void;
  onSave: (data: Partial<Child>) => Promise<void>;
  token: string;
}) {
  const [form, setForm] = useState<Partial<Child>>(child ?? EMPTY);
  const [needsInput, setNeedsInput] = useState((child?.needs ?? []).join(", "));
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "photo" | "sponsorship">("profile");

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
        className={inputCls}
        required={key === "name"}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {form.photo ? (
              <img src={form.photo} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-slate-100"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-lg text-white"
                style={{ backgroundColor: form.avatarColor ?? "#0B5FA8" }}>
                {form.name?.[0] ?? "?"}
              </div>
            )}
            <h3 className="font-black text-[#061A32]">{child?.id ? `Edit — ${child.name}` : "Add New Child"}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 px-6">
          {(["profile", "photo", "sponsorship"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTab(t)}
              className={`py-3 px-4 text-sm font-bold border-b-2 transition-colors capitalize ${
                activeTab === t
                  ? "border-[#0B5FA8] text-[#0B5FA8]"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              {t === "photo" ? "📷 Photo" : t === "sponsorship" ? "Sponsorship" : "Profile"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* PROFILE TAB */}
          {activeTab === "profile" && (
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
                  rows={4}
                  value={form.story ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, story: e.target.value }))}
                  placeholder="The child's background and why they need support…"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B5FA8] resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Needs (comma-separated)</label>
                <input
                  value={needsInput}
                  onChange={(e) => setNeedsInput(e.target.value)}
                  placeholder="e.g. School Fees, Books, Uniform"
                  className={inputCls}
                />
                <p className="text-xs text-slate-400 mt-1">Options: School Fees, Books, Uniform, Meals, Transport, Shoes, Stationery, Counseling, Laptop Access, Exam Fees</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">Avatar Color (fallback when no photo)</label>
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
          )}

          {/* PHOTO TAB */}
          {activeTab === "photo" && (
            <div className="space-y-5">
              <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700">
                The photo appears on the public <strong>Sponsor a Child</strong> section. Upload a clear portrait photo for best results.
              </div>
              <PhotoUploader
                url={form.photo ?? ""}
                onChange={(url) => setForm((f) => ({ ...f, photo: url }))}
                token={token}
              />
              {form.photo && (
                <div className="rounded-2xl overflow-hidden border border-slate-200">
                  <p className="text-xs font-bold text-slate-500 px-3 py-2 bg-slate-50 border-b border-slate-100 uppercase tracking-wide">Live Preview</p>
                  <div className="h-48">
                    <img src={form.photo} alt="Preview" className="w-full h-full object-cover object-top"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SPONSORSHIP TAB */}
          {activeTab === "sponsorship" && (
            <>
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
                    className={inputCls}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Sponsor Date</label>
                    <input
                      type="date"
                      value={form.sponsorDate ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, sponsorDate: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Amount (USD/yr)</label>
                    <input
                      type="number"
                      value={form.sponsorAmount ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, sponsorAmount: Number(e.target.value) }))}
                      placeholder="150"
                      className={inputCls}
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

          <div className="flex gap-3 pt-2 border-t border-slate-100">
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
  const { checked, authHeaders, token: rawToken } = useAdminAuth();
  const token = rawToken ?? "";
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
        method: "PUT",
        headers: { ...authHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/admin/children", {
        method: "POST",
        headers: { ...authHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      headers: { ...authHeaders, "Content-Type": "application/json" },
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
        <ChildModal
          child={modal}
          onClose={() => setModal(false)}
          onSave={handleSave}
          token={token}
        />
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
            className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0B5FA8] w-56"
          />
          <button
            onClick={() => setModal(EMPTY)}
            className="flex items-center gap-2 bg-[#F5C619] text-[#061A32] px-4 py-2.5 rounded-xl text-sm font-black hover:bg-[#F5C619]/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Child
          </button>
        </div>

        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700 flex items-center gap-2">
          <Camera className="w-4 h-4 flex-shrink-0" />
          <span>Each child can have a profile photo that appears on the public <strong>Sponsor a Child</strong> section. Click <strong>Edit</strong> then the <strong>📷 Photo</strong> tab to upload.</span>
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
                  : "bg-white border border-slate-200 text-slate-500 hover:border-[#0B5FA8] hover:text-[#0B5FA8]"
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
            <Loader2 className="w-7 h-7 animate-spin text-[#0B5FA8]" />
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
                {/* Card header — photo or gradient */}
                <div className="relative h-32 overflow-hidden">
                  {child.photo ? (
                    <img src={child.photo} alt={child.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg,${child.avatarColor}22,${child.avatarColor}55)` }}
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center font-black text-3xl text-white"
                        style={{ backgroundColor: child.avatarColor }}
                      >
                        {child.name[0]}
                      </div>
                    </div>
                  )}
                  {child.photo && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  )}
                  {/* Status badge */}
                  <div className="absolute top-2 right-2">
                    {child.isSponsored ? (
                      <span className="flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                        <CheckCircle className="w-3 h-3" /> Sponsored
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 bg-[#F5C619] text-[#061A32] text-xs font-bold px-2.5 py-1 rounded-full shadow">
                        <HeartHandshake className="w-3 h-3" /> Available
                      </span>
                    )}
                  </div>
                  {/* Name overlay when photo */}
                  {child.photo && (
                    <div className="absolute bottom-2 left-3">
                      <p className="text-white font-black text-base drop-shadow">{child.name}</p>
                      <p className="text-white/80 text-xs">{child.grade} · Age {child.age}</p>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="px-4 py-3">
                  {!child.photo && (
                    <div className="mb-1">
                      <p className="font-black text-[#061A32]">{child.name}</p>
                      <p className="text-xs text-slate-500">{child.grade} · Age {child.age}</p>
                    </div>
                  )}
                  <p className="text-xs text-slate-400 font-medium mb-1">{child.school}</p>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">{child.story}</p>

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

                  {/* Needs tags */}
                  {child.needs.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {child.needs.slice(0, 3).map((n) => (
                        <span key={n} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{n}</span>
                      ))}
                      {child.needs.length > 3 && (
                        <span className="text-xs bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full font-medium">+{child.needs.length - 3}</span>
                      )}
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
