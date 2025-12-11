"use client";

import { Draggable } from "@hello-pangea/dnd";
import type { Task } from "@/types/kanban";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  index: number;
  onDelete: (taskId: string) => Promise<void>;
}

export default function TaskCard({ task, index, onDelete }: TaskCardProps) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded bg-slate-800 px-3 py-2 text-sm cursor-pointer transition 
          ${snapshot.isDragging ? "bg-slate-700 shadow-lg" : ""}`}
        >
          <div className="taskheader flex justify-between">
            <div className="font-medium">{task.title}</div>
            <div className="relative w-2">
              {/* Three-dot menu */}
              <button className="cursor-pointer" onClick={() => setOpenMenu(!openMenu)}>⋮</button>

              {openMenu && (
                <div className="task-menu absolute right-0">
                  <button className="bg-red-500 px-2 py-1 cursor-pointer" onClick={() => onDelete(task.id)}>Delete</button>
                </div>
              )}
            </div>
          </div>

          {task.description && (
            <div className="text-xs text-slate-400 line-clamp-2">
              {task.description}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
