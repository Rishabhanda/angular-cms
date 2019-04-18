import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from '../state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private stateService: StateService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;

    return this.checkingUserStatus();
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

  canLoad(): boolean{
    return this.checkingUserStatus();
  }

  checkingUserStatus(): boolean{
    if(this.stateService.getAccessToken() != undefined){
      return true;
    } else{
      //if user is not authnticated then we can store the url he had requested in url(from state.url) and after signing in him we can redirect him to  that url
      // console.log(url);
      this.router.navigate(['/auth/signin']);
      return false;
    }

  }
}
