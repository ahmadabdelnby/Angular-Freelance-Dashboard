import { Routes } from '@angular/router';
import { Login } from './core/login/login';
import { App } from './app';
import { AdminProfile } from './core/admin-profile/admin-profile';
export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'profile', component: AdminProfile }, // new route
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }

];
