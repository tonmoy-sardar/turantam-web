import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyprofileComponent } from './myprofile.component';
import { MyprofileRoutingModule } from './myprofile-routing.module';

import {CoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    MyprofileRoutingModule,
    CoreModule
  ],
  declarations: [MyprofileComponent]
})
export class MyprofileModule { }
