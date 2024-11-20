import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo, TodoStatus } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      title: 'Sample Todo',
      description: 'This is a sample todo item',
      status: TodoStatus.Pending
    }
  ];
  
  private todosSubject = new BehaviorSubject<Todo[]>(this.todos);

  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  addTodo(todo: Omit<Todo, 'id'>): void {
    const newTodo = {
      ...todo,
      id: this.todos.length + 1
    };
    this.todos = [newTodo, ...this.todos];
    this.todosSubject.next(this.todos);
  }

  updateTodo(todo: Todo): void {
    this.todos = this.todos.map(t => t.id === todo.id ? todo : t);
    this.todosSubject.next(this.todos);
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
    this.todosSubject.next(this.todos);
  }

  getTodoById(id: number): Todo | undefined {
    return this.todos.find(t => t.id === id);
  }
}