import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenavEvent = new EventEmitter<boolean>();

  @Input() toggleOpened : boolean;

  currentUserSubscription : Subscription;
  authenticated : boolean;

  constructor(private authenticationService: AuthService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      if(user){
        this.authenticated = true;
      }else{
        this.authenticated = false;
      } 
    });
  }

  ngOnInit() {

  }

  toggleSidenav(action: number){
    this.toggleSidenavEvent.emit(action == 1 ? true:false);
  }

  logout(){
    this.authenticationService.logoutUser();
  }
}
