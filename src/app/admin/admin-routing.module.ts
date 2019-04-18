import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from '../auth/auth.guard';
import { AdminComponent } from './admin.component';
import {UsersComponent} from './users/users.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PostsComponent} from './posts/posts.component';
import {CategoriesComponent} from './categories/categories.component';

    const adminRoutes: Routes=[
        // {path:'admin', component: AdminComponent, 
        {path:'', component: AdminComponent, 
        canActivate:[AuthGuard],
        canActivateChild: [AuthGuard],
        children:[
            {path:'', component: DashboardComponent},
            {path:'posts', component: PostsComponent},
            {path:'categories', component: CategoriesComponent},
            {path:'users', component: UsersComponent}
        ]}
    ]

@NgModule({
    imports:[
        RouterModule.forChild(adminRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class AdminRoutingModule{}