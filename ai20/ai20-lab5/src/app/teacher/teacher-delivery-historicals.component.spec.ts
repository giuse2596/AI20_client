import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDeliveryHistoricalsComponent } from './teacher-delivery-historicals.component';

describe('TeacherDeliveryHistoricalsComponent', () => {
  let component: TeacherDeliveryHistoricalsComponent;
  let fixture: ComponentFixture<TeacherDeliveryHistoricalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherDeliveryHistoricalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDeliveryHistoricalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
