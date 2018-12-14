import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TlnrComponent } from './tlnr.component';

describe('TlnrComponent', () => {
  let component: TlnrComponent;
  let fixture: ComponentFixture<TlnrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TlnrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TlnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
