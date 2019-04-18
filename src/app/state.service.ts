import {Injectable, EventEmitter} from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()

export class StateService{
   //username if logged in
    private userName: string;
    private accessToken: string;
    private refreshToken:string;

    userStatusEventEmitter = new EventEmitter<boolean>();
    userNameEventEmitter = new EventEmitter<string>();
    categoriesSubject = new Subject<{catId: string, catName: string}[]>();
    categoriesModalPopUpEdited = new Subject<string>();
    isSideNavLeftOn = new Subject<boolean>();
    isSideNavRightOn = new Subject<boolean>();
    PostsModalEdit = new Subject<any>();
    PostsModalAdd = new Subject<any>();
    //state of the user i.e whether user is logged in or not
    isUserLoggedIn: boolean = false;

    constructor(){}

    getLogInStatus(){
       this.userStatusEventEmitter.emit(this.isUserLoggedIn);
    }

    getUserName(){
        this.userNameEventEmitter.emit(this.userName);
    }

    getAccessToken(){
        return this.accessToken;
    }

    getRefreshToken(){
        return this.refreshToken;
    }

    setUserNameandTokens(name, accesstoken, refreshToken){
        this.userName = name;
        this.accessToken = accesstoken;
        this.refreshToken = refreshToken;
    }

    logInState(name, accesstoken, refreshToken){
        this.isUserLoggedIn = true;
        this.setUserNameandTokens(name, accesstoken, refreshToken);
        this.getLogInStatus();
        this.getUserName();
    }
    logOutState(name, accesstoken, refreshToken){
        this.isUserLoggedIn = false;
        this.setUserNameandTokens(null,null,null);
        this.getLogInStatus();
        this.getUserName();
    }

}
