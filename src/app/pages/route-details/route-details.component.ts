import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../providers/data.service';
import { LiquidCache } from 'ngx-liquid-cache';

const apiUrl = environment.apiUrl; /* API ENDPOINT, eg. http://localhost:1337 */
const routedetailsApiUrl = '/dashboard/route-details';  // URL to web api

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit, OnDestroy {
  Fk_Partner: number;
  private sub: any;
  public dateString: string;
  private Mesto: string;
  private Naziv: string;
  private apiEndpointUrl: string;

  private workerRoutes;

  private imagesData: any = null;
  public pozicijeData: any = null;
  public zaliheData: any = null;

  private activeImageIndex: number;
  public activeTabArr: Array<boolean> = []; // pomocni, cuva aktivni sui tab, eg. [true, false, false]

  private zaliheDisabled;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router,
    private cdRef: ChangeDetectorRef,
    private auth: AuthService,
    private dataService: DataService
  ) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    // let id = parseInt(this.route.snapshot.paramMap.get('Fk_Partner'));
    this.sub = this.route.params.subscribe(params => {  console.log(params);
      this.Fk_Partner = params['Fk_Partner'];
      // this.dateString = this.parseDateParam(params['date']);
      // this.Mesto = params['Mesto'] || '';
      // this.Naziv = params['Naziv'] || '';
      this.apiEndpointUrl  = apiUrl + routedetailsApiUrl + '/' + params['Fk_Partner'];      // console.log('Fk_Partner', params.id, params);
    });

    this.workerRoutes = this.dataService.workerRoutes;
    this.dateString = this.parseDateParam(this.dataService.getFormatDate());
    console.log('onInit dataService                 ', this.dataService);
    console.log('onInit dataService.getFormatDate() ', this.dataService.getFormatDate());
    console.log('onInit dateString                  ', this.dateString);
  }

  ngOnInit() {
    this.activeImageIndex = 0;
    this.activeTabArr = [true]; // eg. if 1st tab of 3 tabs is active: [true, false, false]
    this.zaliheDisabled = true;

    if (!this.auth.isLoggedIn) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.loadPositionsList(this.apiEndpointUrl, this.dateString); // load image tabs
    this.loadZaliheData(this.apiEndpointUrl, this.dateString);              // laod zalihe tab\section
  }

  ngOnDestroy() {
    // this.dataService.selectedDate = new Date(this.dateString);
    this.dataService.selectedDate = new Date(this.dateString);
  }

  // @LiquidCache('loadPositionsList{Fk_Partner, dateString}', { duration: 60 * 1 }) // kesira api rezulat 1 minut
  loadPositionsList(Fk_Partner, dateString) {
    return this.http.get<any[]>(this.apiEndpointUrl, {
      withCredentials: true,
      params: { 'date': dateString }
    }).subscribe(
      response => {
          this.pozicijeData = response;
          if (this.pozicijeData.length) {
            // load first tab data
            // console.log(' loadPositionsList ', this.pozicijeData);
            this.loadSinglePosition(this.apiEndpointUrl, this.pozicijeData[0].Sifra, dateString);
          }
          this.cdRef.detectChanges(); // force change detection (zone lost)
      },
      error => console.log('loadPositionsList(), http.get error', error.text())
    );
  }

  /* ucitaba tab - listu slika za taj tab */
  // @LiquidCache('loadSinglePosition{Fk_Partner, Fk_Pozicija, dateString}', { duration: 60 * 3 }) // kesira api rezulat 3 minuta
  loadSinglePosition(Fk_Partner, Fk_Pozicija, dateString) {
    this.activeImageIndex = 0; // vrati na prvu sliku u nizu
    const httpOptions = {
      withCredentials: true,
      params: {
        'date': dateString,
        'Fk_Pozicija': Fk_Pozicija
      }
    };
    return this.http.get<any[]>(this.apiEndpointUrl, httpOptions).subscribe(
      response => {
          this.imagesData = response.map(item => {
            item.Slika = apiUrl + (item.Slika ? item.Slika : '/assets/images/404.svg');
            // item.Slika = item.Slika ? apiUrl + item.Slika : null;
            return item;
          });
          this.cdRef.detectChanges(); // force change detection (zone lost)
      },
      error => console.log('loadSinglePosition(), http.get error', error.text())
    );
  }

  // @LiquidCache('loadZaliheData{Fk_Partner, dateString}', { duration: 60 * 1 }) // kesira api rezulat 1 minut
  loadZaliheData(Fk_Partner, dateString) {
    const httpOptions = {
      withCredentials: true,
      params: {
        'date': dateString,
        'Zalihe': 'true'
      }
    };
    return this.http.get<any[]>(this.apiEndpointUrl, httpOptions).subscribe(
      response => {
          this.zaliheData = response;
          if (response.length) {
            this.zaliheDisabled = false;
            this.cdRef.detectChanges(); // force change detection (zone lost)
          }
      },
      error => console.log('loadZaliheData(), http.get error', error.text())
    );
  }

  //

  moveToNextImage() {
    if (this.imagesData.length - 1 <= this.activeImageIndex) {
      const activeTabIndex = this.activeTabArr.findIndex(el => el);
      const nexTab = (activeTabIndex !== this.activeTabArr.length - 1) ? activeTabIndex + 1 : 0;
      this.activeTabArr[nexTab] = true; // next tab (header)
      this.loadSinglePosition(this.apiEndpointUrl, this.pozicijeData[nexTab].Sifra, this.dateString); // load prev tab content
    } else {
      this.activeImageIndex++; // next image
    }
  }

  moveToPrevImage() {
    if (this.activeImageIndex === 0) {
      const activeTabIndex = this.activeTabArr.findIndex(el => el);
      const prevTab = (activeTabIndex) ? activeTabIndex - 1 : this.activeTabArr.length - 1;
      this.activeTabArr[prevTab] = true; // prev tab (header)
      this.loadSinglePosition(this.apiEndpointUrl, this.pozicijeData[prevTab].Sifra, this.dateString); // load prev tab content
    } else {
      this.activeImageIndex--; // prev image
    }
  }

  //

  changeDay(daysPrior) { // +1 ili -1 dan
    // console.log('changeDay', daysPrior, 'old date', this.dateString);
    this.dateString = this.changeDate(daysPrior);
    this.loadPositionsList(this.apiEndpointUrl, this.dateString); // image tabs
    // this.router.navigate(['/route-details', this.Fk_Partner, this.changeDate(daysPrior), this.Mesto, this.Naziv], {
    //   relativeTo: this.route
    // });
  }

  /* pomere datum za X dana (plus ili minus), eg. -1 menja sa '2018-05-28' na '2018-05-27' ... */
  // https://community.apigee.com/questions/51354/how-to-write-a-javascript-for-subtracting-days-fro.html
  changeDate(daysPrior) {
    const currentDate = new Date(this.dateString);
    currentDate.setDate(currentDate.getDate() + daysPrior);
    // provera da ne ide u buducnost
    const now = new Date();
    return (currentDate <= now ) ? currentDate.toISOString().split('T')[0] : this.dateString;
    // return currentDate.toISOString();
  }

  getMaxTabWidth(active) {
    return active ? null : 80 / this.pozicijeData.length + 'vw';
  }

  //

  /* ulaz date u srpskoj ili full iso formi, vraca '2018-05-29' */
  parseDateParam(date) {
    console.log('parseDateParam input date:', date);
    if (date && date.includes(' ')) {
      return date.split(' ')[0].split('.').reverse().join('-');     // eg '29.05.2018' ili '29.05.2018 10:30:45'
    } else if (date && date.includes('T')) {
      return date.split('T')[0].split('.').reverse().join('-');     // eg '2018-05-28T00:00:00.000Z'
    } else {
      return date ? date : new Date().toISOString().split('T')[0];  // eg '2018-05-29', todays date if not input
    }
  }

  // reverseParseDateParam(dateStr) {
  //   console.log('dateStr input', dateStr);
  //   return new Date(dateStr);
  // }
}
