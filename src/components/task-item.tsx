'use client';

import type { Task } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowRight, ArrowDown, GripVertical, CalendarIcon, Trash2, Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const priorityIcons = {
  high: <ArrowUp className="h-4 w-4 text-red-500" />,
  medium: <ArrowRight className="h-4 w-4 text-yellow-500" />,
  low: <ArrowDown className="h-4 w-4 text-blue-500" />,
};

const priorityTooltips = {
  high: '높은 우선순위',
  medium: '중간 우선순위',
  low: '낮은 우선순위',
};

export default function TaskItem({ task, onToggleComplete, onDeleteTask }: TaskItemProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Card className={cn(
        "group transition-all duration-300 ease-in-out",
        task.completed ? 'bg-card/50' : 'bg-card hover:bg-secondary/50'
      )}>
        <div className="p-4 flex items-center gap-4">
          <div className={cn("cursor-grab text-muted-foreground", { "cursor-default": task.completed })}>
             <GripVertical className="h-5 w-5" />
          </div>
          <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            aria-label={`작업 ${task.description}을(를) ${task.completed ? '미완료로' : '완료로'} 표시`}
            className="h-5 w-5 rounded-full"
          />
          <div className="flex-1 space-y-1">
            <label
              htmlFor={`task-${task.id}`}
              className={cn(
                "font-medium transition-colors",
                task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'
              )}
            >
              {task.description}
            </label>
            {task.dueDate && (
              <div className="flex items-center text-xs text-muted-foreground">
                <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
                <span>{task.dueDate}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {task.recommendedTime && (
              <Badge variant="outline" className="text-muted-foreground inline-flex items-center gap-1 font-normal">
                <Clock className="h-3 w-3" />
                {task.recommendedTime}
              </Badge>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  {priorityIcons[task.priority]}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{priorityTooltips[task.priority]}</p>
              </TooltipContent>
            </Tooltip>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
              onClick={() => onDeleteTask(task.id)}
              aria-label={`작업 ${task.description} 삭제`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
}
