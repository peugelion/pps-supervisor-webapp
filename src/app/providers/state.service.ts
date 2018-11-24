import { Injectable } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// export class StateService implements OnInit, OnDestroy {
export class StateService {
  supervizor: {} = null;   // login, user {}
  subordinates = null; // login, radnici []

  selectedDate;
  selectedSubordinate;
  selectedSubordinate_SifraRadnik;
  workerRoutes;

  selectedSifraPartner_KPIs;

  constructor() {}

  // posle login-a

  setUserData(data) {
    if (!data) {
      return;
    }
    if (data['supervizor']) {
      this.setSupervizor(data['supervizor']);
    }
    if (data['subordinates']) {
      this.setSubordinates(data['subordinates']);
    }
  }

  setSupervizor(supervizor) {
    localStorage.setItem('supervizor', JSON.stringify(supervizor));
    this.supervizor = supervizor;
  }

  setSubordinates(subordinates) {
    localStorage.setItem('subordinates', JSON.stringify(subordinates));
    this.subordinates = subordinates;
  }

  getSupervisor() {
    if (this.supervizor) {
      return this.supervizor;
    }
    const supervizor = localStorage.getItem('supervizor');
    return JSON.parse(supervizor);
  }

  getSubordinates() {
    if (this.subordinates) {
      return this.subordinates;
    }
    const subordinates = localStorage.getItem('subordinates');
    return JSON.parse(subordinates);
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
    localStorage.setItem('selectedSubordinate', selectedSubordinate); // datum iz prethodne sesije
    this.selectedSubordinate = selectedSubordinate;
  }

  setSelectedSubordinate_SifraRadnik(Sifra) {
    if (!Sifra) {
      return;
    }
    localStorage.setItem('selectedSubordinate_SifraRadnik', Sifra); // datum iz prethodne sesije
    this.selectedSubordinate_SifraRadnik = Sifra;
  }

  setWorkerRoutes(workerRoutes) {
    if (!workerRoutes) {
      return;
    }
    localStorage.setItem('workerRoutes', JSON.stringify(workerRoutes)); // datum iz prethodne sesije
    this.workerRoutes = workerRoutes;
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
    if (this.selectedSubordinate) {
      return this.selectedSubordinate;
    }
    const selectedSubordinate = localStorage.getItem('selectedSubordinate');
    return JSON.parse(selectedSubordinate); // Int
  }

  getSelectedSubordinate_SifraRadnik() {
    if (this.selectedSubordinate_SifraRadnik) {
      return this.selectedSubordinate_SifraRadnik;
    }
    const selectedSubordinate_SifraRadnik = localStorage.getItem('selectedSubordinate_SifraRadnik');
    return JSON.parse(selectedSubordinate_SifraRadnik); // Int
  }

  getWorkerRoutes() {
    if (this.workerRoutes) {
      return this.workerRoutes;
    }
    const workerRoutes = localStorage.getItem('workerRoutes');
    return JSON.parse(workerRoutes);
  }

  //

  setSelectedSifraPartner_KPIs(selectedSifraPartner_KPIs) {
    if (!selectedSifraPartner_KPIs) {
      return;
    }
    localStorage.setItem('selectedSifraPartner_KPIs', JSON.stringify(selectedSifraPartner_KPIs));
    this.selectedSifraPartner_KPIs = selectedSifraPartner_KPIs;
  }

  getSelectedSifraPartner_KPIs() {
    if (this.selectedSifraPartner_KPIs) {
      return this.selectedSifraPartner_KPIs;
    }
    const selectedSifraPartner_KPIs = localStorage.getItem('selectedSifraPartner_KPIs');
    return JSON.parse(selectedSifraPartner_KPIs);
  }

}
