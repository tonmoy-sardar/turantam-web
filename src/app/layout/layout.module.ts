import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// component
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
//import { HomeComponent } from './home/home.component';

// core
import { CoreModule } from '../core/core.module';
import { ErrorComponent } from './error/error.component';


@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    CoreModule
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
