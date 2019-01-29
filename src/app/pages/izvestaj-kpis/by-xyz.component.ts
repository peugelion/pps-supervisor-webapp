import { Component, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { StateService } from '@pepsi-app/providers/state.service';
import { ApiService } from '@pepsi-app/providers/api.service';
// import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-by-xyz',
  templateUrl: './by-xyz.component.html',
  styleUrls: ['./by-xyz.component.scss']
})
export class ByXYZComponent implements OnDestroy {
  selectedDate: Date = null;
  supervisor = this.stateService.getSupervizor();
  partners: Array<any> = null;
  data = null; // report data
  filtersArr: string[] | null = null;

  private sub: any;
  // dali8OZ: 0 | 1; // 0 | 1
  // dali8OZ: boolean;
  reportNo: number = null;
  eCsdRadio: 0 | 1 | null = null; // RADIO BUTTON or CHECKBOX STATE ( is CSD or Liptoon radio btn \ is 8OZ on #9 rpt Outlet checkbox )
  e8OZCheckbox: 0 | 1 | null = null; // only on rpt 9 (Outlet)
  isOrange: boolean; // rpt 4 & 6. Dont show radio buttons for csd or lipton choice
  isOutlet: boolean; // rpt 9.     Show 8OZ checkbox, dont show radio buttons for csd or lipton choice

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
      // console.log(`paramMap: `, this.route.snapshot.paramMap);
      this.reportNo = parseInt(this.route.snapshot.paramMap.get('reportNo'), 10);
      // console.log(`reportNo: ${this.reportNo}`);
      this.isOrange = !!+([4, 6].indexOf(this.reportNo) + 1); // true for rpt 4 and 6
      this.isOutlet = !!+([9].indexOf(this.reportNo) + 1); // true for rpt 9
      // console.log('dali8OZ', this.dali8OZ, this.route.snapshot.paramMap.get('dali8OZ'), this.route.snapshot.paramMap);
      this.data = null;
      this.eCsdRadio = null;
      this.e8OZCheckbox = null;
    });
  }

  ngOnDestroy() {
    // this.saveState(this.selectedDate, this.selectedPartner); /* save state */
    this.cdRef.detach(); /* https://stackoverflow.com/questions/37849453/attempt-to-use-a-destroyed-view-detectchanges */
  }

  // CSD or Liption : 1 or 0
  async loadReport($event) {      // console.log('loadReport USO', !this.selectedDate || this.segmentDimmed || $event !== null);
    let stopLoading = !this.selectedDate || this.segmentDimmed; // inputMissing or already loading a report
    if (!this.isOrange && !this.isOutlet) {
      stopLoading = stopLoading || $event === null;             // is csd/lipton radia btn checked
    }
    if (stopLoading) {
      return;
    }
    this.segmentDimmed = true;    // console.log('loadReport PROSO', selection);
    this.cdRef.detectChanges();   // force change detection (zone lost);
    // console.log('supervisor', this.supervisor['Sifra'], 'isCSD', $event, 'reportNo', this.reportNo);
    const supervisorSifra = this.supervisor['Sifra'];
    const isCSD = $event;
    // console.log('reportNo === (1 || 2)    :', reportNo === (1 || 2));
    if ([1, 2].indexOf(this.reportNo) + 1) {                // console.log('loadDailySalesByAreaBySKU (rpts 1-2)');
      const dali8OZ = !!+(this.reportNo - 1);               // reportNo = 1 -> dali8OZ = false,  reportNo = 2 -> dali8OZ = true
      this.data = await this.apiService.dailySalesKPIsRptByAreaBySKU(supervisorSifra, this.selectedDate, isCSD, dali8OZ);
    } else if ([3, 4, 5, 6].indexOf(this.reportNo) + 1) {   // console.log('loadDailySalesByArea (rpts 3-6)');
      this.filtersArr = ['Rukovodilac', 'Supervizor', 'Prodavac'];
      this.data = await this.apiService.dailySalesKPIsRptByXYZ(this.reportNo, this.selectedDate, isCSD);
    } else if ([7, 8].indexOf(this.reportNo) + 1) {         // console.log('loadDailySalesByArea (rpts 7, 8)');
      this.filtersArr = [];
      const dali8OZ = this.reportNo === 8;                  // reportNo = 1 -> dali8OZ = false,  reportNo = 2 -> dali8OZ = true
      this.data = await this.apiService.dailySalesKPIsRptByCustomer(supervisorSifra, this.selectedDate, isCSD, dali8OZ, this.isOutlet);
    } else if (this.reportNo === 9) {                       // console.log('loadDailySalesByArea (rpt 9)');
      this.filtersArr = [];
      const dali8OZ = !!+this.e8OZCheckbox;                 // reportNo = 1 -> dali8OZ = false,  reportNo = 2 -> dali8OZ = true
      this.data = await this.apiService.dailySalesKPIsRptByCustomer(supervisorSifra, this.selectedDate, null, dali8OZ, this.isOutlet);
    }

    this.segmentDimmed = false;   // console.log('searchEmployeeRoutes PROSO', selection);
    this.cdRef.detectChanges();   // force change detection (zone lost)
    // this.saveState(this.selectedDate, selection); /* save state */
    return true;
  }

  loadReport_dateChange(date: any) {
    if (date) {
      this.selectedDate = date;
      this.loadReport(this.eCsdRadio);
    }
  }

  //

  // saveState(selectedDate, selectedPartner) {
  //   if (selectedDate) { this.stateService.setSelectedDate(selectedDate); }
  //   if (selectedPartner) {
  //     this.stateService.setSelectedSifraPartner_KPIs(selectedPartner['Sifra']);
  //     // if (this.data && this.data.length > 1) {
  //     //   this.stateService.setPartnersQuickList('newTask_partneri', selectedPartner);
  //     // }
  //   }
  // }
}
