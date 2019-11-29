import {Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ToastrService } from 'ngx-toastr';
import {API} from '../config/api-url';
import {Message} from '../shared/models/message.model';
import {WebsocketService} from '../shared/services/websocket.service';
import {NotifierService} from 'angular-notifier';
import {ChatService} from '../shared/services/chat.service';
import {Subscription} from 'rxjs';
import {NotificationsService} from '../shared/services/notifications.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() displayChat = false;
  isOpen = true;
  resizeChat(){
    this.isOpen =! this.isOpen;
  }
  chatMember = {name : '', chats:[]};
  userId = "";
  message = '';
  selectedIndex :number= 0;
  isSelected = false;
  lstUsers =[];
  lstChat = [];

  chatSubscription : Subscription;

  constructor(private chatService: ChatService, private websocket: WebsocketService, private notifService: NotificationsService) { }

  ngOnInit() {

    this.userId = localStorage.getItem('websocketId');
    this.chatService.getChatUsers().subscribe((data) => {
      console.log(data);
      //this.lstUsers = data;
      if(this.lstUsers !=null){
        data.forEach(user=>{
          if(user != localStorage.getItem('websocketId') ){
            this.lstUsers.push(user);
            this.lstChat.push({
              name : user,
              chats : []
            });
          }
        });
        this.chatMember = this.lstChat[0];
      }
    });
    //this.chatSubscription.unsubscribe();
    this.chatSubscription = this.notifService.chatMsg.subscribe(msg => {
      if(msg){
        for(var i=0; i< this.lstChat.length; i++) {
          if (this.lstChat[i].name == msg.from && msg) {
            if(this.selectedIndex == i){
              this.lstChat[i].chats = this.chatMember.chats;
              this.chatMember.chats.push({
                text: msg.text,
                date: msg.date,
                senderId: msg.from
              });
            }
          }
        }
      }
    });
  }

  selectMember(index : number){
    this.chatMember = this.lstChat[index];
    this.selectedIndex=index;
  }

  sendMessage(){
    this.chatMember.chats.push({
      text : this.message,
      date : new Date(),
      senderId : this.userId
    });
    this.lstChat[this.selectedIndex]= this.chatMember;
    const msg = { text: this.message, from: localStorage.getItem('websocketId'), destination: this.chatMember.name, date : new Date(), type: 'chat' };
    this.websocket.sendMessage(JSON.stringify(msg));
    this.message = '';
  }

}
