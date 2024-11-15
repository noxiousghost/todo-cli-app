import util from 'util';
import fs from 'fs';
import { Task } from '@src/interface/task.type';
import { filePath } from './checkFile';

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

export const readJsonFile = async (): Promise<Task[]> => {
  if (!fs.existsSync(filePath)) {
    throw new Error('JSON file not found');
  }
  const data = await readFile(filePath, 'utf-8');
  // checking if the json file contains any invalid syntax
  try {
    JSON.parse(data);
  } catch (_err) {
    throw new Error('JSON file contains invalid syntax. Fix it manually');
  }
  return data ? JSON.parse(data) : [];
};

export const writeJsonFile = async (allTasks: Task[]): Promise<void> => {
  if (!fs.existsSync(filePath)) {
    throw new Error('JSON file not found');
  }
  await writeFile(filePath, JSON.stringify(allTasks, null, 2), 'utf-8');
};
