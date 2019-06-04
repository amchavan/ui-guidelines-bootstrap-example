import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {
  initial = false;

  constructor(public router:Router) { }

  ngOnInit() {
    this.initial = true;
  }

  logout(){
    console.log( "User was logged out" )
  }
}
