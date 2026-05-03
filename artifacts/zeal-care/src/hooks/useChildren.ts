import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type Child = {
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
  photo?: string;
};

const API_BASE = "/api";

async function fetchChildren(): Promise<Child[]> {
  const res = await fetch(`${API_BASE}/children`);
  if (!res.ok) throw new Error("Failed to fetch children");
  return res.json() as Promise<Child[]>;
}

async function sponsorChild(id: string): Promise<{ success: boolean; childId: string }> {
  const res = await fetch(`${API_BASE}/children/${id}/sponsor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to sponsor child");
  return res.json() as Promise<{ success: boolean; childId: string }>;
}

export function useChildren() {
  return useQuery<Child[]>({
    queryKey: ["children"],
    queryFn: fetchChildren,
    staleTime: 60_000,
    retry: 2,
  });
}

export function useSponsorChild() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sponsorChild,
    onSuccess: (_, id) => {
      queryClient.setQueryData<Child[]>(["children"], (prev) =>
        prev ? prev.map((c) => (c.id === id ? { ...c, isSponsored: true } : c)) : prev
      );
    },
  });
}
