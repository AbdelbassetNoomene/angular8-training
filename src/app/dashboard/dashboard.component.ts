import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

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
  content : string
  condition = false;
  condition2 = false;
  text = '';

  constructor() { }

  ngOnInit() {
  }

  validate(input: HTMLInputElement) {
    console.log(input);
    this.angVersion = 'Angular ' + input.value;

  }

  getSPAResponse(){
    console.log(this.spaInput);
    this.spa = this.spaInput.nativeElement.value;

    this.spaInput.nativeElement.value = 'change value';// never to user
  }
  projectContent(){
    this.content = this.contentInput.nativeElement.value;
  }

  verifyText(){
    this.text = this.textValue.nativeElement.value;
  }
}
