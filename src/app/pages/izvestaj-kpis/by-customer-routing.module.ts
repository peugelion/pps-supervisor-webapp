import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ByCustomerComponent } from './by-customer.component';

const routes: Routes = [
  {
    path: '',
    component: ByCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ByCustomerRoutingModule { }
