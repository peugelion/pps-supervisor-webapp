import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByAreaBySkuComponent } from './by-area-by-sku.component';

describe('ByAreaBySkuComponent', () => {
  let component: ByAreaBySkuComponent;
  let fixture: ComponentFixture<ByAreaBySkuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByAreaBySkuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByAreaBySkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
