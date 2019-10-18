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
  public nfile:File[];
  public enableButton:Boolean=true;
  public fileData: File = null;
  
  public isError:boolean=false;

  public percentDone:Number;

  private files:File[];

  public vData:Video[];
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
    this.DB.getPaths().subscribe(xy=>{this.vData=xy});
  }

  upload(files: File[]){
   this.files=files;
   this.enableButton = false;
  }
  uploadAndProgress(files: File[]){
    //console.log(files[0].name);
    
   // console.log(this.filename);
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f));
    this.http.post<any>('http://localhost:7762/file2upload', formData, {reportProgress: true, observe: 'events'})
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.percentDone = Math.round(100 * event.loaded / event.total);
        $("#pbar").css({width:this.percentDone.toLocaleString()+'%'});
      } else if (event instanceof HttpResponse) {
        console.log('Failure');
        this.fileUploaded = true;
        this.fileUE=true;
      }
  });
  
   // this.fileUploaded=false;
  }

  onSubmit() {
    this.filename=this.files[0].name;
    var x = this.DB.uploadPath(this.dname,'../../assets/Video/'+this.filename,this.desc,this.course);
    x.forEach(y=>{
      if(y.message.code)
      {
        this.isError=true;
        return;
      }
      else
      {
        this.uploadAndProgress(this.files);
        this.ngOnInit();
        return;
      }
    });
  }

  public deletePath(name:string){
    var x = this.DB.deletePathByName(name);
    x.forEach(data=>{
      if(data.flag)
      {
        $("#errHeading").html("Deleted Succesfully!!");
        $("#errContent").html("Deleted video with name: "+name);
        $("#errContent").addClass("alert alert-success");
        $("#errTrigger").trigger('click');
        //deleted succesfully
        this.ngOnInit();
      }
      else{
        //cannot delete
        $("#errHeading").html("Couldn't Delete!!");
        $("#errContent").html("Some Error Occurred");
        $("#errContent").addClass("alert alert-danger");
        $("#errTrigger").trigger('click');
      }
    });
  }
}
