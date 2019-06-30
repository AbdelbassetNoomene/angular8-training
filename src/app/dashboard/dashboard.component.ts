import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  angVersion: String;
  @ViewChild('spaInputValue', { static: true }) spaInput: ElementRef;
  @ViewChild('contentInputValue', { static: true }) contentInput: ElementRef;
  @ViewChild('textInputValue', { static: true }) textValue: ElementRef;

  spa: string;
  content: string
  condition = false;
  condition2 = false;
  text = '';
  date = new Date();

  users: User[] = [];
  asynUsers;


  constructor() { }

  ngOnInit() {
    this.users.push(new User(1, 'name1', 'lastname1', true));
    this.users.push(new User(1, 'name2', 'lastname2', false));
    this.users.push(new User(1, 'name3', 'lastname3', false));
    this.users.push(new User(1, 'name4', 'lastname4', true));
    this.asynUsers = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(this.users);
        resolve(this.users);
        clearTimeout;
      }, 4000);
    });
  }

  validate(input: HTMLInputElement) {
    console.log(input);
    this.angVersion = 'Angular ' + input.value;

  }

  getSPAResponse() {
    console.log(this.spaInput);
    this.spa = this.spaInput.nativeElement.value;

    this.spaInput.nativeElement.value = 'change value';// never to user
  }
  projectContent() {
    this.content = this.contentInput.nativeElement.value;
  }

  verifyText() {
    this.text = this.textValue.nativeElement.value;
  }

  addUser(active) {
    let index = this.users.length + 1;
    this.users.push(new User(index, 'name' + index, 'lastname' + index, active == 1));
    clearTimeout;
  }
  getAsyncUsers() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(this.users);
        resolve(this.users);
        clearTimeout;
      }, 4000);
    });
  }
}
