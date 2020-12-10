import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDeliveryHistoricalsComponent } from './student-delivery-historicals.component';

describe('StudentDeliveryHistoricalsComponent', () => {
  let component: StudentDeliveryHistoricalsComponent;
  let fixture: ComponentFixture<StudentDeliveryHistoricalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDeliveryHistoricalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDeliveryHistoricalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
