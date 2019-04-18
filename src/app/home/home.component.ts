import { Component, OnInit} from '@angular/core';

import {DataService} from '../data.service';
import { Subscription } from 'rxjs';
import {Post} from '../models/post.model';
import { delay } from 'rxjs/operators';
import { StateService } from '../state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  categories:{catId: string, catName: string}[] = [];
  categoriesSubscription: Subscription;
  postsSubscription: Subscription;

  postEditedContent=[];
  postUnEditedContent=[];
  limiter: number = 180;
  readMore: boolean = true;
  readMoreArr: boolean[] = [];
  isLoading: boolean;
  settingLoaderStyles: {} = {};
  constructor( private dataService: DataService, private stateService: StateService) { }

  ngOnInit() {
    this.settingLoaderStyles = {
      'height': '50vh'
    }
    this.isLoading = true;
    this.categoriesSubscription = this.dataService.getCategories().subscribe(
      (data) => {
        this.isLoading = false;
        this.categories = data;
      },
      (error) => {
        console.error(error);
      }
    );
    this.postsSubscription = this.dataService.getPosts().subscribe(
      (data) => {
        this.isLoading = false;
        this.posts = data;
        for (let i = 0; i < this.posts.length; i++) {
          this.readMoreArr.push(false);
        }
      },
      (error) => { console.error(error); }
    );
  }

  readToggle(y,event){
    if(event.target.innerText == 'Read More'){
      event.target.innerText = 'Read Less';
      this.readMoreArr[y] = !this.readMoreArr[y];
    } else if(event.target.innerText == 'Read Less'){
      event.target.innerText = 'Read More';
      this.readMoreArr[y] = !this.readMoreArr[y];

    }
  }
}
