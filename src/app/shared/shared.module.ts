import {NgModule} from '@angular/core';

import { PageLoaderComponent } from '../page-loader/page-loader.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PageLoaderComponent
  ],
  imports:[
    CommonModule
  ],
  exports:[
    PageLoaderComponent,
    CommonModule
  ]
})

export class SharedModule {

}
