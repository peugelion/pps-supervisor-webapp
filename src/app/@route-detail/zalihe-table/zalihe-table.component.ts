import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-zalihe-table',
  templateUrl: './zalihe-table.component.html',
  styleUrls: ['./zalihe-table.component.css']
})
export class ZaliheTableComponent implements OnInit {

  zalihe;
  @Input() set zaliheInput(val: any) {
    this.zalihe = val;
  }

  constructor() { }

  ngOnInit() {
  }

}
