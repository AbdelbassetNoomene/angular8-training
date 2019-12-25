import { Injectable } from '@angular/core';
import {API} from '../../config/api-url';
import { Subscription, Observable } from 'rxjs';
import { StompState, StompRService } from '@stomp/ng2-stompjs';
import { map } from 'rxjs/operators';
import { Message } from '@stomp/stompjs';
import {stompConfig, WebSocketConfig} from '../../config/websocket.config';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public message: Observable<Message>;
  public wsstate: Observable<string>;


  constructor(private stompService: StompRService) { }

  public connectWebSocket(userId) {
    const config = stompConfig;
    config.headers = {
      user: userId
    };

    this.stompService.config = config;
    this.stompService.initAndConnect();

    this.wsstate = this.stompService.state.pipe(map((state: number) => StompState[state]));
    console.log('wsstate : ' + this.wsstate);
    this.message = this.stompService.subscribe(WebSocketConfig.topic);

  }

  public getSocketDataObservable() {
    console.log(this.message);
    return this.message;
  }

  public getSocketStateObservable() {
    console.log(this.wsstate);
    return this.wsstate;

  }

  sendMessage(message: any) {
    console.log(message);
    this.stompService.publish('/app/send/message', message);
  }

}
