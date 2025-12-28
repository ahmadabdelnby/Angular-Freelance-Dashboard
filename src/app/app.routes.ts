import { Routes } from '@angular/router';
import { Login } from './core/login/login';
import { App } from './app';
import { AdminProfile } from './core/admin-profile/admin-profile';
import { Main } from './core/main/main';
import { CollectionPage } from './pages/collection-page/collection-page';
import { DashboardHome } from './pages/dashboard-home/dashboard-home';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
    { path: 'login', component: Login, canActivate: [loginGuard] },
    { 
      path: 'dashboard', 
      component: Main,
      canActivate: [authGuard],
      children: [
        { path: '', component: DashboardHome },
        { path: ':collection', component: CollectionPage }
      ]
    },
    { path: 'profile', component: AdminProfile, canActivate: [authGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];

