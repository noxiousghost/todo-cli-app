export enum TaskStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  TODO = 'TODO',
  COMPLETE = 'COMPLETE',
}
export interface Task {
  id: string;
  name: string;
  deadline: Date;
  status: TaskStatus;
  tags: string[];
  isArchived: boolean;
}
