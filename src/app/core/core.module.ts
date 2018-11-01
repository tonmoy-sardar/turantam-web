import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { environment } from '../../environments/environment';
import { AgmCoreModule } from '@agm/core';

// guard
import { AuthGuard } from './guard/auth.guard';

// Material
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatStepperIntl, MatRadioModule, MatRippleModule, MatFormFieldModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
  MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatStepperModule,
} from '@angular/material';

// component
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { OwlModule } from 'ngx-owl-carousel';

//services 
import { GooglemapsService } from './services/googlemaps.service';
import { HomeService } from './services/home.service';
import { LoginService } from './services/login.service';
import { SignupService } from './services/signup.service';
import { CategoryService } from './services/category.service';
import { PackageService } from './services/package.service';
import { CartService } from './services/cart.service';

//component
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotComponent } from './components/forgot/forgot.component';





@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDCwmrD9NEiBAtmQS8_UfaIO4wFg99N8MU'
    }),


    //----------------Material----------------//
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule,
    MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
    MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatFormFieldModule, MatSelectModule, MatSidenavModule,
    MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule,
    //----------------Material----------------//

    OwlModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ForgotComponent],
  exports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    //----------------Material----------------//
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule,
    MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
    MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatFormFieldModule, MatSelectModule, MatSidenavModule,
    MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule,
    //----------------Material----------------//

    HeaderComponent,
    FooterComponent,
    OwlModule

  ],
  entryComponents: [
    LoginComponent,
    SignupComponent,
    ForgotComponent
  ]
})

export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        // AuthGuard,
        // {
        //  provide: AuthServiceConfig,
        //   useFactory: provideConfig
        // },
        GooglemapsService,
        HomeService,
        LoginService,
        SignupService,
        CategoryService,
        PackageService,
        CartService
      ]
    };
  }
}
