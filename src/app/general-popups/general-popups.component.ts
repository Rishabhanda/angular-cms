import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef,  MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-general-popups',
  templateUrl: './general-popups.component.html',
  styleUrls: ['./general-popups.component.css']
})
export class GeneralPopupsComponent implements OnInit {

  constructor(    public dialogRef: MatDialogRef<GeneralPopupsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
