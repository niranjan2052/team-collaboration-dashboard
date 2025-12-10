// src/app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Home() {
  const router = useRouter();
  const { accessToken, hydrated, loadFromStorage } = useAuthStore();

  // Load auth data from storage ONCE
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // Redirect ONLY after hydrated
  useEffect(() => {
    if (!hydrated) return;

    if (accessToken) router.replace("/dashboard");
    else router.replace("/login");
  }, [hydrated, accessToken, router]);

  if (!hydrated) return <div className="p-6">Preparing session…</div>;

  return <div className="p-6">Redirecting…</div>;
}
