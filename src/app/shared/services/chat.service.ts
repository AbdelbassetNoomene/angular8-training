import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getChatUsers() {
    return this.http.get<string[]>('http://localhost:8080/api/users');
  }
}
