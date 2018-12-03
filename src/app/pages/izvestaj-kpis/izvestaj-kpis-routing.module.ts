import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IzvestajKpisComponent } from './izvestaj-kpis.component';

const routes: Routes = [
  {
    path: '',
    component: IzvestajKpisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IzvestajKpisRoutingModule { }
