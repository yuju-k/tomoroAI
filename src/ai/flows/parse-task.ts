'use server';

/**
 * @fileOverview Parses a natural language task into a structured task object.
 *
 * - parseTask - A function that parses the task and returns the structured task details.
 * - ParseTaskInput - The input type for the parseTask function.
 * - ParseTaskOutput - The return type for the parseTask function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseTaskInputSchema = z.object({
  task: z.string().describe('The task in natural language.'),
});
export type ParseTaskInput = z.infer<typeof ParseTaskInputSchema>;

const ParseTaskOutputSchema = z.object({
  taskDescription: z.string().describe('The description of the task.'),
  dueDate: z.string().optional().describe('The due date of the task, if specified.'),
  priority: z.enum(['high', 'medium', 'low']).default('medium').describe('The priority of the task.'),
});
export type ParseTaskOutput = z.infer<typeof ParseTaskOutputSchema>;

export async function parseTask(input: ParseTaskInput): Promise<ParseTaskOutput> {
  return parseTaskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseTaskPrompt',
  input: {schema: ParseTaskInputSchema},
  output: {schema: ParseTaskOutputSchema},
  prompt: `You are a task parsing AI.  Your job is to take in a task described in natural language, and parse it into a structured object with the following fields:

- taskDescription: A short description of the task.
- dueDate: The due date of the task, if specified.  If no due date is specified, leave blank.
- priority: The priority of the task.  Must be one of 'high', 'medium', or 'low'.  If not specified, default to 'medium'.

Here is the task:

{{task}}`,
});

const parseTaskFlow = ai.defineFlow(
  {
    name: 'parseTaskFlow',
    inputSchema: ParseTaskInputSchema,
    outputSchema: ParseTaskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
