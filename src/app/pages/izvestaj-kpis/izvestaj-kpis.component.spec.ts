import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IzvestajKpisComponent } from './izvestaj-kpis.component';

describe('IzvestajKpisComponent', () => {
  let component: IzvestajKpisComponent;
  let fixture: ComponentFixture<IzvestajKpisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IzvestajKpisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IzvestajKpisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
