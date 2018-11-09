import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatepickerMode } from 'ng2-semantic-ui';
import { environment } from '../../../environments/environment';
import { DataService } from '../../providers/data.service';

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

  constructor(private _http: HttpClient, private dataService: DataService) {
    this.apiUrl = environment.apiUrl;
    this.dateMode = DatepickerMode.Date;
  }

  ngOnInit() {
    this.selectedDate = this.dataService.getSelectedDate();
    this.selectedSubordinate = this.dataService.getSelectedSubordinate(); // postavlja odabrani element u sui pick listi
    if (this.selectedSubordinate) {
      this.searchEmployeeRoutes(this.selectedSubordinate);
    }
    this._http.get<WorkerData>(this.apiUrl + '/api/dashboard', { withCredentials: true })
    .subscribe(data => {
      this.supervisor = data.supervisorData;
      this.subordinates = data.subordinates;
      // this.segmentDimmed = false;
    });
  }

  ngOnDestroy() {
    this.dataService.setSelectedDate(this.selectedDate);
    this.dataService.setWorkerRoutes(this.workerRoutes);
    this.dataService.setSelectedSubordinate(this.selectedSubordinate);
  }

  searchEmployeeRoutes(selection: any) {
    this.selectedSubordinate = selection;
    // console.log('selectedWorker = ', selection);
    // console.log('selectedDate = ', this.selectedDate.toISOString());
    if (this.selectedDate === null || this.selectedDate === undefined) {
      this.popup.open();
      return false;
    }
    // let formatedDate = this.selectedDate.toISOString();
    // formatedDate = formatedDate.substring(0, formatedDate.indexOf('T'));
    const configObj = {
      params: {
        'Fk_Radnik': selection,
        'datum': this.selectedDate.toISOString()
      },
      withCredentials: true
    };
    this.segmentDimmed = true;
    // console.log('configObj = ', configObj);
    this._http.get<WorkerData>(this.apiUrl + '/api/dashboard/workerRoutes', configObj)
    .subscribe(data => {
      console.log('routes data = ', data);
      this.workerRoutes = data.workerRoutes;
      this.segmentDimmed = false;
    });
    return true;
  }

}
