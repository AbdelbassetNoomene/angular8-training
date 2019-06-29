import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenavEvent = new EventEmitter<boolean>();

  @Input() toggleOpened : boolean;

  constructor() { }

  ngOnInit() {

  }

  displaySidenav(){
    this.toggleSidenavEvent.emit(true);
  }
  hideSidenav(){
    this.toggleSidenavEvent.emit(false);
  }

}
