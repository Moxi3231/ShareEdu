import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataBaseService } from '../data-base.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserCategory } from './UserCategory';
import { Category } from '../create-categories/Category';

@Component({
  selector: 'app-subscribe-category',
  templateUrl: './subscribe-category.component.html',
  styleUrls: ['./subscribe-category.component.css']
})

export class SubscribeCategoryComponent implements OnInit {
  public uname: string;
  public loggedIN: boolean = false;
  private email:string;
  public userCatList:UserCategory[]=[];
  public clist: Category[]=[];

  public availFlag:Boolean=false;
  public notavailFlag:Boolean=false;

  public notavailList:Category[]=[];
  public availList:Category[]=[];
  constructor(private DB: DataBaseService, private Cookie: CookieService, private router: Router) { }

  ngOnInit() {
    this.userCatList=[];
    this.clist=[];
    $("#contentBack").remove();
    var x = this.Cookie.get('LoggedIN');
    if (x == 'true') {
      this.uname = JSON.parse(this.Cookie.get('User')).name;
      this.loggedIN = true;
      this.email = JSON.parse(this.Cookie.get('User')).email;
      
      this.DB.getCategories().subscribe(data=>this.clist=data);
      this.DB.getUserCategories(this.email).subscribe(data=>this.userCatList=data);
      
    }
    else{
      this.router.navigate(['/Home']);
    }
  
  }
  public showAvail()
  {
    this.userCatList=[];
    this.DB.getUserCategories(this.email).subscribe(data=>this.userCatList=data);
    this.notavailFlag=false;
    this.availFlag=true;
  }

  public shownotAvail()
  {
    this.notavailList=[];
    this.clist.forEach(data =>{
      var flag = true;
      this.userCatList.forEach(udata => {
        if(udata.category==data.name)
          flag=false;
      });
      if(flag)
      {
        this.notavailList.push(data);
        //console.log(data);
      }
      });
    //console.log(this.notavailList)
    this.availFlag=false;
    this.notavailFlag=true;
  }
 
  public subCourse(category:string)
  {
    var x = this.DB.subscribeCategoryForUser(this.email,category);
    x.forEach(data=>console.log(data));
    location.reload();
    //this.ngOnInit();
  }
  public unsubCourse(category:string)
  {
    var x = this.DB.deleteCategoryForUser(this.email,category);
    x.forEach(data=>console.log(data));
    location.reload();
   // this.ngOnInit();
  }
}
