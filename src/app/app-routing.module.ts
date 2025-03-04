import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {AuthGuard} from './core/utils/auth.guard';
import {UserPageComponent} from './pages/user-page/user-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'profile', component: UserPageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {}
