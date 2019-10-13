import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import {CreateCategoriesComponent} from './create-categories/create-categories.component'
const routes: Routes = [
  {
    path:'Home',
    component : HomeComponent
  },
  {
    path:'CreateCategories',
    component:CreateCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
