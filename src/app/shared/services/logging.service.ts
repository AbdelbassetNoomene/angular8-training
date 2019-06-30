import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(title : string, data : String){
    console.log(title + ": " + data);
  }
}
