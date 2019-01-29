import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ByXYZComponent } from './by-xyz.component';

const routes: Routes = [
  {
    path: '',
    component: ByXYZComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ByXYZRoutingModule { }
