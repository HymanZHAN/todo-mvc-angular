import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoHeaderComponent } from './components/todo-header.component';
import { TodoListComponent } from './components/todo-list.component';
import { TodoFooterComponent } from './components/todo-footer.component';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  imports: [TodoHeaderComponent, TodoListComponent, TodoFooterComponent],
  template: `
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="max-w-2xl mx-auto space-y-8 px-4">
        <h1 class="text-3xl font-bold text-center text-gray-800">Todo MVC</h1>
        <div class="bg-white p-6 rounded-xl shadow-lg space-y-6">
          <app-todo-header />
          <app-todo-list />
          <app-todo-footer />
        </div>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  private service = inject(TodoService);
}
