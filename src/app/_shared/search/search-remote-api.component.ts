import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { SearchComponent } from '@pepsi-shared/search/search.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const API_ROOT = environment.apiUrl; /* API ENDPOINT, eg. http://localhost:1337 */

@Component({
  selector: 'app-search-remote-api',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './search-remote-api.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchRemoteApiComponent extends SearchComponent {
  @Input('descriptionField') descriptionField: string;
  @Input('apiEndpointUrl') apiEndpointUrl: string;
  query = '';
  @Output() queryOut = new EventEmitter();

  constructor(
    // private apiService: ApiService,
    private _http: HttpClient) {
    super();
  }

  public optionsLookup = async (query: string, initial) => {
    this.searchBox.dropdownService.setOpenState(true);   /* https://github.com/edcarroll/ng2-semantic-ui/issues/357 */
    if (query.length < 3) {      console.log('short, query.length < 3');
      return [];
    }
    this.queryOut.emit(query.replace(/\,/g, ' '));                                        // console.log(query, this.apiEndpointUrl);
    const apiURL = `${API_ROOT}${this.apiEndpointUrl}/` + query.replace(/\,/g, ' ');      // console.log(apiURL);
    const data = await this._http.get(apiURL, {withCredentials: true}).toPromise();       // console.log('data', Array.isArray(data), data);
    return Array.isArray(data) ? data : [];
  }
}
