import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHistoricalsComponent } from './task-historicals.component';

describe('TaskHistoricalsComponent', () => {
  let component: TaskHistoricalsComponent;
  let fixture: ComponentFixture<TaskHistoricalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskHistoricalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskHistoricalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
