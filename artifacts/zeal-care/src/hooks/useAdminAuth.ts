import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export function useAdminAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("zc_admin_token");
    if (!stored) {
      navigate("/admin");
    } else {
      setToken(stored);
    }
    setChecked(true);
  }, [navigate]);

  const authHeaders = token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };

  return { token, checked, authHeaders };
}
