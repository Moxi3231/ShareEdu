import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public loggedIn:Boolean=false;
  
  

  constructor(private Cookie: CookieService) { }

  ngOnInit() {
   
    $("#contentBack").remove();
    
     var x = this.Cookie.get('LoggedIN');
    if (x == 'true') {
      this.loggedIn=true;
    }
    var nline = document.createElement('br');
    var cur = document.createElement('span');
    var text = "TELL ME AND I FORGET.\n TEACH ME AND I REMEMBER.\n INVOLVE ME AND I LEARN.\n";
    var text2 = "Tommorow is for Taking\n Thousands of classes to fuel your creativity and career.";
    var showText = function (target, message, index, interval) {
      if (index < message.length) {

        //newMes = newMes + message[index++] ;
        if (message[index] == '\n')
          $(target).append('<br>');
        $(target).append(message[index++]);
        setTimeout(function () { showText(target, message, index, interval); }, interval);
      }
      else {
        index = 0;
        $(target).text('');
        setTimeout(function () { showText(target, message, index, interval); }, interval);
      }

    }
    $(function () {
      $("#putHeaderHere").load("header.html");
      showText("#text", text, 0, 100);
      showText("#text2", text2, 0, 200);
      //alert("dsf");
    });

  }

}
