import {NgModule} from "@angular/core";
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import {AngularMaterialModule} from '../shared/angular-material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostsComponent } from './posts/posts.component';
import { CategoriesComponent } from './categories/categories.component';
import { SharedModule } from "../shared/shared.module";
// import { PageLoaderComponent } from "../page-loader/page-loader.component";

@NgModule({
    declarations:[
        AdminComponent,
        UsersComponent,
        DashboardComponent,
        PostsComponent,
        CategoriesComponent,
        // PageLoaderComponent

    ],
    imports:[
        AdminRoutingModule,
        FlexLayoutModule,
        FormsModule,
        CommonModule,
        AngularMaterialModule,
        SharedModule,
    ]
})

export class AdminModule{

}
