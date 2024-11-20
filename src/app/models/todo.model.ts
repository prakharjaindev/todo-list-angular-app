export interface Todo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
}

export enum TodoStatus {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Completed = 'Completed'
}