import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {DataService} from '../data.service';
import {StateService} from '../state.service';

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.css']
})
export class UserProfileModalComponent implements OnInit {

  constructor(
    private stateService:StateService,
    private dataService:DataService,
    public dialogRef: MatDialogRef<UserProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {
  }

  changeRole(id,value: string){
    this.dataService.updateUserRole(id,value).subscribe()
  }
}
