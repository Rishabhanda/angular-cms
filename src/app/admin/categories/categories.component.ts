import { Component, OnInit, ViewChild , OnDestroy } from '@angular/core';

import {DataService} from '../../data.service';
import {MatTable, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { concat, Subscription, Observable, forkJoin, iif } from 'rxjs';
import { StateService } from 'src/app/state.service';
import { last, first } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import {MatDialog} from '@angular/material';
import { ModalComponent } from 'src/app/modal/modal.component';
import { GeneralPopupsComponent } from 'src/app/general-popups/general-popups.component';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categories:{catId: string, catName: string}[] = [];
  displayedColumns: string[] = ['position','name','delete','edit'];
  dataSource = new MatTableDataSource<{catId: string, catName: string}>(this.categories);
  concaterUnsubs: Subscription;
  isLoading: boolean;

  @ViewChild(MatTable) table: MatTable<any>;
  concater: Observable<{catId: string, catName: string}[]>;

  constructor(private dataService: DataService, private stateService: StateService, public dialog: MatDialog) { }

  ngOnInit() {
    //getting the categories from api
    this.isLoading = true;
    this.dataService.getCategories().subscribe(
      (resp)=>{this.categories = resp;
      this.isLoading = false;
  },
      (error)=>{console.error(error);}
    );
  }

  deleteCategory(event){
    this.isLoading = true;
    this.dataService.deleteCategory(+event.target.parentElement.children[0].innerText).subscribe((response: any)=>{
      if(response.message === 'you are not authorized'){
        this.isLoading = false;
        this.dialog.open(GeneralPopupsComponent,{
          height: '12em',
          width: '30em',
          data:{message:'you are not authorized',buttonOne:'ok', buttonTwo: 'close'}
        })}  else if(response.message === 'category deleted successfully'){
            this.dataService.getCategories().subscribe((resp)=>{
              this.isLoading = false;
              this.categories = resp;
              this.dataSource.connect();
              this.stateService.categoriesSubject.next(this.categories);
            })

        };

    })
  }

  editCategory(event){
    let editedCategoryName: string ='';
    let dialogRef = this.dialog.open(ModalComponent,{
      height: '250px',
      width: '400px',
      data:{ heading: 'Edit', catName: event.target.parentElement.children[1].innerText}
    })
    this.stateService.categoriesModalPopUpEdited.pipe(first()).subscribe(
      (data) => {
        this.isLoading = true;
        editedCategoryName = data;
        this.dataService.editCategory(
          JSON.stringify({cat_title: editedCategoryName}),
          +event.target.parentElement.children[0].innerText).pipe(first()).subscribe(
          (response: any) => {
            if (response.message === 'you are not authorized'){
              this.isLoading = false;
              this.dialog.open(GeneralPopupsComponent, {
              height: '12em',
              width: '30em',
              data:{ message: 'you are not authorized', buttonOne : 'ok', buttonTwo: 'close'}
            }); } else if (response.message === 'category updated') {
                this.dataService.getCategories().subscribe((resp) => {
                this.isLoading = false;
                this.categories = resp;
                this.stateService.categoriesSubject.next(this.categories);
              })
            }
          }
        )
      }
      )
  }



  onSubmit(formdata:NgForm){
    if(!formdata.valid){
      return;
    } else{
      this.isLoading = true;
      this.dataService.addCategory(JSON.stringify(formdata.value)).subscribe(
        (response: any)=>{
          if(response.message === 'you are not authorized'){
            this.isLoading = false;
            this.dialog.open(GeneralPopupsComponent, {
              height: '12em',
              width: '30em',
              data:{ message: 'you are not authorized', buttonOne : 'ok', buttonTwo: 'close'}
            });
          } else if(response.message === 'category is created successfully'){
            this.dataService.getCategories().subscribe(
            (resp)=>{
              this.isLoading = false;
              this.categories = resp;
              this.dataSource.connect();
              this.stateService.categoriesSubject.next(this.categories);
            })
          }
        }
      );
    }
    formdata.resetForm();
  }

  ngOnDestroy(){
  }
}
