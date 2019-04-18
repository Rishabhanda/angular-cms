import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  imgFileSelected: File;
  imgFromFileReaderData: string | ArrayBuffer;
  signUpForm :FormGroup;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    
    this.signUpForm = new FormGroup({
      'userDetails': new FormGroup({
        'username': new FormControl(null,[Validators.required,Validators.minLength(4)]),
        'firstname': new FormControl(null,[Validators.required,Validators.minLength(4)]),
        'lastname':new FormControl(null,[Validators.required,Validators.minLength(4)])
      }),
      'image': new FormControl(null,[Validators.required]),
      'imgFile': new FormControl(null),
      'credentials': new FormGroup({
        'email': new FormControl(null,[Validators.required, Validators.email]),
        'password': new FormControl(null,[Validators.required,Validators.minLength(4)])
      })
    })
  }
  imageSelected(event){
    this.imgFileSelected = event.target.files[0];
    var reader = new FileReader();
    reader.addEventListener('load',(ev)=>{
      this.imgFromFileReaderData = (ev.target as FileReader).result;
    })
    reader.readAsDataURL(this.imgFileSelected);
  }
  onSubmit(){
    this.signUpForm.patchValue({
      'imgFile':this.imgFileSelected
    })
    this.dataService.createUser(this.signUpForm.value,this.signUpForm.value.imgFile).subscribe(
      (response: {'message':string})=>{
        if(response.message == 'user created'){
          this.router.navigate(['/auth/signin']);
          this.signUpForm.reset();
        } else if(response.message == 'user already exists'){
          alert('you already have the account');
          this.signUpForm.reset();

        }
      });
    this.imgFromFileReaderData = '';
  }

}
