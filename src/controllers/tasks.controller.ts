import { Task, TaskSchema, TaskStatus } from '@src/model/zod.schema';
import { v4 as uuidv4 } from 'uuid';
import { writeJsonFile, readJsonFile } from '@src/utils/jsonOperations';

export const createTask = async (options: Omit<Task, 'id' | 'status' | 'isArchived'>): Promise<void> => {
  try {
    const newTask: Task = {
      id: uuidv4(),
      name: options.name,
      deadline: new Date(options.deadline),
      status: TaskStatus.TODO,
      tags: options.tags || [],
      isArchived: false,
    };
    let tasks = [];
    const parsedTask = TaskSchema.safeParse(newTask);
    if (!parsedTask.success) {
      console.error('Validation failed:', parsedTask.error.flatten());
      return;
    }
    const readJsonRes = await readJsonFile();
    tasks = readJsonRes;
    tasks.push(newTask);

    await writeJsonFile(tasks);
    console.log('New Task Added: ');
    console.log(newTask);
  } catch (error) {
    console.error(error);
  }
};
