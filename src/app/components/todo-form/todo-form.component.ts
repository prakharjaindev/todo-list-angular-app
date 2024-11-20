import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo, TodoStatus } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  isEditing = false;
  statusOptions = Object.values(TodoStatus);
  private todoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: [TodoStatus.Pending]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      this.todoId = +id;
      const todo = this.todoService.getTodoById(this.todoId);
      if (todo) {
        this.todoForm.patchValue({
          title: todo.title,
          description: todo.description,
          status: todo.status
        });
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const formValue = this.todoForm.value;
      if (this.isEditing && this.todoId) {
        this.todoService.updateTodo({
          ...formValue,
          id: this.todoId
        });
      } else {
        this.todoService.addTodo(formValue);
      }
      this.router.navigate(['/']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}