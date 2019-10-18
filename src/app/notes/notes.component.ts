import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../data-base.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Note } from './Note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  //Login Fields
  public uname: string;
  public loggedIN: boolean = false;
  public email: string;
  public obj: any;
  //Login Fields Ends

  public nfilename: string;
  public sfilename: string;

  public selected: boolean = false;

  public uNote: Note[] = [];
  public tempflag: boolean = true;

  public unoteNot: boolean = false;

  public zeroNote:boolean=true;

  public content: string;

  constructor(private DB: DataBaseService, private Cookie: CookieService, private router: Router) { }


  ngOnInit() {
    this.unoteNot = false;
    $("#contentBack").remove();
    var x = this.Cookie.get('LoggedIN');
    if (x == 'true') {
      this.obj = JSON.parse(this.Cookie.get('User'));
      this.uname = this.obj.name;
      this.email = this.obj.email;
      this.loggedIN = true;
    }
    else {
      this.router.navigate(['/Home']);
    }
    this.DB.getNoteByEmail(this.obj.email).subscribe(data => {
      if((<Note[]>data.records).length!=0)
        this.zeroNote=false;
      if (data.flag) {
        this.uNote = data.records;

      }
      else {
        console.log("Refresh page");
      }
    });
    //console.log(this.zeroNote);
  }

  public changeFlag() {
    if (this.nfilename != '') {
      this.tempflag = false;
      return;
    }
    this.tempflag = true;

  }
  public create() {
    this.DB.createNote(this.nfilename, this.email).subscribe(data => {
      if (data.flag) {
        $("#errHeading").html("Note Created");
        $("#errContent").html("Note name: " + this.nfilename);
        $("#errContent").addClass("alert alert-success");
        $("#errTrigger").trigger('click');
        this.ngOnInit();
      }
      else {
        $("#errHeading").html("Couldn't create");
        $("#errContent").html("Sorry for inconvience caused!!");
        $("#errContent").addClass("alert alert-danger");
        $("#errTrigger").trigger('click');
      }
    });
  }

  public showText() {
    this.selected = true;
    this.uNote.forEach(notee => {
      if (notee.Name == this.sfilename) {
        this.content = notee.Content;
      }
    });
  }
  public deleteNote(){
    this.DB.deleteNote(this.email,this.sfilename).subscribe(data=>{
      if(data.flag)
      {
        $('#errHeading').html('Note Deleted');
        $("#errContent").addClass("alert alert-success");
        $("#errContent").html("Deleted Note: "+this.sfilename);
        $("#errTrigger").trigger('click');
        this.ngOnInit();
      }
      else{
        $('#errHeading').html('Couldn"t Delete Note');
        $("#errContent").addClass("alert alert-danger");
        $("#errContent").html("Failure");
        $("#errTrigger").trigger('click');
      }
    });
  }

  public updateText() {
    this.DB.updateNote(this.email, this.sfilename, this.content).subscribe(data => {
      if (data.flag) {
        $('#errHeading').html('Note Updated Succesfully');
        $("#errContent").addClass("alert alert-success");
        $("#errContent").html("Updated!!!");
        $("#errTrigger").trigger('click');
      }
      else {
        $('#errHeading').html("Couldn't update note.");
        $("#errContent").addClass("alert alert-warning");
        $("#errContent").html("Please try again");
        $("#errTrigger").trigger('click');
      }
    });
  }

}
