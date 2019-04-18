import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

import { Observable } from 'rxjs';
import { StateService } from '../state.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    constructor(private stateService: StateService){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let accessToken: string = this.stateService.getAccessToken();
        // let refreshToken: string = this.stateService.getRefreshToken();
        const authReq = req.clone({
            // url: req.url.replace('http://', 'https://'),
            headers: new HttpHeaders({
              // 'Content-Type':  'application/json',
              // 'Content-Type':  'multipart/form-data',
              'Authorization': 'Bearer ' + accessToken
            })

           // headers: req.headers.set('Authorization', 'Bearer ' + accessToken)
          });
          // send cloned request with header to the next handler.
        //   console.log(authReq);
          return next.handle(authReq);
    }
}
// const authReq = req.clone({
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Authorization': 'my-auth-token'
//   })
// });
