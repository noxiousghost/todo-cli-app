import { Command, Option } from 'commander';
import { createTask, viewTasks } from '@src/controllers/tasks.controller';
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

  program
    .command('show')
    .description('View items in the list')
    .option('-a, --all', 'Show all non-archived tasks')
    .option('-ar, --archived', 'Show all archived tasks')
    .addOption(
      new Option('-s, --status <status>', 'Show all tasks with particular status').choices([
        'in_progress',
        'todo',
        'complete',
      ]),
    )
    .option('-t, --tags <tags...>', 'Show all tasks with particular tag')
    .option('-d, --deadline', 'Show all the tasks with deadline by today')
    .action(viewTasks)
    .showHelpAfterError();

  program.parse(process.argv);
};

run();
