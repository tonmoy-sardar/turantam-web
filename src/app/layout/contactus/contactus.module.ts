import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactusRoutingModule } from './contactus-routing.module';
import { ContactusComponent } from './contactus.component';

@NgModule({
  imports: [
    CommonModule,
    ContactusRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ContactusComponent]
})
export class ContactusModule { }
