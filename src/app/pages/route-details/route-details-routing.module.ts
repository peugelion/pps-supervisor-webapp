import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteDetailsComponent } from './route-details.component';

const routes: Routes = [
  {
    path: '',
    component: RouteDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteDetailsRoutingModule { }
