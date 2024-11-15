import { promises as fs } from 'fs';
import { Task } from '@src/interface/task.type';
import { filePath } from '@src/index';
import { checkPath } from './checkFile';

export const readJsonFile = async (): Promise<Task[]> => {
  if (!(await checkPath(filePath))) {
    throw new Error('JSON file does not exist');
  }
  const data = await fs.readFile(filePath, 'utf-8');
  // checking if the json file contains any invalid syntax
  try {
    JSON.parse(data);
  } catch (_err) {
    throw new Error('JSON file contains invalid syntax. Fix it manually');
  }
  return data ? JSON.parse(data) : [];
};

export const writeJsonFile = async (allTasks: Task[]): Promise<void> => {
  if (!(await checkPath(filePath))) {
    throw new Error('JSON file does not exist');
  }
  await fs.writeFile(filePath, JSON.stringify(allTasks, null, 2), 'utf-8');
};
