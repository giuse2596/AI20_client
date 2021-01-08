import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamResourcesDialogComponent } from './edit-team-resources-dialog.component';

describe('EditTeamResourcesDialogComponent', () => {
  let component: EditTeamResourcesDialogComponent;
  let fixture: ComponentFixture<EditTeamResourcesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTeamResourcesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeamResourcesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
