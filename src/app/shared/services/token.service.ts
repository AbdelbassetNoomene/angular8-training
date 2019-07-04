import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
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
              headers: req.headers.set('Authorization', token)
            }
          )
          return next.handle(tokenizedReq);
    }else{
        let header = req.clone(
            {
              headers: req.headers.set('Accept', 'application/json')
            }
          )
          return next.handle(header);
    }
  }

}