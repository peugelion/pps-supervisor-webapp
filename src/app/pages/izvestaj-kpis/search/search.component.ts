import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input('label') label: string;
  @Input('placeholder') placeholder: string;
  @Input('labelField') labelField: string; // Naziv
  @Input('valueField') valueField: string; // FK_Partner
  maxResults;
  @Input() set maxResultsInput(val: any) {
    this.maxResults = val;
  }
  data = [];
  @Input() set dataInput(val: any) {
    this.data = val;
  }

  @Output() selectedAction = new EventEmitter();

  @ViewChild('searchBox') searchBox;
  constructor() {
    if (!this.maxResults) {
      this.maxResults = 20;
    }
  }

  // ngOnInit() {
  // }

  public optionsLookup = async (query: string, initial) => {
    this.searchBox.dropdownService.setOpenState(true);   /* https://github.com/edcarroll/ng2-semantic-ui/issues/357 */
      // if (initial != undefined) {
      //     return new Promise<IOption>(resolve => setTimeout(() => resolve(this._options.find(item => item.id === initial.id)), 500));
      // }
      //  return new Promise<IOption[]>(resolve => setTimeout(() => resolve(this._options), 500));
    console.log('optionsLookup', query, query.replace(/\,/g, ' '));
    return this.search(query.replace(/\,/g, ' '), this.data);
  }

  // search(items, query: string) {
  //   console.log('query', query);
  //   const results = items.filter(state => state.Naziv.toLowerCase().includes(query.toLowerCase()));
  //   return results;
  // }

  async search(query: string, data: any) {
    // return this.data.filter(item => item[this.labelField].toLowerCase().includes(query.toLowerCase()));
    console.log(query);
    return data.filter(item => {
      const isInt = /^\d+$/.test(query);
      // if (isInt) {
      //   return item[this.valueField].toString().includes(query);
      // } else {
      //   return item[this.labelField].toLowerCase().includes(query.toLowerCase());
      // }

      // const labelOrValue = isInt ? item[this.valueField].toString() : item[this.labelField].toLowerCase();
      // return labelOrValue.includes(query.toLowerCase());
      if (isInt) {
        const isFound = item[this.valueField].toString().includes(query);
        if (isFound) {
          return isFound;
        }
      }
      return item[this.labelField].toLowerCase().includes(query.toLowerCase());
    });
  }

  resultFormatter(r, q) {
    console.log('resultFormatter', r, q);
  }
  // resultFormatter = (result, query: string) => {
  //   console.log(result, query);
  //   return 'asd';
  // }

  isSelectedAction(selected) {    // console.log('selected', selected, selected[this.valueField]);
    // this.selectedAction.emit(selected[this.valueField]);
    this.selectedAction.emit(selected);
  }
}
