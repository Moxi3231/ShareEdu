import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataBaseService } from '../data-base.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public name:string;
  public email:string;
  public password:string;
  public lemail:string;
  public lpass:string;
  public __obj:any;

  public uname:string;
  public loggedIN:boolean=false;

  constructor(private DB:DataBaseService,private Cookie:CookieService) {

   }

  ngOnInit() {
    var x = this.Cookie.get('LoggedIN');
    if(x=='true')
    {
      this.uname = JSON.parse(this.Cookie.get('User')).name;
      this.loggedIN=true;
    }
  }
  public onRSubmit(){
    var x = this.DB.addUser(this.name,this.password,this.email);
    x.forEach(element => {
      console.log(element);
    });
    this.lemail=this.email;
    this.lpass=this.lpass;

    $("#openL").trigger("click");
  }

  public onLSubmit()
  {
      var x = this.DB.getUser(this.lemail,this.lpass);
      x.forEach(e =>{
        if(e.flag==true)
        {
          this.Cookie.set('User',JSON.stringify({email:this.lemail,password:this.lpass,name:e.name}));
          this.Cookie.set('LoggedIN','true');
          this.uname = e.name;
          $("#closeL").trigger('click');
          this.loggedIN=true;
          return;
        }
      });
    
  }
}
