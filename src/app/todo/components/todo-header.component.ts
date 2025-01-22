import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '@todo/todo.service';

@Component({
  selector: 'app-todo-header',
  imports: [FormsModule],
  templateUrl: './todo-header.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoHeaderComponent {
  service = inject(TodoService);

  newTodo = signal('');

  updateTodo(e: Event) {
    const input = e.target as HTMLInputElement;
    this.newTodo.set(input.value);
  }

  handleSubmit() {
    if (!this.newTodo().trim()) return;

    this.service.addTodo(this.newTodo());
    this.newTodo.set('');
  }
}
