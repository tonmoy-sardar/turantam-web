import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackageComponent } from './package.component';
import { PackagedetailsComponent } from './packagedetails/packagedetails.component';
const routes: Routes = [
  {
    path: '',
    component: PackageComponent
    },
    {
      path: 'package/:serviceid/:subcatid',
      component: PackageComponent
      },
    {
      path: 'details/:id',
      component: PackagedetailsComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageRoutingModule { }
