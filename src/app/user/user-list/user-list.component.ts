import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  listUsers : User[] = [];
  constructor(private userService : UserService) { }

  ngOnInit() {
    this.listUsers = this.userService.getUsers();
  }

}
