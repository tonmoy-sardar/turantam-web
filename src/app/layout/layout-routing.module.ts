import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { PackageComponent } from './package/package.component';
import { categoryComponent } from './category/category.component';

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
      { path: 'subcategory/:id', loadChildren: './subcategory/subcategory.module#SubcategoryModule' },
      { path: 'package', loadChildren: './package/package.module#PackageModule' },
      { path: 'package/:id', loadChildren: './package/package.module#PackageModule' },
      { path: 'category', loadChildren: './category/category.module#categoryModule' },
      { path: 'category/:id', loadChildren: './category/category.module#categoryModule' },
      { path: 'category/:id/:cityid', loadChildren: './category/category.module#categoryModule' },
     
             
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
