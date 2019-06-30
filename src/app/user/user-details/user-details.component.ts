import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  //providers: [UserService]
})
export class UserDetailsComponent implements OnInit {

  user : User;
  constructor(private userService : UserService,private router: Router, private activeRoute: ActivatedRoute) {
    
  }

  ngOnInit() {
    if(this.activeRoute.snapshot.params['id']){
      this.user = this.userService.getUser(+this.activeRoute.snapshot.params['id']);
    }else{
      this.user = {
        id : 0,
        name : '',
        lastname : '',
        age : 0,
        active : false,
        image : ''
      }
    }
  }

  addUser(name: string, lastname: string) {
    this.userService.addUser(name, lastname);
  }

}
