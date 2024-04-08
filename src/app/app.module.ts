import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MeetupsPageComponent } from './pages/meetups-page/meetups-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { MeetupComponent } from './components/meetup/meetup.component';
import { HeaderComponent } from './components/header/header.component';
import { authInterceptor } from './interceptors/auth.interceptor';
import { FilterFormComponent } from './components/forms/filter-form/filter-form.component';
import { FilterMeetupsPipe } from './pipes/filter-meetups.pipe';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MeetupFormComponent } from './components/forms/meetup-form/meetup-form.component';
import { UserTableRowComponent } from './components/user-table-row/user-table-row.component';
import { ModalComponent } from './components/modal/modal.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserFilterMeetupsPipe } from './pipes/user-filter-meetups.pipe';
import { MyMeetupsPageComponent } from './pages/my-meetups-page/my-meetups-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UserFormComponent } from './components/forms/user-form/user-form.component';
import { DescriptionPageComponent } from './pages/description-page/description-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MeetupsPageComponent,
    LoginFormComponent,
    MeetupComponent,
    HeaderComponent,
    FilterFormComponent,
    FilterMeetupsPipe,
    MeetupFormComponent,
    MyMeetupsPageComponent,
    ModalComponent,
    RegisterFormComponent,
    RegisterPageComponent,
    UsersPageComponent,
    UserFilterMeetupsPipe,
    UserTableRowComponent,
    UserFormComponent,
    DescriptionPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTableModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'ru_RU' },
    provideMomentDateAdapter(),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
