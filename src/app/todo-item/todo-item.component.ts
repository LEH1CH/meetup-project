import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() item!: TodoItem;
  @Output() statusChange = new EventEmitter<TodoItem>(); // Изменение статуса
  @Output() delete = new EventEmitter<number>(); // Удаление задачи

  constructor(private todoService: TodoService) {}

  onStatusChange(): void {
    this.todoService.changeTodoItemStatus(this.item.id, this.item.status);
    this.statusChange.emit(this.item); // Отправляем измененную задачу наверх
  }

  onDelete(): void {
    console.log('Удаляем запись с id:', this.item.id);
    this.todoService.deleteTodoItem(this.item.id);
    this.delete.emit(this.item.id); // Отправляем ID удаляемой задачи наверх
  }
}
