import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleMenuBtnComponent } from './toggle-menu-btn.component';

describe('ToggleMenuBtnComponent', () => {
  let component: ToggleMenuBtnComponent;
  let fixture: ComponentFixture<ToggleMenuBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleMenuBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleMenuBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
