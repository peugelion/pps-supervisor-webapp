import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatepickerMode } from 'ng2-semantic-ui';
import { environment } from '../../../environments/environment';

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
export class DashboardComponent implements OnInit {
  @ViewChild('popup') popup; // reference to suiPopup element
  apiUrl: string;
  dateMode: DatepickerMode;
  supervisor: any;
  subordinates: any;
  selectedDate: Date = null;
  workerRoutes: Array<any> = null;
  segmentDimmed: boolean;

  constructor(private _http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.dateMode = DatepickerMode.Date;
  }

  ngOnInit() {
    this._http.get<WorkerData>(this.apiUrl + '/dashboard', { withCredentials: true })
    .subscribe(data => {
      this.supervisor = data.supervisorData;
      this.subordinates = data.subordinates;
      this.segmentDimmed = false;
    });
  }

  searchEmployeeRoutes(selection: any) {
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
    this.segmentDimmed = !this.segmentDimmed;
    // console.log('configObj = ', configObj);
    this._http.get<WorkerData>(this.apiUrl + '/dashboard/workerRoutes', configObj)
    .subscribe(data => {
      console.log('routes data = ', data);
      this.workerRoutes = data.workerRoutes;
      this.segmentDimmed = !this.segmentDimmed;
    });
    return true;
  }

}
