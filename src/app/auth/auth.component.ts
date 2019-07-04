import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { NgForm } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { Role } from '../shared/models/role.model';
import { UserInfo } from '../shared/models/user2.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  private currentUserSubject: BehaviorSubject<UserInfo>;
  public currentUser: Observable<UserInfo>;

  constructor(private authService: AuthService, private router: Router,private activatedRoute: ActivatedRoute) {
    this.currentUserSubject = new BehaviorSubject<UserInfo>(JSON.parse(sessionStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }



  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<any>;

    this.isLoading = true;

    authObs = this.authService.login(email, password);

    
    authObs.subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(['/users']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );

    form.reset();
  }

}
