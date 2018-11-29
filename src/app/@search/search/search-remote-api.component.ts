import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { SearchComponent } from './search.component';
import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'app-search-remote-api',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './search-remote-api.component.html',
  styleUrls: ['./search.component.scss']
})
// export class SearchRemoteApiComponent extends SearchComponent implements OnInit {
export class SearchRemoteApiComponent extends SearchComponent {
  @Input('descriptionField') descriptionField: string; // Naziv
  @Input() set dataInput(val: any) {
    this.data = val;
    // this.search(this.query, val);
  }
  // query = '';
  @Output() queryOut = new EventEmitter();

  constructor(private apiService: ApiService) {
    super();
  }

  public optionsLookup = async (query: string, initial) => {
    this.searchBox.dropdownService.setOpenState(true);   /* https://github.com/edcarroll/ng2-semantic-ui/issues/357 */
    // if (query.length < 3) {
      this.queryOut.emit(query.replace(/\,/g, ' '));
    // }
    // this.data = await this.apiService.radnikPodredjenPartner(query); /* partneri */
    // return this.search(query, this.data);
    const partners = await this.apiService.radnikPodredjenPartner(query.replace(/\,/g, ' '));
    return Array.isArray(partners) ? partners : [];
  }
}
