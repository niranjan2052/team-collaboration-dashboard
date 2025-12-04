// src/app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Home() {
  const router = useRouter();
  const { accessToken, hydrated, loadFromStorage } = useAuthStore();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  if (!hydrated) return <div className="p-6">Preparing session…</div>;

  if (accessToken) router.replace("/dashboard");
  else router.replace("/login");

  return <div className="p-6">Redirecting…</div>;
}
