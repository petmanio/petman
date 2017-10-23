import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilService } from './util/util.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [UtilService]
})
export class SharedModule { }
