import { Task, TaskSchema, TaskStatus } from '@src/model/zod.schema';
import { v4 as uuidv4 } from 'uuid';
import { writeJsonFile, readJsonFile } from '@src/utils/jsonOperations';
import { error } from 'console';

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
    tasks = await readJsonFile();
    // tasks = readJsonRes;
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
    if (Object.keys(options).length === 0) {
      throw error('No options provided');
    }
    let tasks = [];
    tasks = await readJsonFile();
    // checking if task is archived or not
    if (options.archived) {
      tasks = tasks.filter((task) => task.isArchived);
    } else if (options.all) {
      tasks = tasks.filter((task) => !task.isArchived);
    }

    // displaying all the tasks result
    if (tasks.length > 0) {
      console.log('--------------------------------------------------------------');
      tasks.forEach((task) => {
        console.log(
          `- ${task.name} (Status: ${task.status}, Deadline: ${task.deadline}, Tags: ${task.tags.join(', ')})\n`,
        );
      });
      console.log('--------------------------------------------------------------');
    } else {
      console.log('No tasks found!!');
    }
  } catch (error) {
    console.log(error);
  }
};
