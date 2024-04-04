import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MeetupsPageComponent } from './pages/meetups-page/meetups-page.component';
import { UserMeetupsPageComponent } from './pages/user-meetups-page/user-meetups-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent, title: 'Вход' },
  { path: 'registration', component: RegisterPageComponent, title: 'Регистрация' },
  { path: 'meetups', component: MeetupsPageComponent, title: 'All Meetups' },
  {
    path: 'userMeetups',
    component: UserMeetupsPageComponent,
    title: 'My Meetups',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
