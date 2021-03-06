import { Component, Input } from '@angular/core';
import { ApiService } from '@pepsi-app/providers/api.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  private singlePosition: any = null;  // single tab - sve slike na jednoj poziciji\tabu
  public pozicije: any = null;         // sve pozicije (tabovi)
  public zalihe: any = null;
  public route: any = null;
  @Input('Fk_Partner') Fk_Partner;
  @Input('dateStr') dateStr;

  /* https://medium.com/@bharat.tiwari/intercept-input-property-change-in-angular-690567eb63ec */
  @Input() set pozicijeInput(val: any) {
    this.pozicije = val;
    if (val.length) {
      this.loadSinglePosition(val[0].Sifra); // load first tab data (images)
    }
  }
  @Input() set zaliheInput(val: any) {
    this.zalihe = val;
  }
  @Input() set routeInput(val: any) {
    this.route = val;
  }

  private activeTabArr: Array<boolean> = [true];  // pomocna, cuva aktivni sui tab, eg. [true, false, false]
  private activeImageIndex = 0;                   // pomocna

  private isFullScreenSlider = false;             // pomocna, ui, fullscreen image slider
  private pageDimmed = false;
  private segmentDimmed = false;

  constructor(private apiService: ApiService) { }

  // pageDimmedChange(pageDimmed: boolean) {
  //   this.pageDimmed = pageDimmed;
  // }
  // segmentDimmedChange(segmentDimmed: boolean) {
  //   this.segmentDimmed = segmentDimmed;
  // }

  // ngOnChanges(changes: SimpleChanges) {
  // if (this.pozicije && this.pozicije.length) {
  //   this.loadSinglePosition(this.pozicije[0].Sifra); // load first tab data
  //   this.cdRef.detectChanges(); // force change detection (zone lost)
  // }
  // }

  // /* single tab - listu slika za aktivni tab */
  // loadSinglePosition(Fk_Pozicija) {
  //   this.activeImageIndex = 0; // vrati na prvu sliku u nizu
  //   return this.apiService.getSinglePosition(this.Fk_Partner, Fk_Pozicija, this.dateStr).subscribe(response => {
  //       this.singlePosition = response.map(item => return item);
  //       this.cdRef.detectChanges(); // force change detection (zone lost)
  //     },
  //     error => this.handleHttpError(error)
  //   );
  // }

  /* single tab - listu slika za aktivni tab */
  async loadSinglePosition(Fk_Pozicija) {
    this.activeImageIndex = 0; // vrati na prvu sliku u nizu
    if (this.singlePosition && this.singlePosition.length) {
      this.singlePosition = null;
    }
    this.pageDimmed = this.isFullScreenSlider;
    this.segmentDimmed = !this.isFullScreenSlider; // true only if not fullscreen slider
    this.singlePosition = await this.apiService.getSinglePosition(this.Fk_Partner, Fk_Pozicija, this.dateStr);
    this.pageDimmed = false;
    this.segmentDimmed = false;
  }

  //

  moveToNextImage() {
    console.log('tab moveToNextImage');
    if (this.singlePosition.length - 1 <= this.activeImageIndex) {
      const activeTabIndex = this.activeTabArr.findIndex(el => el);
      const nexTab = (activeTabIndex !== this.activeTabArr.length - 1) ? activeTabIndex + 1 : 0;
      this.activeTabArr[nexTab] = true; // next tab (header)
      this.loadSinglePosition(this.pozicije[nexTab].Sifra); // load prev tab content
    } else {
      this.activeImageIndex++; // next image
    }
  }

  moveToPrevImage() {
    console.log('tab moveToPrevImage');
    if (this.activeImageIndex === 0) {
      const activeTabIndex = this.activeTabArr.findIndex(el => el);
      const prevTab = (activeTabIndex) ? activeTabIndex - 1 : this.activeTabArr.length - 1;
      this.activeTabArr[prevTab] = true; // prev tab (header)
      this.loadSinglePosition(this.pozicije[prevTab].Sifra); // load prev tab content
    } else {
      this.activeImageIndex--; // prev image
    }
  }

  getMaxTabHeaderWidth(active) {
    return active ? null : 80 / this.pozicije.length + 'vw';
  }

  //

  isFullscreenSlider(isFullscreenSlider) {
    // isFullscreenSlider() {
    console.log('tabCmp isFullscreenSlider', isFullscreenSlider);
    this.isFullScreenSlider = isFullscreenSlider;
    // this.isFullScreenSlider = !this.isFullScreenSlider;
  }

  // clickFullScreenSliderToggle() {
  //   this.isFullScreenSlider = !this.isFullScreenSlider;
  // }

  // swipeFullScreen(isFullscreen) {
  //   console.log('swipeFullScreen', isFullscreen);
  //   this.isFullScreenSlider = isFullscreen;
  // }

}
