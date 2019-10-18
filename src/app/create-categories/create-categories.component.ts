import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataBaseService } from '../data-base.service';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { Category } from './Category';
@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
})
export class CreateCategoriesComponent implements OnInit {

  constructor(private DB: DataBaseService, private Cookie: CookieService,private router:Router) { }
  public uname:string;
  public loggedIN:boolean=false;
  public isAdmin=false;

  public tempFlag=false;
  public cname:string;
  public clist:Category[];
  ngOnInit() {
    $("body").css({ background: 'linear-gradient(to right, #abbaab 0%, #ffffff 100%)'});
    $("#contentBack").remove();
    var x = this.Cookie.get('LoggedIN');
    if (x == 'true') {
      this.uname = JSON.parse(this.Cookie.get('User')).name;
      this.loggedIN = true;
    }
    else{
      this.router.navigate(['/Home']);
    }
    var y = this.Cookie.get('isAdmin');
    if (y=='true') {
      this.isAdmin = true;
    }
    else
    {
      this.router.navigate(['/Home']);
    }
    this.DB.getCategories().subscribe(x=>this.clist=x);

  }
  
  public onSubmit(name:string)
  { 
    if(name=='')
    {
      $('#errHeading').html('Empty Category!');
      $("#errContent").addClass("alert alert-danger");
      $("#errContent").html("Category cannont be empty");
      $("#errTrigger").trigger('click');
      return;
    }
    var x = this.DB.createCategory(name);
    x.forEach(y=>{
      console.log(y);
      if(y.message.code)
      {
        this.tempFlag=true;
        return;
      }
      else
      {
        location.reload();
      }
    });
    //location.reload();
  }
  public delete(name:String)
  {
    var x = this.DB.deleteCategory(name);
    x.forEach(y=>{
      console.log(y);
    });
    location.reload();
  }

}
