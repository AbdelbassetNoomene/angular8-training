import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { tap, catchError } from "rxjs/operators";
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector){}
  intercept(req, next) {
    let token = sessionStorage.getItem('token');
    let authService = this.injector.get(AuthService)
    console.log(req);
    if(req.url.indexOf('auth')==-1 && token != null){
        console.log(token);
        let tokenizedReq = req.clone(
            {
              headers: req.headers.set('Authorization', "Bearer " + token)
            }
          )
          return next.handle(tokenizedReq).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                  console.log(evt.headers.get('Authorization'));
                }
                }));
    }else{
        let header = req.clone(
            {
              headers: req.headers.set('Accept', 'application/json')
            }
          )
          return next.handle(header).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                  console.log(evt.headers.get('Authorization'));
                }
                }));
    }
  }

}