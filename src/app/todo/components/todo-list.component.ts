import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '@todo/model';
import { TodoService } from '@todo/todo.service';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule],
  templateUrl: './todo-list.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class TodoListComponent {
  service = inject(TodoService);

  editingId = signal('');
  editingText = signal('');

  startEditing(todo: Todo) {
    this.editingId.set(todo.id);
    this.editingText.set(todo.text);
  }

  updateEditingTodo(e: Event) {
    const target = e.target as HTMLInputElement;
    this.editingText.set(target.value);
  }

  updateTodo() {
    this.service.updateTodo(this.editingId(), this.editingText());

    this.editingId.set('');
    this.editingText.set('');
  }
}
