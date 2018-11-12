import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionComponent } from './terms-condition.component';
import { TermsConditionRoutingModule } from './terms-condition-routing.module';

// core
import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    TermsConditionRoutingModule,
    CoreModule
  ],
  declarations: [TermsConditionComponent]
})
export class TermsConditionModule { }
