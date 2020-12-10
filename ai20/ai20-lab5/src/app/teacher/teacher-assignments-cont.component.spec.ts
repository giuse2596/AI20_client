import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAssignmentsContComponent } from './teacher-assignments-cont.component';

describe('TeacherAssignmentsContComponent', () => {
  let component: TeacherAssignmentsContComponent;
  let fixture: ComponentFixture<TeacherAssignmentsContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAssignmentsContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAssignmentsContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
