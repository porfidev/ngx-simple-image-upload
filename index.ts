import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SimpleImageUploadComponent} from './simple-image-upload.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SimpleImageUploadComponent],
  exports: [SimpleImageUploadComponent]
})
export class SimpleImageUploadModule {
}
