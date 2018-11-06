import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';

import { CheckoutRoutingModule } from './checkout-routing.module';
// core
import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    CoreModule
  ],
  declarations: [CheckoutComponent],
  providers: []
})
export class CheckoutModule { }
