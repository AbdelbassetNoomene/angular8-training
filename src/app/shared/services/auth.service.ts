import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserInfo } from '../models/user2.model';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserInfo>;
  public currentUser: Observable<UserInfo>;
  public user : UserInfo;

  constructor(private http: HttpClient,
    private router: Router) {
      this.currentUserSubject = new BehaviorSubject<UserInfo>(JSON.parse(sessionStorage.getItem('user')));
        this.currentUser = this.currentUserSubject.asObservable();
     }

  login(email: string, password: string) {
    const code = btoa(email + ':' + password);
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + code);
    //return this.http.post<any>(API_URLS.AUTH_URL, null,{headers});
    return this.http.post<any>("http://localhost:8080/auth", null,{headers})
    .pipe(map(res => {
      if (res && res.token) {
          sessionStorage.setItem('token', res.token);
        const helper = new JwtHelperService();
        this.user =JSON.parse(helper.decodeToken(res.token).sub);

        sessionStorage.setItem('user', JSON.stringify(this.user));
        this.currentUserSubject.next(this.user);
      }
      // console.log(res);
      return res;
  }));
}

logoutUser() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  this.router.navigate(['/auth']);
  this.currentUserSubject.next(null);
}

getToken() {
  return sessionStorage.getItem('token');
}

decodeToken(): User {
  let token = sessionStorage.getItem('token');
  let helper = new JwtHelperService();
  let user = JSON.parse(helper.decodeToken(token).sub);
  return user;
}

loggedIn() {
  return !!sessionStorage.getItem('token');
}
isAdmin() {
  return this.user && this.user.roles.includes("ADMIN");
}
}
