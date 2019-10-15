import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import {CreateCategoriesComponent} from './create-categories/create-categories.component'
import { VideoComponent } from './video/video.component';
import { CategoryVideoComponent } from './category-video/category-video.component';
import { SubscribeCategoryComponent } from './subscribe-category/subscribe-category.component';
import { UserDetailsComponent } from './user-details/user-details.component';
const routes: Routes = [
  {
    path:'Home',
    component : HomeComponent
  },
  {
    path:'ACreateCategories',
    component:CreateCategoriesComponent
  },
  {
    path:'AVideo',
    component:VideoComponent
  },
  {
    path:'Categories',
    component:CategoryVideoComponent
  },
  {
    path:'SubscribeCategory',
    component:SubscribeCategoryComponent
  },
  {
    path:'AccountDetails',
    component:UserDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
