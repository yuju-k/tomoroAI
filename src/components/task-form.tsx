'use client';

import { useEffect, useRef } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { addTaskAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Loader2 } from 'lucide-react';
import type { Priority } from '@/lib/types';

interface TaskFormProps {
  onTaskAdd: (taskData: { description: string; dueDate?: string; priority: Priority; recommendedTime?: string; }) => void;
  isAdding: boolean;
}

function SubmitButton({ isAdding }: { isAdding: boolean }) {
  const { pending } = useFormStatus();
  const isLoading = pending || isAdding;

  return (
    <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-accent hover:bg-accent/90">
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      작업 추가
    </Button>
  );
}

export default function TaskForm({ onTaskAdd, isAdding }: TaskFormProps) {
  const [state, formAction] = useActionState(addTaskAction, { error: null, data: null });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: '오류',
        description: state.error,
      });
    }
    if (state.data) {
      onTaskAdd(state.data);
      formRef.current?.reset();
    }
  }, [state, onTaskAdd, toast]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col sm:flex-row items-start gap-2">
      <div className="w-full">
        <Input
          type="text"
          name="task"
          placeholder="예: 금요일까지 보고서 보내기, 우선순위 높음"
          className="h-12 text-base"
          aria-label="New task input"
        />
        {state.error && <p className="text-sm text-destructive mt-1">{state.error}</p>}
      </div>
      <SubmitButton isAdding={isAdding} />
    </form>
  );
}
