import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
// core
import { CoreModule } from '../../core/core.module';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    AgmCoreModule,
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
