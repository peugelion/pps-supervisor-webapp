import { Component, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { StateService } from '@pepsi-app/providers/state.service';
import { ApiService } from '@pepsi-app/providers/api.service';
// import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-by-area-by-sku',
  templateUrl: './by-area-by-sku.component.html',
  styleUrls: ['./by-area-by-sku.component.scss']
})
export class ByAreaBySkuComponent implements OnDestroy {
  selectedDate: Date = null;
  supervisor = this.stateService.getSupervizor();
  partners: Array<any> = null;
  dataSource = null;

  private sub: any;
  // dali8OZ: 0 | 1; // 0 | 1
  dali8OZ: boolean;
  isCsdRadio: 0 | 1 | null = null;

  segmentDimmed = false;

  // @ViewChild('searchBox') searchBox;
  constructor(
    private stateService: StateService,
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef,
    // public router: Router,
    private route: ActivatedRoute,
  ) {
    this.segmentDimmed = false;
    this.selectedDate = this.stateService.getSelectedDate();
    this.sub = this.route.params.subscribe(params => {
      // this.dali8OZ = !!+parseInt(this.route.snapshot.paramMap.get('dali8OZ'), 2);
      this.dali8OZ = this.route.snapshot.paramMap.get('dali8OZ') === 'true';
      // console.log('dali8OZ', this.dali8OZ, this.route.snapshot.paramMap.get('dali8OZ'), this.route.snapshot.paramMap);
      this.dataSource = null;
      this.isCsdRadio = null;
    });
  }

  ngOnDestroy() {
    // this.saveState(this.selectedDate, this.selectedPartner); /* save state */
    this.cdRef.detach(); /* https://stackoverflow.com/questions/37849453/attempt-to-use-a-destroyed-view-detectchanges */
  }

  // CSD or Liption : 1 or 0
  async loadReport($event) {
    // console.log('loadReport USO', !this.selectedDate || this.segmentDimmed || $event !== null);
    if (!this.selectedDate || this.segmentDimmed || $event === null) {
      return;
    }
    this.segmentDimmed = true;    // console.log('loadReport PROSO', selection);
    this.cdRef.detectChanges();   // force change detection (zone lost)
    console.log('supervisor', this.supervisor['Sifra'], 'isCSD', $event, 'dali8OZ', this.dali8OZ);
    // return;
    // this.dataSource = await this.apiService.dailySalesKPIsRptByAreaBySKU(this.supervisor['Sifra'], this.selectedDate, $event, 0);
    this.dataSource = await this.apiService.dailySalesKPIsRptByAreaBySKU(this.supervisor['Sifra'], this.selectedDate, $event, this.dali8OZ);
    this.segmentDimmed = false;   // console.log('searchEmployeeRoutes PROSO', selection);
    this.cdRef.detectChanges();   // force change detection (zone lost)
    // this.saveState(this.selectedDate, selection); /* save state */
    return true;
  }

  loadReport_dateChange(date: any) {
    if (date) {
      this.selectedDate = date;
      this.loadReport(this.isCsdRadio);
    }
  }

  //

  // saveState(selectedDate, selectedPartner) {
  //   if (selectedDate) { this.stateService.setSelectedDate(selectedDate); }
  //   if (selectedPartner) {
  //     this.stateService.setSelectedSifraPartner_KPIs(selectedPartner['Sifra']);
  //     // if (this.dataSource && this.dataSource.length > 1) {
  //     //   this.stateService.setPartnersQuickList('newTask_partneri', selectedPartner);
  //     // }
  //   }
  // }
}
