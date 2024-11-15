import { promises as fs } from 'fs';

/** Takes in a path argument and checks if that file or folder exists or not
 *
 * @param path Path for folder or file
 */
export const checkPath = async (path: string): Promise<boolean> => {
  try {
    await fs.access(path);
    return true;
  } catch (_err: unknown) {
    return false;
  }
};

/** Takes in dirPath and filePath, and creates folder or file as necessary
 *
 * @param dirPath Path for directory in which JSON file exists
 * @param filePath Path for JSON file
 */
export const handleStorageExist = async (dirPath: string, filePath: string): Promise<void> => {
  const doesFolderExist = await checkPath(dirPath);
  if (!doesFolderExist) {
    await fs.mkdir(dirPath);
  }
  const doesFileExist = await checkPath(filePath);
  if (!doesFileExist) {
    await fs.writeFile(filePath, JSON.stringify([]));
  }
};
