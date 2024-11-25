import { Task } from '@src/model/zod.schema';
import chalk from 'chalk';

export default class Logger {
  /** Takes in error message of type string and formats it while displaying in the console.
   *
   * @param message a string of error message.
   */
  static error = (message: string): void => {
    console.log(chalk.red.bold(`❌ ERROR: ${message}`));
  };

  /** Takes in success message of type string and formats it while displaying in the console.
   *
   * @param message a string of success message.
   */
  static success = (message: string): void => {
    console.log(chalk.green.bold(`✅ SUCCESS: ${message}`));
  };

  /** Takes in info message of type string and formats it while displaying in the console.
   *
   * @param message a string of info message.
   */
  static info = (message: string): void => {
    console.log(chalk.blue.bold(`ℹ️ INFO: ${message}`));
  };

  /** Takes in warning message of type string and formats it while displaying in the console.
   *
   * @param message a string of warning message.
   */
  static warning = (message: string): void => {
    console.log(chalk.yellow.bold(`⚠️ WARNING: ${message}`));
  };

  /** Takes in an object of type Task and formats it while displaying in the console.
   *
   * @param task task object of type Task
   */
  static displayOneTask = (task: Task): void => {
    console.log(
      chalk.cyanBright.bold(`\n📌 Task ID: ${task.id}`),
      `\n${chalk.yellow.bold('Name:')} ${task.name}`,
      `\n${chalk.yellow.bold('Status:')} ${task.status}`,
      `\n${chalk.yellow.bold('Deadline:')} ${new Date(task.deadline).toLocaleString()}`,
      `\n${chalk.yellow.bold('Tags:')} ${task.tags.join(', ')}`,
    );
  };

  /** Takes in an array of objects of type Task and formats it while displaying in the console.
   *
   * @param task array of task objects
   */
  static displayTasks = (tasks: Task[]): void => {
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
