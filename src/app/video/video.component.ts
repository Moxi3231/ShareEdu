import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataBaseService } from '../data-base.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Category } from '../create-categories/Category';
import {  HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import {Video} from './Video';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  constructor(private DB: DataBaseService, private Cookie: CookieService, private router: Router,private http:HttpClient) { }
  public uname: string;
  public loggedIN: boolean = false;
  public isAdmin = false;

  public tempFlag = false;
  public cname: string;
  public clist: Category[];

  public fileUploaded:boolean=true;
  public fileUE:boolean=false;

  public filename:string='';
  public dname:string='';
  public desc:string='';
  public course:string='';
  
  public fileData: File = null;
  
  public isError:boolean=false;

  public vData:Video[];
  ngOnInit() {
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
    this.DB.getPaths().subscribe(xy=>{this.vData=xy});
  }

  upload(files: File[]){
    this.uploadAndProgress(files);
  }
  uploadAndProgress(files: File[]){
    //console.log(files[0].name);
    this.filename=files[0].name;
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f))
    
    this.http.post<any>('http://localhost:7762/file2upload', formData);
    this.fileUploaded=false;
    console.log("Done");
  }

  onSubmit() {
    var x = this.DB.uploadPath(this.dname,'../../assets/Video/'+this.filename,this.desc,this.course);
    x.forEach(y=>{
      if(y.message.code)
      {
        this.isError=true;
        return;
      }
      else
      {
        return;
      }
    });
  }
}
