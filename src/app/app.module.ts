import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
// import {AuthModule} from './auth/auth.module';
// import {AdminModule} from './admin/admin.module';
import { DataService } from './data.service';
import { AngularMaterialModule } from './shared/angular-material.module';
import { FooterComponent } from './footer/footer.component';
import {SlicingCustomPipe} from './slicing-pipe.pipe';
import {AuthService} from './auth/auth.service';
import {StateService} from './state.service';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ModalComponent } from './modal/modal.component';
import { PostpopupmodalComponent } from './postpopupmodal/postpopupmodal.component';
import { UserProfileModalComponent } from './user-profile-modal/user-profile-modal.component';
import { GeneralPopupsComponent } from './general-popups/general-popups.component';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    SlicingCustomPipe,
    ModalComponent,
    PostpopupmodalComponent,
    UserProfileModalComponent,
    GeneralPopupsComponent,
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    // AdminModule, this module is loaded is loaded lazily
    // AuthModule,
    SharedModule,
    FormsModule,
    AppRoutingModule
  ],
  entryComponents: [
    ModalComponent,PostpopupmodalComponent,UserProfileModalComponent,GeneralPopupsComponent
  ],
  providers: [DataService,AuthService, StateService,
     {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
