import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { TodoService } from './todo.service';
import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoSearchComponent } from './todo-search/todo-search.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProjectDescriptionPageComponent } from './project-description-page/project-description-page.component';
import { TodoPageComponent } from './todo-page/todo-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterPageComponent } from './register-page/register-page.component';
import { TokenInterceptor } from './http-interceptors/todo-interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarMeetupComponent } from './navbar-meetup/navbar-meetup.component';
import { UsersComponent } from './users/users.component';
import { MyMeetupsComponent } from './my-meetups/my-meetups.component';
import { MeetupListComponent } from './meetup-list/meetup-list.component';
import { MeetupItemComponent } from './meetup-item/meetup-item.component';
import { MeetupAddComponent } from './meetup-add/meetup-add.component';
import { MeetupEditComponent } from './meetup-edit/meetup-edit.component';
import { ModalComponent } from './modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoListComponent,
    TodoAddComponent,
    TodoSearchComponent,
    LoginPageComponent,
    ProjectDescriptionPageComponent,
    TodoPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    NavbarComponent,
    NavbarMeetupComponent,
    UsersComponent,
    MyMeetupsComponent,
    MeetupListComponent,
    MeetupItemComponent,
    MeetupAddComponent,
    MeetupEditComponent,
    ModalComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    TodoService,
    LoginPageComponent,
    MeetupListComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
