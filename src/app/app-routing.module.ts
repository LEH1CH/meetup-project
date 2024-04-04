import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProjectDescriptionPageComponent } from './project-description-page/project-description-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './auth.guard';
import { MyMeetupsComponent } from './my-meetups/my-meetups.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'project-description', component: ProjectDescriptionPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'my-meetups', component: MyMeetupsComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
  // Добавьте другие маршруты здесь, если это необходимо
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
