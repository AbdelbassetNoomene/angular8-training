import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './shared/services/auth.guard.service';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';

export const AppRoutes: Routes = [
    { path: '', component: DashboardComponent, pathMatch: 'full'},
    { path: 'auth', component: AuthComponent, pathMatch: 'full'},
    { path: 'users',canActivate: [AuthGuard], loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'forms', component: ReactiveFormsComponent },
    { path: '**', redirectTo: '' },
  ];