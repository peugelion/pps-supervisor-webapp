import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../providers/state.service';
import { ApiService } from '../../providers/api.service';
import { AlertComponent } from '@pepsi-shared/alert/alert.component';

interface WorkerData {
  supervisorData: Object;
  subordinates: Array<any>;
  workerRoutes: Array<any>;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('popup') popup; // reference to suiPopup element
  segmentDimmed = false;

  subordinates: any;
  selectedDate: Date = null;
  selectedSubordinate: any = null;
  workerRoutes: Array<any> = null;

  state = {
    'subordinates': null,
  }

  constructor(
    private stateService: StateService,
    public router: Router,
    private apiService: ApiService,
    public ppsAlert: AlertComponent,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.subordinates = this.stateService.getSubordinates();
    this.selectedSubordinate = this.stateService.getSelectedSubordinate(); // postavlja odabrani element u sui pick listi
    this.selectedDate = this.stateService.getSelectedDate();
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.saveState(this.selectedDate, this.selectedSubordinate, this.workerRoutes); /* save selected worker state */
  }

  searchEmployeeRoutes_dateChange(date: any) {
    this.selectedDate = date;
    this.searchEmployeeRoutes(this.selectedSubordinate);
  }

  searchEmployeeRoutes(selection: any) {  // console.log('searchEmployeeRoutes USO', selection);
    if (selection) {
      this.selectedSubordinate = selection;
    }
    if (!this.selectedDate || !selection || this.segmentDimmed) {
      return false;
    }
    this.segmentDimmed = true;            // console.log('searchEmployeeRoutes PROSO', selection);
    // this.cdr.detectChanges();

    this.apiService.getWorkerRoutes(selection, this.selectedDate)
      .subscribe(data => {
        this.workerRoutes = data['workerRoutes'];
        this.segmentDimmed = false;
      }, error => {
        error.status === 401 ? this.router.navigate(['login']) : console.warn(error.status, error.error);
        this.ppsAlert.showErrorAlert({ 'text': error.error + ' ' + error.status });
        this.segmentDimmed = false;
      });
    this.saveState(this.selectedDate, selection, null); /* save selected worker state */
    return true;
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
