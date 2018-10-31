import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { categoryRoutingModule } from './category-routing.module';
import { categoryComponent } from './category.component';

// core
import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    categoryRoutingModule,
    CoreModule
  ],
  declarations: [categoryComponent]
})
export class categoryModule { }
