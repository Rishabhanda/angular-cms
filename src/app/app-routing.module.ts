import  {NgModule} from '@angular/core';
import {Routes, RouterModule } from "@angular/router";

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth/auth.guard';
import {SelectivePreloadingStrategyService} from './selective-preloading-strategy.service';

    const appRoutes: Routes = [
        {path:'admin', loadChildren:'./admin/admin.module#AdminModule', canLoad: [AuthGuard]},
        {path:'auth', loadChildren:'./auth/auth.module#AuthModule', data:{preload: true}},
        {path: '' , component: HomeComponent},  
        {path: '**', component: PageNotFoundComponent}
    ];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes,{
            preloadingStrategy: SelectivePreloadingStrategyService
        })
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule{}