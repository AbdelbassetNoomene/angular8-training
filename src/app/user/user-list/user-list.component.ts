import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/shared/models/role.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserInfo } from 'src/app/shared/models/user2.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import swal from 'sweetalert2';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

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

  @ViewChild('confirmUserDeletionSwal',{static : true}) private confirmUserDeletionSwal: SwalComponent;
  @ViewChild('userDeleted',{static : true}) private userDeleted: SwalComponent;
  selectedId : number;

  constructor(private userService: UserService, private router: Router, private activeRoute: ActivatedRoute, 
    private authenticationService: AuthService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      if(user){
        this.currentUser = user;
      }else{
        this.currentUser = null;
      }   
      
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

  deleteUser(id){
    this.selectedId = id;
   this.confirmUserDeletionSwal.show();
  }

  confirmDeleteUser(){
    this.userService.deleteUser(this.selectedId).subscribe((data) => {
      this.userDeleted.show();
    });
  }
  isAdmin() {
    return this.currentUser && this.currentUser.roles.includes(Role.ADMIN);
}

}
