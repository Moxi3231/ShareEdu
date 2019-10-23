import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataBaseService } from '../data-base.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public name: string;
  public email: string;
  public password: string;
  public lemail: string;
  public lpass: string;
  public __obj: any;

  public cpassword:string;
  public tempFlag: boolean = true;
  public uname: string;
  public loggedIN: boolean = false;
  public isAdmin: boolean = false;

  public pChange:Boolean=false;
  public obj:any;
  public isValid:Boolean;

  constructor(private DB: DataBaseService, private Cookie: CookieService, private router: Router) { }

  ngOnInit() {
    $(document).ready(function(){
      $('a').click(function(){
        document.getElementById("myNav").style.width = "0%";
        $("#mySidenavR").css("width", "0px").delay(200);
        setTimeout(function(){
          $("#mySidenav").css("width", "0px").delay(100);
        },200);
      });
    });
    //$("#contentBack").remove();
    $("#errTrigger").hide();
    var x = this.Cookie.get('LoggedIN');
    if (x == 'true') {
      this.obj=JSON.parse(this.Cookie.get('User'));
      this.uname = this.obj.name;
      this.loggedIN = true;
    }
    else {
      this.router.navigate(['/Home']);
    }
    var y = this.Cookie.get('isAdmin');
    if (y == 'true') {
      this.isAdmin = true;
    }

    //alert();
    // $("#errTrigger").trigger('click');
  }
  public logout() {
    this.isAdmin = false;
    this.loggedIN = false;
    this.Cookie.deleteAll();
  }
  public onRSubmit() {
    var x = this.DB.addUser(this.name, this.password, this.email);
    x.forEach(element => {
      if(element.message.code)
      {
        //$("#errContent").addClass("alert alert-danger");
        $("#errContent").addClass("alert alert-danger");
        $("#errContent").html("Email already in use");
        $("#errHeading").html("Registration Failure!!");
        $("#errTrigger").trigger('click'); 
      }
      else{
        //$("#err").addClass("alert alert-success");
        $("#errContent").addClass("alert alert-success");
        $("#errContent").html("Registered as: "+this.uname);
        $("#errHeading").html("Registered");
        $("#errTrigger").trigger('click');
        $("#openL").trigger("click");
      }
    });
    this.lemail = this.email;
    this.lpass = this.lpass;

  }

  change() {
    if(this.cpassword!=this.password)
      this.pChange=true;
    else
      this.pChange=false;
    if (this.obj.name == this.uname && this.obj.password == this.password && this.obj.email == this.email) {

      this.isValid = false;
      // console.log("Dsf");
    }
    else {
      //     console.log("Asd");
    }
  }

  public onLSubmit() {
    var x = this.DB.getUser(this.lemail, this.lpass);
    $("#closeL").trigger('click');
    x.forEach(e => {
      //console.log(e);
      if (e.flag == true) {
        if (e.userAdmin == true) {
          this.isAdmin = true;
          this.Cookie.set('isAdmin', 'true');
        }
        this.Cookie.set('User', JSON.stringify({ email: this.lemail, password: this.lpass, name: e.name }));
        this.Cookie.set('LoggedIN', 'true');
        this.uname = e.name;
        $("#closeL").trigger('click');
        this.loggedIN = true;
        //$("#vidBtn").css('disabled','true');
        $("#errContent").addClass("alert alert-success");
        $("#errContent").addClass("alert alert-success");
        $("#errContent").html("Welcome "+this.uname);
        $("#errHeading").html("Logged In");
        $("#errTrigger").trigger('click');
        return;
      }
      else{
        $("#errContent").addClass("alert alert-danger");
        $("#errContent").addClass("alert alert-danger");
        $("#errContent").html("No Such User");
        $("#errHeading").html("Login Failure!!");
        $("#errTrigger").trigger('click');
        setTimeout(function(){
          $("#openL").trigger('click');
        },1000);
      }
    });
  }
  public openNav() {
    
    //document.getElementById("mySidenav").style.width = "250px";
    if (this.tempFlag) {
      $("#mySidenavR").css("width", "450px");
      $("#mySidenav").css("width", "750px");
      this.tempFlag = false;
    }
    else {
      this.closeNav();
      this.tempFlag = true;
    }
  }

  public openNavForUser()
  {
    $("#imageHere").css({'transform': 'rotate(-90deg)'});
    if (this.tempFlag) {
      document.getElementById("myNav").style.width = "100%";
      this.tempFlag = false;
    }
    else {
      this.closeNavForUser();
      this.tempFlag = true;
    }
    }
    
    /* Close when someone clicks on the "x" symbol inside the overlay */
   public  closeNavForUser() {
      document.getElementById("myNav").style.width = "0%";
  }

  public closeNav() {
    //document.getElementById("mySidenav").style.width = "0";
    $("#mySidenavR").css("width", "0px");
    $("#mySidenav").css("width", "0px");

  }

  public search(s:string)
  {
    console.log(s);
  }
}
