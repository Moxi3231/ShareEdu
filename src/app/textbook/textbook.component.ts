import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../data-base.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { UserCategory } from '../subscribe-category/UserCategory';
import { Textbook } from '../admin-textbook/Textbook';
@Component({
  selector: 'app-textbook',
  templateUrl: './textbook.component.html',
  styleUrls: ['./textbook.component.css']
})
export class TextbookComponent implements OnInit {

  public uname: string;
  public password: string;
  public email: string;
  public obj: any;
  public loggedIN = false;

  public pageCourse: string;

  public clist: UserCategory[];

  public textBooks: Textbook[] = [];
  public selectedTextbook: Textbook[] = [];

  public noTextbook: boolean = false;

  public toogleTextbook: boolean = false;

  public filePath: string;

  public tempFlag: Boolean = false;
  constructor(private DB: DataBaseService, private Cookie: CookieService, private router: Router) { }

  ngOnDestroy() {
    $("body").css({ background: 'none' });
  }

  ngOnInit() {
    $("#contentBack").remove();
    // $("body").css({ background: 'linear-gradient(to right,#83a4d4, #b6fbff)'});

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
    //console.log(this.obj.email);
    this.DB.getUserCategories(this.obj.email).subscribe(data => {
      this.clist = data;
    });

    this.DB.getEveryBook().subscribe(data => {
      this.textBooks = data.records;
      if (this.textBooks.length == 0)
        this.noTextbook = true;

    });
  }
  updatePage() {
    this.tempFlag = true;
    this.noTextbook = false;
    this.selectedTextbook = [];
    this.textBooks.forEach(book => {
      if (book.Course == this.pageCourse) {
        this.selectedTextbook.push(book);
      }
    });
    if (this.selectedTextbook.length == 0) {
      this.noTextbook = true;
      this.toogleTextbook = false;
    }
  }
  public show(path: string) {
    this.toogleTextbook = true;
    this.filePath = path;
  }
}
