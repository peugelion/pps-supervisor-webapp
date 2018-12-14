import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';

  // import { CustomPipeModule } from '@pepsi-app/pipes/custom.pipe.module';
  import {MatTableModule} from '@angular/material/table';
  import {MatSortModule} from '@angular/material/sort';
  import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [TableComponent],
  exports: [TableComponent],
  imports: [
    CommonModule,
    // CustomPipeModule,
    MatTableModule, MatSortModule, MatPaginatorModule
  ]
})
export class TableModule {}
