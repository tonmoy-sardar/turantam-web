import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';

// core
import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    PrivacyPolicyRoutingModule,
    CoreModule
  ],
  declarations: [PrivacyPolicyComponent]
})
export class PrivacyPolicyModule { }
