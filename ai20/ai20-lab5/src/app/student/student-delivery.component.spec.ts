import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDeliveryComponent } from './student-delivery.component';

describe('StudentDeliveryComponent', () => {
  let component: StudentDeliveryComponent;
  let fixture: ComponentFixture<StudentDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
