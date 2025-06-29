'use server';

/**
 * @fileOverview 자연어 작업을 구조화된 작업 객체로 파싱합니다.
 *
 * - parseTask - 작업을 파싱하고 구조화된 작업 세부 정보를 반환하는 함수입니다.
 * - ParseTaskInput - parseTask 함수의 입력 타입입니다.
 * - ParseTaskOutput - parseTask 함수의 반환 타입입니다.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseTaskInputSchema = z.object({
  task: z.string().describe('자연어로 된 작업입니다.'),
});
export type ParseTaskInput = z.infer<typeof ParseTaskInputSchema>;

const ParseTaskOutputSchema = z.object({
  taskDescription: z.string().describe('작업에 대한 설명입니다.'),
  dueDate: z.string().optional().describe('작업의 마감일입니다 (지정된 경우).'),
  priority: z.enum(['high', 'medium', 'low']).default('medium').describe('작업의 우선순위입니다.'),
  recommendedTime: z.string().optional().describe('작업을 수행하기 좋은 추천 시간입니다 (예: "오전 7시", "오후 3시").'),
});
export type ParseTaskOutput = z.infer<typeof ParseTaskOutputSchema>;

export async function parseTask(input: ParseTaskInput): Promise<ParseTaskOutput> {
  return parseTaskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseTaskPrompt',
  input: {schema: ParseTaskInputSchema},
  output: {schema: ParseTaskOutputSchema},
  prompt: `당신은 작업 파싱 AI입니다. 당신의 임무는 자연어로 설명된 작업을 입력받아 다음 필드를 가진 구조화된 객체로 파싱하는 것입니다:

- taskDescription: 작업에 대한 짧은 설명.
- dueDate: 작업의 마감일 (지정된 경우). 마감일이 지정되지 않은 경우 비워 둡니다.
- priority: 작업의 우선순위. 'high', 'medium', 'low' 중 하나여야 합니다. 지정되지 않은 경우 'medium'을 기본값으로 합니다.
- recommendedTime: 작업의 성격에 따라 작업을 완료하기에 가장 좋은 구체적인 시간(예: "오전 7시", "오후 3시")을 제안하세요. 예를 들어, 집중이 필요한 작업은 오전에, 창의적인 작업은 오후에 좋습니다. 항상 구체적인 시간으로 추천을 제공해야 합니다.

다음은 작업입니다:

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
