import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikMeniComponent } from './korisnik-meni.component';

describe('KorisnikMeniComponent', () => {
  let component: KorisnikMeniComponent;
  let fixture: ComponentFixture<KorisnikMeniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KorisnikMeniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisnikMeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
