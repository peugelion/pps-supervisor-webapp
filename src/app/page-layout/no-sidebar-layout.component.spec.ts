import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSidebarLayoutComponent } from './no-sidebar-layout.component';

describe('NoSidebarLayoutComponent', () => {
  let component: NoSidebarLayoutComponent;
  let fixture: ComponentFixture<NoSidebarLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoSidebarLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoSidebarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
