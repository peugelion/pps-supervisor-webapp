import { Injectable } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit, OnDestroy {

  workerRoutes;
  selectedDate;
  selectedSubordinate;
  constructor() {}

  getFormatDate() {
    if (!this.selectedDate) {
      return new Date().toISOString().split('T')[0]; // ako nije postavljen, vrati danasnji datum eg, '2018-11-06'
    }
    // const formatedDate = this.selectedDate.toISOString();
    // console.log(this.selectedDate, formatedDate, this.selectedDate.toString());
    // return formatedDate.substring(0, formatedDate.indexOf('T'));

    /* novo zbog izmena datuma na dashboard ... vraca me dan nazad */
    const tzoffset = new Date().getTimezoneOffset() * 60000 * 2;  // 2h - offset in milliseconds
    const localISOTime = new Date(this.selectedDate - tzoffset).toISOString().split('T')[0];
    return localISOTime;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // this.dataService.selectedDate = new Date(this.dateString);
  }

}
