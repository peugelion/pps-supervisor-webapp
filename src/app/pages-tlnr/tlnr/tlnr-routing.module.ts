import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TlnrComponent } from './tlnr.component';

const routes: Routes = [
  {
    path: '',
    component: TlnrComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TlnrRoutingModule { }
