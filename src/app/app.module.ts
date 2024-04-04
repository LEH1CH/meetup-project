import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { TodoService } from './todo.service';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProjectDescriptionPageComponent } from './project-description-page/project-description-page.component';
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
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ProjectDescriptionPageComponent,
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
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    TodoService,
    MeetupListComponent,
    LoginPageComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
