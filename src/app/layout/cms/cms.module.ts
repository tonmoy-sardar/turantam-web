import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { CmsComponent } from './cms.component';
// core
import { CoreModule } from '../../core/core.module';
@NgModule({
  imports: [
    CommonModule,
    CmsRoutingModule,
    CoreModule
  ],
  declarations: [CmsComponent]
})
export class CmsModule { }
