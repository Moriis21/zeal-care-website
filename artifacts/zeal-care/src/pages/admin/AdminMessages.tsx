import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Loader2, MessageSquare, Trash2, CheckCheck, Search, X, Circle } from "lucide-react";

type Message = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  timestamp: string;
};

export default function AdminMessages() {
  const { checked, authHeaders } = useAdminAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const reload = () =>
    fetch("/api/admin/messages", { headers: authHeaders })
      .then((r) => r.json())
      .then((d) => setMessages(d as Message[]));

  useEffect(() => {
    if (!checked) return;
    reload().finally(() => setLoading(false));
  }, [checked]);

  const handleOpen = async (msg: Message) => {
    setSelected(msg);
    if (!msg.read) {
      await fetch(`/api/admin/messages/${msg.id}/read`, { method: "PATCH", headers: authHeaders });
      setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, read: true } : m));
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE", headers: authHeaders });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
    setDeleteConfirm(null);
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  const filtered = messages.filter((m) => {
    if (filter === "unread" && m.read) return false;
    if (filter === "read" && !m.read) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) ||
      (m.subject ?? "").toLowerCase().includes(q) || m.message.toLowerCase().includes(q);
  });

  return (
    <AdminLayout>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1">
            <h2 className="text-2xl font-black text-[#061A32] flex items-center gap-2">
              Messages
              {unreadCount > 0 && (
                <span className="bg-[#1A44C0] text-white text-xs font-black px-2.5 py-1 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </h2>
            <p className="text-slate-400 text-sm">{messages.length} total · {unreadCount} unread</p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search messages…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#1A44C0] w-52"
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2">
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
                filter === f
                  ? "bg-[#061A32] text-white"
                  : "bg-white border border-slate-200 text-slate-500 hover:border-[#1A44C0] hover:text-[#1A44C0]"
              }`}
            >
              {f}
              {f === "unread" && unreadCount > 0 && (
                <span className={`ml-1.5 text-xs font-black ${filter === "unread" ? "text-[#F5C619]" : "text-[#1A44C0]"}`}>
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-7 h-7 animate-spin text-[#1A44C0]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Message list */}
            <div className="lg:col-span-2 space-y-2">
              {filtered.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
                  <MessageSquare className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm font-semibold">
                    {search ? "No messages match your search." : filter === "unread" ? "No unread messages." : "No messages yet."}
                  </p>
                </div>
              ) : (
                filtered.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => handleOpen(msg)}
                    className={`rounded-2xl border p-4 cursor-pointer transition-all hover:border-[#1A44C0]/30 hover:shadow-sm ${
                      selected?.id === msg.id
                        ? "border-[#1A44C0] bg-[#1A44C0]/5"
                        : msg.read
                        ? "border-slate-200 bg-white"
                        : "border-[#1A44C0]/20 bg-blue-50/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {msg.read
                          ? <CheckCheck className="w-4 h-4 text-slate-300" />
                          : <Circle className="w-3 h-3 text-[#1A44C0] fill-[#1A44C0] mt-0.5" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className={`text-sm truncate ${msg.read ? "font-semibold text-slate-700" : "font-black text-[#061A32]"}`}>
                            {msg.name}
                          </p>
                          <p className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">
                            {new Date(msg.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </p>
                        </div>
                        <p className="text-xs text-slate-400 truncate mb-1">{msg.email}</p>
                        {msg.subject && (
                          <p className="text-xs font-semibold text-slate-600 truncate mb-1">{msg.subject}</p>
                        )}
                        <p className="text-xs text-slate-400 line-clamp-2">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message detail */}
            <div className="lg:col-span-3">
              {selected ? (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
                  <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100">
                    <div className="min-w-0 flex-1">
                      <p className="font-black text-[#061A32] text-lg">{selected.name}</p>
                      <a href={`mailto:${selected.email}`} className="text-[#1A44C0] text-sm hover:underline">{selected.email}</a>
                    </div>
                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                      <span className="text-xs text-slate-400">
                        {new Date(selected.timestamp).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      {deleteConfirm === selected.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => handleDelete(selected.id)} className="bg-red-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold">Delete</button>
                          <button onClick={() => setDeleteConfirm(null)} className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-bold">Cancel</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(selected.id)}
                          className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => setSelected(null)} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 lg:hidden">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {selected.subject && (
                    <div className="px-6 py-3 border-b border-slate-50 bg-slate-50">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Subject</p>
                      <p className="text-sm font-semibold text-[#061A32]">{selected.subject}</p>
                    </div>
                  )}
                  <div className="px-6 py-5 flex-1">
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                  </div>
                  <div className="px-6 py-4 border-t border-slate-100">
                    <a
                      href={`mailto:${selected.email}?subject=Re: ${selected.subject ?? "Your message to Zeal Care"}`}
                      className="inline-flex items-center gap-2 bg-[#F5C619] text-[#061A32] px-5 py-2.5 rounded-xl font-black text-sm hover:bg-[#F5C619]/90 transition-all"
                    >
                      Reply via Email →
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 flex items-center justify-center h-64">
                  <div className="text-center">
                    <MessageSquare className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                    <p className="text-slate-400 text-sm font-semibold">Select a message to read it</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
