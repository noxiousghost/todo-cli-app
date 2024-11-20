import { Task, TaskSchema, TaskStatus, FilterTask } from '@src/model/zod.schema';
import { v4 as uuidv4 } from 'uuid';
import { writeJsonFile, readJsonFile } from '@src/utils/jsonOperations';
import { displayTasks } from '@src/utils/displayTasks';

export const createTask = async (options: Omit<Task, 'id' | 'status' | 'isArchived'>): Promise<void> => {
  try {
    const newTask: Task = {
      id: uuidv4(),
      name: options.name,
      deadline: new Date(options.deadline),
      status: TaskStatus.TODO,
      tags: options.tags || [],
      isArchived: false,
    };
    const parsedTask = TaskSchema.safeParse(newTask);
    if (!parsedTask.success) {
      console.error('Validation failed:', parsedTask.error.flatten());
      return;
    }
    const tasks = await readJsonFile();
    tasks.push(newTask);

    await writeJsonFile(tasks);
    console.log('New Task Added: ');
    console.log(newTask);
  } catch (error) {
    console.error(error);
  }
};

export const viewTasks = async (options: FilterTask): Promise<void> => {
  try {
    const tasks = await readJsonFile();
    // only archived tasks
    if (options.archived) {
      return displayTasks(tasks.filter((task) => task.isArchived));
    }
    // all tasks
    if (options.all) {
      return displayTasks(tasks);
    }
    // filter by status
    if (options.status) {
      const status = options.status.toUpperCase();
      return displayTasks(tasks.filter((task) => task.status === status));
    }
    // filter by tags
    if (options.tags) {
      return displayTasks(tasks.filter((task) => options.tags.some((tag) => task.tags.includes(tag))));
    }
    // filter by deadline
    if (options.deadline) {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      return displayTasks(
        tasks.filter((task) => {
          const taskDeadline = new Date(task.deadline);
          taskDeadline.setUTCHours(0, 0, 0, 0);
          return taskDeadline.getTime() === today.getTime();
        }),
      );
    }
    // default--> show non archived tasks
    displayTasks(tasks.filter((task) => !task.isArchived));
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (options: { id: string; complete: string }): Promise<void> => {
  try {
    let tasksAfterDelete: Task[] = [];
    const tasks = await readJsonFile();
    // remove a task with particular id
    if (options.id) {
      tasksAfterDelete = tasks.filter((task) => {
        return options.id !== task.id;
      });
    }
    // removes all the tasks with complete status
    if (options.complete) {
      tasksAfterDelete = tasks.filter((task) => {
        return TaskStatus.COMPLETE !== task.status;
      });
    }
    const numberOfDeletedItems = tasks.length - tasksAfterDelete.length;
    await writeJsonFile(tasksAfterDelete);
    return numberOfDeletedItems > 0
      ? console.log(`${numberOfDeletedItems} Item(s) deleted successfully:`)
      : console.log('Task not deleted');
  } catch (error) {
    console.log(error);
  }
};

export const modifyTask = async (id: string, options: { status: string }): Promise<void> => {
  try {
    const tasks = await readJsonFile();
    const filteredTasks = tasks.filter((task) => task.id === id);

    if (filteredTasks.length === 0) {
      console.log('No task found with the given ID.');
      return;
    }

    const task = filteredTasks[0];
    // change status
    if (options.status) {
      const newStatus = options.status.toUpperCase() as keyof typeof TaskStatus; // convert the newStatus string into a key of the TaskStatus enum
      if (task.status === newStatus) {
        console.log(`Task is already ${options.status}.`);
        return;
      }
      task.status = TaskStatus[newStatus]; // gets the corresponding value from the TaskStatus enum
      console.log(`Task status updated to ${options.status.toUpperCase()}.`);
    }
    await writeJsonFile(tasks);
  } catch (error) {
    console.error(error);
  }
};
