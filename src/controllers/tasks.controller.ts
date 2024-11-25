import { Task, TaskSchema, TaskStatus, FilterTask } from '@src/model/zod.schema';
import { v4 as uuidv4 } from 'uuid';
import { writeJsonFile, readJsonFile } from '@src/utils/jsonOperations';
import Logger from '@src/utils/displayOutputs';

/** Function to create a new Task after taking options from the CLI. Accepted params are name, deadline and tags and they are required.
 * It also checks and validate the new task before checking by the help of zod safeParse method.
 *
 * @param options name:string, deadline:date and tags:string[]
 */
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
      Logger.error(parsedTask.error.errors.map((e) => e.message).join(', '));
      return;
    }
    const tasks = await readJsonFile();
    tasks.push(newTask);

    await writeJsonFile(tasks);
    Logger.success('New Task Added: ');
    Logger.displayOneTask(newTask);
  } catch (error: unknown) {
    if (error instanceof Error) {
      Logger.error(error.message);
    }
  }
};

/** Function that takes an type FilterTask and used to view and filter tasks based on the CLI command. It is in early return pattern checking
 * for valid filtering options first and if no options are passed then all tasks are displayed.
 * Refer to the project docs to see the valid options.
 *
 * @param options FilterTask
 */
export const viewTasks = async (options: FilterTask): Promise<void> => {
  try {
    const tasks = await readJsonFile();
    // only archived tasks
    if (options.archived) {
      return Logger.displayTasks(tasks.filter((task) => task.isArchived));
    }
    // all tasks
    if (options.all) {
      return Logger.displayTasks(tasks);
    }
    // filter by status
    if (options.status) {
      const status = options.status.toUpperCase();
      return Logger.displayTasks(tasks.filter((task) => task.status === status));
    }
    // filter by tags
    if (options.tags) {
      return Logger.displayTasks(tasks.filter((task) => options.tags.some((tag) => task.tags.includes(tag))));
    }
    // filter by deadline
    if (options.deadline) {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      return Logger.displayTasks(
        tasks.filter((task) => {
          const taskDeadline = new Date(task.deadline);
          taskDeadline.setUTCHours(0, 0, 0, 0);
          return taskDeadline.getTime() === today.getTime();
        }),
      );
    }
    // default--> show non archived tasks
    Logger.displayTasks(tasks.filter((task) => !task.isArchived));
  } catch (error: unknown) {
    if (error instanceof Error) {
      Logger.error(error.message);
    }
  }
};

/** Function that takes an object options with id and complete and used delete the task(s) from the list.
 * id is the valid id of a task and complete means all the tasks that are with complete status.
 * Refer to the project docs for more details about this feature.
 *
 * @param options id:string complete:string
 */
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
      ? Logger.success(`${numberOfDeletedItems} Item(s) deleted successfully:`)
      : Logger.error('Task not deleted');
  } catch (error: unknown) {
    if (error instanceof Error) {
      Logger.error(error.message);
    }
  }
};

/** Function that takes id and options object with status and archive properties and used to modify the task details.
 * Currently, it is possible to edit the status and archive status of task.
 *
 * @param id actual task id:string
 * @param options status:string archive: string
 */
export const modifyTask = async (id: string, options: { status: string; archive: string }): Promise<void> => {
  try {
    const tasks = await readJsonFile();
    const filteredTasks = tasks.filter((task) => task.id === id);

    if (filteredTasks.length === 0) {
      Logger.warning('No task found with the given ID.');
      return;
    }

    const task = filteredTasks[0];
    // change status
    if (options.status) {
      const newStatus = options.status.toUpperCase() as keyof typeof TaskStatus; // convert the newStatus string into a key of the TaskStatus enum
      if (task.status === newStatus) {
        Logger.info(`Task is already ${options.status}.`);
        return;
      }
      task.status = TaskStatus[newStatus]; // gets the corresponding value from the TaskStatus enum
      Logger.success(`Task status updated to ${options.status.toUpperCase()}.`);
    }
    // toggle archive
    if (options.archive) {
      task.isArchived = !task.isArchived;
      Logger.success(`Task archive status toggled to ${task.isArchived ? 'ARCHIVED' : 'NOT ARCHIVED'}.`);
    }
    await writeJsonFile(tasks);
  } catch (error: unknown) {
    if (error instanceof Error) {
      Logger.error(error.message);
    }
  }
};

/** Function that takes title of type string to search for tasks in the list. It uses regex.test method to display all the tasks that pass the
 * regex pattern as specified by the user.
 *
 * @param title string
 */
export const searchTask = async (title: string): Promise<void> => {
  try {
    const tasks = await readJsonFile();
    const regex = new RegExp(title, 'i'); // 'i' flag for case-insensitive search
    Logger.displayTasks(tasks.filter((task) => regex.test(task.name)));
  } catch (error: unknown) {
    if (error instanceof Error) {
      Logger.error(error.message);
    }
  }
};
