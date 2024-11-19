import { Task, TaskSchema, TaskStatus } from '@src/model/zod.schema';
import { v4 as uuidv4 } from 'uuid';
import { writeJsonFile, readJsonFile } from '@src/utils/jsonOperations';
import { displayTasks } from '@src/utils/displayTasks';

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
    const parsedTask = TaskSchema.safeParse(newTask);
    if (!parsedTask.success) {
      console.error('Validation failed:', parsedTask.error.flatten());
      return;
    }
    const tasks = await readJsonFile();
    tasks.push(newTask);

    await writeJsonFile(tasks);
    console.log('New Task Added: ');
    console.log(newTask);
  } catch (error) {
    console.error(error);
  }
};

export const viewTasks = async (options: { all: string; archived: string }): Promise<void> => {
  try {
    const tasks = await readJsonFile();
    console.log(typeof options);
    console.log(typeof options.archived);
    console.log(typeof options.all);
    // only archived tasks
    if (options.archived) {
      return displayTasks(tasks.filter((task) => task.isArchived));
    }
    // all tasks
    if (options.all) {
      return displayTasks(tasks);
    }
    // default--> show non archived tasks
    displayTasks(tasks.filter((task) => !task.isArchived));
  } catch (error) {
    console.log(error);
  }
};
