import { useState, useEffect, useCallback, useRef } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import {
  Settings, Home, BookOpen, Users, Briefcase, Heart, Zap,
  Plus, Pencil, Trash2, Check, X, Save, ChevronDown, ChevronUp,
  Loader2, Upload, UserCog, Images,
} from "lucide-react";
import type { SiteContent, TeamMember, BoardMember, NewsItem, Program, FAQ, GalleryPhoto } from "@/hooks/useSiteContent";
import { DEFAULT_CONTENT } from "@/hooks/useSiteContent";
import { GALLERY_CATEGORIES } from "@/pages/GalleryPage";

type TabId = "settings" | "home" | "about" | "whoWeAre" | "whatWeDo" | "whyEmpowerment" | "ignitingPotential" | "team" | "gallery";

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "team", label: "Team Management", icon: UserCog },
  { id: "gallery", label: "Gallery Photos", icon: Images },
  { id: "settings", label: "Site Settings", icon: Settings },
  { id: "home", label: "Home Page", icon: Home },
  { id: "about", label: "About Page", icon: BookOpen },
  { id: "whoWeAre", label: "Who We Are", icon: Users },
  { id: "whatWeDo", label: "What We Do", icon: Briefcase },
  { id: "whyEmpowerment", label: "Why Empowerment", icon: Heart },
  { id: "ignitingPotential", label: "Igniting Potential", icon: Zap },
];

const inputClass = "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A44C0]/30 focus:border-[#1A44C0]";
const textareaClass = `${inputClass} resize-none`;

function Field({ label, value, onChange, multiline = false, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">{label}</label>
      {multiline ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1A44C0]/30 focus:border-[#1A44C0] transition-colors resize-none" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1A44C0]/30 focus:border-[#1A44C0] transition-colors" />
      )}
    </div>
  );
}

function SectionCard({ title, children, onSave, saving }: {
  title: string; children: React.ReactNode; onSave: () => void; saving: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-[#061A32]">{title}</h3>
        <button onClick={onSave} disabled={saving}
          className="flex items-center gap-2 bg-[#1A44C0] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1A44C0]/90 transition-colors disabled:opacity-60">
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Save
        </button>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}

function CardHeader({ title, onSave, saving }: { title: string; onSave: () => void; saving: boolean }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-bold text-[#061A32]">{title}</h3>
      <button onClick={onSave} disabled={saving}
        className="flex items-center gap-2 bg-[#1A44C0] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1A44C0]/90 transition-colors disabled:opacity-60">
        {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
        Save
      </button>
    </div>
  );
}

function PhotoUploader({ url, onChange, token }: { url: string; onChange: (url: string) => void; token: string }) {
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
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Photo</label>
      <div className="flex items-start gap-3">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
          {url ? (
            <img src={url} alt="Preview" className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 200 200">
                <rect width="200" height="200" fill="#f1f5f9" />
                <circle cx="100" cy="80" r="35" fill="#cbd5e1" />
                <circle cx="100" cy="185" r="60" fill="#cbd5e1" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
            className="flex items-center gap-1.5 bg-[#1A44C0] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#1A44C0]/90 transition-colors disabled:opacity-60 w-full justify-center">
            {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
            {uploading ? "Uploading..." : "Upload Photo"}
          </button>
          <input className={inputClass} placeholder="Or paste a photo URL" value={url}
            onChange={(e) => onChange(e.target.value)} />
        </div>
      </div>
    </div>
  );
}

type AnyItem = Record<string, unknown>;

type ArrayEditorProps = {
  label: string;
  items: AnyItem[];
  onUpdate: (items: AnyItem[]) => void;
  renderItem: (item: AnyItem, idx: number) => React.ReactNode;
  renderForm: (item: AnyItem, onChange: (v: AnyItem) => void) => React.ReactNode;
  defaultItem: AnyItem;
};

function ArrayEditor({ label, items, onUpdate, renderItem, renderForm, defaultItem }: ArrayEditorProps) {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [draft, setDraft] = useState<AnyItem>(defaultItem);

  const startEdit = (idx: number) => { setEditIdx(idx); setDraft({ ...items[idx] }); setAddingNew(false); };
  const cancelEdit = () => { setEditIdx(null); setAddingNew(false); };
  const saveEdit = () => {
    if (editIdx !== null) onUpdate(items.map((it, i) => (i === editIdx ? draft : it)));
    setEditIdx(null);
  };
  const startAdd = () => { setAddingNew(true); setDraft({ ...defaultItem }); setEditIdx(null); };
  const saveAdd = () => { onUpdate([...items, draft]); setAddingNew(false); };
  const remove = (idx: number) => onUpdate(items.filter((_, i) => i !== idx));
  const move = (idx: number, dir: -1 | 1) => {
    const next = [...items];
    const swap = idx + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    onUpdate(next);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label} ({items.length})</label>
        <button onClick={startAdd} className="flex items-center gap-1.5 text-xs font-semibold text-[#1A44C0] hover:text-[#1A44C0]/80 transition-colors">
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
        {items.length === 0 && !addingNew && (
          <div className="px-4 py-6 text-center text-sm text-slate-400">No items yet. Click Add to create one.</div>
        )}
        {items.map((item, idx) => (
          <div key={idx}>
            {editIdx === idx ? (
              <div className="p-4 bg-blue-50 space-y-3">
                {renderForm(draft, setDraft)}
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="flex items-center gap-1.5 bg-[#1A44C0] text-white px-3 py-1.5 rounded-lg text-xs font-semibold"><Check className="w-3 h-3" /> Save</button>
                  <button onClick={cancelEdit} className="flex items-center gap-1.5 text-slate-500 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-100"><X className="w-3 h-3" /> Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50">
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => move(idx, -1)} disabled={idx === 0} className="text-slate-300 hover:text-slate-500 disabled:opacity-20"><ChevronUp className="w-3 h-3" /></button>
                  <button onClick={() => move(idx, 1)} disabled={idx === items.length - 1} className="text-slate-300 hover:text-slate-500 disabled:opacity-20"><ChevronDown className="w-3 h-3" /></button>
                </div>
                <div className="flex-1 min-w-0">{renderItem(item, idx)}</div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => startEdit(idx)} className="p-1.5 text-slate-400 hover:text-[#1A44C0] hover:bg-blue-50 rounded-lg transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => remove(idx)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
        {addingNew && (
          <div className="p-4 bg-blue-50 space-y-3">
            {renderForm(draft, setDraft)}
            <div className="flex gap-2">
              <button onClick={saveAdd} className="flex items-center gap-1.5 bg-[#1A44C0] text-white px-3 py-1.5 rounded-lg text-xs font-semibold"><Check className="w-3 h-3" /> Add</button>
              <button onClick={cancelEdit} className="flex items-center gap-1.5 text-slate-500 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-100"><X className="w-3 h-3" /> Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function teamToAny(t: TeamMember): AnyItem { return t as AnyItem; }
function anyToTeam(a: AnyItem): TeamMember { return a as unknown as TeamMember; }
function boardToAny(b: BoardMember): AnyItem { return b as AnyItem; }
function anyToBoard(a: AnyItem): BoardMember { return a as unknown as BoardMember; }
function newsToAny(n: NewsItem): AnyItem { return n as AnyItem; }
function anyToNews(a: AnyItem): NewsItem { return a as unknown as NewsItem; }
function programToAny(p: Program): AnyItem { return p as AnyItem; }
function anyToProgram(a: AnyItem): Program { return a as unknown as Program; }
function faqToAny(f: FAQ): AnyItem { return f as AnyItem; }
function anyToFaq(a: AnyItem): FAQ { return a as unknown as FAQ; }
function galleryToAny(g: GalleryPhoto): AnyItem { return g as AnyItem; }
function anyToGallery(a: AnyItem): GalleryPhoto { return a as unknown as GalleryPhoto; }

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState<TabId>("team");
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();
  const token = localStorage.getItem("zc_admin_token") ?? "";

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/site-content");
        if (res.ok) {
          const data = await res.json() as SiteContent;
          setContent(data);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveSection = useCallback(async (section: string, data: unknown, label: string) => {
    setSaving(section);
    try {
      const res = await fetch("/api/admin/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ [section]: data }),
      });
      if (!res.ok) throw new Error("Save failed");
      toast({ title: "Saved!", description: `${label} updated successfully.` });
    } catch {
      toast({ title: "Error", description: "Failed to save. Please try again.", variant: "destructive" });
    } finally {
      setSaving(null);
    }
  }, [toast, token]);

  const upd = <K extends keyof SiteContent>(section: K) => (patch: Partial<SiteContent[K]>) =>
    setContent((c) => ({ ...c, [section]: { ...c[section], ...patch } }));

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#1A44C0]" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h2 className="text-xl font-black text-[#061A32]">Content Management</h2>
          <p className="text-slate-500 text-sm mt-1">Edit the text and information shown on every page of the website.</p>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-2 flex-wrap">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === id
                  ? "bg-[#1A44C0] text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}>
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* TEAM MANAGEMENT */}
        {activeTab === "team" && (
          <div className="space-y-5">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 text-sm text-blue-700">
              Changes saved here are immediately reflected on the public <strong>Our Leadership</strong> and <strong>Board of Advisors</strong> pages. Upload a photo or paste a photo URL for each member.
            </div>

            {/* Leadership Team */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <CardHeader title="Leadership Team" onSave={() => void saveSection("whoWeAre", content.whoWeAre, "Leadership Team")} saving={saving === "whoWeAre"} />
              <ArrayEditor
                label="Team Members"
                items={content.whoWeAre.team.map(teamToAny)}
                onUpdate={(items) => upd("whoWeAre")({ team: items.map(anyToTeam) })}
                defaultItem={{ name: "", role: "", bio: "", img: "" } as AnyItem}
                renderItem={(m) => {
                  const tm = anyToTeam(m);
                  return (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                        {tm.img ? (
                          <img src={tm.img} alt={tm.name} className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm font-bold bg-[#061A32] text-[#F5C619]">
                            {tm.name?.[0] ?? "?"}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#061A32]">{tm.name || "Unnamed"}</p>
                        <p className="text-xs text-slate-500">{tm.role || "No role"}</p>
                      </div>
                    </div>
                  );
                }}
                renderForm={(m, set) => {
                  const tm = anyToTeam(m);
                  return (
                    <div className="space-y-3">
                      <PhotoUploader
                        url={tm.img ?? ""}
                        onChange={(url) => set(teamToAny({ ...tm, img: url }))}
                        token={token}
                      />
                      <input className={inputClass} placeholder="Full Name" value={tm.name}
                        onChange={(e) => set(teamToAny({ ...tm, name: e.target.value }))} />
                      <input className={inputClass} placeholder="Role / Title" value={tm.role}
                        onChange={(e) => set(teamToAny({ ...tm, role: e.target.value }))} />
                      <textarea className={textareaClass} placeholder="Biography" rows={4} value={tm.bio}
                        onChange={(e) => set(teamToAny({ ...tm, bio: e.target.value }))} />
                    </div>
                  );
                }}
              />
            </div>

            {/* Board of Advisors */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <CardHeader title="Board of Advisors" onSave={() => void saveSection("whoWeAre", content.whoWeAre, "Board of Advisors")} saving={saving === "whoWeAre"} />
              <ArrayEditor
                label="Board Members"
                items={content.whoWeAre.boardMembers.map(boardToAny)}
                onUpdate={(items) => upd("whoWeAre")({ boardMembers: items.map(anyToBoard) })}
                defaultItem={{ name: "", role: "", bio: "", img: "" } as AnyItem}
                renderItem={(m) => {
                  const bm = anyToBoard(m);
                  return (
                    <div className="flex items-center gap-3">
                      {bm.img ? (
                        <img src={bm.img} alt={bm.name} className="w-10 h-10 rounded-full object-cover object-top flex-shrink-0 border border-slate-100" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#061A32] flex items-center justify-center text-[#F5C619] text-sm font-bold flex-shrink-0">
                          {bm.name?.[0] ?? "?"}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-sm text-[#061A32]">{bm.name || "Unnamed"}</p>
                        <p className="text-xs text-slate-500">{bm.role || "No role"}</p>
                      </div>
                    </div>
                  );
                }}
                renderForm={(m, set) => {
                  const bm = anyToBoard(m);
                  return (
                    <div className="space-y-2">
                      <input className={inputClass} placeholder="Full Name" value={bm.name}
                        onChange={(e) => set(boardToAny({ ...bm, name: e.target.value }))} />
                      <input className={inputClass} placeholder="Advisory Role" value={bm.role}
                        onChange={(e) => set(boardToAny({ ...bm, role: e.target.value }))} />
                      <textarea className={textareaClass} placeholder="Biography" rows={3} value={bm.bio}
                        onChange={(e) => set(boardToAny({ ...bm, bio: e.target.value }))} />
                      <input className={inputClass} placeholder="Photo URL (e.g. /photo.png or upload via Children panel)" value={bm.img ?? ""}
                        onChange={(e) => set(boardToAny({ ...bm, img: e.target.value }))} />
                      {bm.img && (
                        <img src={bm.img} alt="Preview" className="w-16 h-16 rounded-full object-cover object-top border border-slate-200" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      )}
                    </div>
                  );
                }}
              />
            </div>
          </div>
        )}

        {/* GALLERY PHOTOS */}
        {activeTab === "gallery" && (
          <div className="space-y-5">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 text-sm text-blue-700">
              Upload new photos to appear on the <strong>Gallery page</strong>. These appear above the built-in photos. The 27 original site photos always show automatically — use this panel to add new ones.
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <CardHeader title="Gallery Photos" onSave={() => void saveSection("gallery", content.gallery, "Gallery Photos")} saving={saving === "gallery"} />
              <ArrayEditor
                label="Photos"
                items={(content.gallery?.photos ?? []).map(galleryToAny)}
                onUpdate={(items) => {
                  const photos = items.map(anyToGallery);
                  setContent((c) => ({ ...c, gallery: { ...c.gallery, photos } }));
                }}
                defaultItem={{ url: "", alt: "", category: "Programs & Education" } as AnyItem}
                renderItem={(g) => {
                  const photo = anyToGallery(g);
                  return (
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                        {photo.url ? (
                          <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <Images className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#061A32] truncate">{photo.alt || "No caption"}</p>
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1A44C0]/10 text-[#1A44C0] mt-1">
                          {photo.category}
                        </span>
                      </div>
                    </div>
                  );
                }}
                renderForm={(g, set) => {
                  const photo = anyToGallery(g);
                  return (
                    <div className="space-y-3">
                      <PhotoUploader
                        url={photo.url}
                        onChange={(url) => set(galleryToAny({ ...photo, url }))}
                        token={token}
                      />
                      <input className={inputClass} placeholder="Caption / Description" value={photo.alt}
                        onChange={(e) => set(galleryToAny({ ...photo, alt: e.target.value }))} />
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Category</label>
                        <select
                          value={photo.category}
                          onChange={(e) => set(galleryToAny({ ...photo, category: e.target.value }))}
                          className={inputClass}>
                          {GALLERY_CATEGORIES.filter((c) => c !== "All").map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  );
                }}
              />
            </div>
          </div>
        )}

        {/* SITE SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-5">
            <SectionCard title="Organization Info" onSave={() => void saveSection("settings", content.settings, "Site Settings")} saving={saving === "settings"}>
              <Field label="Organization Name" value={content.settings.orgName} onChange={(v) => upd("settings")({ orgName: v })} />
              <Field label="Tagline" value={content.settings.tagline} onChange={(v) => upd("settings")({ tagline: v })} />
            </SectionCard>

            <SectionCard title="Contact Information" onSave={() => void saveSection("settings", content.settings, "Contact Info")} saving={saving === "settings"}>
              <Field label="Email Address" value={content.settings.email} onChange={(v) => upd("settings")({ email: v })} />
              <Field label="Phone Number" value={content.settings.phone} onChange={(v) => upd("settings")({ phone: v })} />
              <Field label="Physical Address" value={content.settings.address} onChange={(v) => upd("settings")({ address: v })} />
            </SectionCard>

            <SectionCard title="Social Media Links" onSave={() => void saveSection("settings", content.settings, "Social Links")} saving={saving === "settings"}>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Facebook URL" value={content.settings.facebook} onChange={(v) => upd("settings")({ facebook: v })} />
                <Field label="Twitter / X URL" value={content.settings.twitter} onChange={(v) => upd("settings")({ twitter: v })} />
                <Field label="Instagram URL" value={content.settings.instagram} onChange={(v) => upd("settings")({ instagram: v })} />
                <Field label="LinkedIn URL" value={content.settings.linkedin} onChange={(v) => upd("settings")({ linkedin: v })} />
                <Field label="YouTube URL" value={content.settings.youtube} onChange={(v) => upd("settings")({ youtube: v })} />
              </div>
            </SectionCard>

            <SectionCard title="Impact Statistics" onSave={() => void saveSection("settings", content.settings, "Impact Stats")} saving={saving === "settings"}>
              <p className="text-xs text-slate-400">These numbers appear in the stats bar and throughout the website.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Active Scholars" value={content.settings.scholarCount} onChange={(v) => upd("settings")({ scholarCount: v })} />
                <Field label="Partner Schools" value={content.settings.partnerSchools} onChange={(v) => upd("settings")({ partnerSchools: v })} />
                <Field label="Tech Hours (number only)" value={content.settings.techHours} onChange={(v) => upd("settings")({ techHours: v })} />
                <Field label="Children Sponsored" value={content.settings.impactChildren} onChange={(v) => upd("settings")({ impactChildren: v })} />
                <Field label="Communities Reached" value={content.settings.impactCommunities} onChange={(v) => upd("settings")({ impactCommunities: v })} />
                <Field label="Years of Impact" value={content.settings.impactYears} onChange={(v) => upd("settings")({ impactYears: v })} />
                <Field label="Countries" value={content.settings.impactCountries} onChange={(v) => upd("settings")({ impactCountries: v })} />
                <Field label="Programs Running (hero strip)" value={content.settings.heroPrograms} onChange={(v) => upd("settings")({ heroPrograms: v })} />
                <Field label="Languages Supported (hero strip)" value={content.settings.heroLanguages} onChange={(v) => upd("settings")({ heroLanguages: v })} />
              </div>
            </SectionCard>
          </div>
        )}

        {/* HOME PAGE */}
        {activeTab === "home" && (
          <div className="space-y-5">
            <SectionCard title="Hero Section" onSave={() => void saveSection("home", content.home, "Home Hero")} saving={saving === "home"}>
              <Field label="Badge Text (small label above title)" value={content.home.heroBadge} onChange={(v) => upd("home")({ heroBadge: v })} />
              <Field label="Hero Title" value={content.home.heroTitle} onChange={(v) => upd("home")({ heroTitle: v })} />
              <Field label="Hero Subtitle" value={content.home.heroSubtitle} onChange={(v) => upd("home")({ heroSubtitle: v })} multiline rows={3} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Primary Button Text" value={content.home.heroPrimaryCTA} onChange={(v) => upd("home")({ heroPrimaryCTA: v })} />
                <Field label="Secondary Button Text" value={content.home.heroSecondaryCTA} onChange={(v) => upd("home")({ heroSecondaryCTA: v })} />
              </div>
            </SectionCard>
            <SectionCard title="Mission & About Section" onSave={() => void saveSection("home", content.home, "Home Content")} saving={saving === "home"}>
              <Field label="Mission Title" value={content.home.missionTitle} onChange={(v) => upd("home")({ missionTitle: v })} />
              <Field label="Mission Text" value={content.home.missionText} onChange={(v) => upd("home")({ missionText: v })} multiline rows={3} />
              <Field label="About Title" value={content.home.aboutTitle} onChange={(v) => upd("home")({ aboutTitle: v })} />
              <Field label="About Text" value={content.home.aboutText} onChange={(v) => upd("home")({ aboutText: v })} multiline rows={4} />
            </SectionCard>
            <SectionCard title="Footer Call-to-Action Banner" onSave={() => void saveSection("home", content.home, "Footer CTA")} saving={saving === "home"}>
              <p className="text-xs text-slate-400">This is the bold banner at the top of the footer on every page.</p>
              <Field label="Badge Label (small pill text)" value={content.home.footerCtaBadge} onChange={(v) => upd("home")({ footerCtaBadge: v })} />
              <Field label="Headline" value={content.home.footerCtaTitle} onChange={(v) => upd("home")({ footerCtaTitle: v })} />
              <Field label="Subtitle" value={content.home.footerCtaSubtitle} onChange={(v) => upd("home")({ footerCtaSubtitle: v })} multiline rows={2} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Newsletter Strip Title" value={content.home.footerNewsletterTitle} onChange={(v) => upd("home")({ footerNewsletterTitle: v })} />
                <Field label="Newsletter Strip Description" value={content.home.footerNewsletterDesc} onChange={(v) => upd("home")({ footerNewsletterDesc: v })} />
              </div>
            </SectionCard>
          </div>
        )}

        {/* ABOUT PAGE */}
        {activeTab === "about" && (
          <div className="space-y-5">
            <SectionCard title="About Page Content" onSave={() => void saveSection("about", content.about, "About Page")} saving={saving === "about"}>
              <Field label="Overview Text" value={content.about.overviewText} onChange={(v) => upd("about")({ overviewText: v })} multiline rows={4} />
              <Field label="Mission Statement" value={content.about.missionText} onChange={(v) => upd("about")({ missionText: v })} multiline rows={4} />
              <Field label="Vision Statement" value={content.about.visionText} onChange={(v) => upd("about")({ visionText: v })} multiline rows={3} />
              <Field label="Values Summary" value={content.about.valuesText} onChange={(v) => upd("about")({ valuesText: v })} multiline rows={2} />
            </SectionCard>
          </div>
        )}

        {/* WHO WE ARE */}
        {activeTab === "whoWeAre" && (
          <div className="space-y-5">
            <SectionCard title="Overview & History" onSave={() => void saveSection("whoWeAre", content.whoWeAre, "Who We Are")} saving={saving === "whoWeAre"}>
              <Field label="Overview Text" value={content.whoWeAre.overviewText} onChange={(v) => upd("whoWeAre")({ overviewText: v })} multiline rows={3} />
              <Field label="History Text" value={content.whoWeAre.historyText} onChange={(v) => upd("whoWeAre")({ historyText: v })} multiline rows={4} />
              <Field label="Finance & Accountability Text" value={content.whoWeAre.financeText} onChange={(v) => upd("whoWeAre")({ financeText: v })} multiline rows={3} />
            </SectionCard>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <CardHeader title="News & History Timeline" onSave={() => void saveSection("whoWeAre", content.whoWeAre, "News Timeline")} saving={saving === "whoWeAre"} />
              <ArrayEditor
                label="News Items"
                items={content.whoWeAre.newsItems.map(newsToAny)}
                onUpdate={(items) => upd("whoWeAre")({ newsItems: items.map(anyToNews) })}
                defaultItem={{ date: "", title: "", desc: "" } as AnyItem}
                renderItem={(n) => {
                  const ni = anyToNews(n);
                  return (
                    <div>
                      <p className="font-semibold text-sm text-[#061A32]">{ni.title || "Untitled"}</p>
                      <p className="text-xs text-slate-500">{ni.date}</p>
                    </div>
                  );
                }}
                renderForm={(n, set) => {
                  const ni = anyToNews(n);
                  return (
                    <div className="space-y-2">
                      <input className={inputClass} placeholder="Date (e.g. Aug 2024)" value={ni.date} onChange={(e) => set(newsToAny({ ...ni, date: e.target.value }))} />
                      <input className={inputClass} placeholder="Title" value={ni.title} onChange={(e) => set(newsToAny({ ...ni, title: e.target.value }))} />
                      <textarea className={textareaClass} placeholder="Description" rows={2} value={ni.desc} onChange={(e) => set(newsToAny({ ...ni, desc: e.target.value }))} />
                    </div>
                  );
                }}
              />
            </div>
          </div>
        )}

        {/* WHAT WE DO */}
        {activeTab === "whatWeDo" && (
          <div className="space-y-5">
            <SectionCard title="Overview Text" onSave={() => void saveSection("whatWeDo", content.whatWeDo, "What We Do")} saving={saving === "whatWeDo"}>
              <Field label="Page Overview / Introduction" value={content.whatWeDo.overviewText} onChange={(v) => upd("whatWeDo")({ overviewText: v })} multiline rows={4} />
            </SectionCard>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <CardHeader title="Programs" onSave={() => void saveSection("whatWeDo", content.whatWeDo, "Programs")} saving={saving === "whatWeDo"} />
              <ArrayEditor
                label="Programs"
                items={content.whatWeDo.programs.map(programToAny)}
                onUpdate={(items) => upd("whatWeDo")({ programs: items.map(anyToProgram) })}
                defaultItem={{ title: "", quote: "", desc: "" } as AnyItem}
                renderItem={(p) => {
                  const prog = anyToProgram(p);
                  return (
                    <div>
                      <p className="font-semibold text-sm text-[#061A32]">{prog.title || "Untitled Program"}</p>
                      <p className="text-xs text-slate-500 truncate">{prog.desc?.slice(0, 80)}…</p>
                    </div>
                  );
                }}
                renderForm={(p, set) => {
                  const prog = anyToProgram(p);
                  return (
                    <div className="space-y-2">
                      <input className={inputClass} placeholder="Program Title" value={prog.title} onChange={(e) => set(programToAny({ ...prog, title: e.target.value }))} />
                      <input className={inputClass} placeholder='Quote (e.g. "Education is..." – Author)' value={prog.quote} onChange={(e) => set(programToAny({ ...prog, quote: e.target.value }))} />
                      <textarea className={textareaClass} placeholder="Program Description" rows={4} value={prog.desc} onChange={(e) => set(programToAny({ ...prog, desc: e.target.value }))} />
                    </div>
                  );
                }}
              />
            </div>
          </div>
        )}

        {/* WHY EMPOWERMENT */}
        {activeTab === "whyEmpowerment" && (
          <div className="space-y-5">
            <SectionCard title="Why Empowerment Content" onSave={() => void saveSection("whyEmpowerment", content.whyEmpowerment, "Why Empowerment")} saving={saving === "whyEmpowerment"}>
              <Field label="Overview / Hero Text" value={content.whyEmpowerment.overviewText} onChange={(v) => upd("whyEmpowerment")({ overviewText: v })} multiline rows={3} />
              <Field label="Body Text" value={content.whyEmpowerment.bodyText} onChange={(v) => upd("whyEmpowerment")({ bodyText: v })} multiline rows={5} />
            </SectionCard>
          </div>
        )}

        {/* IGNITING POTENTIAL */}
        {activeTab === "ignitingPotential" && (
          <div className="space-y-5">
            <SectionCard title="Igniting Potential Content" onSave={() => void saveSection("ignitingPotential", content.ignitingPotential, "Igniting Potential")} saving={saving === "ignitingPotential"}>
              <Field label="Overview / Hero Text" value={content.ignitingPotential.overviewText} onChange={(v) => upd("ignitingPotential")({ overviewText: v })} multiline rows={3} />
              <Field label="Body Text" value={content.ignitingPotential.bodyText} onChange={(v) => upd("ignitingPotential")({ bodyText: v })} multiline rows={3} />
            </SectionCard>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <CardHeader title="FAQs" onSave={() => void saveSection("ignitingPotential", content.ignitingPotential, "FAQs")} saving={saving === "ignitingPotential"} />
              <ArrayEditor
                label="FAQ Items"
                items={content.ignitingPotential.faqs.map(faqToAny)}
                onUpdate={(items) => upd("ignitingPotential")({ faqs: items.map(anyToFaq) })}
                defaultItem={{ q: "", a: "" } as AnyItem}
                renderItem={(f) => {
                  const faq = anyToFaq(f);
                  return <p className="text-sm text-[#061A32] font-semibold">{faq.q || "No question"}</p>;
                }}
                renderForm={(f, set) => {
                  const faq = anyToFaq(f);
                  return (
                    <div className="space-y-2">
                      <input className={inputClass} placeholder="Question" value={faq.q} onChange={(e) => set(faqToAny({ ...faq, q: e.target.value }))} />
                      <textarea className={textareaClass} placeholder="Answer" rows={3} value={faq.a} onChange={(e) => set(faqToAny({ ...faq, a: e.target.value }))} />
                    </div>
                  );
                }}
              />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
