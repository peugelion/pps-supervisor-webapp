import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// import {AppPipesModule} from '../pipes/pipes.module';

import { LoginComponent } from './login.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent
      }
    ]),
    // AppPipesModule,
  ],
  declarations: [LoginComponent]
})
export class LoginComponentModule {}
