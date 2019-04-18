import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import {MatDialog} from '@angular/material';

import { AuthService } from '../auth.service';
import {StateService} from '../../state.service';
import { Router } from '@angular/router';
import { GeneralPopupsComponent } from 'src/app/general-popups/general-popups.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoading: boolean;
  constructor(private authService: AuthService, private stateService: StateService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }

  onSubmit(formData: NgForm){
    this.isLoading = true;
    this.authService.getUser(JSON.stringify(formData.value)).subscribe(
      (response: {username:string, access_token: string, refresh_token:string} | any)=>{
        console.log('senta');
        this.isLoading = false;
        if(response.username && response.access_token && response.refresh_token){
          //user is authenticated
          this.stateService.logInState(response.username,response.access_token,response.refresh_token);
          this.router.navigate(['/']);
        }else{
          //user is not authenticated
          this.stateService.logOutState(null,null,null);
        }
        if(response.message=='user not found'){
          this.isLoading = false;
          this.dialog.open(GeneralPopupsComponent, {
            height: '12em',
            width: '30em',
            data:{message:'you enterred wrong credentials',buttonOne:'Try Again',buttonTwo:'Sign Up'}
          })
        }
      }
    );
  }

}
