import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  //providers: [UserService]
})
export class UserDetailsComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  addUser(name: string, lastname: string) {
    this.userService.addUser(name, lastname);
  }

}
