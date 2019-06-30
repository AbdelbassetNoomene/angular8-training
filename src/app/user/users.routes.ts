import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EditUserComponent } from './edit-user/edit-user.component';

export const UsersRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: UserListComponent, pathMatch: 'full'},
      { path: 'new', component: EditUserComponent },
      { path: ':id', component: UserDetailsComponent, pathMatch: 'full' },
      { path: ':id/edit', component: EditUserComponent }
    ]
  }
];