import { promises as fs } from 'fs';
import { Task } from '@src/model/zod.schema';
import { filePath } from '@src/index';
import { checkPath } from './checkFile';

/** A function to read contents from tasks.json file. It returns the array of task objects from the file.
 * If the file contains any invalid syntax then it will throw an error.
 * In that case the user have to manually check the json file and fix it.
 *
 * @returns An array of tasks objects
 */
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

/** A function to write into the tasks.json file. It accepts a task object.
 *
 * @param task object of type Task
 */
export const writeJsonFile = async (allTasks: Task[]): Promise<void> => {
  if (!(await checkPath(filePath))) {
    throw new Error('JSON file does not exist');
  }
  await fs.writeFile(filePath, JSON.stringify(allTasks, null, 2), 'utf-8');
};
