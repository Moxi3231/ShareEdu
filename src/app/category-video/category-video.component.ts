import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataBaseService } from '../data-base.service';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { Category } from '../create-categories/Category';
import { UserCategory } from '../subscribe-category/UserCategory';
import { VideoCategoryForUser } from './CategoryVideo';

@Component({
  selector: 'app-category-video',
  templateUrl: './category-video.component.html',
  styleUrls: ['./category-video.component.css']
})

export class CategoryVideoComponent implements OnInit {

  //Login Fields
  public uname:string;
  public loggedIN:boolean=false;
  public email:string;
  //Login Fields Ends

  public noVideo:boolean=false;
  public videosForSelectedCourse:VideoCategoryForUser[]=[];
  public selectedCourse:string;
  public courseList:UserCategory[]=[];
  public courseDetailFlag:Boolean=false;
  constructor(private DB: DataBaseService, private Cookie: CookieService,private router:Router) { }

  ngOnInit() {
    //Login
    $("#contentBack").remove();
    var x = this.Cookie.get('LoggedIN');
    if (x == 'true') {
      this.uname = JSON.parse(this.Cookie.get('User')).name;
      this.loggedIN = true;
    }
    else{
      this.router.navigate(['/Home']);
    }
    //Login
    this.email = JSON.parse(this.Cookie.get('User')).email;
    this.DB.getUserCategories(this.email).forEach(data=>this.courseList=data);
  }

  showCourseDetailsFor(category:string)
  {
    this.courseDetailFlag=true;
    this.selectedCourse=category;
    this.DB.getPathByCategory(category).subscribe(data =>{
      if(data.flag)
      {
        this.videosForSelectedCourse=data.record;
      }
      else
      {
        this.noVideo=true;
      }
    });
  }
}
