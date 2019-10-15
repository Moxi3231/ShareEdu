import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { DataBaseService } from './data-base.service';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';
import { VideoComponent } from './video/video.component';
import { CategoryVideoComponent } from './category-video/category-video.component';
import { SubscribeCategoryComponent } from './subscribe-category/subscribe-category.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CreateCategoriesComponent,
    VideoComponent,
    CategoryVideoComponent,
    SubscribeCategoryComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DataBaseService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
