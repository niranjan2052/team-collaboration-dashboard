"use client";

import { Draggable } from "@hello-pangea/dnd";
import type { Task } from "@/types/kanban";

interface TaskCardProps {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: TaskCardProps) {
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
          <div className="font-medium">{task.title}</div>

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
