import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByXYZComponent } from './by-xyz.component';

describe('ByXYZComponent', () => {
  let component: ByXYZComponent;
  let fixture: ComponentFixture<ByXYZComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ByXYZComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByXYZComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
