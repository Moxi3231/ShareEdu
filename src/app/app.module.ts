import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { DataBaseService } from './data-base.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';
import { VideoComponent } from './video/video.component';
import { CategoryVideoComponent } from './category-video/category-video.component';
import { SubscribeCategoryComponent } from './subscribe-category/subscribe-category.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AssignAdminComponent } from './assign-admin/assign-admin.component';
import { NotesComponent } from './notes/notes.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsComponent } from './terms/terms.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminTextbookComponent } from './admin-textbook/admin-textbook.component';
import { TextbookComponent } from './textbook/textbook.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import { SendMailComponent } from './send-mail/send-mail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CreateCategoriesComponent,
    VideoComponent,
    CategoryVideoComponent,
    SubscribeCategoryComponent,
    UserDetailsComponent,
    AssignAdminComponent,
    NotesComponent,
    AboutUsComponent,
    TermsComponent,
    ContactUsComponent,
    AdminTextbookComponent,
    TextbookComponent,
    SendMailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule,
 
  ],
  providers: [DataBaseService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
