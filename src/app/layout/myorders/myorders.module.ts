import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyordersComponent } from './myorders.component';
import { MyordersRoutingModule } from './myorders-routing.module';
// core
import { CoreModule } from '../../core/core.module';
@NgModule({
  imports: [
    CommonModule,
    MyordersRoutingModule,
    CoreModule
  ],
  declarations: [MyordersComponent]
})
export class MyordersModule { }
