import { Task } from '@src/model/zod.schema';
import chalk from 'chalk';

export const logError = (message: string): void => {
  console.log(chalk.red.bold(`❌ ERROR: ${message}`));
};

export const logSuccess = (message: string): void => {
  console.log(chalk.green.bold(`✅ SUCCESS: ${message}`));
};

export const logInfo = (message: string): void => {
  console.log(chalk.blue.bold(`ℹ️ INFO: ${message}`));
};

export const logWarning = (message: string): void => {
  console.log(chalk.yellow.bold(`⚠️ WARNING: ${message}`));
};

export const displayOneTask = (task: Task): void => {
  console.log(
    chalk.cyanBright.bold(`\n📌 Task ID: ${task.id}`),
    `\n${chalk.yellow.bold('Name:')} ${task.name}`,
    `\n${chalk.yellow.bold('Status:')} ${task.status}`,
    `\n${chalk.yellow.bold('Deadline:')} ${new Date(task.deadline).toLocaleString()}`,
    `\n${chalk.yellow.bold('Tags:')} ${task.tags.join(', ')}`,
  );
};

export const displayTasks = (tasks: Task[]): void => {
  if (!tasks.length) {
    logWarning('No tasks found.');
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
