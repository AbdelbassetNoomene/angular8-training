import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class UserService{

  users: User[] = [
    new User(1, 'name 1', 'lastname 1', true),
    new User(1, 'name 2', 'lastname 2', false),
    new User(1, 'name 3', 'lastname 3', false),
    new User(1, 'name 4', 'lastname 4', true)
  ];
  
  constructor(private logging : LoggingService) { }


  getUsers() : User[] {
    return this.users;
  }

  addUser(name : string, lastname : string){
    this.logging.log('add new user',name);
    let user = new User(this.users.length + 1, name, lastname, false);
    this.users.push(user);
  }
}
