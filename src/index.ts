import { Command } from 'commander';
import { Task, TaskStatus } from './interface/task.interface';
import { v4 as uuidv4 } from 'uuid';
import { filePath, checkFilePath } from './utils/checkFile';
import fs from 'fs';

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
  .action((options) => {
    const newTask: Task = {
      id: uuidv4(),
      name: options.name,
      deadline: new Date(options.deadline),
      status: TaskStatus.TODO,
      tags: options.tags || [],
      isArchived: false,
    };

    // const dirPath = path.resolve(__dirname, '../jsons/');
    // const filePath = path.join(dirPath, '/tasks.json');
    // // create folder and file if they doesn't already exists
    // if (!fs.existsSync(dirPath)) {
    //   fs.mkdirSync(dirPath);
    // }
    // if (!fs.existsSync(filePath)) {
    //   fs.writeFileSync(filePath, '');
    // }

    fs.readFile(filePath, 'utf-8', (err, data) => {
      let tasks: Task[] = [];
      if (!err && data.trim() !== '') {
        try {
          tasks = JSON.parse(data);
        } catch (error) {
          console.error(error);
        }
      }
      tasks.push(newTask);
      fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf-8', (err) => {
        if (err) {
          console.error('Error writing task:', err);
        } else {
          console.log('New task added:', newTask);
        }
      });
    });
  });

program.parse(process.argv);
