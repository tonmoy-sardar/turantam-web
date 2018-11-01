import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';

// core
import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CartRoutingModule,
    CoreModule
  ],
  declarations: [CartComponent]
})
export class CartModule { }
