import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {AngularMaterialModule} from '../shared/angular-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from '../shared/shared.module';



@NgModule({
    declarations:[
        SignUpComponent,
        SignInComponent,
        AuthComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        FlexLayoutModule,
        HttpClientModule,
        SharedModule,
    ],
    exports:[]
})

export class AuthModule{

}
