import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MeetupsPageComponent } from './pages/meetups-page/meetups-page.component';

import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { MyMeetupsPageComponent } from './pages/my-meetups-page/my-meetups-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, title: 'Вход' },
  {
    path: 'registration',
    component: RegisterPageComponent,
    title: 'Регистрация',
  },
  { path: 'meetups', component: MeetupsPageComponent, title: 'All Meetups' },
  {
    path: 'userMeetups',
    component: MyMeetupsPageComponent,
    title: 'My Meetups',
  },
  { path: 'users', component: UsersPageComponent, title: 'Users' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
