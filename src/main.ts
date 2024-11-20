import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { TodoTableComponent } from './app/components/todo-table/todo-table.component';
import { TodoService } from './app/services/todo.service';
import { routes } from './app/app.routes';
import { Todo } from './app/models/todo.model';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, TodoTableComponent],
  template: `
    <div class="container">
      <h1>Todo List Application</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }
  `]
})
export class App {
  constructor(private todoService: TodoService) {}
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideAnimations()
  ]
});