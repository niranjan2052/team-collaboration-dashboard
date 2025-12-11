"use client";

import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import type { Column } from "@/types/kanban";

interface TaskColumnProps {
  column: Column;
  openTaskModal: (columnId: string) => void;
}

export default function TaskColumn({ column, openTaskModal }: TaskColumnProps) {
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="w-72 shrink-0 rounded-lg bg-slate-900 border border-slate-800 p-3"
        >
          {/* Header */}
          <div className="flex justify-between mb-2">
            <h2 className="text-sm font-semibold">{column.name}</h2>
            <span className="text-xs text-slate-400">{column.tasks.length}</span>
          </div>

          {/* Task List */}
          <div className="space-y-2">
            {column.tasks
              .slice()
              .sort((a, b) => a.position - b.position)
              .map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}

            {provided.placeholder}
          </div>

          {/* Add task button */}
          <button
            onClick={() => openTaskModal(column.id)}
            className="text-xs text-indigo-400 hover:underline mt-2"
          >
            + Add Task
          </button>
        </div>
      )}
    </Droppable>
  );
}
