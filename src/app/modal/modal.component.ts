import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgForm } from '@angular/forms';
import { StateService } from '../state.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private stateService: StateService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onSubmit(formData: NgForm){
    this.stateService.categoriesModalPopUpEdited.next(formData.value.cat_title);
    this.dialogRef.close();
  }

  boomer(submitButtonOriginal){
    submitButtonOriginal._elementRef.nativeElement.click();
  }

}
