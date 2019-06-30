import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(users: User[], actif: boolean): any {
    let filteredUsers: User[] = [];
    for (const user of users) {
      if (user.actif == actif) {
        filteredUsers.push(user);
      }
    }
    return filteredUsers;
  }

}
