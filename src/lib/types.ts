export type Priority = "high" | "medium" | "low";

export type Task = {
  id: string;
  description: string;
  dueDate?: string;
  priority: Priority;
  completed: boolean;
};
