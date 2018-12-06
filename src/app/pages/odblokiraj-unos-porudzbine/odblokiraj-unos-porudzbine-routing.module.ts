import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OdblokirajUnosPorudzbineComponent } from './odblokiraj-unos-porudzbine.component';

const routes: Routes = [
  {
    path: '',
    component: OdblokirajUnosPorudzbineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OdblokirajUnosPorudzbineRoutingModule { }
