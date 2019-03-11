import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllcategoryComponent } from './allcategory.component';
import { AllcategoryRoutingModule } from './allcategory-routing.module';
// core
import { CoreModule } from '../../core/core.module';
@NgModule({
  imports: [
    CommonModule,
    AllcategoryRoutingModule,
    CoreModule
  ],
  declarations: [AllcategoryComponent]
})
export class AllcategoryModule { }
