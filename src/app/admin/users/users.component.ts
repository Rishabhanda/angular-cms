import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

import {User} from '../../models/user.model';
import {DataService} from '../../data.service';
import { UserProfileModalComponent } from 'src/app/user-profile-modal/user-profile-modal.component';
import { GeneralPopupsComponent } from 'src/app/general-popups/general-popups.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  displayedColumns: string[] = ['id','userName','delete','view'];
  userIdSelected:number;
  isLoading: boolean;
  constructor(private dataService: DataService,public dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.dataService.getUsers().subscribe((response)=>{this.users = response;
      this.isLoading = false;})
  }

  viewProfile(event){
      this.userIdSelected =  +event.target.parentElement.children[0].innerText;
      this.dialog.open(UserProfileModalComponent,{
        height: '33em',
        width: '44em',
        data:{ heading: 'Profile',data:this.users.filter((x)=>{return x.userId == this.userIdSelected}).pop(),id:this.userIdSelected}
      })
  }
  deleteUser(event){
    this.isLoading = true;
    this.dataService.deleteUser(+event.target.parentElement.children[0].innerText).subscribe((response:any) => {
      if(response.message ==='yoou are not authorized'){
        this.isLoading = false;
        this.dialog.open(GeneralPopupsComponent, {
          height: '12em',
          width: '30em',
          data:{ message: 'you are not authorized', buttonOne : 'ok', buttonTwo: 'close'}
        });
      }else if(response.message ==='user deleted successfully'){
        this.dataService.getUsers().subscribe((subscribedResponse)=>{this.isLoading = false; this.users = subscribedResponse;})
      }
    })
  }

}
