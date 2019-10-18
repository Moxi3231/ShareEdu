import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $("#contentBack").remove();
    $("#clickClass").find("a").click(function(e) {
      e.preventDefault();
      var section = $(this).attr("href");
      $("html, body").animate({
          scrollTop: $(section).offset().top
      });
  });
  }

}
