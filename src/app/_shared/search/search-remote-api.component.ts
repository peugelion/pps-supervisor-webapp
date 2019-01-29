import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
// import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchComponent } from '@pepsi-shared/search/search.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

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
  @Input('labelField') labelField: string; // Naziv
  // labelField;
  // @Input() set labelFieldInput(val: any) {
  //   const tmpSearchlabel = val;
  //   this.labelField = '';
  //   console.log('labelFieldInput 0: ', this.labelField);
  //   this.labelField = tmpSearchlabel; // bug fix, https://github.com/edcarroll/ng2-semantic-ui/issues/319
  //   console.log('labelFieldInput 1: ', this.labelField);
  // }
  savedResults: Array<{}> = [];

  constructor(
    // private apiService: ApiService,
    private _http: HttpClient, public router: Router) {
    super();
  }

  public optionsLookup = async (query: string, initial) => {
    try {
      // this.labelField = this.labelField;
      // console.log('this.labelField', this.labelField);
      // this.searchBox.dropdownService.setOpenState(true);   /* https://github.com/edcarroll/ng2-semantic-ui/issues/357 */
      if (query.length < 3) {      // console.log('short, query.length < 3');
        return [];
      }
      this.queryOut.emit(query.replace(/\,/g, ' '));
      // console.log('partner serach url', this.apiEndpointUrl, query);
      const apiURL = `${API_ROOT}${this.apiEndpointUrl}/` + query.replace(/\,/g, ' ');    // console.log(apiURL);
      const data = await this._http.get(apiURL, { withCredentials: true }).toPromise();   // console.log('data', Array.isArray(data), data);
      // return Array.isArray(data) ? data : [];
      if (Array.isArray(data) && data.length) {
        this.savedResults = data;
      }
      return this.savedResults;
    } catch (err) {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
      return err;
    }
  }
}
