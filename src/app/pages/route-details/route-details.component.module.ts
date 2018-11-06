import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {SuiModule} from 'ng2-semantic-ui';

// import {AppPipesModule} from '../pipes/pipes.module';
import {DateTimeFormatPipeModule} from '../../pipes/date-time-format.pipe.module';

import { RouteDetailsComponent } from './route-details.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: RouteDetailsComponent
      }
    ]),
    // AppPipesModule,
    DateTimeFormatPipeModule,
    SuiModule
  ],
  declarations: [RouteDetailsComponent]
})
export class RouteDetailsComponentModule {}
