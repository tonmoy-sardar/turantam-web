import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSuccessRoutingModule } from './order-success-routing.module';
import { OrderSuccessComponent } from './order-success.component';

// core
import { CoreModule } from '../../core/core.module';
@NgModule({
  imports: [
    CommonModule,
    OrderSuccessRoutingModule,
    CoreModule
  ],
  declarations: [OrderSuccessComponent]
})
export class OrderSuccessModule { }
