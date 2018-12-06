import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TableLayoutComponent  } from './table-layout.component';

import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [TableLayoutComponent],
  exports: [TableLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule, MatSortModule
  ]
})
export class TableLayoutModule {}
