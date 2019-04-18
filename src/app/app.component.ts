import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from './state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  isDisplayerOn = false;
  unsubscriptionLeft: Subscription;
  unsubscriptionRight: Subscription;

  constructor(private stateService: StateService){
  }
  ngOnInit() {
    this.unsubscriptionLeft = this.stateService.isSideNavLeftOn.subscribe((response) => {this.isDisplayerOn = response;})
    this.unsubscriptionRight = this.stateService.isSideNavRightOn.subscribe((response) => {this.isDisplayerOn = response;})
  }
  hideMe() {
    this.stateService.isSideNavLeftOn.next(false);
    this.stateService.isSideNavRightOn.next(false);
  }

  ngOnDestroy() {
    this.unsubscriptionLeft.unsubscribe();
    this.unsubscriptionRight.unsubscribe();
  }
}
