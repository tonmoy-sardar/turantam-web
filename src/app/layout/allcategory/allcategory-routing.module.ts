import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllcategoryComponent } from './allcategory.component';
const routes: Routes = [
  {
    path: '',
    component: AllcategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllcategoryRoutingModule { }
