import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';

import { DataService } from '../data.service';
import { filter } from 'rxjs/operators';
import { StateService } from '../state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMobile = false;
  categories: {catId: string, catName: string}[] = [];
  currentRouteCheck: NavigationEnd = {id: null, url: '', urlAfterRedirects: ''};
  isUserLoggedIn = false;
  userName: string = null;
  unsubscriber: Subscription[] = [];
  regex = new RegExp(/\/admin/);
  isSideLeftNavShown = false;
  isSideRightNavShown = false;

  constructor(private dataService: DataService, public router: Router, private stateService: StateService) {
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(
      (value: NavigationEnd) => {
        this.currentRouteCheck = value;

// notifying that a button is pressed
        this.stateService.isSideNavLeftOn.next( false );
        this.stateService.isSideNavRightOn.next( false );
        this.isSideLeftNavShown = false;
        this.isSideRightNavShown = false;
      }
    );
  }

  ngOnInit() {
    this.dataService.getCategories().subscribe(
      (data) => {this.categories = data ; },
      (error) => {console.error(error) ; }
    );
    // getting user log in status
    this.unsubscriber[0] = this.stateService.userStatusEventEmitter.subscribe(
        (loggedStatus) => {this.isUserLoggedIn = loggedStatus;}
      );
    this.unsubscriber[1] = this.stateService.userNameEventEmitter.subscribe(
      (userName) => {this.userName = userName}
    );
    this.unsubscriber[2] = this.stateService.categoriesSubject.subscribe(
      (data) => {this.categories = data}
    )
  }

  // user logged out
  logout() {
    this.stateService.logOutState(null , null , null);
  }

  sideNavLeftToggle() {
    this.isSideLeftNavShown = !this.isSideLeftNavShown;
    if ( this.isSideLeftNavShown ) {
      this.stateService.isSideNavLeftOn.next( true );
    } else {
      this.stateService.isSideNavLeftOn.next( false );
    }
    this.stateService.isSideNavLeftOn.subscribe((res)=>{this.isSideLeftNavShown = res})
  }

  sideNavRightToggle() {
    this.isSideRightNavShown = !this.isSideRightNavShown;
    if ( this.isSideRightNavShown ) {
      this.stateService.isSideNavRightOn.next( true );
    } else {
      this.stateService.isSideNavRightOn.next( false );
    }
    this.stateService.isSideNavRightOn.subscribe((res)=>{this.isSideRightNavShown = res})
  }

  ngOnDestroy() {
    for (let unsubs of this.unsubscriber){
      unsubs.unsubscribe();
    }
  }

}
