import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoService } from '../todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
})
export class TodoAddComponent {
  todoForm!: FormGroup; // Объявляем форму FormGroup

  @Output() addTodo = new EventEmitter<{ title: string, description: string }>();

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    // Создаем форму с двумя полями: title и description
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  // Метод для добавления задачи
  onSubmit(): void {
    if (this.todoForm.valid) {
      // Проверяем, что форма валидна
      const { title, description } = this.todoForm.value;
      this.addTodo.emit({ title, description }); // Отправляем данные наружу через EventEmitter
      this.todoForm.reset(); // Очищаем форму после отправки
    }
  }
}
