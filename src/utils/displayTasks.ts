import { Task } from '@src/model/zod.schema';
export const displayTasks = (tasks: Task[]): void => {
  if (!tasks.length) {
    console.log('No tasks found.');
    return;
  }

  console.log('Tasks:');
  tasks.forEach((task, index) => {
    console.log(
      `${index + 1}) ${task.name} (Status: ${task.status}, Deadline: ${task.deadline}, Tags: ${task.tags.join(', ')}\n`,
    );
  });
};
