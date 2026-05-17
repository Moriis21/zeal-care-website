import { useCallback, useEffect, useRef, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Loader2, MessageSquare, Trash2, CheckCheck, Search, X,
  Circle, CheckCheck as MarkAllIcon, Send, AlertCircle, RefreshCw,
} from "lucide-react";

type Message = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  timestamp: string;
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(" ");
  const letters = parts.length >= 2
    ? parts[0][0] + parts[parts.length - 1][0]
    : (parts[0]?.[0] ?? "?");
  const colors = ["bg-blue-500","bg-violet-500","bg-emerald-500","bg-amber-500","bg-rose-500","bg-cyan-500"];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-white text-xs font-black flex-shrink-0 uppercase`}>
      {letters.toUpperCase()}
    </div>
  );
}

export default function AdminMessages() {
  const { checked, authHeaders } = useAdminAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replySending, setReplySending] = useState(false);
  const [replyStatus, setReplyStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [markingAllRead, setMarkingAllRead] = useState(false);
  const [lastCount, setLastCount] = useState(0);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reload = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const r = await fetch("/api/admin/messages", { headers: authHeaders });
      const data = (await r.json()) as Message[];
      setMessages(data);
      setLastCount(data.filter((m) => !m.read).length);
      if (selected) {
        const fresh = data.find((m) => m.id === selected.id);
        if (fresh) setSelected(fresh);
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, [authHeaders, selected]);

  useEffect(() => {
    if (!checked) return;
    void reload();
    pollRef.current = setInterval(() => void reload(true), 30000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [checked]);

  const handleOpen = async (msg: Message) => {
    setSelected(msg);
    setReplyText("");
    setReplyStatus(null);
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

  const handleMarkAllRead = async () => {
    setMarkingAllRead(true);
    await fetch("/api/admin/messages/read-all", { method: "PATCH", headers: authHeaders });
    setMessages((prev) => prev.map((m) => ({ ...m, read: true })));
    setMarkingAllRead(false);
  };

  const handleReply = async () => {
    if (!selected || !replyText.trim()) return;
    setReplySending(true);
    setReplyStatus(null);
    try {
      const r = await fetch(`/api/admin/messages/${selected.id}/reply`, {
        method: "POST",
        headers: { ...authHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ replyText: replyText.trim() }),
      });
      const data = (await r.json()) as { success: boolean; emailSent?: boolean; emailError?: string };
      if (data.emailSent) {
        setReplyStatus({ ok: true, msg: `Reply sent to ${selected.email}` });
        setReplyText("");
      } else {
        setReplyStatus({
          ok: false,
          msg: data.emailError?.includes("not configured")
            ? "Email not set up yet — configure SMTP in Email Settings to send replies."
            : `Failed to send: ${data.emailError ?? "Unknown error"}`,
        });
      }
    } catch {
      setReplyStatus({ ok: false, msg: "Network error. Please try again." });
    } finally {
      setReplySending(false);
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  const filtered = messages.filter((m) => {
    if (filter === "unread" && m.read) return false;
    if (filter === "read" && !m.read) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      (m.subject ?? "").toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout unreadMessages={unreadCount}>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1">
            <h2 className="text-2xl font-black text-[#061A32] flex items-center gap-2">
              Messages
              {unreadCount > 0 && (
                <span className="bg-[#09609A] text-white text-xs font-black px-2.5 py-1 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </h2>
            <p className="text-slate-400 text-sm">{messages.length} total · {unreadCount} unread</p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={() => void handleMarkAllRead()}
                disabled={markingAllRead}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-500 border border-slate-200 bg-white hover:border-[#09609A] hover:text-[#09609A] transition-all"
              >
                {markingAllRead ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <MarkAllIcon className="w-3.5 h-3.5" />}
                Mark all read
              </button>
            )}
            <button
              onClick={() => void reload()}
              className="p-2 rounded-xl text-slate-400 border border-slate-200 bg-white hover:border-[#09609A] hover:text-[#09609A] transition-all"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search messages…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#09609A] w-48"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
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
                  : "bg-white border border-slate-200 text-slate-500 hover:border-[#09609A] hover:text-[#09609A]"
              }`}
            >
              {f}
              {f === "unread" && unreadCount > 0 && (
                <span className={`ml-1.5 text-xs font-black ${filter === "unread" ? "text-[#FBD308]" : "text-[#09609A]"}`}>
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-7 h-7 animate-spin text-[#09609A]" />
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
                    onClick={() => void handleOpen(msg)}
                    className={`rounded-2xl border p-4 cursor-pointer transition-all hover:shadow-sm ${
                      selected?.id === msg.id
                        ? "border-[#09609A] bg-[#09609A]/5 shadow-sm"
                        : msg.read
                        ? "border-slate-200 bg-white hover:border-slate-300"
                        : "border-[#09609A]/30 bg-blue-50/50 hover:border-[#09609A]/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Initials name={msg.name} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className={`text-sm truncate ${msg.read ? "font-semibold text-slate-700" : "font-black text-[#061A32]"}`}>
                            {msg.name}
                            {!msg.read && <Circle className="w-2 h-2 text-[#09609A] fill-[#09609A] inline ml-1.5 mb-0.5" />}
                          </p>
                          <p className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">{timeAgo(msg.timestamp)}</p>
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
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                  {/* Detail header */}
                  <div className="flex items-start gap-3 px-6 py-4 border-b border-slate-100">
                    <Initials name={selected.name} />
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-[#061A32] text-base leading-tight">{selected.name}</p>
                      <a href={`mailto:${selected.email}`} className="text-[#09609A] text-xs hover:underline">{selected.email}</a>
                    </div>
                    <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                      <span className="text-xs text-slate-400 hidden sm:block">
                        {new Date(selected.timestamp).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      {deleteConfirm === selected.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => void handleDelete(selected.id)} className="bg-red-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold">Delete</button>
                          <button onClick={() => setDeleteConfirm(null)} className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-bold">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(selected.id)} className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => setSelected(null)} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 lg:hidden">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Subject */}
                  {selected.subject && (
                    <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/70">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Subject</p>
                      <p className="text-sm font-semibold text-[#061A32]">{selected.subject}</p>
                    </div>
                  )}

                  {/* Message body */}
                  <div className="px-6 py-5">
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                  </div>

                  {/* Read indicator */}
                  {selected.read && (
                    <div className="px-6 pb-1 flex items-center gap-1.5">
                      <CheckCheck className="w-3.5 h-3.5 text-slate-300" />
                      <span className="text-xs text-slate-300 font-semibold">Read</span>
                    </div>
                  )}

                  {/* Reply composer */}
                  <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/40">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Reply</p>
                    <textarea
                      rows={4}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Write your reply to ${selected.name.split(" ")[0]}…`}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#09609A] transition-colors placeholder:text-slate-300"
                    />
                    {replyStatus && (
                      <div className={`flex items-start gap-2 mt-2 px-3 py-2 rounded-xl text-xs font-semibold ${
                        replyStatus.ok ? "bg-green-50 text-green-700 border border-green-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        {replyStatus.msg}
                      </div>
                    )}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => void handleReply()}
                        disabled={replySending || !replyText.trim()}
                        className="flex items-center gap-2 bg-[#09609A] text-white px-5 py-2.5 rounded-xl font-black text-sm hover:bg-[#09609A]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {replySending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        {replySending ? "Sending…" : "Send Reply"}
                      </button>
                      <a
                        href={`mailto:${selected.email}?subject=${encodeURIComponent(selected.subject ? `Re: ${selected.subject}` : "Re: Your message to Zeal Care")}&body=${encodeURIComponent(replyText || "")}`}
                        className="text-xs text-slate-400 hover:text-[#09609A] font-semibold transition-colors"
                      >
                        Open in email client →
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 flex items-center justify-center h-64">
                  <div className="text-center">
                    <MessageSquare className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                    <p className="text-slate-400 text-sm font-semibold">Select a message to read it</p>
                    <p className="text-slate-300 text-xs mt-1">{messages.length} message{messages.length !== 1 ? "s" : ""} total</p>
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
