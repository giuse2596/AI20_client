import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssignmentsContComponent } from './student-assignments-cont.component';

describe('StudentAssignmentsContComponent', () => {
  let component: StudentAssignmentsContComponent;
  let fixture: ComponentFixture<StudentAssignmentsContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAssignmentsContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAssignmentsContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
