import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdblokirajUnosPorudzbineComponent } from './odblokiraj-unos-porudzbine.component';

describe('OdblokirajUnosPorudzbineComponent', () => {
  let component: OdblokirajUnosPorudzbineComponent;
  let fixture: ComponentFixture<OdblokirajUnosPorudzbineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdblokirajUnosPorudzbineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdblokirajUnosPorudzbineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
