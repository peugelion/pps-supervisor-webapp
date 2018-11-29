import { Component, OnDestroy, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { StateService } from '../../providers/state.service';
import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'app-izvestaj-kpis',
  templateUrl: './izvestaj-kpis.component.html',
  styleUrls: ['./izvestaj-kpis.component.scss']
})
export class IzvestajKpisComponent implements OnDestroy {
  segmentDimmed = false;
  isQueryShort = false;
  @Output() sidebarMenuToggleAction = new EventEmitter();

  selectedDate: Date = null;
  selectedSifraPartner_KPIs;
  selectedPartner: {};
  partners = [];
  dataSource = null;

  @ViewChild('searchBox') searchBox;
  constructor(
    private stateService: StateService,
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef
  ) {
    this.segmentDimmed = false;
    this.selectedDate = this.stateService.getSelectedDate();
  }

  // ngOnInit() {
    // this.segmentDimmed = false;
    // this.selectedDate = this.stateService.getSelectedDate();
  // }

  ngOnDestroy() {
    this.saveState(this.selectedDate, this.selectedPartner); /* save state */
    this.cdRef.detach(); /* https://stackoverflow.com/questions/37849453/attempt-to-use-a-destroyed-view-detectchanges */
  }

  async loadReportData(selection: any) {  // console.log('loadReportData USO', this.segmentDimmed, selection);
    if (selection) {
      this.selectedPartner           = selection;
      this.selectedSifraPartner_KPIs = selection['Sifra'];
    }
    if (!this.selectedDate || !this.selectedSifraPartner_KPIs || this.segmentDimmed) {
      return false;
    }
    this.segmentDimmed = true;    // console.log('loadReportData PROSO', selection);
    this.cdRef.detectChanges();   // force change detection (zone lost)
    this.dataSource = await this.apiService.dailySalesKPIsRptByCustomerBySKU(selection['Sifra'], this.selectedDate);
    this.segmentDimmed = false;   // console.log('searchEmployeeRoutes PROSO', selection);
    this.saveState(this.selectedDate, selection); /* save state */
    return true;
  }

  loadReportData_dateChange(date: any) {   // console.log('date', date, this.selectedSifraPartner_KPIs);
    if (date) {
      this.selectedDate = date;
      this.loadReportData(this.selectedSifraPartner_KPIs);
    }
  }

  //

  /* poruka da treba min 3 karaktera za pretragu aprtnera */
  isSearchQueryShort(query: string) {
    this.isQueryShort = query.length < 3 ? true : false;
  }

  saveState(selectedDate, selectedPartner) {
    if (selectedDate) { this.stateService.setSelectedDate(selectedDate); }
    if (selectedPartner) {
      this.stateService.setSelectedSifraPartner_KPIs(selectedPartner['Sifra']);
      if (this.dataSource && this.dataSource.length > 1) {
        this.stateService.setPartnersQuickList(selectedPartner);
      }
    }
  }

}
