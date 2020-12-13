import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentImageDialogComponent } from './student-image-dialog.component';

describe('StudentImageDialogComponent', () => {
  let component: StudentImageDialogComponent;
  let fixture: ComponentFixture<StudentImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentImageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
