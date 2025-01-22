export type Todo = {
  id: string;
  text: string;
  isDone: boolean;
};

export type TodoFilter = 'all' | 'done' | 'todo';
