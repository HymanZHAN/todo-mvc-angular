import { Component, inject } from '@angular/core';
import { TodoService } from '@todo/todo.service';

@Component({
  selector: 'app-todo-footer',
  imports: [],
  templateUrl: './todo-footer.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class TodoFooterComponent {
  service = inject(TodoService);
}
