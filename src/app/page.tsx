'use client';

import { useState, useEffect, useTransition } from 'react';
import type { Task, Priority } from '@/lib/types';
import TaskForm from '@/components/task-form';
import TaskList from '@/components/task-list';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsClient(true);
    const savedTasks = localStorage.getItem('tomoro_tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Initial demo tasks
      setTasks([
        { id: 'task-1', description: 'Brainstorm new features for Q3', dueDate: 'Next Monday', priority: 'medium', completed: false },
        { id: 'task-2', description: 'Finalize marketing budget, it is a high priority task', priority: 'high', completed: false },
        { id: 'task-3', description: 'Update the user documentation', priority: 'low', completed: false },
        { id: 'task-4', description: 'Deploy staging server updates', priority: 'high', completed: true },
      ]);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('tomoro_tasks', JSON.stringify(tasks));
    }
  }, [tasks, isClient]);

  const handleAddTask = (taskData: { description: string; dueDate?: string; priority: Priority }) => {
    startTransition(() => {
      const newTask: Task = {
        ...taskData,
        id: `task-${Date.now()}-${Math.random()}`,
        completed: false,
      };
      setTasks(prevTasks => [newTask, ...prevTasks]);
    });
  };

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const handleReorderTasks = (reorderedTasks: Task[]) => {
    setTasks(reorderedTasks);
  };

  if (!isClient) {
    return (
      <div className="container mx-auto max-w-3xl p-4 md:p-8">
        <div className="space-y-8">
          <div className="text-center space-y-2">
             <Skeleton className="h-10 w-48 mx-auto" />
             <Skeleton className="h-5 w-80 mx-auto" />
          </div>
          <Skeleton className="h-12 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <main className="w-full max-w-3xl">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            Tomoro AI
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Describe your task, and let AI handle the details.
          </p>
        </header>

        <section className="mb-8">
          <TaskForm onTaskAdd={handleAddTask} isAdding={isPending} />
        </section>

        <section>
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            onReorder={handleReorderTasks}
          />
        </section>
        
        <footer className="text-center mt-12 text-sm text-muted-foreground">
          <p>Drag and drop to reorder tasks.</p>
        </footer>
      </main>
    </div>
  );
}
