import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { categoryComponent } from './category.component';
const routes: Routes = [
  {
    path: '',
    component: categoryComponent
  },
  {
    path: 'category/:id',
    component: categoryComponent
  },
  {
    path: 'category/:id/:cityid',
    component: categoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class categoryRoutingModule { }
