import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';
import { StateService } from '../../providers/state.service';
import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss']
})
export class RouteDetailsComponent implements OnInit, OnDestroy {
  Fk_Partner: number;
  private sub: any;
  public dateStr: string;
  public pozicije: Array<any> = []; // sve pozicije (tabovi)
  public zalihe: any = null;

  public workerRoutes: Array<any> = []; // sve rute (za radnika, na dan)
  public activeRouteIndex;  // redni broj rute\lokacije
  public activeRoute: any = {};  // aktivna ruta\lokacija

  public segmentDimmed = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    // private auth: AuthService,
    private stateService: StateService,
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef
  ) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    // let id = parseInt(this.route.snapshot.paramMap.get('Fk_Partner'));
    this.sub = this.route.params.subscribe(params => {
      this.Fk_Partner = parseInt(this.route.snapshot.paramMap.get('Fk_Partner'), 10);
    });

    this.workerRoutes = this.stateService.getWorkerRoutes();
    this.dateStr = this.parseSrbDateParam(this.stateService.getFormatDate());
    // console.log('constructor - this.workerRoutes', this.workerRoutes);
  }

  ngOnInit() {
    this.loadPositionsList(); // image tabs
    this.loadZaliheData();    // zalihe tab\section

    /* https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects */
    this.activeRouteIndex = this.workerRoutes.findIndex(obj => obj['Fk_Partner'] === this.Fk_Partner); // redni broj rute
    this.activeRoute = this.workerRoutes[this.activeRouteIndex]; // aktivna ruta
    // console.log('onInit: Fk_Partner', this.Fk_Partner, 'activeRouteIndex', this.activeRouteIndex, ' workerRoutes', this.workerRoutes[0]);
    // console.log('onInit: activeRoute', this.activeRoute);
  }

  ngOnDestroy() {
    this.stateService.setSelectedDate(new Date(this.dateStr));
    this.cdRef.detach(); /* https://stackoverflow.com/questions/37849453/attempt-to-use-a-destroyed-view-detectchanges */
  }

  // loadPositionsList() {
  //   return this.apiService.getPositionsList(this.Fk_Partner, this.dateStr).subscribe(response => {
  //       this.pozicije = response;
  //       if (this.pozicije.length) {
  //         this.loadSinglePosition(this.pozicije[0].Sifra); // load first tab data
  //       }
  //       this.cdRef.detectChanges(); // force change detection (zone lost)
  //     },
  //     error => this.handleHttpError(error)
  //   );
  // }

  // loadZaliheData() {
  //   return this.apiService.getZalihe(this.Fk_Partner, this.dateStr).subscribe(response => {
  //       this.zalihe = response;
  //       if (response.length) {
  //         this.zaliheDisabled = false;
  //         this.cdRef.detectChanges(); // force change detection (zone lost)
  //       }
  //     },
  //     error => this.handleHttpError(error)
  //   );
  // }

  async loadPositionsList() {
    this.segmentDimmed = true;
    this.pozicije = await this.apiService.getPositionsList(this.Fk_Partner, this.dateStr);
    this.segmentDimmed = false;
    this.cdRef.detectChanges();
  }

  async loadZaliheData() {
    this.zalihe = await this.apiService.getZalihe(this.Fk_Partner, this.dateStr);
    // if (!this.zalihe.length) { // fake zalihe ...
    //   const artikal = {
    //     'Naziv_Partner' : 'Djura Promet', 'Ulica_i_Broj' : 'Bulevar Umetnosti 123 b',
    //     'Sifra_Artikal' : 123, 'Naziv_Artikal' : 'Asdddd', 'RgNaziv' : 'xxxxxxxx', 'BC' : '-',
    //     'ulaz' : 120, 'Izlaz' : 90, 'stanje' : 30
    //   };
    //   this.zalihe.push(artikal, artikal, artikal, artikal, artikal);   // console.log(this.zalihe);
    // }
    if (this.zalihe && this.zalihe.length) {
      this.cdRef.detectChanges();
    }
  }

  //

  moveToNextRoute() {
    const newIndex = (this.workerRoutes.length - 1 <= this.activeRouteIndex) ? 0 : this.activeRouteIndex + 1;
    const newFk_Partner = this.workerRoutes[newIndex].Fk_Partner;
    this.router.navigate(['/dashboard/route-details', newFk_Partner]);
  }

  moveToPrevRoute() {
    const newIndex = (this.activeRouteIndex === 0) ? this.workerRoutes.length - 1 : this.activeRouteIndex - 1;
    const newFk_Partner = this.workerRoutes[newIndex].Fk_Partner;
    this.router.navigate(['/dashboard/route-details', newFk_Partner]);
  }

  //

  /* ulaz date u srpskoj ili full iso formi, vraca '2018-05-29' */
  parseSrbDateParam(date) {
    if (date && date.includes(' ')) {
      return date.split(' ')[0].split('.').reverse().join('-');     // eg '29.05.2018' ili '29.05.2018 10:30:45'
    } else if (date && date.includes('T')) {
      return date.split('T')[0].split('.').reverse().join('-');     // eg '2018-05-28T00:00:00.000Z'
    } else {
      return date ? date : new Date().toISOString().split('T')[0];  // eg '2018-05-29', today if no input
    }
  }

  // changeDay(daysPrior) { // +1 ili -1 dan
  //   this.dateStr = this.changeDate(daysPrior);
  //   this.loadPositionsList(); // image tabs
  // }

  /* pomere datum za X dana (plus ili minus), eg. -1 menja sa '2018-05-28' na '2018-05-27' ... */
  /* https://community.apigee.com/questions/51354/how-to-write-a-javascript-for-subtracting-days-fro.html */
  // changeDate(daysPrior) {
  //   const currentDate = new Date(this.dateStr);
  //   currentDate.setDate(currentDate.getDate() + daysPrior);
  //   // provera da ne ide u buducnost
  //   const now = new Date();
  //   return (currentDate <= now ) ? currentDate.toISOString().split('T')[0] : this.dateStr;
  // }
}
