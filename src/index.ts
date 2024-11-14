import { Command } from 'commander';
import { createTask } from '@src/controllers/tasks.controller';
import { checkFilePath } from '@src/utils/checkFile';

const program = new Command();
checkFilePath();

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
