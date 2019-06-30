import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const AppRoutes: Routes = [
    { path: '', component: DashboardComponent, pathMatch: 'full'},
    { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
    { path: 'dashboard', component: DashboardComponent },
    { path: '**', redirectTo: '' },
  ];