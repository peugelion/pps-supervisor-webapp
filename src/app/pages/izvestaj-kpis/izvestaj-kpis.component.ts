import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '../../providers/state.service';
import { ApiService } from '../../providers/api.service';
import { AuthService } from '../../providers/auth.service';
import { DatepickerMode } from 'ng2-semantic-ui';

@Component({
  selector: 'app-izvestaj-kpis',
  templateUrl: './izvestaj-kpis.component.html',
  styleUrls: ['./izvestaj-kpis.component.css']
})
export class IzvestajKpisComponent implements OnInit, OnDestroy {
  dateMode: DatepickerMode;
  segmentDimmed: boolean;

  selectedDate: Date = null;
  sifraPartner_KPIs;
  dataSource = null;

  constructor(
    private stateService: StateService,
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    /* load state */
    this.selectedDate = this.stateService.getSelectedDate();
    // this.sifraPartner_KPIs = this.stateService.getSifraPartner_KPIs();
    this.sifraPartner_KPIs = 685100; // TODO
  }

  ngOnDestroy() {
    /* save state */
    this.stateService.setSelectedDate(this.selectedDate);
    this.stateService.setSifraPartner_KPIs(this.sifraPartner_KPIs);
  }

  async loadReportData(selection: any) {  // console.log('searchEmployeeRoutes USO');
    if (!this.selectedDate || !this.sifraPartner_KPIs || this.segmentDimmed) {
      return false;
    }
    this.segmentDimmed = true;            // console.log('searchEmployeeRoutes PROSO', selection);
    this.dataSource = await this.apiService.dailySalesKPIsReportByCustomerBySKU(this.sifraPartner_KPIs, this.selectedDate);
    console.log('dataSource', this.dataSource);
    /* save state */
    this.stateService.setSelectedDate(this.selectedDate); //
    this.stateService.setSifraPartner_KPIs(selection); //
    return true;
  }

  loadReportData_dateChange(date: any) {
    this.loadReportData(this.sifraPartner_KPIs);
  }

  logout() {
    this.authService.logout();
  }

}
