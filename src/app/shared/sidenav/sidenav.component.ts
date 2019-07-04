import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  currentUserSubscription: Subscription;
  opened = true;

  authenticated: boolean;
  isAdmin: boolean;

  constructor(private authenticationService: AuthService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      if(user){
        this.authenticated = true;
        this.isAdmin = user.roles.includes("ADMIN");
      }else{
        this.authenticated = false;
        this.isAdmin=false;
      } 
    });
  }

  ngOnInit() {
  }

  toggleSidenav(event) {
    console.log(event);
    this.opened = event;
  }

}
