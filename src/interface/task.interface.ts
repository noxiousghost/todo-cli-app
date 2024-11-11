export enum TaskStatus {
  inProgress = 'IN PROGRESS',
  todo = 'TODO',
  complete = 'COMPLETE',
}
export interface ITask {
  id: string;
  name: string;
  deadline: Date;
  status: TaskStatus;
  tags: string[];
  isArchived: boolean;
}
