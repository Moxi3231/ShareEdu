import { Component, OnInit } from '@angular/core';
import { Category } from '../create-categories/Category';
import { DataBaseService } from '../data-base.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

  public content:string='';
  public course:string='';
  public subject:string="";
  public clist:Category[];
  public uname:string;
  public isAdmin:Boolean;
  public loggedIN:Boolean;
  constructor(private DB:DataBaseService,private Cookie:CookieService,private router:Router) { }

  ngOnInit() {
    this.clist=[];
   // $("body").css({ background: 'linear-gradient(to right, #abbaab 0%, #ffffff 100%)'});
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

  sendMail()
  {
    this.DB.sendEmail(this.course,this.subject,this.content).subscribe(data=>{
      if(data.flag)
      {
        $("#errHeading").html("Send");
        $("#errContent").html("Email send to every user with course" + this.course);
        $("#errContent").addClass("alert alert-success");
        $("#errTrigger").trigger('click');
      }
      else{
        $("#errHeading").html("Failure");
        $("#errContent").html("Couldn't send mail");
        $("#errContent").addClass("alert alert-danger");
        $("#errTrigger").trigger('click');
      }
    });
  }

}
