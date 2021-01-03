import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <h1 id="title"> Benvenuto nel corso {{courseId}} </h1>
  `,
  styles: [
  ]
})
export class HomeCourseComponent implements OnInit {
  courseId: string;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params.courseId;
    this.router.events.subscribe(() => {
      this.courseId = this.route.snapshot.params.courseId;
    });
  }

}
