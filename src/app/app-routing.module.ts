import * as core from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { CreateCategoriesComponent } from './create-categories/create-categories.component'
import { VideoComponent } from './video/video.component';
import { CategoryVideoComponent } from './category-video/category-video.component';
import { SubscribeCategoryComponent } from './subscribe-category/subscribe-category.component';
import { UserDetailsComponent } from './user-details/user-details.component'
import { AssignAdminComponent } from './assign-admin/assign-admin.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsComponent } from './terms/terms.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminTextbookComponent } from './admin-textbook/admin-textbook.component';
import { TextbookComponent } from './textbook/textbook.component';
import { NotesComponent } from './notes/notes.component';
import { SendMailComponent } from './send-mail/send-mail.component';
const routes: Routes = [

  {
    path: 'Home',
    component: HomeComponent
  },
  {
    path: 'ACreateCategories',
    component: CreateCategoriesComponent
  },
  {
    path: 'AVideo',
    component: VideoComponent
  },
  {
    path: 'Categories',
    component: CategoryVideoComponent
  },
  {
    path: 'SubscribeCategory',
    component: SubscribeCategoryComponent
  },
  {
    path: 'AccountDetails',
    component: UserDetailsComponent
  },
  {
    path: 'AssignAdmin',
    component: AssignAdminComponent
  },
  {
    path: 'AboutUs',
    component: AboutUsComponent
  },
  {
    path: 'Terms',
    component: TermsComponent
  },

  {
    path: 'ContactUs',
    component: ContactUsComponent
  },
  {
    path: 'ATextbook',
    component: AdminTextbookComponent
  }
  ,
  {
    path: 'TextbookView',
    component: TextbookComponent
  },
  {
    path:'Notes',
    component:NotesComponent
  },
  {
    path:'SendEmail',
    component:SendMailComponent
  }
];

@core.NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
