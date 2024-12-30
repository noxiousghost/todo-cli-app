import { Task } from '@src/model/zod.schema';
import chalk from 'chalk';

class Logger {
  /** Takes in error message of type string and formats it while displaying in the console.
   *
   * @param message a string of error message.
   */
  error = (message: string): void => {
    console.log(chalk.red.bold(`❌ ERROR: ${message}`));
  };

  success = (message: string): void => {
    console.log(chalk.green.bold(`✅ SUCCESS: ${message}`));
  };

  info = (message: string): void => {
    console.log(chalk.blue.bold(`ℹ️ INFO: ${message}`));
  };

  warning = (message: string): void => {
    console.log(chalk.yellow.bold(`⚠️ WARNING: ${message}`));
  };

  displayOneTask = (task: Task): void => {
    console.log(
      chalk.cyanBright.bold(`\n📌 Task ID: ${task.id}`),
      `\n${chalk.yellow.bold('Name:')} ${task.name}`,
      `\n${chalk.yellow.bold('Status:')} ${task.status}`,
      `\n${chalk.yellow.bold('Deadline:')} ${new Date(task.deadline).toLocaleString()}`,
      `\n${chalk.yellow.bold('Tags:')} ${task.tags.join(', ')}`,
    );
  };

  displayTasks = (tasks: Task[]): void => {
    if (!tasks.length) {
      this.error('No tasks found.');
      return;
    }
    console.log(chalk.magenta.bold('\n📋 Task List:'));
    tasks.forEach((task, index) => {
      console.log(
        chalk.cyanBright.bold(`\n🔹 Task ${index + 1}:`),
        `\n  ${chalk.yellow.bold('ID:')} ${task.id}`,
        `\n  ${chalk.yellow.bold('Name:')} ${task.name}`,
        `\n  ${chalk.yellow.bold('Status:')} ${task.status}`,
        `\n  ${chalk.yellow.bold('Deadline:')} ${new Date(task.deadline).toLocaleString()}`,
        `\n  ${chalk.yellow.bold('Tags:')} ${task.tags.join(', ')}`,
      );
    });
  };
}

const logger = new Logger();
export { logger };
