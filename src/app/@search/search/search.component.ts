import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input('label') label: string;
  @Input('labelField') labelField: string; // Naziv
  @Input('valueField') valueField: string; // FK_Partner
  data = [];
  @Input() set dataInput(val: any) {
    this.data = val;
  }
  // @Input('label') label: string;
  @Input('placeholder') placeholder: string;

  @Output() selectedAction = new EventEmitter();

  @ViewChild('searchBox') searchBox;
  constructor() { }

  ngOnInit() {
  }

  public optionsLookup = async (query: string, initial) => {
    this.searchBox.dropdownService.setOpenState(true);    // console.log('query,n', initial, query);
      // if (initial != undefined) {
      //     return new Promise<IOption>(resolve => setTimeout(() => resolve(this._options.find(item => item.id === initial.id)), 500));
      // }
      //  return new Promise<IOption[]>(resolve => setTimeout(() => resolve(this._options), 500));
    return this.search(query);
  }

  // search(items, query: string) {
  //   console.log('query', query);
  //   const results = items.filter(state => state.Naziv.toLowerCase().includes(query.toLowerCase()));
  //   return results;
  // }

  async search(query: string) {
    // this.searchBox.dropdownService.setOpenState(true);
    return this.data.filter(item => item[this.labelField].toLowerCase().includes(query.toLowerCase()));
  }

  resultFormatter(r, q) {
    console.log('resultFormatter', r, q);
  }
  // resultFormatter = (result, query: string) => {
  //   console.log(result, query);
  //   return 'asd';
  // }

  isSelectedAction(selected) {    // console.log('selected', selected, selected[this.valueField]);
    this.selectedAction.emit(selected[this.valueField]);
  }
}
