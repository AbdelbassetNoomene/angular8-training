import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  listUsers: User[] = [];
  displayedColumns = ['image', 'name', 'lastname', 'age', 'active', 'actions'];

  constructor(private userService: UserService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.listUsers = this.userService.getUsers();
  }

  addUser() {
    this.router.navigate(['new'], { relativeTo: this.activeRoute });
  }

  editUser(index : number) {
    this.router.navigate([index,'edit'], { relativeTo: this.activeRoute });
  }

}
