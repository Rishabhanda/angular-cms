import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material';

import { DataService } from 'src/app/data.service';
import { StateService } from 'src/app/state.service';
import { Post } from '../../models/post.model';
import { PostpopupmodalComponent } from 'src/app/postpopupmodal/postpopupmodal.component';
import { concat, Observable, forkJoin} from 'rxjs';
import { last, first, delay} from 'rxjs/operators';
import { Categories } from 'src/app/models/categories.model';
import { GeneralPopupsComponent } from 'src/app/general-popups/general-popups.component';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  displayedColumns: string[] = ['id', 'author', 'title', 'category', 'status', 'image', 'tags', 'comments', 'date', 'delete', 'edit'];
  isLoading: boolean;
  settingLoaderStyles: {} = {};

  constructor( public dialog: MatDialog , private dataService: DataService , private stateService: StateService) { }

  ngOnInit() {
    // getting the posts from service
    this.isLoading = true;
    this.dataService.getPosts().subscribe(
      (response: Post[]) => {
        this.isLoading = false;
        this.posts = response;
      }
    )
  }
// adding posts
  addPost(){
    this.dataService.getCategories().subscribe((response: Categories[]) => {
      this.dialog.open(PostpopupmodalComponent, {
        height: '42em',
        width: '56em',
        data:{ heading: 'Add New Post' , cat: response}
      });

      this.stateService.PostsModalAdd.pipe(first()).subscribe(
        (res) => {
          this.isLoading = true;
          let image = res.image;
          let content = { 'title' : res.title, 'author' : res.author, 'category_id' : res.category_id,
           'content':res.content , 'status':res.status , 'tags' : res.tags } ;
           this.dataService.addPost(content,image).subscribe((response:any)=>{
            if(response.message ==='you are not authorized'){
              this.isLoading = false;
              this.dialog.open(GeneralPopupsComponent, {
                height: '12em',
                width: '30em',
                data:{ message: 'you are not authorized', buttonOne : 'ok', buttonTwo: 'close'}
              });
          } else if (response.message === 'post is successfully created'){
            this.dataService.getPosts().subscribe(
              (subscribedResponse: Post[]) => {
                this.isLoading = false;
                this.posts = subscribedResponse;
              })
          }
           }
        )
    });
  })
}



// deleting posts
  deletePost(event){
    this.isLoading = true;
    this.dataService.deletePost(+event.target.parentElement.children[0].innerText).subscribe((response:any)=>{
      if(response.message === 'you are not authorized'){
        this.isLoading = false;
        this.dialog.open(GeneralPopupsComponent, {
          height: '12em',
          width: '30em',
          data:{ message: 'you are not authorized', buttonOne : 'ok', buttonTwo: 'close'}
        });
      }else if (response.message === 'post deleted successfully'){
        this.dataService.getPosts().subscribe(
          (response: Post[]) => {
            this.isLoading = false;
            this.posts = response;
          })
      }
    })
  }

// editing post
  editPost(event){
    forkJoin( this.dataService.readSinglePost(+event.target.parentElement.children[0].innerText) , this.dataService.getCategories() ).subscribe(
      (response)=>{
          let postSingle = response[0];
          let listOfCategories = response[1];
          this.dialog.open(PostpopupmodalComponent,{
            height: '42em',
            width: '56em',
            data: { heading: 'Edit Post', cat: listOfCategories, post: postSingle}
          })
          this.stateService.PostsModalEdit.pipe(first()).subscribe(
            (editedPostData) => {
              this.isLoading = true;
              const image = editedPostData.image;
              const content = {'title': editedPostData.title,
              'author': editedPostData.author,
              'category_id': editedPostData.category_id,
              'content': editedPostData.content,
              'status': editedPostData.status,
              'tags': editedPostData.tags};
              this.dataService.updatePost(+event.target.parentElement.children[0].innerText, content, image).subscribe((response: any)=>{
                if(response.message ==='you are not authorized'){
                  this.isLoading = false;
                  this.dialog.open(GeneralPopupsComponent, {
                    height: '12em',
                    width: '30em',
                    data:{ message: 'you are not authorized', buttonOne : 'ok', buttonTwo: 'close'}
                  });
              }else if (response.message === 'post updated successfully'){
                this.dataService.getPosts().subscribe(
                  (subscribedResponse: Post[]) => {
                    this.isLoading = false;
                    this.posts = subscribedResponse;
                  })
              }
            })
            })
      }
    );
  }

  ngOnDestroy() {
  }

}
