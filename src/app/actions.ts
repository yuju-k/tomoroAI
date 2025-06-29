'use server';

import { parseTask } from '@/ai/flows/parse-task';
import type { Priority } from '@/lib/types';
import { z } from 'zod';

const formSchema = z.object({
  task: z.string().min(3, 'Task must be at least 3 characters long.'),
});

export async function addTaskAction(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    task: formData.get('task'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.task?.[0] || "Invalid input.",
    };
  }

  const taskInput = validatedFields.data.task;

  try {
    const parsed = await parseTask({ task: taskInput });
    return {
      data: {
        description: parsed.taskDescription,
        dueDate: parsed.dueDate,
        priority: parsed.priority as Priority,
      }
    };
  } catch (error) {
    console.error('AI task parsing failed:', error);
    // Fallback to creating a simple task if AI fails
    return {
      data: {
        description: taskInput,
        priority: 'medium' as Priority,
      }
    };
  }
}
