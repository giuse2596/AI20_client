import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  template: `
    <h1 id="title"> Benvenuto In Virtual Labs </h1>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

}
