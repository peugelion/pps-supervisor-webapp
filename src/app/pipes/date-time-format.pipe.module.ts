import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import {SuiModule} from 'ng2-semantic-ui';

import { DateTimeFormatPipe } from './date-time-format.pipe';


@NgModule({
  imports: [
    // CommonModule,
    // FormsModule,
    // RouterModule.forChild([
    //   {
    //     path: '',
    //     component: DateTimeFormatPipe
    //   }
    // ]),
    // AppPipesModule,
    // DateTimeFormatPipe,
    // SuiModule
  ],
  declarations: [DateTimeFormatPipe],
  exports: [DateTimeFormatPipe]
})
export class DateTimeFormatPipeModule {}

// import { NgModule } from '@angular/core';
// import { DateTimeFormatPipe } from './date-time-format/date-time-format';
// @NgModule({
// 	declarations: [
// 		DateTimeFormatPipe
// 	],
// 	imports: [],
// 	exports: [
// 		DateTimeFormatPipe
// 	]
// })
// export class PipesModule {}

