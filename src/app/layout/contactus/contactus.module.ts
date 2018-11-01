import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactusRoutingModule } from './contactus-routing.module';
import { ContactusComponent } from './contactus.component';

@NgModule({
  imports: [
    CommonModule,
    ContactusRoutingModule
  ],
  declarations: [ContactusComponent]
})
export class ContactusModule { }
