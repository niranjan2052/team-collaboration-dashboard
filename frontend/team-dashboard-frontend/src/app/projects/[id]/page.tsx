// src/app/projects/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { useAuthStore } from "@/store/authStore";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

interface Task {
  id: string;
  title: string;
  description?: string;
  column_id: string;
  position: number;
}

interface Column {
  id: string;
  name: string;
  position: number;
  tasks: Task[];
}

interface Project {
  id: string;
  name: string;
  description?: string;
  task_columns: Column[];
}

export default function ProjectBoardPage() {
  const params = useParams();
  const projectId = params.id as string;
  const router = useRouter();
  const { accessToken, hydrated, loadFromStorage } = useAuthStore();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const fetchProject = async () => {
    try {
      const res = await apiClient.get(`/projects/${projectId}`);
      setProject(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchProject();
  }, [accessToken]);

  // Redirect after render - SAFE
  useEffect(() => {
    if (hydrated && !accessToken) {
      router.replace("/login");
    }
  }, [hydrated, accessToken, router]);

  // Avoid showing the page while redirecting
  if (!accessToken) {
    return null;
  }

  if (loading || !project) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-400">Loading project...</p>
      </div>
    );
  }

  // --------------------------------------------------------
  // 🔥 HANDLE DRAG & DROP
  // --------------------------------------------------------
  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // No movement
    if (!destination) return;

    const fromColumnId = source.droppableId;
    const toColumnId = destination.droppableId;

    // No change in column or position
    if (fromColumnId === toColumnId && destination.index === source.index) {
      return;
    }

    const updatedProject = JSON.parse(JSON.stringify(project));

    // Find source & destination columns
    const sourceCol = updatedProject.task_columns.find(
      (c: Column) => c.id === fromColumnId
    );
    const destCol = updatedProject.task_columns.find(
      (c: Column) => c.id === toColumnId
    );

    if (!sourceCol || !destCol) return;

    // Remove task from source
    const [movedTask] = sourceCol.tasks.splice(source.index, 1);

    // Insert into destination
    destCol.tasks.splice(destination.index, 0, movedTask);

    // Update task's column id
    movedTask.column_id = toColumnId;

    // Reassign positions
    sourceCol.tasks.forEach((task: Task, idx: number) => {
      task.position = idx;
    });
    destCol.tasks.forEach((task: Task, idx: number) => {
      task.position = idx;
    });

    // Update state instantly
    setProject(updatedProject);

    // Sync with backend
    try {
      await apiClient.patch(`/tasks/${draggableId}/move`, {
        toColumnId,
        newPosition: destination.index,
      });
      fetchProject();
    } catch (err) {
      console.error("Move failed:", err);
    }
  };

  // --------------------------------------------------------
  // UI Rendering
  // --------------------------------------------------------

  // 4️⃣ SAFE conditional rendering (NOT conditional return before hooks)
  if (!hydrated) {
    return <div className="p-6 text-slate-400">Loading session…</div>;
  }

  if (!accessToken) {
    return <div className="p-6 text-slate-400">Redirecting…</div>;
  }

  return (
    <div className="min-h-screen flex flex-col p-6 gap-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{project.name}</h1>
          {project.description && (
            <p className="text-sm text-slate-400">{project.description}</p>
          )}
        </div>
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm text-slate-300 hover:underline"
        >
          ← Back to dashboard
        </button>
      </header>

      {/* ------------------- DRAG & DROP ------------------- */}
      <DragDropContext onDragEnd={onDragEnd}>
        <main className="flex gap-4 overflow-x-auto pb-4">
          {project.task_columns
            .slice()
            .sort((a, b) => a.position - b.position)
            .map((col) => (
              <Droppable droppableId={col.id} key={col.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="w-72 flex-shrink-0 rounded-lg bg-slate-900 border border-slate-800 p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-sm font-semibold">{col.name}</h2>
                      <span className="text-xs text-slate-400">
                        {col.tasks.length} tasks
                      </span>
                    </div>

                    <div className="space-y-2">
                      {col.tasks
                        .slice()
                        .sort((a, b) => a.position - b.position)
                        .map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`rounded bg-slate-800 px-3 py-2 text-sm cursor-pointer transition
                                  ${
                                    snapshot.isDragging
                                      ? "bg-slate-700 shadow-lg"
                                      : ""
                                  }
                                `}
                              >
                                <div className="font-medium">{task.title}</div>
                                {task.description && (
                                  <div className="text-xs text-slate-400 line-clamp-2">
                                    {task.description}
                                  </div>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
        </main>
      </DragDropContext>
    </div>
  );
}
