import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  users: User[] = [
    new User(1, 'name 1', 'lastname 1', true),
    new User(2, 'name 2', 'lastname 2', false),
    new User(3, 'name 3', 'lastname 3', false),
    new User(4, 'name 4', 'lastname 4', true)
  ];

  constructor(private logging: LoggingService,private http : HttpClient ) { }


  getUsers() {
    return this.http.get<User[]>('http://localhost:8080/users');
    //return this.users;
  }

  addUser(name: string, lastname: string) {
    this.logging.log('add new user', name);
    let user = new User(this.users.length + 1, name, lastname, false);
    return this.http.post('http://localhost:8080/users',user)
    //this.users.push(user);
  }

  addUser2(user: User) {
    // user.id = this.users.length + 1;
    // this.users.push(user);
    return this.http.post<User>('http://localhost:8080/users',user);
  }

  getUser(id: number) {
    for (var user of this.users) {
      if (user.id == id) {
        return user;
      }
    }
    return null;
  }

  deleteUser(id) {
    // user.id = this.users.length + 1;
    // this.users.push(user);
    return this.http.delete('http://localhost:8080/users/'+id);
  }
  
}
