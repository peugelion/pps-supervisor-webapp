import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StateService } from '@pepsi-app/providers/state.service';

@Component({
  selector: 'app-quick-list',
  templateUrl: './quick-list.component.html',
  styleUrls: ['./quick-list.component.scss']
})
export class QuickListComponent {
  localStorageKey = null;
  @Input() set stateKey(val: any) {
    this.localStorageKey = val;
    console.log('localStorageKey', val);
  }
  items = [];
  @Input() set newItem(val: any) {
    console.log('     addNewItemToQuickList 0', val);
    if (!this.localStorageKey) {
      return;
    }
    console.log('     addNewItemToQuickList 1', val);
    // if (val && val.length > 1) {
    if (val) {
      // this.stateService.setPartnersQuickList('quickList_odblokirajParneri', val);
      this.setPartnersQuickList(this.localStorageKey, val);
      console.log('       addNewItemToQuickList 2', val);
    }
    this.getPartnersQuickList(this.localStorageKey);
  }
  @Output() selectedAction = new EventEmitter();

  constructor(private stateService: StateService) { }

  isSelectedAction(selected) {
    this.selectedAction.emit(selected);
  }

  //

  setPartnersQuickList(localStorageKey, val) {
    this.stateService.setPartnersQuickList(localStorageKey, val);
  }
  getPartnersQuickList(localStorageKey) {
    // this.items = this.stateService.getPartnersQuickList('quickList_odblokirajParneri');
    this.items = this.stateService.getPartnersQuickList(localStorageKey);
  }
}
