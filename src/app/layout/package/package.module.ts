import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageRoutingModule } from './package-routing.module';
import { PackageComponent  } from './package.component';
import { PackagedetailsComponent } from './packagedetails/packagedetails.component';
// core
import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    PackageRoutingModule,
    CoreModule
  ],
  declarations: [PackageComponent,PackagedetailsComponent],
  providers: []
})
export class PackageModule { }
