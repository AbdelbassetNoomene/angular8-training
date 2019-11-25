import { Injectable } from '@angular/core';
import { Message } from '@stomp/stompjs';
import { WebsocketService } from './websocket.service';
import { Subscription, Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import * as jQuery from 'jquery';

import { BehaviorSubject } from 'rxjs';
import swal from 'sweetalert2';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import {NotifierService} from 'angular-notifier';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public message: Observable<Message>;
  public wsstate: Observable<string>;
  private datasubscription: Subscription;
  private statesubscription: Subscription;
  public uiData: any;
  private notifNumber = new BehaviorSubject(0);
  currentNumber = this.notifNumber.asObservable();

  constructor(
    private router: Router,
    private websocketService: WebsocketService,
    private http: HttpClient,
    private notifierService: NotifierService
  ) {
  }

  initWebsocket(userId) {
    this.websocketService.connectWebSocket(userId);
    this.datasubscription = this.websocketService
      .getSocketDataObservable()
      .subscribe(msg => {
        this.onData(msg);
      });
    this.statesubscription = this.websocketService
      .getSocketStateObservable()
      .subscribe(msg => {
        this.onStateChange(msg);
      });

  }

  redirect(user) {
    const websocketUser = user.email;
    localStorage.setItem('websocketId', websocketUser);
    this.initWebsocket(websocketUser);
  }

  getWSState() {
    return this.wsstate;
  }

  private onData = message => {
    console.log(this.wsstate);
    console.log(message.body);
    this.showNotification(JSON.parse(message.body));
    this.updateNotif();


  };

  private onStateChange = (state: String) => {
    // console.log('WS connection state changed '+state);
  };

  private onClose = (event: Event) => {
    setTimeout(this.initWebsocket, 5000)
  }

  updateNotif() {
    this.notifNumber.next(1);
  }

  showNotification(message) {
    console.log(message);
    this.notifierService.notify('error', message.subject + ': ' + message.text);

  }
}

