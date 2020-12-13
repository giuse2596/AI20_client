import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherImageDialogComponent } from './teacher-image-dialog.component';

describe('TeacherImageDialogComponent', () => {
  let component: TeacherImageDialogComponent;
  let fixture: ComponentFixture<TeacherImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherImageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
