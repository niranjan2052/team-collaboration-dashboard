"use client";

import TaskColumn from "./TaskColumn";
import type { Column } from "@/types/kanban";

interface ColumnListProps {
  columns: Column[];
  openTaskModal: (columnId: string) => void;
}

export default function ColumnList({ columns, openTaskModal }: ColumnListProps) {
  return (
    <main className="flex gap-4 overflow-x-auto pb-4">
      {columns
        .slice()
        .sort((a, b) => a.position - b.position)
        .map((col) => (
          <TaskColumn
            key={col.id}
            column={col}
            openTaskModal={openTaskModal}
          />
        ))}
    </main>
  );
}
