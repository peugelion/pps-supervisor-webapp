import { Injectable } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// export class DataService implements OnInit, OnDestroy {
export class DataService {
  supervizor: {} = null; // login
  radnici: [] = null;    // login

  selectedDate;
  selectedSubordinate;
  workerRoutes;

  constructor() {}

  // posle login-a

  setUserData(data) {
    if (!data) {
      return;
    }
    if (data['supervizor']) {
      this.setSupervizor(data['supervizor']);
    }
    if (data['radnici']) {
      this.setRadnici(data['radnici']);
    }
  }

  setSupervizor(supervizor) {
    this.supervizor = supervizor;
  }

  setRadnici(radnici) {
    this.radnici = radnici;
  }

  //

  /* type: string, eg '2018-05-28' */
  getFormatDate() {
    const selectedDate = this.getSelectedDate();
    if (!selectedDate) {
      return new Date().toISOString().split('T')[0]; // ako nije postavljen, vrati danasnji datum eg, '2018-11-06'
    }
    // const formatedDate = this.selectedDate.toISOString();
    // console.log(this.selectedDate, formatedDate, this.selectedDate.toString());
    // return formatedDate.substring(0, formatedDate.indexOf('T'));

    /* novo zbog izmena datuma na dashboard ... vraca me dan nazad */
    const tzoffset = new Date().getTimezoneOffset() * 60000 * 2;  // 2h - offset in milliseconds
    const localISOTime = new Date(selectedDate - tzoffset).toISOString().split('T')[0];
    return localISOTime;
  }

  /* type: date, eg, 'Mon May 28 2018 00:00:00 GMT+0200 (Central European Summer Time)' */
  getSelectedDate() {
    if (this.selectedDate) {
      return this.selectedDate;
    }
    const dateStr = localStorage.getItem('selectedDate');
    return dateStr ? new Date(dateStr) : null; // datum iz prethodne sesije
  }

  getSelectedSubordinate() {
    return this.selectedSubordinate;
  }

  getWorkerRoutes() {
    return this.workerRoutes;
  }

  //

  setSelectedDate(date) {
    if (!date) {
      return;
    }
    localStorage.setItem('selectedDate', date); // datum iz prethodne sesije
    this.selectedDate = date;
  }

  setSelectedSubordinate(selectedSubordinate) {
    if (!selectedSubordinate) {
      return;
    }
    this.selectedSubordinate = selectedSubordinate;
  }

  setWorkerRoutes(workerRoutes) {
    if (!workerRoutes) {
      return;
    }
    this.workerRoutes = workerRoutes;
  }

}
