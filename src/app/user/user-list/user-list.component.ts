import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/shared/models/role.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserInfo } from 'src/app/shared/models/user2.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  listUsers: User[] = [];
  displayedColumns = ['image', 'name', 'lastname', 'age', 'active', 'actions'];
  currentUser: UserInfo;
  currentUserSubscription: Subscription;

  constructor(private userService: UserService, private router: Router, private activeRoute: ActivatedRoute, 
    private authenticationService: AuthService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
   }

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      console.log(data);
      this.listUsers= data;
    });
  }

  addUser() {
    this.router.navigate(['new'], { relativeTo: this.activeRoute });
  }

  editUser(index : number) {
    this.router.navigate([index,'edit'], { relativeTo: this.activeRoute });
  }

  isAdmin() {
    console.log(this.currentUser.roles.includes(Role.ADMIN));
    return this.currentUser && this.currentUser.roles.includes(Role.ADMIN);
}

}
