import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {NotificationsService} from '../services/notifications.service';

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

  constructor(private authenticationService: AuthService, private notifService: NotificationsService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      if(user){
        this.authenticated = true;
      }else{
        this.authenticated = false;
      } 
    });
    if (this.notifService.getWSState() == null || this.notifService.getWSState() == undefined) {
      this.notifService.initWebsocket(localStorage.getItem('websocketId'));
    }
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
