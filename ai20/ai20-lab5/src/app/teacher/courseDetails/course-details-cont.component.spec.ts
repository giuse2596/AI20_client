import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsContComponent } from './course-details-cont.component';

describe('CourseDetailsContComponent', () => {
  let component: CourseDetailsContComponent;
  let fixture: ComponentFixture<CourseDetailsContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDetailsContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailsContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
