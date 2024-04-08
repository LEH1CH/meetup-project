import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MeetupsPageComponent } from './pages/meetups-page/meetups-page.component';
import { AdminGuard } from './guards/admin.guard';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { MyMeetupsPageComponent } from './pages/my-meetups-page/my-meetups-page.component';
import { AuthGuard } from './guards/auth.guard';
import { DescriptionPageComponent } from './pages/description-page/description-page.component';

const routes: Routes = [
  { path: '', component: DescriptionPageComponent, title: 'Описание' },
  { path: 'login', component: LoginPageComponent, title: 'Вход' },
  {
    path: 'registration',
    component: RegisterPageComponent,
    title: 'Регистрация',
  },
  {
    path: 'meetups',
    component: MeetupsPageComponent,
    title: 'Все митапы',
    canActivate: [AuthGuard],
  },
  {
    path: 'userMeetups',
    component: MyMeetupsPageComponent,
    title: 'Мои митапы',
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersPageComponent,
    title: 'Пользователи',
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: '**', component: DescriptionPageComponent, redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
