import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgForm } from '@angular/forms';
import { StateService } from '../state.service';


@Component({
  selector: 'app-postpopupmodal',
  templateUrl: './postpopupmodal.component.html',
  styleUrls: ['./postpopupmodal.component.css']
})
export class PostpopupmodalComponent implements OnInit, OnDestroy {

  isImageChanged:boolean = false;
  imageUrl: string | ArrayBuffer;
  imageAddedUrl: string | ArrayBuffer;
  fileImageEdited;
  fileImageAdded;
  changeImageRequest: boolean = false; 
  @ViewChild('realSubmitButton') realSubmitButton;
  @ViewChild('imageChangeFileTag') imageChangeFileTag;
  @ViewChild('imageAddFileTag') imageAddFileTag;

  constructor(private stateService:StateService,
    public dialogRef: MatDialogRef<PostpopupmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onSubmitAdd(formData: NgForm){
    formData.value.image = this.fileImageAdded;
    this.stateService.PostsModalAdd.next(formData.value);
    this.dialogRef.close();
  }

  onSubmitEdit(formData: NgForm){
    if(this.fileImageEdited){
      formData.value.image = this.fileImageEdited;
    }
    this.stateService.PostsModalEdit.next(formData.value);
    this.dialogRef.close();
  }

  //clicking the submit button programatically
  boomer(){
    this.realSubmitButton._elementRef.nativeElement.click();
  }

  changeImage(){
    this.imageChangeFileTag.nativeElement.click();
  }

  filetagImageChangeFunction(event: Event){
    this.isImageChanged = true;
    this.fileImageEdited = (event.target as HTMLInputElement).files[0];
    var reader = new FileReader();
    reader.addEventListener('load',(e)=>{
      this.imageUrl = (e.target as FileReader).result;
    })
    reader.readAsDataURL(this.fileImageEdited);
  }

  changeAddImage(){
    this.imageAddFileTag.nativeElement.click();
    }


  fileAddedDisplay(eventAddedFile){
    this.fileImageAdded = (eventAddedFile.target as HTMLInputElement).files[0];
    var reader = new FileReader();
    reader.addEventListener('load',(ev)=>{
      this.imageAddedUrl = (ev.target as FileReader).result;
    })
    reader.readAsDataURL(this.fileImageAdded);
  }  
  ngOnDestroy(){
    
  }
}
