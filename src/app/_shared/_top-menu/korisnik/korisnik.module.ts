import { NgModule } from '@angular/core';
import { KorisnikComponent  } from './korisnik.component';
import { KorisnikMeniComponent  } from './korisnik-meni.component';

@NgModule({
  declarations: [
    KorisnikComponent,
    KorisnikMeniComponent
  ],
  exports: [
    KorisnikComponent,
    KorisnikMeniComponent
  ]
})
export class KorisnikModule {}
