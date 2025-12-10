// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { useAuthStore } from "@/store/authStore";

interface Project {
  id: string;
  name: string;
  description?: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, accessToken, hydrated, loadFromStorage, logout } =
    useAuthStore();

  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Always call hooks — no condition before this
  useEffect(() => {
    loadFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2️⃣ Auth check must NOT be inside a conditional return
  useEffect(() => {
    if (hydrated && !accessToken) {
      router.replace("/login");
    }
  }, [hydrated, accessToken, router]);

  // 3️⃣ Fetch projects AFTER hydration & auth check
  useEffect(() => {
    if (!hydrated || !accessToken) return;

    const fetchProjects = async () => {
      try {
        const res = await apiClient.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [hydrated, accessToken]);

  const createProject = async () => {
    try {
      await apiClient.post("/projects", {
        name: newName,
        description: newDesc,
      });

      setShowCreate(false);
      setNewName("");
      setNewDesc("");
      router.refresh(); // reload dashboard
    } catch (err) {
      console.error(err);
    }
  };

  // 4️⃣ SAFE conditional rendering (NOT conditional return before hooks)
  if (!hydrated) {
    return <div className="p-6 text-slate-400">Loading session…</div>;
  }

  if (!accessToken) {
    return <div className="p-6 text-slate-400">Redirecting…</div>;
  }

  // 5️⃣ Normal rendering
  return (
    <div className="min-h-screen flex">
      <aside className="w-60 bg-slate-900 border-r border-slate-800 p-4">
        <div className="font-semibold mb-4 text-lg">Team Dashboard</div>
        <button
          onClick={() => setShowCreate(true)}
          className="rounded bg-indigo-600 px-3 py-2 text-sm hover:bg-indigo-500 transition"
        >
          + New Project
        </button>

        <div className="text-sm text-slate-400 mb-6">
          Logged in as <span className="text-slate-100">{user?.name}</span>
        </div>

        <button
          className="text-sm text-red-400 hover:underline"
          onClick={logout}
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Projects</h1>
        </div>

        {loading ? (
          <p className="text-sm text-slate-400">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-sm text-slate-400">No projects yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => router.push(`/projects/${p.id}`)}
                className="text-left rounded-lg border border-slate-800 bg-slate-900 p-4 hover:border-indigo-500 hover:bg-slate-900/70 transition"
              >
                <h2 className="font-medium mb-1">{p.name}</h2>
                {p.description && (
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {p.description}
                  </p>
                )}
              </button>
            ))}
          </div>
        )}
      </main>
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-slate-900 p-6 rounded-lg w-80 border border-slate-700">
            <h2 className="text-lg font-semibold mb-3">Create Project</h2>

            <input
              placeholder="Project name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full mb-3 px-3 py-2 bg-slate-800 rounded border border-slate-700 outline-none"
            />

            <textarea
              placeholder="Description"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full mb-3 px-3 py-2 bg-slate-800 rounded border border-slate-700 outline-none"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCreate(false)}
                className="px-3 py-2 text-sm text-red-400"
              >
                Cancel
              </button>

              <button
                onClick={createProject}
                className="px-3 py-2 text-sm bg-indigo-600 rounded hover:bg-indigo-500"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
