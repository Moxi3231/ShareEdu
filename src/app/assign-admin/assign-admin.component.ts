import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataBaseService } from '../data-base.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { User } from './User';
@Component({
  selector: 'app-assign-admin',
  templateUrl: './assign-admin.component.html',
  styleUrls: ['./assign-admin.component.css']
})
export class AssignAdminComponent implements OnInit {
  
  public uname: string;
  public loggedIN: boolean = false;
  public isAdmin = false;
  public obj:any;


  public uEmail:string;
  public nonAdmin:User[]=[];
  public Admin:User[]=[];

  public areUserAvailable:Boolean=true;
  constructor(private Cookie:CookieService,private DB:DataBaseService,private router:Router) { }

  ngOnInit() {
    $("body").css({ background: 'linear-gradient(to right, #abbaab 0%, #ffffff 100%)'});
    this.nonAdmin=[];
    this.Admin=[];
    $("#contentBack").remove();
    var x = this.Cookie.get('LoggedIN');
    if (x == 'true') {
      this.obj = JSON.parse(this.Cookie.get('User'));
      this.uname = this.obj.name;
      this.loggedIN = true;
    }
    var y = this.Cookie.get('isAdmin');
    if (y == 'true' ) {
      this.isAdmin = true;
    }
    else {
      this.router.navigate(['/Home']);
    }


    this.DB.getAllUser().subscribe(data=>{
      if(data.flag)  
      { 
        var __obj = <User[]>data.records;
        //console.log(__obj);
        __obj.forEach(user=>{
          if(user.isAdmin){
            this.Admin.push(user);
          }
          else{
            this.nonAdmin.push(user);
          }
        });
      }else
        this.areUserAvailable = false;
    });
  }
  public onSubmit()
  {
    this.DB.makeUserAdmin(this.uEmail).subscribe(data=>{
      
      if(data.flag)
      {
        $("#errContent").addClass("alert alert-success");
        $("#errHeading").html("Success");
        $("#errContent").html(this.uEmail+" :Assigned as admin");
        $("#errTrigger").trigger('click');
        this.ngOnInit();
      }
      else{
        $("#errContent").addClass("alert alert-danger");
        $("#errHeading").html("Success");
        $("#errContent").html(this.uEmail+" :Couldn't assigned as admin");
        $("#errTrigger").trigger('click');
       
      }
    });
  }
  public removeAdmin(email:string)
  {
    var x = this.DB.removeUserFromAdmin(email);
    x.subscribe(data=>{
    
      if(data.flag)
      {
        $("#errContent").addClass("alert alert-success");
        $("#errHeading").html("Success");
        $("#errContent").html(this.uEmail+" :Removed from admin");
        $("#errTrigger").trigger('click');
        this.ngOnInit();
      }
      else{
        $("#errContent").addClass("alert alert-danger");
        $("#errHeading").html("Success");
        $("#errContent").html(this.uEmail+" :Couldn't remove from admin");
        $("#errTrigger").trigger('click');
       
      }
    });
  }

}
