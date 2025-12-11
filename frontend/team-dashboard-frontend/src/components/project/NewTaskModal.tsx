"use client";

import { useState } from "react";

interface NewTaskModalProps {
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
}

export default function NewTaskModal({ onClose, onCreate }: NewTaskModalProps) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleCreate = () => {
    onCreate(title, desc);
    setTitle("");
    setDesc("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-slate-900 p-6 rounded-lg w-80 border border-slate-700">
        <h2 className="text-lg font-semibold mb-3">New Task</h2>

        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 px-3 py-2 bg-slate-800 rounded border border-slate-700 outline-none"
        />

        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full mb-3 px-3 py-2 bg-slate-800 rounded border border-slate-700 outline-none"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-2 text-sm text-red-400"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="px-3 py-2 text-sm bg-indigo-600 rounded hover:bg-indigo-500"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
