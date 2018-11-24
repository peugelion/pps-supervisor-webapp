import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
// import { DatepickerMode } from 'ng2-semantic-ui';
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
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('popup') popup; // reference to suiPopup element
  // apiUrl: string;
  // dateMode: DatepickerMode;
  // datePopupPosition: any = 'bottom-right';
  segmentDimmed = false;

  supervisor: any;
  subordinates: any;
  selectedDate: Date = null;
  selectedSubordinate: any = null;
  workerRoutes: Array<any> = null;

  constructor(
    private stateService: StateService,
    public router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {
    // this.dateMode = DatepickerMode.Date;
    // this.segmentDimmed = false;
  }

  ngOnInit() {
    this.supervisor   = this.stateService.getSupervisor();
    this.subordinates = this.stateService.getSubordinates();
    this.selectedSubordinate = this.stateService.getSelectedSubordinate(); // postavlja odabrani element u sui pick listi
    this.selectedDate        = this.stateService.getSelectedDate();
  }

  ngAfterViewInit() {
    this.segmentDimmed = false;
  }

  ngOnDestroy() {
    this.saveState(this.selectedDate, this.selectedSubordinate, this.workerRoutes); /* save selected worker state */
  }

  searchEmployeeRoutes_dateChange(date: any) {
    this.selectedDate = date;
    this.searchEmployeeRoutes(this.selectedSubordinate);
  }

  searchEmployeeRoutes(selection: any) {  console.log('searchEmployeeRoutes USO', selection);
    if (!this.selectedDate || !selection || this.segmentDimmed) {
      return false;
    }
    this.selectedSubordinate = selection;
    this.segmentDimmed = true;            console.log('searchEmployeeRoutes PROSO', selection);
    this.apiService.getWorkerRoutes(selection, this.selectedDate)
      .subscribe(data => {
        this.workerRoutes = data['workerRoutes'];
        this.segmentDimmed = false;
      }, error => error.status === 401 ? this.router.navigate(['login']) : console.warn(error.status, error.error));
    this.saveState(this.selectedDate, selection, null); /* save selected worker state */
    return true;
  }

  logout() {
    this.authService.logout();
  }

  //

  saveState(selectedDate, selectedSubordinate, workerRoutes) {
    if (selectedDate) { this.stateService.setSelectedDate(selectedDate); }
    if (selectedSubordinate) {
      this.stateService.setSelectedSubordinate(selectedSubordinate);
      const selectedSubordinateObj = this.subordinates.find(obj => obj['Fk_Radnik'] === selectedSubordinate); /* SifraRadnik za Fk_Radnik */
      this.stateService.setSelectedSubordinate_SifraRadnik(selectedSubordinateObj['SifraRadnik']); //
    }
    if (workerRoutes) { this.stateService.setWorkerRoutes(workerRoutes); }
  }

}
