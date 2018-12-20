import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '../../providers/state.service';
import { ApiService } from '../../providers/api.service';
import { AlertComponent } from '@pepsi-shared/alert/alert.component';
import { SuiModalService } from 'ng2-semantic-ui';
import { RouteUnblockModal, ChoicesModalComponent } from '@pepsi-shared/modal/choices-modal.component';

@Component({
  selector: 'app-odblokiraj-unos-porudzbine',
  templateUrl: './odblokiraj-unos-porudzbine.component.html',
  styleUrls: ['./odblokiraj-unos-porudzbine.component.scss']
})
export class OdblokirajUnosPorudzbineComponent implements OnInit, OnDestroy {
  // segmentDimmed = false;
  isQueryShort = false;

  subordinates: any;
  selectedDate: Date = null;
  selectedSubordinate_SifraRadnik: any = null;
  selectedPartner: {} = null;
  selectedPartner_Sifra = '';

  /* ui state */
  isUnblocked = false;
  partnerUnblockedState: {} = null;

  constructor(
    private stateService: StateService,
    private apiService: ApiService,
    private modalService: SuiModalService,
    public ppsAlert: AlertComponent) { }

  ngOnInit() {
    this.subordinates = this.stateService.getSubordinates();
    // console.log('subordinates', this.subordinates);
    this.selectedSubordinate_SifraRadnik = this.stateService.getSelectedSubordinate_SifraRadnik(); // postavlja odabranog r. u select listi
    // console.log(this.selectedSubordinate_SifraRadnik);
    // this.selectedDate        = this.stateService.getSelectedDate();  /* ... Fica trazio da biraju datum svaki put */

    this.partnerUnblockedState = this.getPartnerUnblockedState();
    // console.log('ngOnInit this.partnerUnblockedState', this.partnerUnblockedState);
    // this.partnerUnblockedState = {};
    // this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.saveState(this.selectedDate, this.selectedSubordinate_SifraRadnik, this.partnerUnblockedState); /* save selected worker state */
  }

  async loadSelectedPartnerData(selection: any) {   // console.log('loadSelectedPartnerData USO', selection);
    if (selection) {
      this.selectedPartner = selection;
      this.selectedPartner_Sifra = selection['Sifra'];
      // this.isUnblocked = this.checkIfUnblocked(selection['Sifra'], this.selectedDate);
      // this.isUnblocked = false;
    }
    this.isUnblocked = this.checkIfUnblocked(this.selectedDate, this.selectedPartner_Sifra);
    // this.cdRef.detectChanges();   // force change detection (zone lost)
    return true;
  }

  //

  loadSelectedPartnerData_dateChange(date: any) {
    this.selectedDate = date;
    this.loadSelectedPartnerData(null);
  }

  loadSelectedPartnerData_subordinateChange(selectedSubordinate_SifraRadnik: string) {
    this.selectedSubordinate_SifraRadnik = selectedSubordinate_SifraRadnik;
    this.loadSelectedPartnerData(null);
  }

  /* poruka da treba min 3 karaktera za pretragu partnera */
  isSearchQueryShort(query: string) {
    this.isQueryShort = query.length < 3 ? true : false;
  }

  //

  insertKomercijalistaPravo(Sifra) {
    console.log('insertKomercijalistaPravo inputs 0', Sifra);
    event.stopPropagation();
    this.saveState(this.selectedDate, this.selectedSubordinate_SifraRadnik, null); /* save selected worker state */
    const dateSrpski = this.stateService.getFormatDate();
    const Fk_RadnikSifra = this.stateService.getSelectedSubordinate_SifraRadnik();
    console.log('Fk_RadnikSifra', dateSrpski, Fk_RadnikSifra, this.selectedSubordinate_SifraRadnik);

    // SET @Fk_St_670 = 6160
    const choices = [{
      'choice': 6160,
      // 'label' : 'Pravo zatv. porudzbine kada je - oštecen EAN\\Nema EAN\\Skener nije u funkciji'
      'label': 'Pravo zatv. porudž. kada se ne može sken. bar-kod'
    }, {
      'choice': 6161,
      'label': 'Pravo zatv. porudžbine kada nema oček. opreme'
    }, {
      'choice': 6165,
      'label': 'Pravo zatv. porudžbine kada nema isporučene opreme'
    }];
    this.modalService
      .open(new RouteUnblockModal('Odblokiraj posetu', 'Razlog za deblokiranje?', choices, 'tiny'))
      .onApprove((Fk_St_670: number) => {
        // this.apiService.insertKomercijalistaPravo(Fk_RadnikSifra, Sifra, dateSrpski, Fk_St_670)
        this.apiService.insertKomercijalistaPravo(this.selectedSubordinate_SifraRadnik, Sifra, dateSrpski, Fk_St_670)
          /* https://stackoverflow.com/questions/45439313/angular-2-4-how-to-style-angular-material-design-snackbar */
          .then(r => {
            console.log('r,recordsets', r['recordsets'], r['recordsets'] == null);
            if (r['recordsets'] == null) {
              this.ppsAlert.showErrorAlert({
                'text': 'Nije uspelo, pokušajte ponovo!'
              });
              return;
            }
            this.isUnblocked = true;
            this.addToPartnerUnblockedState(dateSrpski, Sifra);
            this.ppsAlert.showSuccessAlert({
              'text': 'Ruta uspesno odblokirana !',
              'duration': 5, // 'action': null, 'verticalPosition' : null, 'panelClass' : null
            });
          }
          ).catch(err => this.ppsAlert.showErrorAlert({
            'text': err
          }));
      })
      .onDeny(() => console.warn('User has denied.'));
  }

  //

  getPartnerUnblockedState() {
    if (this.partnerUnblockedState) {
      return this.partnerUnblockedState;
    }
    let partnerUnblockedState = JSON.parse(localStorage.getItem('partnerUnblockedState'));
    if (!partnerUnblockedState) {
      const dateStr = new Date().toISOString().split('T')[0];
      console.log('   dateStr', dateStr);
      partnerUnblockedState = {};
      partnerUnblockedState[dateStr] = [];
      // partnerUnblockedState = {dateStr: []};
      // console.log('!partnerUnblockedState', partnerUnblockedState);
      // return partnerUnblockedState;
    }
    console.log('getPartnerUnblockedState OUT', partnerUnblockedState);
    return partnerUnblockedState ? partnerUnblockedState : {};
  }

  checkIfUnblocked(selectedDate, Sifra) {
    this.saveState(selectedDate, null, null); /* save selected worker state */
    const dateSrpski = this.stateService.getFormatDate();
    if (this.partnerUnblockedState[dateSrpski] != null) {
      // console.log(' 1 state na dan nije null -> proveri ga', this.partnerUnblockedState[dateSrpski].indexOf(Sifra) > -1);
      return this.partnerUnblockedState[dateSrpski].indexOf(Sifra) > -1;
    }
    return false;
  }

  addToPartnerUnblockedState(dateSrpski, Sifra) {
    // const dateStr = this.selectedDate.toISOString().split('T')[0];
    console.log('addToPartnerUnblockedState 0', dateSrpski, Sifra);
    console.log('addToPartnerUnblockedState 1', this.partnerUnblockedState, this.partnerUnblockedState[dateSrpski]);
    if (this.partnerUnblockedState[dateSrpski] != null) {
      // console.log(' 1 state na dan nije null -> push');
      this.partnerUnblockedState[dateSrpski].push(Sifra);
    } else {
      // console.log(' 2 state na dan je null');
      this.partnerUnblockedState[dateSrpski] = [Sifra];
    }
    console.log('addToPartnerUnblockedState', this.partnerUnblockedState);
    this.setPartnerUnblockedState(this.partnerUnblockedState);
  }

  setPartnerUnblockedState(partnerUnblockedState) {
    if (!partnerUnblockedState) {
      return;
    }
    localStorage.setItem('partnerUnblockedState', JSON.stringify(partnerUnblockedState));
    this.partnerUnblockedState = partnerUnblockedState;
  }

  //

  saveState(selectedDate, selectedSubordinate_SifraRadnik, partnerUnblockedState) {
    if (selectedDate) { this.stateService.setSelectedDate(selectedDate); }
    if (selectedSubordinate_SifraRadnik) {
      this.stateService.setSelectedSubordinate_SifraRadnik(selectedSubordinate_SifraRadnik);
      /* SifraRadnik <-> Fk_Radnik */
      const selectedSubordObj = this.subordinates.find(obj => obj['SifraRadnik'] === selectedSubordinate_SifraRadnik);
      this.stateService.setSelectedSubordinate(selectedSubordObj['Fk_Radnik']); //
    }
    if (partnerUnblockedState) {
      // this.setPartnerUnblockedState(this.partnerUnblockedState);
    }
  }
}
