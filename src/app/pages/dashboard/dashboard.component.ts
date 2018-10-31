import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface InitData {
  supervisorData: Object;
  subordinates: Array<any>;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('popup') popup; // reference to suiPopup element
  apiUrl: string;
  supervisor: any;
  subordinates: any;
  selectedWorker: any = null;
  selectedDate: Date = null;

  constructor(private _http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit() {
    this._http.get<InitData>(this.apiUrl + '/dashboard', { withCredentials: true })
    .subscribe(data => {
      this.supervisor = data.supervisorData;
      this.subordinates = data.subordinates;
    });
  }

  searchEmployeeRoutes(selection: any) {
    console.log('selectedWorker = ', selection);
    console.log('selectedDate = ', this.selectedDate.toISOString());
    if (this.selectedDate === null || this.selectedDate === undefined) {
      this.popup.open();
      return false;
    }
    let formatedDate = this.selectedDate.toISOString();
    formatedDate = formatedDate.substring(0, formatedDate.indexOf('T'));
    const configObj = {
      params: {
        'Fk_Radnik': selection.Fk_Radnik,
        'datum': formatedDate
      },
      withCredentials: true
    };
    console.log('configObj = ', configObj);
    this._http.get(this.apiUrl + '/dashboard/workerRoutes', configObj)
    .subscribe(data => {
      console.log('routes data = ', data);
    });
    return true;
  }

}
