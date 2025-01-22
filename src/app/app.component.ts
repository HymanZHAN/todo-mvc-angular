import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'app-root',
  imports: [TodoComponent],
  template: ` <app-todo /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
