import { z } from 'zod';

export enum TaskStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  TODO = 'TODO',
  COMPLETE = 'COMPLETE',
}

export const taskSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, { message: 'Task name cannot be empty' }),
  deadline: z.date(),
  status: z.nativeEnum(TaskStatus),
  tags: z.array(z.string()).nonempty({ message: 'Please add at least one tag' }),
  isArchived: z.boolean(),
});
