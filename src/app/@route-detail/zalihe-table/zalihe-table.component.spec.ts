import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaliheTableComponent } from './zalihe-table.component';

describe('ZaliheTableComponent', () => {
  let component: ZaliheTableComponent;
  let fixture: ComponentFixture<ZaliheTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZaliheTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaliheTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
