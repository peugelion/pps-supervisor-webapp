import { NgModule } from '@angular/core';

import { SuiSearchModule } from 'ng2-semantic-ui';

import { SearchComponent } from './search.component';
import { SearchRemoteApiComponent } from '@pepsi-app/_shared/search/search-remote-api.component';


@NgModule({
  declarations: [
    SearchComponent,
    SearchRemoteApiComponent
  ],
  imports: [SuiSearchModule],
  exports: [
    SearchComponent,
    SearchRemoteApiComponent
  ]
})
export class SearchModule { }
