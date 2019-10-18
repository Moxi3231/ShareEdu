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
      this.isValid = true;
      //console.log("Changef to true");
    }
  }

  submit() {
    //console.log(this.isValid);
    if (!this.isValid) {
      $("#errHeading").html("Cannot Save!");
      // $("#errHeading").addClass("alert alert-danger");
      $("#errContent").addClass("alert alert-danger");
      $("#errContent").html("No Changes Detected.");
      $("#errTrigger").trigger('click');
    }

    else {
      var response = this.DB.updateUser(this.email, this.password, this.uname);
      response.forEach(data => {
        if (data.flag) {
          $("#errHeading").html("Saved!");
          // $("#errHeading").addClass("alert alert-danger");
          $("#errContent").addClass("alert alert-success");
          $("#errContent").html("Updated successfully<br>Refresh page to observe changes");
          $("#errTrigger").trigger('click');
          this.Cookie.set('User', JSON.stringify({ email: this.email, password: this.password, name: this.uname }));
        }
        else {
          $("#errHeading").html("Try again later!");
          // $("#errHeading").addClass("alert alert-danger");
          $("#errContent").addClass("alert alert-danger");
          $("#errContent").html("Could not update");
          $("#errTrigger").trigger('click');
        }
      });

    }
  }
}
