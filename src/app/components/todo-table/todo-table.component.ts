import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './todo-table.component.html',
  styleUrl: './todo-table.component.scss',
})
export class TodoTableComponent {
  todos: Todo[] = [];

  constructor(
    private router: Router,
    private todoService: TodoService
  ) {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  onAddTodo(): void {
    this.router.navigate(['/add']);
  }

  onEdit(todo: Todo): void {
    this.router.navigate(['/edit', todo.id]);
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id);
    }
  }
}