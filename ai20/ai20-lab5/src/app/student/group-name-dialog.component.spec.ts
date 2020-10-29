import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupNameDialogComponent } from './group-name-dialog.component';

describe('GroupNameDialogComponent', () => {
  let component: GroupNameDialogComponent;
  let fixture: ComponentFixture<GroupNameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupNameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
