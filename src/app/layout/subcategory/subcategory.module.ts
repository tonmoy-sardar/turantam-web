import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcategoryRoutingModule } from './subcategory-routing.module';
import { SubcategoryComponent } from './subcategory.component';
// core
import { CoreModule } from '../../core/core.module';
@NgModule({
  imports: [
    CommonModule,
    SubcategoryRoutingModule,
    CoreModule
  ],
  declarations: [SubcategoryComponent]
})
export class SubcategoryModule { }
