import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { StateService } from '../../providers/state.service';
import { ApiService } from '../../providers/api.service';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-izvestaj-kpis',
  templateUrl: './izvestaj-kpis.component.html',
  styleUrls: ['./izvestaj-kpis.component.scss']
})
export class IzvestajKpisComponent implements OnInit, OnDestroy, AfterViewInit {
  segmentDimmed = false;

  selectedDate: Date = null;
  selectedSifraPartner_KPIs;
  partners = [];
  dataSource = null;

  public selectedOption =  { id: 2,  name: 'two' };
  private _options = [{ id: 1,  name: 'one' }, { id: 2,  name: 'two' }, { id: 3,  name: 'three' }];

  @ViewChild('searchBox') searchBox;
  constructor(
    private stateService: StateService,
    private apiService: ApiService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.segmentDimmed = false;
    /* load state */
    this.selectedDate = this.stateService.getSelectedDate();
    // this.selectedSifraPartner_KPIs = this.stateService.getselectedSifraPartner_KPIs();
    // this.selectedSifraPartner_KPIs = 68510; // 667 \ 1155; // TODO
    this.loadPartnersList();
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.saveState(this.selectedDate, this.selectedSifraPartner_KPIs); /* save state */
    this.cdRef.detach(); /* https://stackoverflow.com/questions/37849453/attempt-to-use-a-destroyed-view-detectchanges */
  }

  async loadPartnersList() {
    this.partners = await this.apiService.radnikPodredjenPartner();    // console.log('partners', this.partners);
  }

  // public optionsLookup = async (query: string, initial) => {
  //   this.searchBox.dropdownService.setOpenState(true);     // console.log('query,n', initial, query);
  //   return this.searchPartnersList(query);
  // }

  // async searchPartnersList(query: string) {
  //   this.searchBox.dropdownService.setOpenState(true);
  //   const results = this.partners.filter(item => item.Naziv.toLowerCase().includes(query.toLowerCase()));
  //   // console.log('results', results);
  //   return results;
  // }

  // resultFormatter(r, q) {
  //   console.log('resultFormatter', r, q);
  // }
  // // resultFormatter = (result, query: string) => { return 'asd'; }

  async loadReportData(selection: any) {    // console.log('loadReportData USO', this.segmentDimmed, selection);
    if (!this.selectedDate || !selection || this.segmentDimmed) {
      return false;
    }
    // this.selectedSifraPartner_KPIs = selection['FK_Partner'] ? selection['FK_Partner'] : selection;
    this.selectedSifraPartner_KPIs = selection;
    this.segmentDimmed = true;             // console.log('loadReportData PROSO', selection);
    this.cdRef.detectChanges(); // force change detection (zone lost)
    this.dataSource = await this.apiService.dailySalesKPIsReportByCustomerBySKU(this.selectedSifraPartner_KPIs, this.selectedDate);
    console.log('new dataSource', this.dataSource);
    this.segmentDimmed = false;            // console.log('searchEmployeeRoutes PROSO', selection);
    this.saveState(this.selectedDate, selection); /* save state */
    return true;
  }

  loadReportData_dateChange(date: any) {
    this.selectedDate = date;
    this.loadReportData(this.selectedSifraPartner_KPIs);
  }

  logout() {
    this.authService.logout();
  }

  //

  saveState(selectedDate, setselectedSifraPartner_KPIs) {
    if (selectedDate) { this.stateService.setSelectedDate(selectedDate); }
    if (setselectedSifraPartner_KPIs) { this.stateService.setSelectedSifraPartner_KPIs(setselectedSifraPartner_KPIs); }
  }

}
