import { z } from 'zod';

export enum TaskStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  TODO = 'TODO',
  COMPLETE = 'COMPLETE',
}

export const TaskSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, { message: 'Task name cannot be empty' }),
  deadline: z.date().refine((date) => date > new Date(), {
    message: 'Deadline should be future date/time',
  }),
  status: z.nativeEnum(TaskStatus),
  tags: z.array(z.string()).nonempty({ message: 'Please add at least one tag' }),
  isArchived: z.boolean(),
});

export type Task = z.infer<typeof TaskSchema>;
