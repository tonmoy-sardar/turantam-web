import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../core/guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: "full" },
      { path: '/', redirectTo: 'home', pathMatch: "full" },
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'home/:name', loadChildren: './home/home.module#HomeModule' },
      { path: 'cms/:slug', loadChildren: './cms/cms.module#CmsModule' },
      { path: 'subcategory/:id', loadChildren: './subcategory/subcategory.module#SubcategoryModule' },
      { path: 'package', loadChildren: './package/package.module#PackageModule' },
      { path: 'package/:serviceid/:subcatid', loadChildren: './package/package.module#PackageModule' },
      { path: 'category', loadChildren: './category/category.module#categoryModule' },
      { path: 'category/:id', loadChildren: './category/category.module#categoryModule' },
      { path: 'category/:id/:cityid', loadChildren: './category/category.module#categoryModule' },
      { path: 'cart', loadChildren: './cart/cart.module#CartModule' },
      { path: 'contactus', loadChildren: './contactus/contactus.module#ContactusModule' },
      { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutModule',canActivate: [AuthGuard] },
      { path: 'myorders', loadChildren: './myorders/myorders.module#MyordersModule',canActivate: [AuthGuard] },
      { path: 'myprofile', loadChildren: './myprofile/myprofile.module#MyprofileModule',canActivate: [AuthGuard] },
      { path: 'ordersuccess/:id', loadChildren: './order-success/order-success.module#OrderSuccessModule',canActivate: [AuthGuard] },
      { path: 'privacy', loadChildren: './privacy-policy/privacy-policy.module#PrivacyPolicyModule' },
      { path: 'terms-condition', loadChildren: './terms-condition/terms-condition.module#TermsConditionModule' },
     { path: 'allcategory', loadChildren: './allcategory/allcategory.module#AllcategoryModule' },
      { path: '**', loadChildren: './error/error.module#ErrorModule' },
             
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
