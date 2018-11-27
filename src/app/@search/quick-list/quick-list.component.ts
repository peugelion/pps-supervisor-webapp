import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StateService } from '../../providers/state.service';

@Component({
  selector: 'app-quick-list',
  templateUrl: './quick-list.component.html',
  styleUrls: ['./quick-list.component.scss']
})
export class QuickListComponent implements OnInit {
  items = [];
  @Input() set newItem(val: any) {
    console.log('new Partners data', val);
    this.getPartnersQuickList();
  }
  @Output() selectedAction = new EventEmitter();

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.getPartnersQuickList();
  }

  getPartnersQuickList() {
    this.items = this.stateService.getPartnersQuickList();
  }

  isSelectedAction(selected) {
    this.selectedAction.emit(selected);
  }
}
