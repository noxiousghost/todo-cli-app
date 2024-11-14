import { Task, TaskStatus } from '@src/interface/task.type';
import { v4 as uuidv4 } from 'uuid';
import { filePath } from '@src/utils/checkFile';
import { writeJsonFile, readJsonFile } from '@src/utils/jsonOperations';

export const createTask = async (options: Omit<Task, 'status' | 'isArchived'>): Promise<void> => {
  const newTask: Task = {
    id: uuidv4(),
    name: options.name,
    deadline: new Date(options.deadline),
    status: TaskStatus.TODO,
    tags: options.tags || [],
    isArchived: false,
  };
  let tasks = [];
  try {
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
