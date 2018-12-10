import { Injectable } from '@angular/core';

// TODO: https://www.npmjs.com/package/@ngx-pwa/local-storage

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
  selectedParners: Array<{}>;

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

  getSupervisor() {
    if (this.supervizor) {
      return this.supervizor;
    }
    const supervizor = localStorage.getItem('supervizor');
    return JSON.parse(supervizor);
  }

  setSupervizor(supervizor) {
    localStorage.setItem('supervizor', JSON.stringify(supervizor));
    this.supervizor = supervizor;
  }

  getSubordinates() {
    if (this.subordinates) {
      return this.subordinates;
    }
    const subordinates = localStorage.getItem('subordinates');
    return JSON.parse(subordinates);
  }

  setSubordinates(subordinates) {
    localStorage.setItem('subordinates', JSON.stringify(subordinates));
    this.subordinates = subordinates;
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

  setSelectedDate(date) {
    if (!date) {
      return;
    }
    localStorage.setItem('selectedDate', date); // datum iz prethodne sesije
    this.selectedDate = date;
  }

  getSelectedSubordinate() {
    if (this.selectedSubordinate) {
      return this.selectedSubordinate;
    }
    const selectedSubordinate = localStorage.getItem('selectedSubordinate');
    return JSON.parse(selectedSubordinate); // Int
  }

  setSelectedSubordinate(selectedSubordinate) {
    if (!selectedSubordinate) {
      return;
    }
    localStorage.setItem('selectedSubordinate', selectedSubordinate); // datum iz prethodne sesije
    this.selectedSubordinate = selectedSubordinate;
  }

  getSelectedSubordinate_SifraRadnik() {
    if (this.selectedSubordinate_SifraRadnik) {
      return this.selectedSubordinate_SifraRadnik;
    }
    const selectedSubordinate_SifraRadnik = localStorage.getItem('selectedSubordinate_SifraRadnik');
    return JSON.parse(selectedSubordinate_SifraRadnik); // Int
  }

  setSelectedSubordinate_SifraRadnik(Sifra) {
    if (!Sifra) {
      return;
    }
    localStorage.setItem('selectedSubordinate_SifraRadnik', Sifra); // datum iz prethodne sesije
    this.selectedSubordinate_SifraRadnik = Sifra;
  }

  getWorkerRoutes() {
    if (this.workerRoutes) {
      return this.workerRoutes;
    }
    const workerRoutes = localStorage.getItem('workerRoutes');
    return JSON.parse(workerRoutes);
  }

  setWorkerRoutes(workerRoutes) {
    if (!workerRoutes) {
      return;
    }
    localStorage.setItem('workerRoutes', JSON.stringify(workerRoutes)); // datum iz prethodne sesije
    this.workerRoutes = workerRoutes;
  }

  //

  getSelectedSifraPartner_KPIs() {
    if (this.selectedSifraPartner_KPIs) {
      return this.selectedSifraPartner_KPIs;
    }
    const selectedSifraPartner_KPIs = localStorage.getItem('selectedSifraPartner_KPIs');
    return JSON.parse(selectedSifraPartner_KPIs);
  }

  setSelectedSifraPartner_KPIs(selectedSifraPartner_KPIs) {
    if (!selectedSifraPartner_KPIs) {
      return;
    }
    localStorage.setItem('selectedSifraPartner_KPIs', JSON.stringify(selectedSifraPartner_KPIs));
    this.selectedSifraPartner_KPIs = selectedSifraPartner_KPIs;
  }

  //

  getPartnersQuickList() {
    if (this.selectedParners) {
      return this.selectedParners;
    }
    // const selectedParners = (localStorage.getItem('newTask_partneri')) ? JSON.parse(localStorage.getItem('newTask_partneri')) : [];
    const selectedParners = localStorage.getItem('newTask_partneri');
    return selectedParners ? JSON.parse(localStorage.getItem('newTask_partneri')) : [];
  }

  setPartnersQuickList(selection: {}) {
    this.selectedParners = this.getPartnersQuickList();
    if (selection) {
      // console.log('ima selection');
      // const existsAtPosition = this.items.findIndex(o => o.Pk_id === selection); // vec postoji na brzoj listi ?
      const existsAtPosition = this.selectedParners.findIndex(o => o['Sifra'] === selection['Sifra']); // vec postoji na brzoj listi ?
      if (existsAtPosition !== -1)	{																	//  i ako postoji, obrisi ga
        this.selectedParners.splice(existsAtPosition, 1);
      }
      this.selectedParners.unshift(selection);													// dodaj ga kao prvog na brzoj listi
    }
    localStorage.setItem('newTask_partneri', JSON.stringify(this.selectedParners.slice(0, 9)));				// sacuvaj listu
  }

}
