import { Component, Input } from '@angular/core';
import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  private singlePosition: any = null;  // single tab - sve slike na jednoj poziciji\tabu
  public pozicije: any = null;         // sve pozicije (tabovi)
  public zalihe: any = null;
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

  private activeTabArr: Array<boolean> = [true]; // pomocna, cuva aktivni sui tab, eg. [true, false, false]
  private activeImageIndex = 0;                  // pomocna

  constructor(private apiService: ApiService) { }

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
    this.singlePosition = await this.apiService.getSinglePosition(this.Fk_Partner, Fk_Pozicija, this.dateStr);
  }

  moveToNextImage() {
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
    if (this.activeImageIndex === 0) {
      const activeTabIndex = this.activeTabArr.findIndex(el => el);
      const prevTab = (activeTabIndex) ? activeTabIndex - 1 : this.activeTabArr.length - 1;
      this.activeTabArr[prevTab] = true; // prev tab (header)
      this.loadSinglePosition(this.pozicije[prevTab].Sifra); // load prev tab content
    } else {
      this.activeImageIndex--; // prev image
    }
  }

  getMaxTabWidth(active) {
    return active ? null : 80 / this.pozicije.length + 'vw';
  }

}
