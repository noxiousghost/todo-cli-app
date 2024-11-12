import fs from 'fs';
import path from 'path';

export const dirPath = path.resolve(__dirname, '../jsons/');
export const filePath = path.join(dirPath, '/tasks.json');

export const checkFilePath = (): void => {
  // create folder and file if they doesn't already exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
};
