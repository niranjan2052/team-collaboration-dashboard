export interface Task {
  id: string;
  title: string;
  description?: string;
  column_id: string;
  position: number;
}

export interface Column {
  id: string;
  name: string;
  position: number;
  tasks: Task[];
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  task_columns: Column[];
}
