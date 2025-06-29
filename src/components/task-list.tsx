'use client';

import type { Task } from '@/lib/types';
import TaskItem from '@/components/task-item';
import { Separator } from './ui/separator';
import { useState, useRef } from 'react';
import { FileText } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onReorder: (tasks: Task[]) => void;
}

export default function TaskList({ tasks, onToggleComplete, onDeleteTask, onReorder }: TaskListProps) {
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    dragItem.current = index;
    e.currentTarget.classList.add('opacity-50', 'shadow-2xl');
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    dragOverItem.current = index;
  };
  
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('opacity-50', 'shadow-2xl');
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newPendingTasks = [...pendingTasks];
      const draggedItemContent = newPendingTasks.splice(dragItem.current, 1)[0];
      newPendingTasks.splice(dragOverItem.current, 0, draggedItemContent);
      onReorder([...newPendingTasks, ...completedTasks]);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">All clear!</h3>
        <p className="mt-1 text-sm text-muted-foreground">Add a new task above to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {pendingTasks.map((task, index) => (
           <div 
             key={task.id}
             draggable
             onDragStart={(e) => handleDragStart(e, index)}
             onDragEnter={(e) => handleDragEnter(e, index)}
             onDragEnd={handleDragEnd}
             onDragOver={(e) => e.preventDefault()}
           >
             <TaskItem
               task={task}
               onToggleComplete={onToggleComplete}
               onDeleteTask={onDeleteTask}
             />
           </div>
        ))}
      </div>

      {completedTasks.length > 0 && pendingTasks.length > 0 && (
        <div className="flex items-center">
          <Separator className="flex-1" />
          <span className="px-4 text-sm text-muted-foreground">Completed</span>
          <Separator className="flex-1" />
        </div>
      )}
      
      {completedTasks.length > 0 && (
        <div className="space-y-3">
          {completedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}
