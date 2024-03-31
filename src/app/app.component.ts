import { Component } from '@angular/core';
import { TodoItem, TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  filteredTodoList: TodoItem[] = [];

  constructor(private todoService: TodoService) {
    this.loadFilteredTodoList();
  }

  applyFilters(searchTerm: string, selectedStatus: string): void {
    // Получаем отфильтрованный список задач
    this.filteredTodoList = this.todoService.filterTodoList(searchTerm, selectedStatus);
  }

  loadFilteredTodoList(): void {
    // Получаем весь список задач
    this.filteredTodoList = this.todoService.getTodoList();
  }

  deleteTodoItem(id: number): void {
    // Удаляем задачу из исходного списка задач
    this.todoService.deleteTodoItem(id);
    // Обновляем отфильтрованный список задач
    this.filteredTodoList = this.todoService.filterTodoList('', ''); // Перезагрузка списка
  }
  title = 'meetup-project';
}
