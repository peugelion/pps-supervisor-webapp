import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickListComponent } from './quick-list.component';

// import { CustomPipeModule } from '../../pipes/custom.pipe.module';
// import { MatTableModule } from '@angular/material/table';
// import { MatSortModule } from '@angular/material/sort';
// import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [QuickListComponent],
  exports: [QuickListComponent],
  imports: [
    CommonModule,
    // CustomPipeModule,
    // MatTableModule, MatSortModule, MatPaginatorModule
  ]
})
export class QuickListModule { }
