import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from './loading/loading.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [ LoadingComponent, UploadComponent ],
  imports: [
    CommonModule
  ],
  exports: [ LoadingComponent ]
})
export class SharedModule { }
