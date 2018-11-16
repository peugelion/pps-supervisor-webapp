import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../providers/api.service';
import { StateService } from '../../providers/state.service';
import { DatepickerMode, SuiModalService } from 'ng2-semantic-ui';
import { RouteUnblockModal } from '../../@modal/choices-modal.component';


@Component({
  selector: 'app-worker-route',
  templateUrl: './worker-route.component.html',
  styleUrls: ['./worker-route.component.css']
})
export class WorkerRouteComponent implements OnInit {
  @Input('route') route;
  @Input('workerRoutes') workerRoutes;

  tableLayoutActive = false;

  // modalSize: any[] = ['tiny'];

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
    private modalService: SuiModalService
  ) { }

  ngOnInit() {
    this.tableLayoutActive = this.getTableLayoutActive();
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

  insertKomercijalistaPravo(Fk_Partner) {
    console.log('insertKomercijalistaPravo inputs', Fk_Partner);
    event.stopPropagation();
    const dateSrpski     = this.stateService.getFormatDate();
    const Fk_RadnikSifra = this.stateService.getSelectedSubordinate_SifraRadnik();
    // console.log('inputi', Fk_RadnikSifra, Fk_Partner, dateSrpski);

    // SET @Fk_St_670 = 6160
    // --6160 - Opcija Van Funkcije kod skeniranja OS
    // --6161 - Pravo zatv. porudžbine kada nema oček. opreme
    // --6165 - Pravo zatv. porudžbine kada nema isporučene opreme
    const choices = [{
        'choice': 6160,
        'label' : 'Opcija Van Funkcije kod skeniranja OS'
      }, {
        'choice': 6161,
        'label' : 'Pravo zatv. porudžbine kada nema oček. opreme'
      }, {
        'choice': 6165,
        'label' : 'Pravo zatv. porudžbine kada nema isporučene opreme'
    }];
    this.modalService
      .open(new RouteUnblockModal('Odblokiraj rutu', 'Razlog za deblokiranje?',  choices, 'tiny'))
      .onApprove((Fk_St_670) => this.apiService.insertKomercijalistaPravo(Fk_RadnikSifra, Fk_Partner, dateSrpski, Fk_St_670))
      .onDeny(() => console.warn('User has denied.'));

  }
}
