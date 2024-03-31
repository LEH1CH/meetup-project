import { Injectable } from '@angular/core';
import { TodoItem, TodoStatus } from './models/todo-item.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoList: TodoItem[] = [];
  private filteredTodoList: TodoItem[] = [];
  private todoListUrl: string = 'assets/todo-list.json';
  private todoItemsLoaded: boolean = false;
  constructor(private http: HttpClient) {}


  // Метод для фильтрации списка задач по поисковому запросу и статусу
  filterTodoList(searchTerm: string, selectedStatus: string): TodoItem[] {
    let filteredList = this.todoList;

    // Применяем фильтр по поисковому запросу
    if (searchTerm) {
      filteredList = filteredList.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Применяем фильтр по статусу
    if (selectedStatus) {
      filteredList = filteredList.filter(item => item.status === selectedStatus);
    }

    // Присваиваем результат фильтрации переменной filteredTodoList
    this.filteredTodoList = filteredList;

    // Возвращаем отфильтрованный список
    return this.filteredTodoList;
  }

  // Метод для получения отфильтрованного списка задач
  getFilteredTodoList(): TodoItem[] {
    return this.filteredTodoList;
  }

  // Метод для добавления новой записи в to-do лист
  addTodoItem(title: string, description: string, status: TodoStatus = 'normal'): void {
    const id = this.todoList.length + 1; // Просто увеличиваем длину массива на 1 для уникального ID
    const newItem = new TodoItem(id, title, description, status);
    this.todoList.push(newItem);
  }

  // Метод для удаления записи из to-do листа по ID
  deleteTodoItem(id: number): void {
    // Удаляем запись из отфильтрованного списка
    const index = this.filteredTodoList.findIndex(item => item.id === id);
    if (index !== -1) {
      this.filteredTodoList.splice(index, 1);
    }

    // Удаляем запись из основного списка
    const todoIndex = this.todoList.findIndex(item => item.id === id);
    if (todoIndex !== -1) {
      this.todoList.splice(todoIndex, 1);
    }
  }

  // Метод для изменения статуса существующей записи по ID
  changeTodoItemStatus(id: number, newStatus: TodoStatus): void {
    const todoItem = this.todoList.find((item) => item.id === id);
    if (todoItem) {
      todoItem.status = newStatus;
    }
  }

  // Получить весь список to-do записей
  getTodoList(): TodoItem[] {
    return this.todoList;
  }

  // Метод для загрузки задач из JSON файла
  loadTodoListFromJson(): Observable<TodoItem[]> {
    if (!this.todoItemsLoaded) { 
      return this.http.get<TodoItem[]>(this.todoListUrl).pipe(
        tap(todoItems => {
          this.addTodoItemsFromJson(todoItems); // Добавляем задачи в список
          this.todoItemsLoaded = true; // Устанавливаем флаг, что данные уже загружены
        })
      );
    } else {
      return of(this.todoList); // Используем of для создания Observable
    }
  }

  // Метод для добавления задач из JSON файла в список задач
  addTodoItemsFromJson(todoItems: TodoItem[]): void {
    // Очищаем текущий список задач перед добавлением новых задач из JSON файла
    this.todoList = [];
    // Добавляем задачи из JSON файла в список задач
    this.todoList.push(...todoItems);
    this.todoItemsLoaded = true;
  }
  
}
export { TodoItem };

