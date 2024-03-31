export class TodoItem {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;

  constructor(
    id: number,
    title: string,
    description: string,
    status: TodoStatus
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
  }
}

export type TodoStatus = 'normal' | 'important' | 'completed';
