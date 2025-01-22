import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Todo, TodoFilter } from '@todo/model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _filter = signal<TodoFilter>('all');
  private _todos: WritableSignal<WritableSignal<Todo>[]> = signal([]);

  readonly filter = this._filter.asReadonly();
  readonly todos = computed(() =>
    this._todos()
      .map((todo) => todo.asReadonly())
      .filter(byTodoStatus(this.filter())),
  );
  readonly doneCount = computed(
    () => this._todos().filter((todo) => todo().isDone).length,
  );
  readonly totalCount = computed(() => this._todos().length);

  addTodo(todo: string) {
    const newTodoItem: Todo = {
      id: crypto.randomUUID(),
      text: todo,
      isDone: false,
    };

    this._todos.update((todos) => [...todos, signal(newTodoItem)]);
  }

  updateFilter(filterValue: TodoFilter) {
    this._filter.set(filterValue);
  }

  toggleTodo(todoId: string) {
    this._todos.update((todos) => {
      const targetTodo = todos.find((todo) => todo().id === todoId);
      if (targetTodo) {
        targetTodo.update((todo) => ({ ...todo, isDone: !todo.isDone }));
      }
      return todos;
    });
  }

  updateTodo(todoId: string, todoText: string) {
    this._todos.update((todos) => {
      const targetTodo = todos.find((todo) => todo().id === todoId);
      if (targetTodo) {
        targetTodo.update((todo) => ({ ...todo, text: todoText }));
      }
      return todos;
    });
  }

  clearDoneTodos() {
    this._todos.update((todos) => todos.filter((todo) => !todo().isDone));
  }
}

function byTodoStatus(filter: TodoFilter) {
  return (todo: Signal<Todo>) => {
    switch (filter) {
      case 'all':
        return true;
      case 'done':
        return todo().isDone;
      case 'todo':
        return !todo().isDone;
      default:
        return true;
    }
  };
}
