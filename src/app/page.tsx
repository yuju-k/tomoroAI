'use client';

import { useState, useEffect, useCallback, useTransition } from 'react';
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
        { id: 'task-1', description: '3분기 신규 기능 브레인스토밍', dueDate: '다음 주 월요일', priority: 'medium', recommendedTime: '오후 3시', completed: false },
        { id: 'task-2', description: '마케팅 예산 확정, 높은 우선순위의 작업입니다', priority: 'high', recommendedTime: '오전 10시', completed: false },
        { id: 'task-3', description: '사용자 문서 업데이트', priority: 'low', recommendedTime: '오후 4시', completed: false },
        { id: 'task-4', description: '스테이징 서버 업데이트 배포', priority: 'high', completed: true },
      ]);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('tomoro_tasks', JSON.stringify(tasks));
    }
  }, [tasks, isClient]);

  const handleAddTask = useCallback((taskData: { description: string; dueDate?: string; priority: Priority; recommendedTime?: string; }) => {
    startTransition(() => {
      const newTask: Task = {
        ...taskData,
        id: `task-${Date.now()}-${Math.random()}`,
        completed: false,
      };
      setTasks(prevTasks => [newTask, ...prevTasks]);
    });
  }, []);

  const handleToggleComplete = useCallback((id: string) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  const handleDeleteTask = useCallback((id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);
  
  const handleReorderTasks = useCallback((reorderedTasks: Task[]) => {
    setTasks(reorderedTasks);
  }, []);

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
            할 일을 입력하면, AI가 세부 사항을 처리해 드립니다.
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
          <p>드래그 앤 드롭으로 작업 순서를 변경할 수 있습니다.</p>
        </footer>
      </main>
    </div>
  );
}
