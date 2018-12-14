import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlnrRoutingModule } from './tlnr-routing.module';
import { TlnrComponent } from './tlnr.component';

// import { TableSortingComponent } from '@pepsi-shared/table-sorting/table-sorting.component';
// import { TableSortingModule } from '@pepsi-shared/table-sorting/table-sorting.module';
// import { TableComponent } from './table/table.component';
import { TableModule } from './table/table.module';

@NgModule({
  declarations: [
    TlnrComponent,
    // TableComponent
  ],
  imports: [
    CommonModule,
    TlnrRoutingModule,
    // TableSortingModule,
    TableModule,
  ],
})
export class TlnrModule { }
