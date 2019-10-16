import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataBaseService } from '../data-base.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public uname: string;
  public password: string;
  public email: string;

  public loggedIN: Boolean;
  public editEnable: Boolean = true;

  public isValid: Boolean = true;

  public obj: any;

  constructor(private DB: DataBaseService, private Cookie: CookieService, private router: Router) { }

  ngOnInit() {
    $("#contentBack").remove();

    var x = this.Cookie.get('LoggedIN');
    if (x == 'true') {
      this.obj = JSON.parse(this.Cookie.get('User'));
      this.uname = this.obj.name;
      this.password = this.obj.password;
      this.email = this.obj.email;
      this.loggedIN = true;
    }
    else {
      this.router.navigate(['/Home']);
    }
  }
  onChange() {
    if (this.obj.name == this.uname && this.obj.password == this.password && this.obj.email == this.email) {

      this.isValid = false;
      // console.log("Dsf");
    }
    else {
      //     console.log("Asd");
    }
  }

  submit() {
    if (this.isValid) {
      $("#errHeading").html("Cannot Save!");
      // $("#errHeading").addClass("alert alert-danger");
      $("#errContent").addClass("alert alert-danger");
      $("#errContent").html("No Changes Detected.");
      $("#errTrigger").trigger('click');
    }

    else{
      
    }
  }
}
