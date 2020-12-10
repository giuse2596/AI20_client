import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDeliveryComponent } from './teacher-delivery.component';

describe('TeacherDeliveryComponent', () => {
  let component: TeacherDeliveryComponent;
  let fixture: ComponentFixture<TeacherDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
