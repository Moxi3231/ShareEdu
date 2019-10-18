import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../data-base.service';
import { Router } from '@angular/router';
import {  HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { Category } from '../create-categories/Category';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { Textbook } from './Textbook';
@Component({
  selector: 'app-admin-textbook',
  templateUrl: './admin-textbook.component.html',
  styleUrls: ['./admin-textbook.component.css']
})
export class AdminTextbookComponent implements OnInit {

  constructor(private DB:DataBaseService,private Cookie:CookieService,private http:HttpClient,private router:Router) { }

  public uname: string;
  public loggedIN: boolean = false;
  public isAdmin = false;

  public percentDone:number
  public uploadSuccess:boolean
  public filename:string='';

  public fileUploaded:boolean=true;
  public fileUE:boolean=false;

  public daname:string;
  public dname:string;
  public desc:string;
  public course:string;

  public textbooks:Textbook[];
  public clist:Category[];

  public fileData: File = null;

  public isError:boolean=false;

  private files:File[];
  ngOnInit() {
    $("body").css({ background: 'linear-gradient(to right, #abbaab 0%, #ffffff 100%)'});
    $("#contentBack").remove();
    var x = this.Cookie.get('LoggedIN');
    if (x == 'true') {
      this.uname = JSON.parse(this.Cookie.get('User')).name;
      this.loggedIN = true;
    }
    var y = this.Cookie.get('isAdmin');
    if (y == 'true') {
      this.isAdmin = true;
    }
    else {
      this.router.navigate(['/Home']);
    }
    this.DB.getCategories().subscribe(x => this.clist = x);
    this.DB.getEveryBook().subscribe(data=>{
        this.textbooks=data.records;
    });
  }

  upload(files: File[]){
   this.files=files;
   this.fileUploaded=false;
  }

  uploadAndProgress(files: File[]){
    //console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f))
    
    this.http.post('http://localhost:7762/textbook2upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
          $("pbar").css({width:this.percentDone.toLocaleString()+'%'});
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
    });
  }

  onSubmit() {
   // var x; //= this.DB.addbooks(this.dname,'../../assets/books/'+this.filename,this.course,this.desc);
   this.filename=this.files[0].name;
   var x = this.DB.addBooks(this.dname,'../../assets/Textbook/'+this.filename,this.daname,this.desc,this.course); 
   x.forEach(y=>{
      if(y.flag)
      {
        this.uploadAndProgress(this.files);
        $("#errHeading").html("File Uploaded Successfully");
        $("#errContent").html("Uploading Done");
        $("#errContent").addClass("alert alert-success");
        $("#errTrigger").trigger('click');
        this.ngOnInit();
        
      }
      else
      {
        this.isError=true;
        $("#errHeading").html("Couldn't Upload!!");
        $("#errContent").html("Try with diffrent filename and name");
        $("#errContent").addClass("alert alert-warning");
        $("#errTrigger").trigger('click');
      }
    });
  }
  Delete(name:string){
    this.DB.deleteBookByName(name).subscribe(data=>{
      if(data.flag)
      {
        $("#errHeading").html("Deleted Successfully!!");
        $("#errContent").html("Deleted");
        $("#errContent").addClass("alert alert-warning");
        $("#errTrigger").trigger('click');
        this.ngOnInit();
      }
      else{
        $("#errHeading").html("Couldn't Delete!!");
        $("#errContent").html("Try later");
        $("#errContent").addClass("alert alert-warning");
        $("#errTrigger").trigger('click');
      }
    });
  }
}


