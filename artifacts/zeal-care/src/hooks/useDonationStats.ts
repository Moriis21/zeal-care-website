import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type DonationStats = {
  totalCount: number;
  totalAmount: number;
  childrenSponsored: number;
  lastUpdated: string;
};

export type DonationPayload = {
  amount: number;
  donorName?: string;
  donorEmail?: string;
  method?: string;
  childName?: string;
  childId?: string;
  message?: string;
};

const API_BASE = "/api";

async function fetchStats(): Promise<DonationStats> {
  const res = await fetch(`${API_BASE}/donations/stats`);
  if (!res.ok) throw new Error("Failed to fetch donation stats");
  return res.json() as Promise<DonationStats>;
}

async function recordDonation(payload: DonationPayload): Promise<DonationStats> {
  const res = await fetch(`${API_BASE}/donations/record`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to record donation");
  return res.json() as Promise<DonationStats>;
}

export function useDonationStats() {
  return useQuery<DonationStats>({
    queryKey: ["donation-stats"],
    queryFn: fetchStats,
    staleTime: 30_000,
    retry: 2,
  });
}

export function useRecordDonation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: recordDonation,
    onSuccess: (updated) => {
      queryClient.setQueryData(["donation-stats"], updated);
    },
  });
}
