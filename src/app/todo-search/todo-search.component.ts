import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html',
  styleUrls: ['./todo-search.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoSearchComponent {
  searchTerm: string = '';
  selectedStatus: string = '';

  @Output() searchFilters = new EventEmitter<{ searchTerm: string, selectedStatus: string }>();

  applyFilters(): void {
    // Проверяем, есть ли подходящие задачи перед применением фильтрации
    const filters = {
      searchTerm: this.searchTerm,
      selectedStatus: this.selectedStatus
    };
    this.searchFilters.emit(filters);
  }

  resetFilters(): void {
    // Сбросить значения полей фильтрации
    this.searchTerm = '';
    this.selectedStatus = '';
    // Вызвать метод фильтрации без аргументов для сброса фильтров
    this.applyFilters();
  }

}
