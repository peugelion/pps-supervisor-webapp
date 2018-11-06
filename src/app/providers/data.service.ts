import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  workerRoutes;
  selectedDate;
  constructor() {}

  getFormatDate() {
    if (!this.selectedDate) {
      return this.selectedDate;
    }
    const formatedDate = this.selectedDate.toISOString();
    return formatedDate.substring(0, formatedDate.indexOf('T'));
  }
}
