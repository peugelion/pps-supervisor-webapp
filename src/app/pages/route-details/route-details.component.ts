import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';

const apiUrl = environment.apiUrl; /* API ENDPOINT, eg. http://localhost:1337 */
const routedetailsApiUrl = '/dashboard/route-details';  // URL to web api

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {
  // id: number;
  private sub: any;
  private url: string;
  private dateString: string;

  private pozicijeData: any = null;
  private imagesData: any = null;
  private zaliheData: any = null;

  private activeImageIndex: number;
  public activeTabArr: Array<boolean> = []; // pomocni, cuva aktivni sui tab, eg. [true, false, false]

  private zaliheDisabled;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router,
    private cdRef: ChangeDetectorRef,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    // let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.sub = this.route.params.subscribe(params => {
      this.url  = apiUrl + routedetailsApiUrl + '/' + params['id'];
      if (params['date'].includes(' ')) {
        // eg '29.05.2018 10:30:45'
        this.dateString = params['date'].split(' ')[0].split('.').reverse().join('-');
      } else {
        // eg '2018-05-29', today date if not input
        this.dateString = params['date'] ? params['date'] : new Date().toISOString().split('T')[0];
      }
    });
    this.activeImageIndex = 0;
    this.activeTabArr = [true]; // eg. if 1st tab of 3 tabs is active: [true, false, false]
    this.zaliheDisabled = true;

    if (!this.auth.isLoggedIn) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.loadPositionImageGroupsData(); // load image tabs
    this.loadZaliheData();              // laod zalihe tab\section
  }

  loadPositionImageGroupsData() {
    return this.http.get<any[]>(this.url, {
      withCredentials: true,
      params: { 'date': this.dateString }
    }).subscribe(
      response => {
          this.pozicijeData = response;
          if (this.pozicijeData.length) {
            // load first tab data
            console.log(' loadPositionImageGroupsData ', this.pozicijeData);
            this.loadSinglePositionData(this.pozicijeData[0].Sifra);
          }
          this.cdRef.detectChanges(); // force change detection (zone lost)
      },
      error => console.log('loadPositionImageGroupsData(), http.get error', error.text())
    );
  }

  /* slike na klik */
  loadSinglePositionData(Fk_Pozicija) {
    this.activeImageIndex = 0; // vrati na prvu sliku u nizu
    const httpOptions = {
      withCredentials: true,
      params: {
        'date': this.dateString,
        'Fk_Pozicija': Fk_Pozicija
      }
    };
    return this.http.get<any[]>(this.url, httpOptions).subscribe(
      response => {
          console.log('singlePosition success', response);
          this.imagesData = response.map(item => {
            item.Slika = apiUrl + (item.Slika ? item.Slika : '/assets/images/404.svg');
            // item.Slika = item.Slika ? apiUrl + item.Slika : null;
            return item;
          });
          this.cdRef.detectChanges(); // force change detection (zone lost)
      },
      error => console.log('loadSinglePositionData(), http.get error', error.text())
    );
  }

  loadZaliheData() {
    const httpOptions = {
      withCredentials: true,
      params: {
        'date': this.dateString,
        'Zalihe': 'true'
      }
    };
    return this.http.get<any[]>(this.url, httpOptions).subscribe(
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
      this.loadSinglePositionData(this.pozicijeData[nexTab].Sifra); // load prev tab content
    } else {
      this.activeImageIndex++; // next image
    }
  }

  moveToPrevImage() {
    if (this.activeImageIndex === 0) {
      const activeTabIndex = this.activeTabArr.findIndex(el => el);
      const prevTab = (activeTabIndex) ? activeTabIndex - 1 : this.activeTabArr.length - 1;
      this.activeTabArr[prevTab] = true; // prev tab (header)
      this.loadSinglePositionData(this.pozicijeData[prevTab].Sifra); // load prev tab content
    } else {
      this.activeImageIndex--; // prev image
    }
  }

  //

  changeDay(daysPrior) { // +1 ili -1 dan
    console.log('changeDay', daysPrior);
    this.dateString = this.changeDate(daysPrior);
    this.loadPositionImageGroupsData(); // image tabs
  }

  /* pomere datum za X dana (plus ili minus), eg. -1 menja this.dateString sa '2018-05-28' na '2018-05-27' ... */
  // https://community.apigee.com/questions/51354/how-to-write-a-javascript-for-subtracting-days-fro.html
  changeDate(daysPrior) {
    const currentDate = new Date(this.dateString);
    currentDate.setDate(currentDate.getDate() + daysPrior);
    console.log(this.dateString, currentDate.toISOString().split('T')[0]);
    return currentDate.toISOString().split('T')[0];
  }

  getMaxTabWidth(active) {
    return active ? null : 80 / this.pozicijeData.length + 'vw';
  }
}
