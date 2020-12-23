import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDisclaimerComponent } from './confirm-disclaimer.component';

describe('ConfirmDisclaimerComponent', () => {
  let component: ConfirmDisclaimerComponent;
  let fixture: ComponentFixture<ConfirmDisclaimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDisclaimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDisclaimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
