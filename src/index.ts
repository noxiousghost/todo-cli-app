import { Command } from 'commander';
import { createTask } from '@src/controllers/tasks.controller';
import { handleStorageExist } from '@src/utils/checkFile';
import path from 'path';

export const dirPath = path.resolve(__dirname, './jsons/');
export const filePath = path.join(dirPath, '/tasks.json');

const run = async (): Promise<void> => {
  const program = new Command();
  await handleStorageExist(dirPath, filePath);

  program
    .name('todo-cli')
    .description('Manage your most important tasks from the comfort of your terminal')
    .version('1.0.0');

  program
    .command('add')
    .description('Add a new task')
    .requiredOption('-n, --name <string>', 'Task name')
    .requiredOption('-d, --deadline <string>', 'Task deadline (YYYY-MM-DD)')
    .option('-t, --tags <tags...>', 'List of tags')
    .action(createTask);

  program.parse(process.argv);
};

run();
