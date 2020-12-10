import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitDeliveryDialogComponent } from './submit-delivery-dialog.component';

describe('SubmitDeliveryDialogComponent', () => {
  let component: SubmitDeliveryDialogComponent;
  let fixture: ComponentFixture<SubmitDeliveryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitDeliveryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitDeliveryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
