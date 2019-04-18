import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router"; 

import {AuthComponent} from './auth.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';


    const authRoutes: Routes=[
        // {path:'auth', component: AuthComponent , children:[
        {path:'', component: AuthComponent , children:[
            {path: 'signin', component: SignInComponent},
            {path: 'signup', component: SignUpComponent}
        ]}
    ]


@NgModule({
    imports:[
        RouterModule.forChild(authRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class AuthRoutingModule{}

