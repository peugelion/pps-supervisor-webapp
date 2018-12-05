import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '@pepsi-app/providers/api.service';
import { StateService } from '@pepsi-app/providers/state.service';
import { DatepickerMode, SuiModalService, IPopup } from 'ng2-semantic-ui';
// import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import { AlertComponent } from '@pepsi-shared/alert/alert.component';
import { RouteUnblockModal, ChoicesModalComponent } from './@modal/choices-modal.component';

@Component({
  selector: 'app-worker-route',
  templateUrl: './worker-route.component.html',
  styleUrls: ['./worker-route.component.scss']
})
export class WorkerRouteComponent implements OnInit {
  @Input('route') route;
  @Input('workerRoutes') workerRoutes;

  tableLayoutActive = false;
  filterStr = '';
  popupPlacement = 'bottom right';

  // modalSize: any[] = ['tiny'];

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
    private modalService: SuiModalService,
    // public snackBar: MatSnackBar,
    public ppsAlert: AlertComponent
  ) { }

  ngOnInit() {
    this.tableLayoutActive = this.getTableLayoutActive();
  }

  applyFilter(filterValue: string) {
    this.filterStr = filterValue;
  }

  getTableLayoutActive() {
    const tableLayoutActive = localStorage.getItem('tableLayoutActive');
    return JSON.parse(tableLayoutActive);
  }

  setTableLayoutActive(tableLayoutActive) {
    localStorage.setItem('tableLayoutActive', tableLayoutActive); // true or false
    this.tableLayoutActive = tableLayoutActive;
  }

  //

  insertKomercijalistaPravo(Fk_Partner) {    // console.log('insertKomercijalistaPravo inputs', Fk_Partner);
    event.stopPropagation();
    const dateSrpski     = this.stateService.getFormatDate();
    const Fk_RadnikSifra = this.stateService.getSelectedSubordinate_SifraRadnik();

    // SET @Fk_St_670 = 6160
    const choices = [{
        'choice': 6160,
        'label' : 'Pravo zatv. porudzbine kada je - oštecen EAN\\Nema EAN\\Skener nije u funkciji'
      }, {
        'choice': 6161,
        'label' : 'Pravo zatv. porudžbine kada nema oček. opreme'
      }, {
        'choice': 6165,
        'label' : 'Pravo zatv. porudžbine kada nema isporučene opreme'
    }];
    this.modalService
      .open(new RouteUnblockModal('Odblokiraj posetu', 'Razlog za deblokiranje?',  choices, 'tiny'))
      .onApprove((Fk_St_670: number) => {
        this.apiService.insertKomercijalistaPravo(Fk_RadnikSifra, Fk_Partner, dateSrpski, Fk_St_670)
        /* https://stackoverflow.com/questions/45439313/angular-2-4-how-to-style-angular-material-design-snackbar */
          .then( r =>
            // this.snackBar.open('Ruta uspesno odblokirana !', 'Zatvori', {
            //   'duration' : 3000,
            //   'panelClass' : ['ui', 'positive', 'message']
            // })
            this.ppsAlert.showAlert({
              'type' : 'success',
              'text' : 'Ruta uspesno odblokirana !',
              'duration': 4, // 'action': null, 'verticalPosition' : null, 'panelClass' : null
            })
          ).catch(err =>
            // this.snackBar.open(err, 'Zatvori', {
            //   'duration' : 3000,
            //   'panelClass' : ['ui', 'negative', 'message']
            // })
            this.ppsAlert.showAlert({
              'type' : 'error',
              'text' : err,
              'duration': 4, // 'action': null, 'verticalPosition' : null, 'panelClass' : null
            })
          );
      })
      .onDeny(() => console.warn('User has denied.'));
  }

  // const config = new MatSnackBarConfig();
  // config.panelClass = ['ui', 'positive', 'message'];
  // config.duration = 3000;
}
