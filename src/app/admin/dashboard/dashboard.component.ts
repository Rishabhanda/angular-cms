import { Component, OnInit, OnDestroy } from '@angular/core';

import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { Categories } from 'src/app/models/categories.model';
import { forkJoin, Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  users: User[] = [];
  categories: Categories[] = [];
  apisUnSubscription: Subscription;
  isLoading: boolean;
  settingLoaderStyles: {} = {};
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.settingLoaderStyles = {
      // 'height': '20vh'
    };
    this.isLoading = true;
    this.apisUnSubscription = forkJoin(this.dataService.getPosts(),this.dataService.getCategories(),this.dataService.getUsers()).subscribe(
      (response) => {
        this.isLoading = false;
          this.posts = response[0];
          this.categories = response[1];
          this.users = response[2];
      }

    )
  }

  ngOnDestroy(){
    this.apisUnSubscription.unsubscribe();
  }

}
