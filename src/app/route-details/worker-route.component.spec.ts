import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerRouteComponent } from './worker-route.component';

describe('WorkerRouteComponent', () => {
  let component: WorkerRouteComponent;
  let fixture: ComponentFixture<WorkerRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
