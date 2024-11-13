import { TaskStatus, Task, TaskSchema } from '../model/zod.schema';
import { v4 as uuidv4 } from 'uuid';
import { filePath } from '../utils/checkFile';
import { writeJsonFile, readJsonFile } from '../utils/jsonOperations';

export const createTask = async (options: Omit<Task, 'status' | 'isArchived'>): Promise<void> => {
  try {
    const newTask: Task = {
      id: uuidv4(),
      name: options.name,
      deadline: new Date(options.deadline),
      status: TaskStatus.TODO,
      tags: options.tags,
      isArchived: false,
    };
    let tasks: Task[] = [];
    const parsedTask = TaskSchema.safeParse(newTask);
    if (!parsedTask.success) {
      console.error('Validation failed:', parsedTask.error.flatten());
      return;
    }
    const readJsonRes = await readJsonFile(filePath);
    tasks = readJsonRes;
    tasks.push(newTask);

    await writeJsonFile(filePath, tasks);
    console.log('New Task Added: ');
    console.log(newTask);
  } catch (error) {
    console.error(error);
  }
};
