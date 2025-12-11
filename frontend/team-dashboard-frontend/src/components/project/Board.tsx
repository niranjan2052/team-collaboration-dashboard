"use client";

import { DragDropContext } from "@hello-pangea/dnd";
import ColumnList from "./ColumnList";
import type { Column } from "@/types/kanban";

interface BoardProps {
  columns: Column[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDragEnd: (result: any) => void;
  openTaskModal: (columnId: string) => void;
}

export default function Board({ columns, onDragEnd, openTaskModal }: BoardProps) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="flex gap-4 overflow-x-auto pb-4">
        <ColumnList columns={columns} openTaskModal={openTaskModal} />
      </main>
    </DragDropContext>
  );
}
