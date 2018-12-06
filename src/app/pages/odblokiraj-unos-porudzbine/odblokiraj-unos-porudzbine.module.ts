import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OdblokirajUnosPorudzbineRoutingModule } from './odblokiraj-unos-porudzbine-routing.module';
import { OdblokirajUnosPorudzbineComponent } from './odblokiraj-unos-porudzbine.component';

@NgModule({
  declarations: [OdblokirajUnosPorudzbineComponent],
  imports: [
    CommonModule,
    OdblokirajUnosPorudzbineRoutingModule
  ]
})
export class OdblokirajUnosPorudzbineModule { }
