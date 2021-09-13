export interface Todo {
  id: number;
  description: string;
  isDone: boolean;
  targetDate: string; // ensure this is Date parseable
}

export interface TodoListState {
  currentID: number; // to be removed if connected to backend
  todoList: Todo[];
}
