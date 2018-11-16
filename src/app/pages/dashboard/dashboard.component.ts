import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DatepickerMode } from 'ng2-semantic-ui';
import { Router } from '@angular/router';
import { StateService } from '../../providers/state.service';
import { ApiService } from '../../providers/api.service';
import { AuthService } from '../../providers/auth.service';

interface WorkerData {
  supervisorData: Object;
  subordinates: Array<any>;
  workerRoutes: Array<any>;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('popup') popup; // reference to suiPopup element
  apiUrl: string;
  dateMode: DatepickerMode;
  datePopupPosition: any = 'bottom-right';
  supervisor: any;
  subordinates: any;
  selectedDate: Date = null;
  selectedSubordinate: any = null;
  workerRoutes: Array<any> = null;
  segmentDimmed: boolean;

  constructor(
    private stateService: StateService,
    public router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.dateMode = DatepickerMode.Date;
  }

  ngOnInit() {
    this.supervisor   = this.stateService.getSupervisor();
    this.subordinates = this.stateService.getSubordinates();
    this.selectedSubordinate = this.stateService.getSelectedSubordinate(); // postavlja odabrani element u sui pick listi
    this.selectedDate        = this.stateService.getSelectedDate();
  }

  ngOnDestroy() {
    this.stateService.setSelectedDate(this.selectedDate);
    this.stateService.setSelectedSubordinate(this.selectedSubordinate);
    this.stateService.setWorkerRoutes(this.workerRoutes);
  }

  searchEmployeeRoutes(selection: any) {  // console.log('searchEmployeeRoutes USO');
    if (!this.selectedDate || !this.selectedSubordinate || this.segmentDimmed) {
      return false;
    }
    this.segmentDimmed = true;            // console.log('searchEmployeeRoutes PROSO', selection);
    this.apiService.getWorkerRoutes(this.selectedSubordinate, this.selectedDate)
      .subscribe(data => {
        this.workerRoutes = data['workerRoutes'];
        this.segmentDimmed = false;
      }, error => {
        console.log(error.status, error.error);
        if (error.status === 401) { this.router.navigate(['login']); }
      });
    /* save selected worker state */
    this.stateService.setSelectedSubordinate(selection); //
    const selectedSubordinateObj = this.subordinates.find(obj => obj['Fk_Radnik'] === selection); /* SifraRadnik za Fk_Radnik */
    this.stateService.setSelectedSubordinate_SifraRadnik(selectedSubordinateObj['SifraRadnik']); //
    return true;
  }

  searchEmployeeRoutes_dateChange(date: any) {
    this.searchEmployeeRoutes(this.selectedSubordinate);
  }

  logout() {
    this.authService.logout();
  }

}
