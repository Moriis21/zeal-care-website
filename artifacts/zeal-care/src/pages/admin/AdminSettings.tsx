import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Loader2, CheckCircle, AlertCircle, Send, Eye, EyeOff } from "lucide-react";

type EmailConfig = {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  notifyEmail: string;
  enabled: boolean;
  smtpPassSet: boolean;
};

export default function AdminSettings() {
  const { checked, authHeaders } = useAdminAuth();
  const [config, setConfig] = useState<EmailConfig | null>(null);
  const [smtpPass, setSmtpPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [testMsg, setTestMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    if (!checked) return;
    fetch("/api/admin/email-config", { headers: authHeaders })
      .then((r) => r.json())
      .then((d) => setConfig(d as EmailConfig));
  }, [checked]);

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    setSaveMsg(null);
    try {
      const res = await fetch("/api/admin/email-config", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ ...config, smtpPass: smtpPass || undefined }),
      });
      if (res.ok) {
        setSaveMsg({ ok: true, text: "Settings saved successfully." });
        setSmtpPass("");
        const updated = await fetch("/api/admin/email-config", { headers: authHeaders });
        setConfig(await updated.json() as EmailConfig);
      } else {
        setSaveMsg({ ok: false, text: "Failed to save settings." });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    setTesting(true);
    setTestMsg(null);
    try {
      const res = await fetch("/api/admin/email-test", { method: "POST", headers: authHeaders });
      const data = await res.json() as { success?: boolean; error?: string };
      if (data.success) {
        setTestMsg({ ok: true, text: `Test email sent to ${config?.notifyEmail || config?.smtpUser}.` });
      } else {
        setTestMsg({ ok: false, text: data.error ?? "Test failed." });
      }
    } finally {
      setTesting(false);
    }
  };

  if (!config) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-7 h-7 animate-spin text-[#09609A]" />
        </div>
      </AdminLayout>
    );
  }

  const field = (label: string, hint: string, value: string, onChange: (v: string) => void, type = "text") => (
    <div>
      <label className="block text-sm font-bold text-[#061A32] mb-1.5">{label}</label>
      {hint && <p className="text-xs text-slate-400 mb-2">{hint}</p>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#09609A] transition-colors"
      />
    </div>
  );

  return (
    <AdminLayout>
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-black text-[#061A32]">Email Settings</h2>
          <p className="text-slate-400 text-sm">Configure SMTP to receive donation notifications by email.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => setConfig((c) => c ? { ...c, enabled: !c.enabled } : c)}
                className={`relative w-11 h-6 rounded-full transition-colors ${config.enabled ? "bg-[#09609A]" : "bg-slate-200"}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${config.enabled ? "translate-x-6" : "translate-x-1"}`} />
              </div>
              <span className="font-bold text-sm text-[#061A32]">Email Notifications Enabled</span>
            </label>
          </div>

          {field("SMTP Host", "e.g. smtp.gmail.com", config.smtpHost, (v) => setConfig((c) => c ? { ...c, smtpHost: v } : c))}
          {field("SMTP Port", "587 for TLS, 465 for SSL", String(config.smtpPort), (v) => setConfig((c) => c ? { ...c, smtpPort: Number(v) } : c), "number")}
          {field("Sender Email (SMTP Username)", "The Gmail or SMTP account that will send emails", config.smtpUser, (v) => setConfig((c) => c ? { ...c, smtpUser: v } : c), "email")}
          {field("Notify Email", "Where donation alerts will be sent", config.notifyEmail, (v) => setConfig((c) => c ? { ...c, notifyEmail: v } : c), "email")}

          <div>
            <label className="block text-sm font-bold text-[#061A32] mb-1.5">
              App Password / SMTP Password
              {config.smtpPassSet && <span className="ml-2 text-xs text-green-600 font-semibold">(already set)</span>}
            </label>
            <p className="text-xs text-slate-400 mb-2">For Gmail: create an App Password at myaccount.google.com → Security → App passwords</p>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={smtpPass}
                onChange={(e) => setSmtpPass(e.target.value)}
                placeholder={config.smtpPassSet ? "Leave blank to keep current password" : "Enter Gmail App Password…"}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-[#09609A] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {saveMsg && (
            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold ${saveMsg.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
              {saveMsg.ok ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {saveMsg.text}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-[#FBD308] text-[#061A32] py-3 rounded-xl font-black text-sm hover:bg-[#FBD308]/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Settings
            </button>
            <button
              onClick={handleTest}
              disabled={testing || !config.smtpPassSet}
              title={!config.smtpPassSet ? "Save a password first" : ""}
              className="flex items-center gap-2 border-2 border-[#061A32] text-[#061A32] px-5 py-3 rounded-xl font-bold text-sm hover:bg-[#061A32] hover:text-white transition-all disabled:opacity-40"
            >
              {testing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Send Test
            </button>
          </div>

          {testMsg && (
            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold ${testMsg.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
              {testMsg.ok ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {testMsg.text}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
