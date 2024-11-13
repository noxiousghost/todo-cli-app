import util from 'util';
import { z } from 'zod';
import fs from 'fs';
import { taskSchema } from '../model/zod.schema';
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

export const readJsonFile = async (filePath: string): Promise<z.infer<typeof taskSchema>[]> => {
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

export const writeJsonFile = async (filePath: string, allTasks: z.infer<typeof taskSchema>[]): Promise<void> => {
  if (!fs.existsSync(filePath)) {
    throw new Error('JSON file not found');
  }
  await writeFile(filePath, JSON.stringify(allTasks, null, 2), 'utf-8');
};
