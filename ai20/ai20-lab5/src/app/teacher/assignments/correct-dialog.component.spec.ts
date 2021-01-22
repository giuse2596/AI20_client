import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectDialogComponent } from './correct-dialog.component';

describe('CorrectDialogComponent', () => {
  let component: CorrectDialogComponent;
  let fixture: ComponentFixture<CorrectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
