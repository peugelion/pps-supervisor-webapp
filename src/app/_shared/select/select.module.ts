import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';

import { FormsModule } from '@angular/forms';
// import { SuiModule } from 'ng2-semantic-ui';
import { SuiSelectModule } from 'ng2-semantic-ui';

@NgModule({
  declarations: [SelectComponent],
  exports: [SelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    // SuiModule
    SuiSelectModule
  ]
})
export class SelectModule {}
