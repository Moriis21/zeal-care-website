import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Lock, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Incorrect password. Please try again.");
        return;
      }
      const data = await res.json() as { token: string };
      localStorage.setItem("zc_admin_token", data.token);
      navigate("/admin/dashboard");
    } catch {
      setError("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#061A32] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">

        {/* Back to website */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-semibold group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Website
          </Link>
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img src="/logo.png" alt="Zeal Care" className="h-14 w-auto object-contain drop-shadow-lg" />
          </div>
          <h1 className="text-white font-black text-2xl tracking-wide">ZEAL CARE</h1>
          <p className="text-[#FBD308] text-xs font-bold uppercase tracking-widest mt-1">Admin Portal</p>
          <p className="text-white/40 text-sm mt-1">Sign in to manage your website</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#061A32]/5 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#061A32]" />
            </div>
            <div>
              <p className="font-black text-[#061A32]">Admin Access</p>
              <p className="text-xs text-slate-400">Enter your admin password</p>
            </div>
          </div>

          <div className="relative mb-4">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-[#09609A] transition-colors"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#FBD308] text-[#061A32] py-3.5 rounded-xl font-black text-sm hover:bg-[#FBD308]/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Sign In
          </button>

          <p className="text-center text-xs text-slate-400 mt-4">
            Set your password via the <span className="font-semibold">ADMIN_PASSWORD</span> environment variable
          </p>
        </form>
      </div>
    </div>
  );
}
