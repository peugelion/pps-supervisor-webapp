import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ByAreaBySkuComponent } from './by-area-by-sku.component';

const routes: Routes = [
  {
    path: '',
    component: ByAreaBySkuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ByAreaBySkuRoutingModule { }
